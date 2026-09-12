# Plan 90 jours

> Chaque chantier a un **critère de fin vérifiable**. Tant qu'il n'est pas atteint, on ne passe
> pas au suivant. C'est la règle du contrat de tâche déjà en vigueur dans COCO COMMAND : une
> tâche sans condition de fin est refusée.
>
> Colonne « Qui » : **C** = Cyril seul (identifiants, décisions) · **A** = agent/session Claude.

---

## 🔴 Chantier 0 — Activation · Semaine 1

**Rien d'autre ne compte tant que ce n'est pas fait.** Aucune ligne de code : ce sont des comptes
et des variables. C'est le chantier qui transforme 85 % de code mort en système vivant.

> **Mise à jour 12/09** — l'outillage du chantier 0 est livré : `jamin-depth` PR #20
> (`scripts/activate.mjs`, `npm run activate check|chats|webhook|ping|all`). Il ne crée aucun
> compte — il vérifie et branche. **Correction de l'audit** : il n'existe pas de « SQL v2 »
> séparé (ligne 0.7 ci-dessous, obsolète) — `supabase/schema.sql` contient déjà `command_tasks`
> et `command_kpis`, un seul fichier à exécuter une fois. Rien de ce chantier n'est encore
> *exécuté* : il attend les comptes que seul Cyril peut créer (BotFather, Supabase).

| # | Action | Qui | Détail |
|---|---|---|---|
| 0.1 | Créer le bot Telegram | **C** | Via `@BotFather` → récupérer `TELEGRAM_BOT_TOKEN` |
| 0.2 | Créer les 6 chats | **C** | `COMMAND` · `ALERTS` · `DAILY` · `PROJECT_COCO` · `PROJECT_DIVING` · `PROJECT_RUGBY` — puis `npm run activate chats` relève les id |
| 0.3 | Renseigner les variables Telegram | **C** | `TELEGRAM_CHAT_*`, `TELEGRAM_ALLOWED_CHAT_IDS` (**toi seul**), `TELEGRAM_WEBHOOK_SECRET` |
| 0.4 | **Régénérer `CRON_SECRET`** | **C** | ⚠️ L'ancienne valeur a été exposée en clair le 20/08 — à traiter comme compromise |
| 0.5 | Créer le projet Supabase | **C** | Offre gratuite |
| 0.6 | Exécuter `supabase/schema.sql` | **C** | Un seul fichier — contient déjà `command_tasks` et `command_kpis` |
| ~~0.7~~ | ~~Exécuter le SQL v2~~ | — | **Obsolète (12/09)** : n'existe pas séparément, voir 0.6 |
| 0.8 | Renseigner `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | **C** | Sur `jamin-depth` |
| 0.9 | Générer `COMMAND_INGEST_TOKEN` | **C** | À poser sur **les trois** projets Vercel (`jamin-depth`, `coco2`, CSRA) |
| 0.10 | Vérifier le quota de crons Vercel | **C** | 8 déclarés dont un `*/30`. Si insuffisant : supprimer `command-digest` |
| 0.11 | Relier le webhook Telegram | **A/C** | Outillé : `npm run activate webhook` (refuse si une variable manque) |

**✅ Critère de fin** : `npm run activate all` envoie le message de test dans `DAILY` et un brief
arrive le lendemain à 08 h. Si le brief n'arrive pas, le chantier 0 n'est pas terminé.

---

## 🟠 Chantier 1 — Colmater les fuites · Semaines 1–2

En parallèle du chantier 0. Ce sont des pertes sèches qui courent aujourd'hui.

| # | Action | Qui | Statut (12/09) | Détail |
|---|---|---|---|---|
| 1.1 | **Couper les séquences Superhuman** | **C** | ⬜ à faire | Prioritaire. Risque réputationnel actif. Aucun accès Superhuman côté agent |
| 1.2 | Purger les 12 brouillons doublons obsolètes | **A** | ⬜ à faire | Identifiés dans `pipeline.md` — distinct des 15 doublons Gmail de 1.4bis |
| 1.3 | **Trancher les 16 messages en attente** | **C** | ⬜ à faire | Un par un : envoyer / réécrire / archiver |
| ~~1.4~~ | ~~Corriger le lien `project-xm4pf`~~ | — | ✅ **faux positif, corrigé quand même** | Le lien redirige (302) — n'était pas mort. **18 brouillons corrigés** (traceur retiré, langues corrigées EN/FR/DE/**SV/TH**/ZH). Voir R7 du registre des risques |
| ~~1.4bis~~ | ~~Supprimer les 15 doublons Gmail~~ | — | ✅ **clos sans action (12/09)** | Cyril a approuvé la suppression ; vérification dans Gmail montre que la boîte ne contient que 18 brouillons — aucun doublon à supprimer. Voir R7bis |
| ~~1.4ter~~ | ~~Basculer le numéro WhatsApp FR → TH~~ | — | ✅ **clos sans action (12/09)** | Cyril a approuvé la bascule ; les 18 brouillons portent déjà `+66 63 375 3316`. Voir R7ter |
| 1.5 | **Trancher les 9 `TODO` de `config.ts`** | **C** | ⬜ à faire | `paymentMethods` · `deposit` · `cancellation` · `meetingPoint` · `boatSchedule` · `pickupIncluded` · `insurance` · `minorMinimumAge` · `partnerResponseHours` + les 3 `APPROVERS` |
| 1.6 | **Unifier les tarifs plongée** | **C** | ⬜ à faire | OW 17 900 (`catalog.ts`) vs 16 728 (`coco2/api/chat.js`). Choisir, propager |
| 1.7 | Corriger « essai gratuit » → 200 THB | **A** | ✅ **fait** | `brain/marketing-drafts/semaine-2026-09-07.md` — CSRA PR #38, en attente de merge |
| 1.8 | Activer FormSubmit (CSRA) ou le remplacer | **C/A** | ✅ **remplacé** | `api/lead.js` (CSRA PR #38) : ingestion d'abord, FormSubmit en filet e-mail |
| 1.9 | Vérifier le store KV de `coco2` | **C** | ✅ **contourné par le code** | coco2 PR #20 : l'ingestion est désormais toujours appelée, le KV n'est plus qu'un cache — un lead ne dépend plus de sa configuration |
| 1.10 | Renseigner `VIATOR_AFFILIATE_PID` | **C** | ⬜ à faire | Vide = **0 THB de revenu d'affiliation** |

**✅ Critère de fin** : zéro message en attente depuis plus de 7 jours dans `pipeline.md` ; un
lead de test soumis sur chacun des 3 sites ressort dans Supabase.
**Reste bloquant pour la clôture du chantier** : 1.1, 1.3, 1.4bis, 1.4ter, 1.5, 1.6, 1.10 —
tous nécessitent une décision ou une action de Cyril, aucun n'est du code.

---

## 🟡 Chantier 2 — Unifier la base de leads · Semaines 3–5

> **Mise à jour 12/09** — en avance sur le calendrier (prévu semaines 3–5, livré en PR dès la
> semaine 1). Les trois PR dépendent toutes du chantier 0 : sans Supabase ni
> `COMMAND_INGEST_TOKEN` posés, l'ingestion se dégrade en silence (comportement voulu — un
> formulaire ne doit jamais planter parce qu'une variable manque) et le lead retombe en
> `console.error`, récupérable à la main mais pas encore automatique.

| # | Action | Qui | Statut (12/09) |
|---|---|---|---|
| 2.1 | `coco2/api/lead.js` pousse vers l'ingestion au lieu de KV | **A** | ✅ PR coco2 #20, non mergée |
| 2.2 | Écrire l'émetteur d'événements CSRA (~50 lignes, calqué sur `_command.js`) | **A** | ✅ PR CSRA #38, non mergée |
| 2.3 | Brancher le formulaire CSRA et la newsletter sur l'ingestion | **A** | ✅ PR CSRA #38, non mergée |
| 2.4 | Importer les registres `pipeline.md` + `sponsor-prospects.md` dans `leads` | **A** | ⚠️ **outillé, pas exécuté** — `jamin-depth` PR #20, `npm run import:leads` : 170 contacts extraits en essai à blanc, rien poussé (`--push` requiert le chantier 0) |
| ~~2.5~~ | ~~Importer les 62 prospects scorés~~ | — | fusionné dans 2.4 : le même script lit aussi `sponsor-prospects.md` |
| 2.6 | Vérifier la fusion d'identités (même personne, 2 canaux) | **A** | ⬜ à faire — nécessite un import réel (`--push`) pour être testable |
| 2.7 | `pipeline.md` devient une **vue générée**, plus un registre tenu à la main | **A** | ⬜ à faire, après 2.6 |

**✅ Critère de fin** : une personne qui écrit sur WhatsApp puis remplit un formulaire apparaît
comme **une seule fiche**. `/status rugby` renvoie le vrai nombre de leads.

---

## 🟢 Chantier 3 — Allumer les boucles B · Semaines 4–8

**Une boucle par semaine, jamais deux.** Une boucle qui part de travers doit être identifiable du
premier coup.

| Sem. | Boucle | Critère de fin |
|---|---|---|
| 4 | **B1 — Réponse à un lead entrant** | 10 leads traités, 0 promesse non tenable dans les brouillons |
| 5 | **B2 — Relances de cadence** | Les échéances J+3/J+7 et J+7/J+21 tombent seules. **0 relance après un refus** |
| 6 | **B4 — Contenu quotidien** | Un brouillon + visuel t'attend chaque matin. Publication validée via Postiz |
| 7 | **B6 — Demande d'avis** | Branché sur Google Business Profile. Premier avis obtenu |
| 8 | **B5 — Approches partenaires** | Plafond 3/jour respecté, cibles > 70/100 envoyées une par une |

**✅ Critère de fin global** : tu valides depuis Telegram, tu n'écris plus de premier jet.

---

## 🔵 Chantier 4 — Autonomie et mesure · Semaines 9–12

> **Mise à jour 12/09** — 4.1 et 4.2 livrés très en avance (prévus semaines 9-12, en PR dès
> la semaine 1), l'un et l'autre déjà vérifiés en local plutôt que juste écrits.

| # | Action | Qui | Statut (12/09) |
|---|---|---|---|
| 4.1 | **CI sur `jamin-depth`** — 35 fichiers de tests qui ne tournent nulle part | **A** | ✅ `.github/workflows/ci.yml`, PR #20 — vérifié : typecheck OK, lint OK, **428/428 tests verts** |
| 4.2 | Brancher la base de 201 fiches sur le chat Coco | **A** | ✅ `api/_directory.js`, coco2 PR #20 — vérifié : 201 fiches indexées, alias FR/EN testés (scooter, plongée, restaurant, dentiste) |
| 4.3 | Tracking des clics affiliés | **A** | ⬜ à faire |
| 4.4 | **Grille tarifaire Underwater Recovery** (5 lignes) + funnel dédié | **C/A** | ⬜ à faire |
| 4.5 | Saisir les KPI réels (`revenue_thb` en premier) | **C** | ⬜ à faire — nécessite le chantier 0 |
| 4.6 | Geler par écrit `bot-trading-US`, `helmetik`, `Koh-s-33-stadium` | **C** | ⬜ à faire |
| 4.7 | Clarifier `assistant-ai` : client en prod ou doublon de coco2 ? | **C** | ⬜ à faire |
| 4.8 | Nettoyer les fichiers morts de `coco2` | **A** | ⚠️ **proposé, pas exécuté** — `20MB`, `creating` (0 octet), `_synctest.txt`, `assistant.odt.txt` identifiés ; suppression en attente de ton accord |
| 4.9 | Arbitrer la facturation / l'encaissement (`finance` sans titulaire) | **C** | ⬜ à faire |
| 4.10 | Rédiger le runbook de conduite à distance | **A** | ⬜ à faire (distinct de `06-runbook-solo.md`, déjà livré à l'audit initial) |

**✅ Critère de fin** : le bilan hebdo du dimanche contient des **chiffres réels**, pas des
`[À COMPLÉTER]`.

---

## Ce que tu dois faire, toi, et rien d'autre

Sur les 90 jours, tes actions propres tiennent en une liste courte :

1. Créer le bot Telegram et 6 chats *(~30 min)*
2. Créer le projet Supabase *(~10 min)*
3. Régénérer et poser ~10 variables d'environnement *(~30 min)*
4. **Trancher les 9 `TODO` de politique plongée** *(~1 h)*
5. **Trancher les 16 messages en attente** *(~1 h)*
6. Choisir un jeu de tarifs plongée *(~15 min)*
7. Fixer une grille Underwater Recovery *(~1 h)*
8. Décider du gel de 3 projets *(~15 min)*
9. Saisir `revenue_thb` chaque semaine *(~5 min/semaine)*

**Total : environ une journée de travail, étalée sur 90 jours.** Tout le reste est exécutable
sans toi.

---

## Séquencement — vue d'ensemble

```
S1   ██████ Chantier 0 — Activation           ← rien d'autre ne compte
S1-2 ██████ Chantier 1 — Colmater les fuites
S3-5      ██████ Chantier 2 — Base unique
S4-8         ██████████ Chantier 3 — Boucles B (1/semaine)
S9-12                  ██████ Chantier 4 — Autonomie & mesure
```
