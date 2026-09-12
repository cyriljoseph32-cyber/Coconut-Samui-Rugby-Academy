/**
 * POST /api/lead — capture des leads CSRA (essai, sponsoring, newsletter)
 *
 * Corps accepté : JSON ou `application/x-www-form-urlencoded` (le formulaire
 * fonctionne donc même sans JavaScript, par soumission native).
 *
 * Deux destinations, dans cet ordre d'importance :
 *   1. COCO COMMAND (`/api/command/events` sur jamin-depth) — la base unique.
 *   2. FormSubmit — la copie e-mail historique, gardée comme filet.
 *
 * Règle retenue : un lead n'est jamais perdu en silence. Si l'ingestion échoue
 * ET que l'e-mail échoue, la réponse le dit (`persisted: false`) et la console
 * Vercel garde la trace complète. C'est exactement la fuite n°2 de l'audit
 * (coco2/api/_store.js) qu'on refuse de reproduire ici.
 *
 * Variables : COMMAND_API_URL, COMMAND_INGEST_TOKEN, LEAD_FALLBACK_EMAIL
 * (défaut : coconutrugbyacademy@gmail.com).
 */

import { notifyCommand } from "./_command.js";

const FALLBACK_EMAIL = process.env.LEAD_FALLBACK_EMAIL || "coconutrugbyacademy@gmail.com";
/**
 * L'origine réelle de la requête, jamais un domaine écrit en dur.
 *
 * Le 12/09, `coconutsamuirugby.com` n'était enregistré chez aucun registrar : la
 * redirection 303 des soumissions sans JavaScript envoyait donc le visiteur sur
 * un domaine inexistant — le lead était enregistré, mais la personne tombait sur
 * une erreur DNS et pensait que sa demande avait échoué.
 *
 * On déduit désormais l'origine des en-têtes que Vercel pose sur chaque requête.
 * Le site répond ainsi correctement sur `*.vercel.app` aujourd'hui et sur le
 * domaine définitif le jour où il est branché, sans redéploiement ni variable à
 * penser. `SITE_DOMAIN` reste prioritaire si on veut forcer une valeur.
 */
function siteOrigin(req) {
  const forced = (process.env.SITE_DOMAIN || "").trim().replace(/\/$/, "");
  if (forced) return forced;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  if (host) return `${proto}://${host}`;
  // Dernier recours : un chemin relatif fonctionne pour la redirection, et les
  // liens de l'événement restent lisibles même sans origine absolue.
  return "";
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function clean(value, max = 200) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>&"]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Le corps arrive en JSON (fetch) ou en form-urlencoded (soumission native). */
function readBody(req) {
  const b = req.body;
  if (!b) return {};
  if (typeof b === "string") {
    try {
      return JSON.parse(b);
    } catch {
      return Object.fromEntries(new URLSearchParams(b));
    }
  }
  return b;
}

/**
 * Le kind décide de la priorité et du résumé. Une demande d'essai est un lead
 * chaud (P1) ; une inscription newsletter ne réveille personne (P3).
 */
const KINDS = {
  trial: { priority: "P1", label: "Demande d'essai / inscription" },
  sponsor: { priority: "P1", label: "Contact sponsor / partenaire" },
  newsletter: { priority: "P3", label: "Inscription newsletter" },
};

async function mailFallback(fields, subject) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FALLBACK_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: subject, _template: "table", _captcha: "false", ...fields }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const origin = siteOrigin(req);
  const body = readBody(req);

  // Pot de miel : rempli = robot. On répond 204 sans rien enregistrer.
  if (clean(body._honey)) return res.status(204).end();

  const kind = KINDS[body.kind] ? body.kind : body.program || body.name ? "trial" : "newsletter";
  const spec = KINDS[kind];

  const email = clean(body.email, 120);
  if (!email.includes("@") || email.length < 5) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  const lead = {
    name: clean(body.name, 120),
    email,
    phone: clean(body.phone, 40),
    childAge: clean(body.child_age || body.childAge, 20),
    program: clean(body.program, 60),
    message: clean(body.message, 1000),
    kind,
    receivedAt: new Date().toISOString(),
    source: clean(body.source, 60) || "site-csra",
  };

  const who = lead.name || lead.email;
  const detailLines = [
    lead.name && `nom=${lead.name}`,
    `email=${lead.email}`,
    lead.phone && `tel=${lead.phone}`,
    lead.childAge && `age_enfant=${lead.childAge}`,
    lead.program && `programme=${lead.program}`,
    lead.message && `message=${lead.message}`,
    `source=${lead.source}`,
  ]
    .filter(Boolean)
    .join(" · ");

  // 1. La base unique. On attend la réponse : c'est le seul enregistrement
  //    durable, il n'a pas le droit d'être « fire and forget ».
  const ingested = await notifyCommand({
    agent: "csra-web-form",
    type: "ACTION",
    priority: spec.priority,
    status: "DONE",
    // Pas de PII dans le résumé : il part en notification Telegram.
    summary: `${spec.label} — ${lead.program || "CSRA"}`,
    details: detailLines,
    links: [`${origin}/contact/`],
    next_action:
      kind === "newsletter"
        ? "Ajouter à la liste de diffusion."
        : "Répondre sous 24 h avec le prochain créneau et le tarif d'essai (200 THB).",
    // Un lead entrant se répond, il ne se décide pas : c'est une boucle B.
    // Le brouillon de réponse passera par Telegram, pas par un envoi auto.
    needs_owner: kind !== "newsletter",
    category: kind === "sponsor" ? "partner" : "sales",

    // Chantier 2 — les coordonnées structurées alimentent la fiche unique.
    // Elles ne sont pas stockées dans le journal : COCO COMMAND s'en sert pour
    // rattacher la personne, puis les oublie. Une même personne qui écrit sur
    // WhatsApp puis remplit ce formulaire ne comptera donc qu'une fois.
    contact: {
      name: lead.name || undefined,
      email: lead.email,
      phone: lead.phone || undefined,
    },
    channel: "site_form",
    source: lead.source,
    reference_url: origin ? `${origin}/contact/` : undefined,
  });

  // 2. Le filet e-mail. Inchangé pour Cyril : l'e-mail continue d'arriver.
  const mailed = await mailFallback(
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      child_age: lead.childAge,
      program: lead.program,
      message: lead.message,
    },
    `${spec.label} — CSRA website`,
  );

  const persisted = ingested.ok || mailed;

  console.log(
    "[CSRA LEAD]",
    JSON.stringify({ kind, who, ingested: ingested.ok, mailed, ts: lead.receivedAt }),
  );
  if (!persisted) {
    // Dernier recours : le lead complet en clair dans les logs Vercel, pour
    // qu'il soit récupérable à la main plutôt que perdu.
    console.error("[CSRA LEAD] ⚠️ NON ENREGISTRÉ — récupérer ici :", JSON.stringify(lead));
  }

  // Soumission native (sans JS) : on renvoie l'utilisateur sur /thanks/.
  const wantsHtml = (req.headers.accept || "").includes("text/html");
  if (wantsHtml) {
    res.setHeader("Location", `${origin}/thanks/`);
    return res.status(303).end();
  }

  return res.status(persisted ? 201 : 502).json({
    ok: persisted,
    persisted,
    ingested: ingested.ok,
    mailed,
    ...(persisted ? {} : { error: "Could not record the message. Please WhatsApp us instead." }),
  });
}
