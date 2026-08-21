# jamin-depth — Jammin's Depths (plongée & récupération sous-marine)

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-08-20.
> Dépôt : `cyriljoseph32-cyber/jamin-depth` (branche par défaut `main`).
> ⚠️ Fiche créée le 18/08/2026 : le dépôt existait sans fiche. Les faits ci-dessous
> proviennent du dépôt (`README.md`, `docs/agents/`, `git log`) — aucun n'est déduit.

## Identité

- **Jammin's Depths** — récupération sous-marine et plongée à Koh Samui.
  Baseline : « You drop it. We dive for it. » Site marketing bilingue FR/EN, sombre,
  cinématographique, mobile-first.
- Positionnement du site : la plongée en produit phare, la récupération en second
  (repositionnement acté par le commit `7d212dc`).
- **Pas une école PADI** : les formations sont assurées avec un centre partenaire, et le
  garde-fou `guard:padi-school-claim` empêche tout message de le prétendre.
- Les disponibilités sont détenues par le centre partenaire : aucun système ne peut
  confirmer une place (`AVAILABILITY.canSystemHold: false`).

## Stack & déploiement

- Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v4 (tokens CSS).
- Vitest (unitaire) + Playwright (smoke + visuel). `npm run typecheck | lint | test | build`.
- Vercel. Formulaires publics 100 % côté client (deep link `wa.me` + repli `mailto:`) :
  le site lui-même ne stocke rien et n'a aucun secret.

## Le système d'agents (`src/agents/`)

Livré par la PR #4, mis en service par la PR #5. Il traite ce qui suit le clic : qualifier
une demande WhatsApp/Instagram/Facebook, préparer le récapitulatif de réservation et la
demande de disponibilité au partenaire, relancer, rappeler les documents, rendre compte.

- **Rôles** : `reception`, `booking`, `safety`, `content`, `reputation`, `ops`, orchestrés
  par `orchestrator.ts`.
- **Deux garde-fous indépendants**, et une action ne passe que si les deux acceptent :
  `requiresHumanApproval()` (type d'action) et `auditDraft()` (mots du message : météo,
  faune, place confirmée, avis médical, tarif hors catalogue, langues de l'équipe…).
- **File de validation humaine** (`queue.ts`) : pas de délai qui auto-approuve, pas de
  drapeau « urgent » qui contourne — l'urgence change l'ordre, jamais l'exigence.
- **Telegram** = l'écran de validation (carte + boutons ✅/✖️). **Supabase** = la
  persistance. **Crons Vercel** = relances, brief de la veille, rapport hebdo.
- Tout se dégrade séparément : sans credentials, le système tourne en mémoire et le dit.
- Docs : `docs/agents/README.md`, `DEPLOY.md`, `RUNBOOK.md`, `CONNECTORS.md`, `AUDIT.md`.

## COCO COMMAND (`src/command/`) — depuis le 2026-08-18

Le dépôt héberge désormais **le moteur du chef d'état-major transverse de Cyril** : journal
opérationnel commun à toutes les activités (DIVING, COCO, RUGBY, GLOBAL), niveaux d'action
A0→A4, commandes Telegram (`/today`, `/tasks`, `/approve <event_id>`, `/status`, `/audit`…),
brief 08 h et bilan 19 h (Asia/Bangkok), récapitulatif groupé des P2/P3 toutes les 30 min,
et une API d'ingestion `POST /api/command/events` pour que les autres dépôts y déposent
leurs événements.

- Sens des dépendances : `command` importe `agents`, jamais l'inverse — le système plongée
  continue de tourner si cette couche est éteinte.
- Le niveau ne remplace pas les garde-fous existants : il ne peut que les durcir
  (validation exigée dès le niveau 3, quelle que soit la configuration des canaux).
- Doc : `docs/agents/COCO-COMMAND.md` · mise en service : `docs/agents/DEPLOY.md` §5.
- Doctrine et formats côté agents : `brain/coco-command-playbook.md` (dépôt CSRA).
- **État v1** : PR #6 **mergée** le 18/08/2026 (`56b38ca`), déployée en production.

### v2 — les tâches, les chiffres, l'hebdo (2026-08-20)

Le trou de la v1 : le journal disait ce qui s'était passé, rien ne suivait ce qui devait
arriver. Un `/delegate` créait un événement `PLANNED` sans objectif mesurable, sans condition
de réussite, sans échéance — donc personne ne pouvait constater qu'il avait été oublié.

- **`tasks.ts`** — contrat de tâche (objectif, `definition_of_done`, échéance, plan B).
  Une tâche vague est **refusée** à la création : objectif de moins de 15 caractères,
  condition de fin vide, ou niveau A3 se dispensant de validation.
  Tâche et événement naissent ensemble (`task_id` ↔ `event_id`).
- **Preuve d'exécution** — un `DONE` de type `ACTION`/`RESULT` sans `reference_url` ni
  `reference_id` ressort marqué « non vérifié ». Remplir soi-même `impact` n'y change rien :
  la mention se surajoute. La contrainte vit dans `buildEvent`, pas dans un prompt.
- **`routing.ts`** — routage `(activité, catégorie)` → agent réellement existant. Les 16 rôles
  du mandat (`growth_director`, `diving_sales_agent`…) sont des **alias**, pas des fichiers.
  `finance` n'a de titulaire nulle part : aucun agent ne touche à l'argent.
- **`kpi.ts` + `/kpi`** — CA, réservations et inscriptions ne transitent par aucun outil :
  Cyril les saisit. Toute métrique non saisie sort `[À COMPLÉTER PAR CYRIL]`, **jamais zéro**.
- **Bilan hebdomadaire** (`/week`, cron dimanche 18 h Bangkok). « Ce qui a généré le plus de
  valeur » ne retient que ce qui a laissé une preuve ; les gestes répétés ≥ 3× dans la semaine
  ressortent comme candidats à l'automatisation.
- **Veille des échéances** — une échéance à moins de 72 h sans suite écrite remonte seule,
  y compris un jour sans le moindre événement.
- Formats Telegram ajoutés : `[✅ TERMINÉ]` et l'arbitrage Option A / Option B / recommandation.
- Vocabulaire aligné sur le mandat : les niveaux s'affichent `A0`…`A4` (le type reste 0–4).
- **Décidé avec Cyril** : Helmetik retiré (copié d'une autre version de la spec) ; le schéma
  d'événement n'est **pas** renommé (`venture`, `needs_owner` conservés), seuls des champs
  facultatifs sont ajoutés.
- **Non construit, volontairement** : les tables `leads`, `partners`, `content_items`,
  `playbooks`, `incidents`, `approvals`… du mandat. Ces données vivent déjà ailleurs ou
  n'existent pas ; dix tables vides donneraient l'illusion d'un suivi que rien n'alimente.
- 367 tests (26 fichiers → 29), typecheck, lint et build verts.

## Variables d'environnement

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`,
`WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`,
`TELEGRAM_ALLOWED_CHAT_IDS`, `TELEGRAM_WEBHOOK_SECRET`, `CRON_SECRET`, `ANTHROPIC_API_KEY`,
`NEXT_PUBLIC_SITE_URL` — plus, pour COCO COMMAND : `COMMAND_INGEST_TOKEN`,
`TELEGRAM_CHAT_COMMAND | _ALERTS | _DAILY | _PROJECT_COCO | _PROJECT_DIVING | _PROJECT_RUGBY`.
Toutes optionnelles : un déploiement ne casse jamais parce qu'une clé manque.

## Pièges connus

- ⚠️ `vercel.json` déclare **7 tâches cron** dont une toutes les 30 minutes : vérifier le
  quota de l'offre Vercel. Si elle ne l'autorise pas, retirer `command-digest` — mais c'est
  aussi la veille des échéances qui disparaît, pas seulement le regroupement des P2/P3.
- ⚠️ Les tables Supabase doivent exister **avant** le premier cron : leur absence a produit
  des `500` toutes les 30 minutes le 20/08/2026 (`PGRST205`), corrigés en exécutant
  `supabase/schema.sql`. Le fichier est idempotent et additif : il se rejoue sans risque.
- Le `setWebhook` Telegram doit désormais inclure `"message"` dans `allowed_updates`, sinon
  les commandes texte n'arrivent jamais.
- Hors de la fenêtre de 24 h WhatsApp, Meta refuse toute réponse libre : le système le
  signale (`outside-24h-window`) au lieu de faire croire à un envoi.
- Sans Supabase, le journal et la file vivent en mémoire du processus : ils disparaissent au
  redéploiement.

## À compléter par Cyril

- Contacts, tarifs et horaires du centre partenaire (`POLICIES` largement en `TODO`).
- Politique d'annulation, acompte, moyens de paiement, point de rendez-vous, assurance,
  âge minimum : non confirmés à ce jour.
- Mise en service de COCO COMMAND : création des 4 chats Telegram, jeton d'ingestion,
  variables Vercel. Le SQL de la v1 a été exécuté le 20/08/2026 ; **la partie v2
  (`command_tasks`, `command_kpis`, colonnes ajoutées) reste à exécuter**.
- Régénérer `CRON_SECRET` : la valeur a circulé en clair dans une conversation le 20/08/2026.
- Agent contenu/marketing de la plongée : `content` assure le routage, à confirmer.
