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

| # | Action | Qui | Détail |
|---|---|---|---|
| 0.1 | Créer le bot Telegram | **C** | Via `@BotFather` → récupérer `TELEGRAM_BOT_TOKEN` |
| 0.2 | Créer les 6 chats | **C** | `COMMAND` · `ALERTS` · `DAILY` · `PROJECT_COCO` · `PROJECT_DIVING` · `PROJECT_RUGBY` |
| 0.3 | Renseigner les variables Telegram | **C** | `TELEGRAM_CHAT_*`, `TELEGRAM_ALLOWED_CHAT_IDS` (**toi seul**), `TELEGRAM_WEBHOOK_SECRET` |
| 0.4 | **Régénérer `CRON_SECRET`** | **C** | ⚠️ L'ancienne valeur a été exposée en clair le 20/08 — à traiter comme compromise |
| 0.5 | Créer le projet Supabase | **C** | Offre gratuite |
| 0.6 | Exécuter `supabase/schema.sql` | **A** | 9 tables |
| 0.7 | **Exécuter le SQL v2** | **A** | `command_tasks`, `command_kpis` + colonnes ajoutées — **jamais lancé à ce jour** |
| 0.8 | Renseigner `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | **C** | Sur `jamin-depth` |
| 0.9 | Générer `COMMAND_INGEST_TOKEN` | **C** | Le poser sur `jamin-depth` **et** `coco2` |
| 0.10 | Vérifier le quota de crons Vercel | **C** | 8 déclarés dont un `*/30`. Si insuffisant : supprimer `command-digest` |
| 0.11 | Relier le webhook Telegram | **A** | `setWebhook` vers `/api/agents/telegram` |

**✅ Critère de fin** : un brief arrive dans le chat Telegram `DAILY` le lendemain à 08 h, et
`/today` répond. Si le brief n'arrive pas, le chantier 0 n'est pas terminé.

---

## 🟠 Chantier 1 — Colmater les fuites · Semaines 1–2

En parallèle du chantier 0. Ce sont des pertes sèches qui courent aujourd'hui.

| # | Action | Qui | Détail |
|---|---|---|---|
| 1.1 | **Couper les séquences Superhuman** | **C** | Prioritaire. Risque réputationnel actif |
| 1.2 | Purger les 12 brouillons doublons obsolètes | **A** | Identifiés dans `pipeline.md` |
| 1.3 | **Trancher les 16 messages en attente** | **C** | Un par un : envoyer / réécrire / archiver. Certains attendent depuis 37 jours |
| 1.4 | Corriger le lien `project-xm4pf` | **A** | Dans les 34 brouillons coco2, **avant tout envoi** |
| 1.5 | **Trancher les 9 `TODO` de `config.ts`** | **C** | `paymentMethods` · `deposit` · `cancellation` · `meetingPoint` · `boatSchedule` · `pickupIncluded` · `insurance` · `minorMinimumAge` · `partnerResponseHours` + les 3 `APPROVERS`. **~1 h de ta part, gain permanent** |
| 1.6 | **Unifier les tarifs plongée** | **C** | OW 17 900 (`catalog.ts`) vs 16 728 (`coco2/api/chat.js`). Choisir, propager |
| 1.7 | Corriger « essai gratuit » → 200 THB | **A** | `brain/marketing-drafts/semaine-2026-09-07.md` |
| 1.8 | Activer FormSubmit (CSRA) ou le remplacer | **C/A** | Le formulaire du site n'a peut-être jamais rien livré — **à tester d'abord** |
| 1.9 | Vérifier le store KV de `coco2` | **C** | Si absent, les leads partent dans `console.log` |
| 1.10 | Renseigner `VIATOR_AFFILIATE_PID` | **C** | Vide = **0 THB de revenu d'affiliation** |

**✅ Critère de fin** : zéro message en attente depuis plus de 7 jours dans `pipeline.md` ; un
lead de test soumis sur chacun des 3 sites ressort dans Supabase.

---

## 🟡 Chantier 2 — Unifier la base de leads · Semaines 3–5

| # | Action | Qui |
|---|---|---|
| 2.1 | `coco2/api/lead.js` pousse vers l'ingestion au lieu de KV | **A** |
| 2.2 | Écrire l'émetteur d'événements CSRA (~50 lignes, calqué sur `_command.js`) | **A** |
| 2.3 | Brancher le formulaire CSRA et la newsletter sur l'ingestion | **A** |
| 2.4 | Importer les 77 lignes de `pipeline.md` dans `leads` | **A** |
| 2.5 | Importer les 62 prospects scorés | **A** |
| 2.6 | Vérifier la fusion d'identités (même personne, 2 canaux) | **A** |
| 2.7 | `pipeline.md` devient une **vue générée**, plus un registre tenu à la main | **A** |

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

| # | Action | Qui |
|---|---|---|
| 4.1 | **CI sur `jamin-depth`** — 35 fichiers de tests qui ne tournent nulle part | **A** |
| 4.2 | Brancher la base de 201 fiches sur le chat Coco | **A** |
| 4.3 | Tracking des clics affiliés | **A** |
| 4.4 | **Grille tarifaire Underwater Recovery** (5 lignes) + funnel dédié | **C/A** |
| 4.5 | Saisir les KPI réels (`revenue_thb` en premier) | **C** |
| 4.6 | Geler par écrit `bot-trading-US`, `helmetik`, `Koh-s-33-stadium` | **C** |
| 4.7 | Clarifier `assistant-ai` : client en prod ou doublon de coco2 ? | **C** |
| 4.8 | Nettoyer les fichiers morts de `coco2` | **A** |
| 4.9 | Arbitrer la facturation / l'encaissement (`finance` sans titulaire) | **C** |
| 4.10 | Rédiger le runbook de conduite à distance | **A** |

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
