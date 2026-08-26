# coco2 — Coco Samui Concierge

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-08-26.
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
  - **Mergé sur `main` le 2026-07-22 (PR #7, merge `ead54fb`)** → déploiement Vercel automatique.

## État & prochaines étapes (2026-08-26)

- 2026-07-22 : intégration du partenaire location **Hakuna Matata** **mergée sur `main`**
  (PR #7, merge `ead54fb`) → déploiement Vercel auto — voir section Partenaires.
- Base concierge complète (20/20 catégories de listings) depuis le 12/07.
- **Audit de fiabilité + standardisation des 4 agents** : PR #12 (« Audit de fiabilité IA +
  standardisation des agents .claude »), **mergée sur `main`** le 23/08 (`9391410`, confirmé
  `git log origin/main`) — documentation uniquement, aucun code de prod touché.
- ⚠️ **Écart constaté (26/08)** : le garde-fou chat.js décrit par Cyril — sécurité/prix,
  rate-limit KV durable, CI, `notifyCommand` (commit `55feffb`, « Add safety escalation, price
  guard, durable rate limiting, and COCO COMMAND events ») — **n'est PAS mergé sur `main`**.
  Il n'existe que sur la branche `claude/focused-allen-d348n8`
  (`git merge-base --is-ancestor 55feffb origin/main` → négatif) et aucune PR GitHub ne
  correspond à ce contenu dans l'historique des PR de ce dépôt (la seule PR #12 réelle est
  celle de l'audit de fiabilité, sans lien avec ces garde-fous). **Donc pas de déploiement
  Vercel prod déclenché par ce travail** — à vérifier/relancer avec Cyril avant de considérer
  ces protections comme actives sur https://coco-samui-ai.com.
- **Connecteurs Vercel/Gmail/Windsor.ai/Canva documentés** (24/08, commit `274ebb6` sur la
  même branche non mergée) dans `dev-concierge.md` / `partenariats-concierge.md` /
  `growth-concierge.md`. Reprend le contenu de l'ancienne PR #10 (fermée sans merge le 25/08).
- **Bloom par défaut** (24/08, commit `5c3facd`, même branche non mergée) : `growth-concierge`
  utilise désormais Bloom (compte pro trybloom) par défaut pour les visuels, Canva en repli.
- Ancienne PR #11 (« Add DanceSoulTherapy Instagram content plan ») : contenu Instagram
  DanceSoulTherapy déposé par erreur sur ce dépôt — **fermée le 25/08 sans recréation
  ailleurs** (à recréer côté `Dancesoul-therapy` si Cyril le souhaite encore).
- ⚠️ Voir la fiche CSRA : les Routines hebdo « Génération hebdo posts CSRA/coco2 » censées
  livrer les visuels Bloom sur Telegram chat `TELEGRAM_CHAT_PROJECT_COCO` ne sont **pas
  retrouvées** dans la liste réelle des Routines du compte (26/08) — statut non confirmé.
- Prospection (agences, comptes) : voir `Coco_AI_Prospection_RECAP.md` dans le dépôt ;
  avancement réel : `[À COMPLÉTER PAR CYRIL]`.

## Pièges connus

- **Gotcha Tailwind v4** : les utilitaires translate utilisent la propriété CSS `translate`,
  pas `transform` — surcharger avec `translate` (un bug a déjà laissé la bottom sheet mobile
  hors écran en permanence).
- Une seule instance DOM du chat (`site/src/components/ChatPanel.astro`), déplacée par JS
  (rail desktop ≥1280px / bottom sheet mobile). Input chat ≥16px (zoom focus iOS).
