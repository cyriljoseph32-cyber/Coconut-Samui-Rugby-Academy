# Publication via Postiz — CSRA

[Postiz](https://postiz.com) est le **planificateur social** de l'académie (open-source, gère
Instagram + Facebook + X + LinkedIn…). Les posts générés chaque semaine y sont poussés
**en brouillon** par `postiz-push.cjs` — Cyril relit et programme dans Postiz. *Rien n'est publié
sans sa validation* (règle de marque respectée).

## Installation (à faire une fois)

1. **Compte Postiz** — cloud [postiz.com](https://postiz.com) ou self-hosted.
2. **Connecter les canaux** dans Postiz : Instagram (Business/Creator) + Facebook (Page).
   → sans ça, `postiz-push.cjs` ignore le canal.
3. **Récupérer la clé API** : Postiz → *Settings → Public API* → générer une clé.
4. **Ajouter la clé aux variables d'environnement** de l'environnement Claude Code
   (paramètres de l'environnement sur claude.ai — **ne pas la coller en clair dans le chat**) :
   - `POSTIZ_API_KEY` = ta clé
   - `POSTIZ_API_URL` = `https://api.postiz.com/public/v1` (cloud) **ou** `https://<ton-domaine>/public/v1` (self-hosted)
   - `POSTIZ_POST_TYPE` = `draft` (défaut, recommandé) · `schedule` (programme aux dates) · `now` (publie tout de suite ⚠️)

## Vérifier la connexion

```bash
node brain/marketing-assets/postiz-push.cjs --list
```
→ liste les canaux connectés avec leur `id` et leur plateforme (`instagram`, `facebook`, …).

## Pousser les posts d'une semaine

```bash
node brain/marketing-assets/postiz-push.cjs brain/marketing-assets/semaine-2026-07-20/manifest.json
```
Le script : upload chaque visuel (`POST /upload`) → crée un post multi-canaux (`POST /posts`) en
`draft`. Ouvre ensuite Postiz pour relire et programmer.

## Format du manifest (`manifest.json`)

```json
{
  "posts": [
    {
      "content": "Caption FR + EN + hashtags…",
      "image": "poster-free-trial.png",          // relatif au dossier du manifest (option)
      "date": "2026-07-24T10:30:00.000Z",          // ISO 8601 UTC ; requis si POSTIZ_POST_TYPE=schedule
      "platforms": ["instagram", "facebook"]        // identifiants des canaux Postiz
    }
  ]
}
```

> Créneaux : les heures du calendrier sont en **heure Samui (UTC+7)**. Pour la `date` du manifest
> (UTC), **soustraire 7 h** (ex. 17h30 Samui = `10:30:00Z`).

## Détails API (référence)

- Base : `https://api.postiz.com/public/v1` · en-tête `Authorization: <clé>` (clé brute, pas de `Bearer`)
- `GET /integrations` — canaux · `POST /upload` (multipart `file`) → `{id, path}` · `POST /posts`
- Limite : **30 requêtes/heure**. Instagram exige `settings.post_type` (le script met `FEED`).

## Automatisation

La Routine hebdomadaire (voir `AUTOMATION.md`) génère le calendrier + les visuels, écrit un
`manifest.json`, puis — **si `POSTIZ_API_KEY` est défini** — lance `postiz-push.cjs` pour créer les
brouillons dans Postiz. Sinon elle livre juste les fichiers à Cyril.

## Rappels

- **Brouillons par défaut** — Cyril valide et programme dans Postiz.
- Photos d'enfants : **accord parental** avant publication.
- Aucun tarif/horaire/date/nom de coach inventé → `[À COMPLÉTER PAR CYRIL]`.
