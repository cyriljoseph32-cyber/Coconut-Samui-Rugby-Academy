# Étape 1 — Cartographie des projets

> 9 projets, dont 7 avec dépôt actif, 1 dépôt vide, 1 non audité.
> Sources : `brain/memoire/projets/*.md`, `brain/memoire/index.md`, lecture directe des 3 dépôts
> accessibles. Les chiffres de CA et de temps sont `[À COMPLÉTER PAR CYRIL]` — non estimés.

---

## 1. Jammin's Depths — plongée & récupération sous-marine

| | |
|---|---|
| **Objectif business** | Vivre de l'instruction plongée et des services sous-marins pros à Samui |
| **Offre vendue** | Baptême 5 850 · PADI OW 17 900 · AOW 13 900 · Sail Rock 4 550 · Koh Tao 2 plongées 4 850 · Chumphon Pinnacle 5 050 · Snorkeling 2 450 (THB/pers., tarifs publics Discovery Divers) |
| **Public cible** | Touristes FR/EN à Samui, familles, plongeurs certifiés en reprise |
| **Sources de leads** | WhatsApp `+66 63 375 3316`, Instagram `@granola51`, Facebook `Underwatersamuirecovery`, formulaires du site, chat du site |
| **Canaux** | WhatsApp (n°1), Instagram DM, Facebook, e-mail (`enabled: false` — adresse placeholder erronée) |
| **Processus actuels** | Qualification manuelle, devis oral, réservation **chez le partenaire par message**, relance de tête |
| **Outils** | Site Next.js sur Vercel ; formulaires 100 % client-side → ouvrent WhatsApp pré-rempli, **rien n'est stocké** |
| **Automatisation** | **~15 %** — moteur `src/agents/` complet (6 rôles, qualification par règles à zéro token) mais non branché |
| **Goulots** | 9 `TODO` dans `src/agents/config.ts` (`paymentMethods`, `deposit`, `cancellation`, `meetingPoint`, `boatSchedule`, `pickupIncluded`, `insurance`, `minorMinimumAge`, `partnerResponseHours`) — **chacun bloque mécaniquement une réponse automatique**. Les 3 `APPROVERS` sont aussi `TODO`. |
| **Risques / pertes** | Aucune trace d'un lead qui n'aboutit pas. Tarifs contradictoires avec coco2. Aucune réservation en propre : `AVAILABILITY.canSystemHold = false` |
| **Opportunités** | Brancher le moteur = réponse en minutes au lieu d'heures, SLA P2 déjà défini à 240 min. Coco AI peut lui envoyer des clients. |
| **Priorité** | **HAUTE** |

---

## 2. Coco AI Concierge — `coco2`

| | |
|---|---|
| **Objectif business** | SaaS B2B : concierge IA multilingue pour hôtels et villas de Samui |
| **Offre vendue** | FREE 0 · **PRO 2 900 THB/mois + 3 000 setup** · PREMIUM 6 900–9 900 THB/mois + 5 000 setup. Affiliation 5–12 %, commission partenaires 10–15 %, essai 14 j |
| **Public cible** | ~634 prestataires d'hébergement à Samui ; TAM cité 200–300 hôtels + villas |
| **Sources de leads** | Formulaire `site/src/pages/hotels.astro` (`source: "hotel-setup-form"`), chat, prospection sortante |
| **Canaux** | E-mail (34 brouillons prêts), WhatsApp, formulaires de contact hôteliers |
| **Processus actuels** | Prospection manuelle 5–8 envois/jour, relance WhatsApp J+2, 2e relance J+7, archive J+14 |
| **Outils** | Astro + API serverless Claude Haiku sur `coco-samui-ai.com`, serveur MCP local, Bloom, Postiz (partiel) |
| **Automatisation** | **~30 %** — chat live et fonctionnel, capture de leads fragile |
| **Goulots** | Store KV non prouvé configuré ; **clics affiliés non trackés** (donc revenu d'affiliation invérifiable) ; les 34 brouillons contiennent encore l'ancien lien `project-xm4pf` ; base de 201 fiches non branchée |
| **Risques / pertes** | Lead perdu si KV absent. Revenu d'affiliation à 0 tant que `VIATOR_AFFILIATE_PID` est vide. Auto-évaluation du dépôt : **4,5/10** (`AUDIT_Samui_AI_Concierge.md`), composite agence **44/100 grade C** |
| **Opportunités** | Plan : 15–25 clients B2B = **80–110 k THB/mois (~36 k€ ARR)**. Marge brute > 90 %. Peut router vers Jammin's Depths et CSRA. |
| **Priorité** | **HAUTE** |

---

## 3. Coconut Samui Rugby Academy — CSRA

| | |
|---|---|
| **Objectif business** | Première académie de rugby structurée de Koh Samui |
| **Offre vendue** | **350 THB/séance · 1 200 THB/mois · essai 200 THB** (payant depuis le 11/09). Sponsoring Bronze 4 500 · Silver 11 500 · Gold 36 000 · Platinum 195 000 THB. Corporate `[À COMPLÉTER]` |
| **Public cible** | Familles expat et thaïes, écoles internationales, adultes touch, entreprises |
| **Sources de leads** | Formulaire site, newsletter, WhatsApp, Instagram `@coconut_samui_rugby`, bouche-à-oreille écoles |
| **Canaux** | WhatsApp (n°1 de conversion), e-mail `coconutrugbyacademy@gmail.com` via Superhuman, Instagram |
| **Processus actuels** | Pipeline tenu **à la main** dans `brain/pipeline.md` ; brouillons Gmail envoyés manuellement |
| **Outils** | Site Astro sur `coconutsamuirugby.com`, 9 agents, Superhuman, Google Calendar, Bloom |
| **Automatisation** | **~20 %** |
| **Goulots** | **FormSubmit jamais activé** → le formulaire du site n'a peut-être jamais rien livré. Zapier WhatsApp mort depuis le 26/08. Telegram absent. Aucun lien automatique formulaire → pipeline : **le lien est humain** |
| **Risques / pertes** | 16 messages prêts non envoyés. Relances post-refus (Superhuman). 4 photos de séances bloquées depuis le 08/08 faute de **consentement parental**. GA4/Clarity non activés → zéro mesure |
| **Opportunités** | 62 prospects scorés, 77 lignes de pipeline, tournoi Phuket 07/11/2026 (6 000 THB/équipe), réseau écoles amorcé |
| **Priorité** | **HAUTE** |

---

## 4. Underwater Recovery Samui

| | |
|---|---|
| **Objectif business** | Services sous-marins pros à forte marge : récupération d'objets, inspection de coque, hélice, ancre, water hazards de golf |
| **Offre vendue** | `[À COMPLÉTER PAR CYRIL]` — **aucun tarif publié nulle part** |
| **Public cible** | Villas, propriétaires de bateaux, marinas, resorts, parcours de golf, touristes ayant perdu un objet |
| **Sources de leads** | Page `/recuperation-sous-marine` du site plongée, WhatsApp |
| **Canaux** | WhatsApp, Facebook `Underwatersamuirecovery` |
| **Processus actuels** | Entièrement ad hoc |
| **Outils** | Une page dans le site `jamin-depth` |
| **Automatisation** | **~5 %** |
| **Goulots** | Pas de grille tarifaire → impossible d'automatiser le moindre devis. Pas de funnel distinct de la plongée loisir |
| **Risques / pertes** | Demande urgente (objet tombé à l'eau) = conversion très sensible au délai de réponse. Sans réponse rapide, le client appelle quelqu'un d'autre |
| **Opportunités** | **Le meilleur ratio marge/effort du portefeuille.** Peu de concurrence, argument de crédibilité fort (~3 000 plongées, instructeur, assuré). Une grille de 5 lignes + une réponse automatique suffiraient |
| **Priorité** | **HAUTE** (effort faible, gain rapide) |

---

## 5–9. Le reste du portefeuille

| Projet | Dépôt | État | Automatisation | Verdict |
|---|---|---|---|---|
| **assistant-ai** (Coco front-desk) | `assistant-ai` | Next.js 14 + Claude + Supabase + Twilio WhatsApp, Vercel. Dernier merge fonctionnel **17/07** | `[À COMPLÉTER]` | **Client réel en prod inconnu.** À clarifier avant tout investissement — risque de doublon avec coco2 |
| **bot-trading-US** | `bot-trading-US` | React+Vite, cron Vercel 21h35 UTC, e-mail Resend, ordres Alpaca optionnels. Dernier merge fonctionnel **17/07** | `[À COMPLÉTER]` | **Chronophage / hors cœur de métier.** Candidat au gel explicite. Garde-fou à maintenir : `ALPACA_LIVE`/`AUTOTRADE` jamais sans décision écrite |
| **DanceSoulTherapy** | `Dancesoul-therapy` | Next.js 15 SSG sur Vercel. Dernier commit fonctionnel **04/07**. 🟡 En veille | ~0 % | Bloqué côté **Hannah** : handle Cal.com, horaires, photos, avis, domaine `dancesoultherapy.com`. Rien à automatiser tant que ces 5 champs manquent |
| **helmetik** | `helmetik` | Branche par défaut ≠ `main`. Aucun agent. Écarté 2× des mandats COCO COMMAND (20/08, 21/08) | non audité | **Positionnement inconnu** (`[À COMPLÉTER]`). Gel jusqu'à décision |
| **Koh-s-33-stadium** | dépôt **vide** | Aucun commit. Décision assumée du 20/07 : ne rien pousser sans objectif défini | — | Statu quo. Seul fait : Koh's 33 (Lamai) est le terrain d'entraînement CSRA |

---

## Classement

### 💰 Génèrent déjà du revenu
**CSRA** (350 THB/séance, 1 200 THB/mois) et **Jammin's Depths** (commission/instruction).
Montants exacts : `[À COMPLÉTER PAR CYRIL]`.

### 🚀 Fort potentiel, non structuré
**Coco AI** (plan 80–110 k THB/mois à 12 mois, marge > 90 %) et **Underwater Recovery**
(marge forte, zéro structure — le gain le plus rapide du portefeuille).

### 🕳️ Consomment plus qu'ils ne rapportent
**bot-trading-US** et **helmetik** : aucun revenu documenté, aucune activité fonctionnelle
depuis le 17/07 et jamais respectivement. **assistant-ai** est dans la zone grise tant que le
client en prod n'est pas confirmé.
→ Recommandation : **gel explicite et daté**, pas abandon honteux. Un projet gelé par écrit ne
consomme plus de charge mentale ; un projet « en attente » en consomme tous les jours.

### 🔗 Synergies réelles et sous-exploitées

1. **Coco AI → Jammin's Depths.** Le concierge recommande déjà des dive shops
   (`api/_affiliates.js` : `dive_shop` → lien direct puis Viator). Il doit recommander **ton
   propre centre**. Gain immédiat, une ligne de configuration.
2. **Coco AI → CSRA.** Un concierge qui répond à des familles logées à Samui est un canal
   d'acquisition direct pour les Kids/Teens du samedi.
3. **Un seul WhatsApp** (`+66 63 375 3316`) sert **CSRA, la plongée et Underwater Recovery**.
   C'est déjà de facto le guichet unique — il doit devenir le point d'entrée unique **outillé**.
4. **Un seul moteur, un seul journal, une seule validation.** COCO COMMAND couvre déjà les 4
   activités (`COCO`, `DIVING`, `RUGBY`, `GLOBAL`). Il n'y a pas 4 systèmes à construire.
