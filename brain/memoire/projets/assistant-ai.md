# assistant-ai — Coco, AI front desk

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-09-17 (resynchronisation
> complète, `git log origin/main` — écart graphify corrigé, aucun autre changement constaté).
> Dépôt : `cyriljoseph32-cyber/assistant-ai` (branche par défaut `main`).
> Dernier commit `main` : `065b977` (21/07/2026) — aucune activité depuis, vérifié le 17/09.
> ⚠️ À ne pas confondre avec `coco2` (Coco Samui Concierge, le chatbot touristique).

## Identité

- **Coco** — réceptionniste IA pour commerces de services : répond aux clients sur
  WhatsApp/email via Claude, avec console web du propriétaire (chat assistant, inbox, CRM,
  base de connaissance, activité). MVP conçu à Koh Samui.
- Email owner/démo : `cyril.joseph@coco-samui-ai.com` (`OWNER_EMAIL`).

## Stack & déploiement

- Next.js 14 App Router + TypeScript, Claude via `src/lib/anthropic.ts`, Supabase (Postgres,
  service-role), Twilio WhatsApp, Vercel + crons. Package `coco` v0.2.0.
- Trois couches, dépendances strictes **app → services → lib** (voir `CLAUDE.md` du dépôt).
- Single-tenant par déploiement : toutes les requêtes scopées `env.businessId`.

## Fichiers clés & conventions

- `CLAUDE.md` — règles d'architecture, à lire avant tout.
- `src/lib/config.ts` — lecture lazy des env vars : **jamais `process.env` en direct**.
- `src/services/ai.service` — pipeline detectIntent → generateReply, garde-fous d'escalade
  (plainte / urgence / confiance faible). `src/prompts/index.ts` — prompts clients, bâtis
  depuis la table `businesses`.
- Design system maison dans `src/app/globals.css` (tokens CSS, pas de Tailwind ni lib UI) ;
  mobile OK à 390px.
- `npm run build` et `npm run typecheck` doivent passer avant tout push.

## Équipe d'agents (créée le 2026-07-20)

`.claude/agents/` du dépôt : `dev-coco` (code — `/coco-dev`), `onboarding-coco`
(installation client — `/coco-onboarding`), `qualite-coco` (bilan d'exploitation —
`/coco-qualite`), `commercial-coco` (vente/prospection — `/coco-vente`). Garde-fous
communs : aucune action externe sans validation de Cyril, tarifs/données client jamais
inventés.

## Cartographie du code (graphify) — ⚠️ corrigé le 2026-09-17, jamais mergée ici

- La ligne du 31/08 affirmait `graphify-out/` **« mergé sur `main` »** (PR #5/#6) sur ce
  dépôt — **vérifié faux le 17/09** : `git log --oneline --all` (toutes branches, y compris
  distantes) ne contient aucun commit mentionnant « graphify », il n'existe aucun dossier
  `graphify-out/` dans le répo, et `CLAUDE.md` n'a pas de section « Cartographie du code ».
  Le dernier commit sur `main` reste `065b977` (21/07, ajout de l'équipe d'agents). Écart
  probable : la passe transverse du 31/08 a réellement touché CSRA, coco2 et jamin-depth,
  mais la ligne de journal généralisait à tort aux 7 dépôts. Non refait dans cette session
  (aucune demande de Cyril de lancer graphify ici) — seule la mémoire est corrigée.

## État & prochaines étapes (2026-07-20)

- Dernier merge : PR #3 (branche « ai-assistant-client-launch ») le 17/07 — préparation du
  lancement client.
- Client(s) réel(s) en production et prochaine étape commerciale : `[À COMPLÉTER PAR CYRIL]`.

## Pièges connus

- Deux « Coco » dans l'écosystème — celui-ci est le **produit front desk**, pas le concierge.
- Routes owner protégées par `requireAuth()` ; crons par `CRON_SECRET` ; webhook Twilio
  validé par signature — ne pas contourner.
- Messages IA clients loggés via `crm.service.logMessage` (`sender: "ai" | "human"`) et
  événements via `logAutomation` — à préserver pour que `/activity` reste fidèle.
