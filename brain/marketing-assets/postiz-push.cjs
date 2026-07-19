#!/usr/bin/env node
/*
 * postiz-push.cjs — Pousse les posts CSRA (captions + visuels) dans Postiz.
 *
 * Postiz (https://postiz.com) est le planificateur de l'académie. Ce script crée les posts
 * via l'API publique — par défaut en BROUILLON (draft) pour respecter la règle de marque :
 * Cyril relit et programme dans Postiz. Rien n'est publié sans sa validation.
 *
 * Utilisation :
 *   node postiz-push.cjs --list                 # liste les canaux connectés (id + plateforme)
 *   node postiz-push.cjs chemin/vers/manifest.json
 *
 * Variables d'environnement :
 *   POSTIZ_API_KEY   (obligatoire)  clé API Postiz (Settings → Public API)
 *   POSTIZ_API_URL   (option)       défaut https://api.postiz.com/public/v1
 *                                   (self-hosted : https://<ton-domaine>/public/v1)
 *   POSTIZ_POST_TYPE (option)       draft (défaut) | schedule | now
 *
 * Format du manifest.json :
 * {
 *   "posts": [
 *     {
 *       "content": "Texte de la caption…",
 *       "image": "poster-free-trial.png",        // chemin relatif au manifest (option)
 *       "date": "2026-07-24T10:30:00.000Z",       // ISO 8601 ; requis si type=schedule
 *       "platforms": ["instagram", "facebook"]     // canaux visés (identifiants Postiz)
 *     }
 *   ]
 * }
 *
 * Voir brain/marketing-assets/POSTIZ.md pour l'installation (clé API, canaux, env var).
 */

const fs = require('fs');
const path = require('path');

const API_URL = (process.env.POSTIZ_API_URL || 'https://api.postiz.com/public/v1').replace(/\/$/, '');
const API_KEY = process.env.POSTIZ_API_KEY;
const POST_TYPE = process.env.POSTIZ_POST_TYPE || 'draft';

if (!API_KEY) {
  console.error('❌ POSTIZ_API_KEY manquante. Ajoute-la aux variables d\'environnement (voir POSTIZ.md).');
  process.exit(1);
}

const headers = { Authorization: API_KEY };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Réglages par défaut par plateforme (settings.__type + champs requis).
function platformSettings(identifier) {
  switch (identifier) {
    case 'instagram':          return { __type: 'instagram', post_type: 'FEED' };
    case 'instagram-standalone': return { __type: 'instagram-standalone', post_type: 'FEED' };
    case 'facebook':           return { __type: 'facebook' };
    default:                   return { __type: identifier };
  }
}

async function listIntegrations() {
  const res = await fetch(`${API_URL}/integrations`, { headers });
  if (!res.ok) throw new Error(`GET /integrations → ${res.status} ${await res.text()}`);
  return res.json();
}

async function uploadImage(absPath) {
  const buf = fs.readFileSync(absPath);
  const ext = path.extname(absPath).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp'
    : ext === 'gif' ? 'image/gif' : ext === 'mp4' ? 'video/mp4' : 'image/jpeg';
  const form = new FormData();
  form.append('file', new Blob([buf], { type: mime }), path.basename(absPath));
  const res = await fetch(`${API_URL}/upload`, { method: 'POST', headers, body: form });
  if (!res.ok) throw new Error(`POST /upload → ${res.status} ${await res.text()}`);
  const json = await res.json(); // { id, path }
  return json;
}

async function createPost({ type, date, postsArray }) {
  const body = { type, date: date || new Date(Date.now() + 3600e3).toISOString(), posts: postsArray };
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST /posts → ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  const arg = process.argv[2];

  const integrations = await listIntegrations();
  const byId = new Map();      // identifiant plateforme -> intégration
  for (const it of integrations) {
    const key = (it.identifier || it.providerIdentifier || it.platform || '').toLowerCase();
    if (key) byId.set(key, it);
  }

  if (arg === '--list' || !arg) {
    console.log(`\n🔌 Canaux connectés dans Postiz (${API_URL}) :\n`);
    if (!integrations.length) console.log('  (aucun — connecte Instagram & Facebook dans Postiz)');
    for (const it of integrations) {
      console.log(`  • ${it.name || '(sans nom)'} — plateforme: ${it.identifier || it.platform || '?'} — id: ${it.id}`);
    }
    if (!arg) console.log('\nℹ️  Fournis un manifest.json pour créer les posts. Voir POSTIZ.md.');
    return;
  }

  const manifestPath = path.resolve(arg);
  const manifestDir = path.dirname(manifestPath);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const posts = manifest.posts || [];
  console.log(`\n📤 ${posts.length} post(s) → Postiz en « ${POST_TYPE} »\n`);

  let ok = 0, fail = 0;
  for (const [i, p] of posts.entries()) {
    try {
      // Upload de l'image (une fois, réutilisée sur chaque plateforme du post)
      let media = null;
      if (p.image) {
        const imgPath = path.isAbsolute(p.image) ? p.image : path.join(manifestDir, p.image);
        media = await uploadImage(imgPath);
        await sleep(500);
      }

      const platforms = p.platforms && p.platforms.length ? p.platforms : ['instagram', 'facebook'];
      const postsArray = [];
      for (const plat of platforms) {
        const integ = byId.get(plat.toLowerCase());
        if (!integ) { console.warn(`  ⚠️  post ${i + 1}: canal « ${plat} » non connecté dans Postiz — ignoré`); continue; }
        const valueItem = { content: p.content };
        if (media) valueItem.image = [{ id: media.id, path: media.path }];
        postsArray.push({ integration: { id: integ.id }, value: [valueItem], settings: platformSettings(plat.toLowerCase()) });
      }
      if (!postsArray.length) { console.warn(`  ⚠️  post ${i + 1}: aucun canal valide — sauté`); fail++; continue; }

      const type = POST_TYPE === 'schedule' && !p.date ? 'draft' : POST_TYPE; // pas de date → draft
      const result = await createPost({ type, date: p.date, postsArray });
      console.log(`  ✅ post ${i + 1}/${posts.length} (${platforms.join(', ')}) → ${type}${result && result.id ? ' · id ' + result.id : ''}`);
      ok++;
      await sleep(1500); // respecter la limite 30 req/h
    } catch (e) {
      console.error(`  ❌ post ${i + 1}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nBilan : ${ok} créé(s), ${fail} en échec. Ouvre Postiz pour relire/programmer.`);
}

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
