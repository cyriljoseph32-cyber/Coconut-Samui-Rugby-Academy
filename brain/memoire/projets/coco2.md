# coco2 — Coco Samui Concierge

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-09-20.
> Dépôt : `cyriljoseph32-cyber/coco2` (branche par défaut `main`).
> ⚠️ À ne pas confondre avec `assistant-ai` (Coco front desk, le produit pour commerces).

## 🔴 05/10 — Accélération décidée par Cyril : posts coco2 2×/semaine, Bloom rechargé

Cyril a mis la CSRA en pause (plusieurs semaines) et demande en contrepartie une accélération
des posts coco2. Routine `Génération hebdo posts coco2 (Instagram)` (`trig_01JruZ3NswBt3HeNDBX8M5WF`)
passée de 1×/semaine (dimanche) à **2×/semaine (lundi + jeudi, 01h20 UTC)**. Bloom a des
crédits top-up disponibles (`bloom_check_credits` : 50 crédits, workspace "Cyril's Team") —
mais l'abonnement est en pause (paiement échoué, `subscription_paused: true`), ce qui a
bloqué une génération test côté CSRA le même jour (`PAYMENT_REQUIRED`) malgré le solde de
crédits affiché ; à vérifier sur le prochain post coco2 si Bloom répond une fois la routine
relancée — sinon fallback HTML/Chromium déjà utilisé plusieurs fois cette session.

## ⚡ 20/09 — Post "vraie cuisine locale" publié — vérifié, premier post sous les nouvelles règles

**Post Instagram publié et vérifié** : https://www.instagram.com/p/DdfluruMSIa/ — légende
FR/EN pilier "Real Samui / hidden gems", photo réelle envoyée par Cyril (poisson grillé,
curry maison, riz, petite gargote de bord de route). Premier post appliquant la règle du
20/09 (§ ci-dessous) : accroche qui se comprend sans "voir plus", lien explicite avec le
produit ("ce que Coco te trouve"), CTA vers le site. **PR #25 mergée sur `main`** le 20/09
(`a8f8639`) — la règle et le registre partenaires sont donc en production dans le dépôt,
pas seulement proposés.

**Partenaires ajoutés au pipeline sur cette base** : `Coco_Partenariats_Pipeline.md` mis à
jour avec **MrSamui.com** et **Samui & Koh** (conciergeries locales déjà orientées
recommandations, `samui_contacts_complets.md`) comme premières cibles liées à ce thème —
statut toujours "pas contacté", aucune approche envoyée à ce jour.

## ⚡ 20/09 — Objectif fixé par Cyril : 15 resorts partenaires signés avant le 15/12/2026

Nouvelle règle permanente ajoutée à `growth-concierge` (chaque post : CTA trafic vers
coco-samui-ai.com, alternance posts "awareness"/"publicitaire direct-response",
mécaniques d'engagement Meta, suggestion de 1-3 partenaires locaux pertinents par post —
tiré uniquement de `samui_contacts_complets.md`, jamais inventé). Nouveau registre
`Coco_Partenariats_Pipeline.md` (racine du dépôt), seedé avec l'ordre d'approche déjà
défini dans les kits existants — **aucun hôtel contacté ni signé au 20/09**. Objectif
porté par `partenariats-concierge`, avec un rappel explicite dans les deux fichiers agent :
ni la portée d'un post sur l'algorithme Meta, ni la signature d'un partenaire ne peuvent
être garanties par un agent — ce sont des résultats commerciaux que Cyril doit conclure
lui-même. **PR #25 mergée sur `main`** (`a8f8639`, 20/09).


## ⚡ 17/09 — Resynchronisation : `main` a beaucoup avancé depuis le 13/09, non journalisé

Vérification `git log origin/main` : **quatre commits mergés sur `main` que cette fiche ne
mentionnait pas**, tous datés du 13/09 (avant même la dernière mise à jour de cette fiche, qui
s'était arrêtée à la description en cours du travail plutôt qu'à son résultat vérifié) :
- **PR #20 (`e583b70`, 12/09 13h18)** — décrite ci-dessous comme « en attente de merge » : en
  réalité **mergée**.
- **PR #21 (`6827076`, 12/09 13h18) — nouvelle, jamais journalisée** : « Chantier 4.8 :
  supprimer les résidus racine sans usage » — nettoyage, pas de changement fonctionnel.
- **PR #22 (`74e55bc`, 13/09 09h27)** — décrite ci-dessous : confirmée mergée.
- **PR #23 (`f66032a`, 13/09 09h30)** — la section suivante la décrivait comme « draft
  ouverte » : elle est **mergée depuis le 13/09**, cf. section 13/09 ci-dessous (déjà notée
  mergée, mais le titre de section n'avait pas été corrigé). Aucun commit supplémentaire sur
  `main` depuis le 13/09 à ce jour (17/09).

## ⚡ 20/09 — Routine hebdo posts Instagram, semaine 21/09 : PR #24 draft ouverte

`growth-concierge` a généré 4 captions bilingues EN/FR (Ask Coco transfert aéroport, Real
Samui marché de nuit, Practical tips soleil/chaleur, Hôtels B2B moins de questions
répétitives à la réception) selon `COCO_Plan_Reseaux_Sociaux.md` +
`Plan_Campagne_Samui_AI_Concierge_4semaines.md`, angles inédits vs. les semaines du 31/08,
07/09 et 14/09.

**Bloom — 2ᵉ semaine consécutive à crédit épuisé** : `bloom_check_credits` (workspace
"Cyril's Team") renvoie `balance: 0` avant toute tentative de génération — pas de retry
lancé (inutile sur un crédit à zéro, contrairement au cas `INSUFFICIENT_CREDITS` en cours de
génération du 14/09). Les 4 posts sont livrés en caption seule avec un brief de génération
par angle, prêts dès la recharge (https://www.trybloom.ai/pricing).

**Blocage Telegram inchangé, 4ᵉ semaine consécutive** : `TELEGRAM_BOT_TOKEN`/
`TELEGRAM_CHAT_PROJECT_COCO` toujours non définis dans la session → contenu déposé dans
`content/marketing-drafts/semaine-2026-09-21.md`, **PR #24 draft ouverte** sur
`claude/eager-ride-tunxd2`, non mergée à ce stade. Événement COCO COMMAND
`evt_20260920_0823_7cdb40f6` (`WAITING_APPROVAL`, niveau 3). Cyril notifié en push sur les
deux blocages récurrents (Bloom + Telegram) à lever pour retrouver une livraison hebdo
entièrement automatisée.

## ⚡ 18/09 — Posts Instagram semaine du 07/09 : confirmés publiés par Cyril

L'événement `evt_20260906_0825_469cfa16` (`WAITING_APPROVAL` depuis le 06/09, portant sur les
4 brouillons Instagram de la semaine du 07/09, déposés via la PR #19 mergée le 10/09 — un
dépôt de brouillon, pas une publication) est clos : **Cyril confirme oralement le 18/09 que
ces posts ont depuis été publiés**. Aucune `reference_url` fournie — clôture déclarative,
non vérifiée par une preuve traçable au sens strict de la doctrine COCO COMMAND (à compléter
si une preuve devient utile). Statut par post à corriger en conséquence si Cyril précise
lesquels des 4 (Ask Coco/ferry, Real Samui/jungle, practical tips/météo, hôtels B2B) sont
concernés — `[À COMPLÉTER PAR CYRIL]` pour le détail par post et les URLs. ⚠️ La ligne
`command_events` reste affichée `WAITING_APPROVAL` en base (écriture directe refusée par le
classifieur de permissions de la session) — à clore via `/approve evt_20260906_0825_469cfa16`
côté Telegram si on veut que le statut en base reflète la décision.

## ⚡ 17/09 — Resynchronisation : `main` a beaucoup avancé depuis le 13/09, non journalisé

Vérification `git log origin/main` : **quatre commits mergés sur `main` que cette fiche ne
mentionnait pas**, tous datés du 13/09 (avant même la dernière mise à jour de cette fiche, qui
s'était arrêtée à la description en cours du travail plutôt qu'à son résultat vérifié) :
- **PR #20 (`e583b70`, 12/09 13h18)** — décrite ci-dessous comme « en attente de merge » : en
  réalité **mergée**.
- **PR #21 (`6827076`, 12/09 13h18) — nouvelle, jamais journalisée** : « Chantier 4.8 :
  supprimer les résidus racine sans usage » — nettoyage, pas de changement fonctionnel.
- **PR #22 (`74e55bc`, 13/09 09h27)** — décrite ci-dessous : confirmée mergée.
- **PR #23 (`f66032a`, 13/09 09h30)** — mergée depuis le 13/09, cf. section ci-dessous.
  Aucun commit supplémentaire sur `main` depuis le 13/09 jusqu'au 17/09.

## ⚡ 13/09 — Routine hebdo posts Instagram, semaine 14/09 : PR #23 mergée

`growth-concierge` a généré 4 captions bilingues EN/FR (Ask Coco itinéraire complet, Real
Samui viewpoint lever du jour, Practical tips sécurité scooter, Hôtels B2B QR code en
chambre) selon `COCO_Plan_Reseaux_Sociaux.md` + `Plan_Campagne_Samui_AI_Concierge_4semaines.md`,
angles différents des semaines du 31/08 et du 07/09 pour ne pas répéter. 3/4 visuels Bloom
générés (brand "Coco", `ready`) ; le 4e (hôtels) a échoué en `INSUFFICIENT_CREDITS` —
crédits workspace Bloom épuisés en cours de génération, pas un problème de contenu, pas de
retry possible sans recharge (https://www.trybloom.ai/pricing). Post 4 livré en caption
seule.

**Blocage Telegram inchangé** : `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_PROJECT_COCO` toujours
non définis dans la session → contenu déposé dans
`content/marketing-drafts/semaine-2026-09-14.md` — **PR #23 mergée le 13/09** sur demande de
Cyril. ⚠️ Le merge dépose les brouillons dans le dépôt, **il ne vaut pas validation du
contenu** : les 4 légendes et les 3 visuels restent à valider avant toute publication, et le
4ᵉ visuel reste à générer après recharge des crédits Bloom.

**Précision sur le blocage Telegram** : `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_PROJECT_COCO` sont
absents **de l'environnement des sessions Claude Code**, pas de la production — les requêtes
SQL du 12/09 montrent que Telegram fonctionne en prod (104 événements sur 104 notifiés depuis
le 20/08). Ce sont deux configurations distinctes ; seule celle des sessions manque.

Événement COCO COMMAND loggé (`COMMAND_API_URL`/`COMMAND_INGEST_TOKEN` définis cette
session) : `evt_20260913_0823_79399c37`, `WAITING_APPROVAL`, niveau 3.

## ⚡ 12/09 — PR #22 mergée (chantier 2 : coordonnées structurées)

`api/lead.js` ajoute `contact`/`channel`/`source` à l'événement COCO COMMAND. Les coordonnées
voyageaient déjà dans `details` et restent relues par le filet côté `jamin-depth`, mais faire
dépendre l'identité d'une personne d'un parsing de chaîne n'est pas un chemin sur lequel
construire. Ces champs ne sont **pas** stockés dans `command_events`. Build 19 pages.
Côté consommateur : `jamin-depth` PR #21 (`src/command/people.ts`).

**Contexte corrigé** : l'ingestion fonctionne réellement — les requêtes SQL du 12/09 montrent
4 événements `venture: COCO` émis par `growth-concierge`. Mais `leads` est à **0** : les
événements arrivaient sans jamais créer de fiche personne, ce que corrige la PR #21.

## ⚡ 12/09 — PR #20 mergée (`activation/coco2-leads-et-donnees`)

Suite de l'[audit opérationnel](../../audit-ops/00-synthese.md), fuites n°2 et n°5 corrigées
dans le code (en attente de merge) : `api/lead.js` appelle désormais **toujours** l'ingestion
COCO COMMAND (le KV redevient un simple cache pour le dashboard hôtel — un lead ne dépend
plus de sa configuration) ; `api/_directory.js` (nouveau) indexe les **201 fiches** de
`data/concierge-db` au démarrage à froid et les injecte dans le prompt du chat selon la
question posée, sans appel réseau ni latence ajoutée — table d'alias FR/EN vérifiée
(scooter, plongée, restaurant, dentiste). Build 19 pages vert. Variables encore à poser :
`COMMAND_API_URL`, `COMMAND_INGEST_TOKEN`.

**18 brouillons Gmail de prospection corrigés** (lien traceur retiré, langues corrigées —
« Russian » était erroné, remplacé par « Thai »). Deux décisions encore ouvertes : supprimer
15 doublons exacts ? Basculer le numéro WhatsApp de la signature (`+33…` → `+66 63 375
3316`) ?

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

## Cartographie du code (graphify) — 2026-08-31

- **Cartographie de code locale ajoutée** : `graphify-out/` (AST tree-sitter, `--code-only`,
  aucun LLM) généré et **mergé sur `main`** — PR #16 (données) et PR #17 (doc `CLAUDE.md`
  pointant les agents vers `graphify query`/`explain`/`path`/`god-nodes` avant de grepper le
  code brut). Fait partie d'une passe transverse sur les 7 dépôts (voir `journal.md`).

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
- **Mise à jour 30/08** : le garde-fou chat.js + connecteurs + Bloom par défaut cités
  ci-dessus **sont désormais mergés sur `main`** (`e5390cd`, PR #13) — l'écart du 26/08 est
  résolu, voir `journal.md`.
- **Routine hebdo posts Instagram (30/08)** : `growth-concierge` a généré 4 brouillons
  (captions + visuels Bloom, brand "Coco" déjà onboardée sur trybloom) selon
  `COCO_Plan_Reseaux_Sociaux.md` + `Plan_Campagne_Samui_AI_Concierge_4semaines.md`.
  **Confirme l'écart du 26/08** : `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_PROJECT_COCO`
  toujours absents de la session → contenu déposé dans
  `content/marketing-drafts/semaine-2026-08-31.md`, à la place de la livraison Telegram
  automatique.

### Statut réel des posts Instagram — resynchronisé le 2026-09-06

- **Écart corrigé** : la fiche indiquait « PR #15 draft, non mergée » (30/08) — vérification
  `git log origin/main` du dépôt `coco2` : **PR #15 a bien été mergée** (`625de53`, 31/08),
  suivie de **PR #16/#17** (cartographie graphify, cf. section dédiée) puis **PR #18 « Script
  Postiz prêt à lancer — semaine du 31/08 »** (`165c7dd`, 02/09) qui ajoute
  `content/marketing-drafts/postiz-semaine-2026-08-31.sh` : un script **à lancer par Cyril
  lui-même** (clé API Postiz personnelle requise, `growth-concierge` ne l'exécute jamais) qui
  crée les 4 posts **en brouillon** dans Postiz (`postiz posts:create -t draft`) — ce n'est pas
  une publication automatique.
- **Statut réel par post** (table « Récap livraison » de `content/marketing-drafts/semaine-2026-08-31.md`
  sur `main`) :
  - Post 1 — « Ask Coco » (lundi 31/08) : **✅ Publié**, confirmé par Cyril, publication
    manuelle (commit `4865012`, « publié manuellement (pas via l'agent, conforme à la règle
    growth-concierge de ne jamais publier lui-même) »).
  - Post 2 — « Hidden gems » (mercredi 02/09) : **Brouillon — à valider**, aucune trace de
    publication dans le dépôt.
  - Post 3 — « Practical tips » (vendredi 04/09) : **Brouillon — à valider**, idem.
  - Post 4 — « Hôtels B2B » (dimanche 06/09) : **Brouillon — à valider**, idem.
- **Nouvelle salve de brouillons — semaine du 07/09** (générée le 06/09,
  `content/marketing-drafts/semaine-2026-09-07.md`, 4 captions + visuels Bloom : Ask
  Coco/ferry, Real Samui/jungle, practical tips/météo, hôtels B2B/6 langues) : décrite ici
  comme « non mergée » — **mergée sur `main` le 10/09** (`12755ff`, commit direct, hors PR).
  Reste **non validée par Cyril** (le merge dépose les brouillons dans le dépôt, il ne vaut
  pas validation du contenu — même règle que la PR #23 de la semaine 14/09, cf. section
  17/09 en tête de fiche). Même blocage Telegram que les semaines précédentes.
- `TELEGRAM_BOT_TOKEN`/`TELEGRAM_CHAT_PROJECT_COCO` (ou `TELEGRAM_CHAT_ID`) : toujours
  `[À COMPLÉTER PAR CYRIL]` — livraison Telegram automatique toujours non fonctionnelle. À
  trancher avec Cyril : renseigner ces variables côté Routine, ou abandonner la cible
  Telegram et rester sur brouillon fichier + validation manuelle (workflow actuellement en
  place de facto).

### Post supplémentaire hors calendrier — 09/09/2026

- Photo de cascade en forêt envoyée directement par Cyril (pas issue d'une génération Bloom du
  calendrier hebdo) — légende pilier "Hidden gems" rédigée en session, publiée le 09/09. Nom du
  lieu non précisé par Cyril, resté générique dans la légende (`[À COMPLÉTER PAR CYRIL]` si
  besoin de le nommer pour un futur post). **Vérifié** — preuve traçable fournie par Cyril :
  https://www.instagram.com/p/DdDPbiTz_uy/ . Ne pas confondre avec le Post 2 "Hidden gems"
  (02/09) du calendrier hebdo ci-dessus, toujours en brouillon.

### Post supplémentaire hors calendrier — 11/09/2026

- Photo scooter/route côtière envoyée directement par Cyril — légende EN/FR pilier
  découverte/road trip rédigée en session, publiée le 11/09. **Vérifié** — preuve traçable
  fournie par Cyril : https://www.instagram.com/p/DdIW3yNMQJC/ . La version "plus développée"
  proposée ensuite a été explicitement abandonnée par Cyril ; c'est la légende courte initiale
  qui a été publiée.

## Pièges connus

- **Gotcha Tailwind v4** : les utilitaires translate utilisent la propriété CSS `translate`,
  pas `transform` — surcharger avec `translate` (un bug a déjà laissé la bottom sheet mobile
  hors écran en permanence).
- Une seule instance DOM du chat (`site/src/components/ChatPanel.astro`), déplacée par JS
  (rail desktop ≥1280px / bottom sheet mobile). Input chat ≥16px (zoom focus iOS).
