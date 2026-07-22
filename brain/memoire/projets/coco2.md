# coco2 — Coco Samui Concierge

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-07-22.
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

## Partenaires

- **Hakuna Matata** (location véhicules) — intégré le 2026-07-22.
  - Loueur voitures + scooters à Koh Samui. Modèle apporteur d'affaires :
    **commission 10 %** versée en fin de location.
  - **Tracking manuel** : le client mentionne « referred by Coco » ou Cyril prévient
    directement le loueur. Pas de lien tracké (PID), pas de contrat formel (confiance).
  - Conditions : min 1 jour / min 1 000 THB par location ; assurance incluse ; caution
    demandée ; passeport seul ; prépaiement 1 000 THB (PaySolutions / Bangkok Bank) ;
    livraison gratuite 10h-18h (+300 THB hors horaires). Résa : https://amo.si/K/YNSE7V/YJLEOZ
  - **Contact** : tél / WhatsApp +66 93 574 9587 · Bophut (proche aéroport), Tambon Bo Phut,
    Surat Thani 84320 (coordonnées recoupées via web, tél confirmé par Cyril).
  - Implémentation (branche `claude/vehicle-rental-agency-integration-a8jkpd`, commits `f28db11`→`2482fed`) :
    entrée transport dans `api/_affiliates.js` (mots-clés location EN/FR/DE, lien direct
    appended par `bookingFooter()`) ; section TRANSPORT du prompt `api/chat.js` (loueur
    partenaire prioritaire + consigne « mention Coco » + rappel casque/permis/assurance) ;
    fiche partenaire rang 1 dans `data/concierge-db/13-location-scooters-voitures-vans.json` ;
    assertion dans `scripts/smoke-test.mjs`.
  - Actif en prod seulement au merge de la branche sur `main` (Vercel) ou `vercel --prod`.

## État & prochaines étapes (2026-07-22)

- Dernier commit : 12/07 — base concierge complète (20/20 catégories de listings).
- En cours : intégration du partenaire location **Hakuna Matata** (branche
  `claude/vehicle-rental-agency-integration-a8jkpd`, commits `f28db11`→`2482fed`, non mergée) — voir
  section Partenaires.
- Prospection (agences, comptes) : voir `Coco_AI_Prospection_RECAP.md` dans le dépôt ;
  avancement réel : `[À COMPLÉTER PAR CYRIL]`.

## Pièges connus

- **Gotcha Tailwind v4** : les utilitaires translate utilisent la propriété CSS `translate`,
  pas `transform` — surcharger avec `translate` (un bug a déjà laissé la bottom sheet mobile
  hors écran en permanence).
- Une seule instance DOM du chat (`site/src/components/ChatPanel.astro`), déplacée par JS
  (rail desktop ≥1280px / bottom sheet mobile). Input chat ≥16px (zoom focus iOS).
