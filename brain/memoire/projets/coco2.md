# coco2 — Coco Samui Concierge

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-07-20.
> Dépôt : `cyriljoseph32-cyber/coco2` (branche par défaut `main`).
> ⚠️ À ne pas confondre avec `assistant-ai` (Coco front desk, le produit pour commerces).

## Identité

- Chatbot concierge IA pour touristes à Koh Samui, monétisé par liens d'affiliation
  (Viator, Klook, GetYourGuide, Booking). Production : https://coco-samui-ai.com
  (projet Vercel `coco-samui-concierge`).

## Stack & déploiement

- Deux livrables : **app Vercel** (frontend = Astro dans `site/`, API serverless `api/*.js`
  sur Claude Haiku) + **serveur MCP** (`samui-concierge-mcp/`, stdio pour Claude Desktop,
  mêmes providers : Google Places, Viator, TripAdvisor, affiliés).
- Déploiement : merge sur `main` (intégration Git) ou `vercel --prod`.
- ⚠️ Racine `public/` = ancien site pré-Astro, **non déployé** — ne pas l'éditer.

## Fichiers clés & conventions

- `CLAUDE.md` — règles critiques, à lire avant tout :
  - **TripAdvisor : ne jamais stocker le contenu** — seulement `location_id`
    (providers flagués `cacheable: false`).
  - **Affiliés** : jamais de PID en dur — tout vient des env vars
    (`VIATOR_AFFILIATE_PID`, `KLOOK_AFFILIATE_ID`, …) ; mapping dans `api/_affiliates.js`.
  - Coco n'imprime jamais d'URL de réservation — `bookingFooter()` dans `api/chat.js`
    les ajoute.
- Smoke test : `node --env-file=samui-concierge-mcp/.env scripts/smoke-test.mjs`.
- **Docs business à la racine** (pas du code) : business plan, audit, plans
  marketing/SEO/réseaux sociaux, SOP d'exploitation, kits de prospection + contacts Samui,
  pricing, decks agence.

## Équipe d'agents (créée le 2026-07-20)

`.claude/agents/` du dépôt : `dev-concierge` (code — `/concierge-dev`), `data-concierge`
(base de listings — `/concierge-data`), `growth-concierge` (plans marketing/SEO/réseaux —
`/concierge-growth`), `partenariats-concierge` (prospection partenaires —
`/concierge-partenariats`). Garde-fous communs : brouillons uniquement, règles
TripAdvisor/affiliés, coordination avec le pipeline CSRA pour les cibles communes.

## État & prochaines étapes (2026-07-20)

- Dernier commit : 12/07 — base concierge complète (20/20 catégories de listings).
- Prospection (agences, comptes) : voir `Coco_AI_Prospection_RECAP.md` dans le dépôt ;
  avancement réel : `[À COMPLÉTER PAR CYRIL]`.

## Pièges connus

- **Gotcha Tailwind v4** : les utilitaires translate utilisent la propriété CSS `translate`,
  pas `transform` — surcharger avec `translate` (un bug a déjà laissé la bottom sheet mobile
  hors écran en permanence).
- Une seule instance DOM du chat (`site/src/components/ChatPanel.astro`), déplacée par JS
  (rail desktop ≥1280px / bottom sheet mobile). Input chat ≥16px (zoom focus iOS).
