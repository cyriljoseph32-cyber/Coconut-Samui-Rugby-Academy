# CSRA — Coconut Samui Rugby Academy

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-09-12.
> Dépôt : `cyriljoseph32-cyber/Coconut-Samui-Rugby-Academy` (branche par défaut `main`,
> travaux en cours sur `claude/focused-allen-d348n8`).

## ⚡ 12/09 — PR #41 (chantier 2 : coordonnées structurées), non mergée

`api/lead.js` ajoute `contact`/`channel`/`source` à l'événement COCO COMMAND : le rattachement
à la fiche unique ne dépend plus d'un parsing de la chaîne `details`. Une personne qui écrit sur
WhatsApp puis remplit ce formulaire est reconnue comme la même, y compris avec un numéro au
format local d'un côté et international de l'autre. Ces champs ne sont **pas** stockés dans
`command_events`. Côté consommateur : `jamin-depth` PR #21. Build 13 pages, `check-agents` 11/11.

⚠️ Le patch reçu contenait 3 commits dont les 2 premiers étaient **déjà mergés** (PR #40) —
seul le 3ᵉ a été appliqué, pour ne pas rejouer du déjà-fait.

**Contexte corrigé** : l'émetteur CSRA (PR #38) fonctionne réellement en production — les
requêtes SQL du 12/09 montrent 17 événements `venture: RUGBY` émis par `coco-command`. L'audit
supposait à tort que rien ne tournait faute de variables d'environnement.

## ⚡ 12/09 — PR #40 mergée (`fix/domaine-redirection-csra`)

**`coconutsamuirugby.com` n'est enregistré chez aucun registrar** — vérifié disponible à
l'achat le 12/09, alors que le code (`api/lead.js`, `astro.config.mjs`, `src/config/site.ts`,
3 pages `.astro`, `robots.txt`) le déclarait à six endroits comme domaine canonique. Impact
réel : un visiteur soumettant le formulaire d'essai sans JavaScript était redirigé en 303 vers
un domaine qui ne résout pas (le lead était bien enregistré côté serveur, mais la personne
pouvait croire son inscription à 200 THB perdue) ; Google recevait des canoniques/JSON-LD/
sitemap non indexables. Patch reçu de Cyril, appliqué sur une branche fraîche depuis
`origin/main`, corrige les deux : l'origine vient maintenant de `x-forwarded-host` côté API
et de `PUBLIC_SITE_URL` (repli sur l'URL Vercel réelle) côté site — plus de domaine en dur nulle
part, `SITE_DOMAIN`/`PUBLIC_SITE_URL` restent l'échappatoire si un domaine est acheté un jour.
Build 13 pages vert, zéro occurrence résiduelle dans `dist/`, `check-agents.mjs` 11/11.
**Non tranché** : la question de marque (racheter ce domaine ou en choisir un autre) reste
entièrement à Cyril — `brain/academy.md` et le tableau du `CLAUDE.md` racine affichent encore
`https://coconutsamuirugby.com` comme site en ligne, à corriger le jour où la décision est
prise (le site tourne en réalité sur l'URL Vercel `coconut-samui-rugby-academy.vercel.app`).

## ⚡ 12/09 — PR #38 ouverte (`activation/csra-ingestion`), CI verte, non mergée

Suite de l'[audit opérationnel](../../audit-ops/00-synthese.md) : CSRA reçoit son **premier
émetteur programmatique** (`api/_command.js`, `venture: RUGBY`, calqué sur celui de `coco2`)
— jusqu'ici le formulaire et la newsletter ne partaient que vers FormSubmit, une boîte
e-mail, et nulle part ailleurs. `api/lead.js` (nouveau) repointe `contact.astro` et
`Footer.astro` : ingestion COCO COMMAND d'abord, FormSubmit en filet e-mail ; un lead non
enregistré nulle part ressort en 502 + log complet, plus de disparition silencieuse.
« Essai gratuit » corrigé en 200 THB dans les brouillons de la semaine du 07/09. Build 13
pages vert, `check-agents.mjs` 11/11. Variables à poser : `COMMAND_API_URL`,
`COMMAND_INGEST_TOKEN` (même jeton que `jamin-depth` et `coco2`).

## Identité

- La première académie de rugby structurée de Koh Samui — « Grow Strong Together. »
- Fondateur : Cyril. Coaching bilingue FR/EN. Programmes : Kids (4–10) · Teens (11–17) ·
  Adults Touch (18+) · Corporate Team-Building.
- https://coconutsamuirugby.com · Instagram @coconut_samui_rugby ·
  WhatsApp +66 63 375 3316 · coconutrugbyacademy@gmail.com
- Lieux d'entraînement : Koh's 33 Stadium (Lamai). PSG Academy (Chaweng) retiré le 08/08
  (décision de Cyril, partenariat terrain non confirmé — cf. `brain/pipeline.md`).

## Stack & déploiement

- Site Astro + Tailwind, déployé sur Vercel. `npm run dev` / `npm run build`.
- Le dépôt est aussi le **QG du brain agentique** : agents dans `.claude/agents/`
  (assistant-cyril, marketing, secretariat, communication, evenements, webmaster, coach,
  coco-command, memory), skills dans `.claude/skills/`, base de connaissances `brain/`.
  `coco-command` (créé le 18/08/2026) est le chef d'état-major transverse à tous les projets
  de Cyril — cf. `brain/coco-command-playbook.md`.

## Fichiers clés & conventions

- **Source de vérité factuelle** : `src/config/site.ts` (contacts, lieux) et
  `src/data/programs.ts` (programmes, FAQ). `brain/` en est dérivé — si un fait change côté
  `src/`, resynchroniser `brain/` dans le même commit.
- `brain/pipeline.md` — registre vivant des relances/prospects (agent `communication`).
- `brain/marketing-assets/` — générateur de posters 1080×1350 (HTML → Chromium headless) +
  automatisation Postiz (`AUTOMATION.md`, `POSTIZ.md`).
- Règles communes (CLAUDE.md) : validation humaine obligatoire, zéro invention,
  ton « Island Grit », français avec Cyril.

## Cartographie du code (graphify) — 2026-08-31

- **Cartographie de code locale ajoutée** : `graphify-out/` (AST tree-sitter, `--code-only`,
  aucun LLM) généré et **mergé sur `main`** — PR #24 (données) et PR #25 (doc `CLAUDE.md`
  pointant les agents vers `graphify query`/`explain`/`path`/`god-nodes` avant de grepper le
  code brut). À régénérer après un refactor significatif (`graphify extract . --code-only &&
  graphify cluster-only . --no-label`). Fait partie d'une passe transverse sur les 7 dépôts
  (voir `journal.md`).

## État & prochaines étapes (2026-09-06)

- **Post Instagram Touch Rugby publié — mardi 8 septembre 2026** (confirmé par Cyril « c'est
  fait » en session le 06/09) : légende FR/EN + hashtags rédigés par l'agent `marketing`,
  premier post de la série `touch-mardis-2026-08` (calendrier éditorial habituel : poster
  graphique plat) à sortir avec un **vrai visuel photo-réaliste généré via Bloom** (action de
  passe, coucher de soleil, palette Island Grit) — faute des 4 vraies photos Kids/Teens de
  l'académie, toujours bloquées (consentement parental non confirmé, cf. « Actifs récents »
  ci-dessous). Publication faite **manuellement par Cyril**, pas d'automatisation (adaptateur
  Instagram toujours en pause). Aucune URL de post fournie : publication **non vérifiable
  par preuve traçable** (`reference_url` absente), à compléter si besoin. Détail complet :
  `brain/memoire/journal.md` (entrée 2026-09-06).

- **Tarifs Kids/Teens/Adults Touch confirmés** (31/08) : **350 THB la séance, ou 1 200 THB le
  mois**. Ajouté comme detail sur les trois pages programme (`src/data/programs.ts`, source de
  vérité), resynchronisé dans `brain/academy.md`. Corporate Team-Building reste au devis,
  non concerné. PR #28 (`claude/pricing-350-1200`), build vert, **pas encore mergée**.

- **Audit de fiabilité** (23/08) : les 9 agents `.claude/agents/*.md` restructurés selon un
  format standard à 7 sections (identité, périmètre, sources autorisées, processus de
  décision, règles d'exception, ton, format de sortie JSON) ; audit complet dans
  `brain/reliability-audit.md` (score par agent, P0→P3, cas de test). PR #15, **mergée sur
  `main`** (`93ba4d9`, confirmé `git log origin/main`). Cette fiche mémoire était
  désynchronisée depuis le 20/07 (agent `coco-command` absent de la liste) — corrigé dans
  cette même passe, cf. `brain/memoire/journal.md`.

- **Routage boîte academy vers Superhuman Mail** (24/08, commit `8aecb7a` sur
  `claude/focused-allen-d348n8`, **pas encore mergé sur `main`**) : `secretariat.md`,
  `communication.md` et `assistant-cyril.md` basculés sur le connecteur Superhuman Mail
  (`acting_email=coconutrugbyacademy@gmail.com`) pour toute la boîte academy — le connecteur
  Gmail générique du compte pointe sur l'adresse personnelle de Cyril, pas sur l'académie.
  Reprend le contenu de l'ancienne PR #10 (fermée sans merge le 25/08, en conflit avec la
  réécriture 7-sections de l'audit). L'ancienne PR #11 (corrections de dates
  `brain/pipeline.md`) a aussi été fermée le 25/08, sans reprise — jugée trop obsolète
  (3 semaines, fichier trop divergé). **Écart constaté** : une PR #17 supplémentaire
  (« Route secretariat/communication/assistant-cyril to Superhuman for the academy inbox »),
  non mentionnée par Cyril, a aussi été fermée le 25/08 sur ce même sujet — vraisemblablement
  une tentative parallèle sur le même correctif ; à clarifier avec Cyril si besoin.

- ⚠️ **Les 7 labels CSRA du playbook n'existent pas dans la boîte** (constaté 19/09, passage
  `/inbox`) : `list_labels` sur `coconutrugbyacademy@gmail.com` ne renvoie que les labels
  système Superhuman (`[Superhuman]/AI/*`, `.../Is Snoozed`, `.../Muted`, `.../ru`) — aucun
  `CSRA/Inscriptions`, `CSRA/Essais-gratuits`, `CSRA/Corporate`, `CSRA/Sponsors`, `CSRA/Site`,
  `CSRA/Admin` ni `CSRA/Autre` documentés dans `brain/email-playbook.md`. Superhuman Mail ne
  crée pas de nouveau label via l'API (`update_thread`/`create_or_update_draft` ne peuvent
  qu'ajouter un label existant) — le triage automatisé ne peut donc labelliser aucun fil tant
  que Cyril n'a pas créé ces 7 labels côté boîte (interface Superhuman ou Gmail). **Action à
  la main de Cyril**, sinon prochains passages `/inbox` continueront à trier sans étiqueter.

- **Bloom devient l'outil visuel par défaut** (24/08, commit `3e0d542`, sur la même branche
  non mergée) : `.claude/agents/marketing.md` et `brain/marketing-playbook.md` référencent
  désormais le compte trybloom pro comme outil par défaut (workflow `bloom_list_brands` →
  `bloom_onboard_brand` → `bloom_search_user_images` → `bloom_generate_image`), Canva en repli
  seulement.

- ⚠️ **Point de vigilance non résolu — Routines et connecteurs MCP** : les Routines créées ou
  modifiées via l'outil `create_trigger`/`update_trigger` ne peuvent porter aucun connecteur
  MCP dans cette organisation (erreur outil confirmée : « the connectors parameter is not
  available for this organization »). Vérification du 26/08 (`list_triggers`, 42 entrées) :
  aucune Routine nommée « Génération hebdo posts CSRA » ni « Génération hebdo posts coco2 »
  n'existe, et l'identifiant `trig_019yumztFcAWMeL2Bvc6UbZG` cité par Cyril **n'apparaît nulle
  part** dans la liste réelle des Routines de ce compte. **Écart à signaler explicitement à
  Cyril** : soit ces deux Routines n'ont pas été créées/sauvegardées, soit elles ont été
  créées ailleurs (autre compte/organisation) et ne sont pas visibles depuis cet
  environnement — à vérifier avec lui avant de considérer la livraison Bloom→Telegram hebdo
  comme opérationnelle. Les Routines confirmées existantes (Brief CSRA, Command brief
  quotidien, Inbox quotidien, Coach mardi, « coco chief of staff ») portent en revanche bien
  des connexions MCP listées (Superhuman-Mail, Google-Calendar, Vercel, trybloom, etc.), donc
  ce risque ne les concerne pas forcément toutes de la même façon — à re-vérifier au cas par
  cas plutôt que d'en déduire une règle générale.
- **En attente de Cyril** : `TELEGRAM_BOT_TOKEN` + chat_id (RUGBY et COCO) — variables
  d'environnement Claude Code non encore transmises dans cette session (`env` vérifié : vide).

- Site en ligne ; placeholders restants listés dans `brain/academy.md` — tarifs, horaires,
  dates de camps : `[À COMPLÉTER PAR CYRIL]`.
- Brain agentique créé le 18/07 ; vagues 1–3 de prospection commerces/sport-santé, écoles et
  grands partenaires — **Cyril a validé et envoyé l'essentiel des brouillons en attente le
  01/08** (relances Danielle/Olympia, écoles ISS/Greenacre/IFDS/PBISS/Windfield/Oonrak, Rugby
  School Thailand, Six Senses Samui, No Stress, Le Baobab, Koh Fit Thailand, Ultra Bodies Gym,
  Elite Gym, Samui Pro Nutrition, Workshop Sport Design, Star Gym) — détail complet et à jour
  dans `brain/pipeline.md`.
- **Sourcing textile** (kit match/training, lancement 10 joueurs × 4 catégories + 5 staff) :
  dossier fournisseur (one-pager + fiches produit + tableau tailles) préparé le 01/08 ; 4
  brouillons créés (X-Treme Sports Gear, CS Sport Thailand, Fabrion, Thai T-Shirt Factory) —
  **programmés par Cyril pour un envoi lundi 03/08 8h** via la fonction native de Gmail.
- **Samui Fitness Lab** (sponsoring S&C) : email 19/07 → réponse positive 20/07 → reprise de
  contact WhatsApp par Omar (Samui Fitness Lab) le 30/07 → Cyril a répondu le 31/07 pour un RDV
  mardi soir, avant la séance touch rugby (Koh's 33 Stadium 19h). En attente de l'heure.
- **RDV Alan Proudfoot (LIS) eu lieu** (28/08, confirmé directement par Cyril) — ⚠️ écart non
  résolu avec le calage vendredi 28/08 16h du pipeline/calendrier (Cyril indique jeudi 27/08) ;
  compte-rendu (coaching + visite école, suite à donner) `[À COMPLÉTER PAR CYRIL]`. Détail :
  `brain/pipeline.md`.
- Prochaine échéance : confirmation du RDV Samui Fitness Lab (mardi), suivi des premières
  réponses aux emails envoyés le 01/08, et vérification que les 4 envois textile sont bien
  partis lundi 8h.

## Actifs récents

- **4 vraies photos de séances** reçues de Cyril le 08/08/2026 (coach + jeune joueur, échauffement
  plage bear crawl, ados garçons et filles sur le terrain) — `brain/marketing-assets/real-photos/`.
  Premières vraies photos de l'académie (le site n'affichait que des tuiles de marque). **Accord
  parental à confirmer avant toute publication** (site `gallery.astro`, Instagram, Facebook).

## Pièges connus

- Ne jamais inventer tarifs/horaires/dates : pas encore publiés.
- Gmail/Calendar passent par les connecteurs claude.ai de Cyril — vérifier que le bon compte
  (`coconutrugbyacademy@gmail.com`) est connecté avant de gérer la boîte, sinon le dire.
