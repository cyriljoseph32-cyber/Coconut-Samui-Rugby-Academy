# Mémoire transverse — les projets de Cyril

> Registre vivant de l'agent `memory`. Mis à jour après chaque session de travail significative
> validée par Cyril.
> Audit initial : 2026-07-20, à partir des 6 dépôts GitHub de `cyriljoseph32-cyber`.
> Règle : en cas de contradiction, le code et les docs du dépôt concerné font foi — c'est la
> mémoire qui se resynchronise (`/memory sync`), jamais l'inverse.

## 🗺️ Vue d'ensemble

| Projet | Quoi | Stack | Déploiement | Dernière activité | Statut |
|---|---|---|---|---|---|
| [CSRA](projets/coconut-samui-rugby-academy.md) | Académie de rugby : site + brain agentique (QG des agents) | Astro + Tailwind | Vercel — coconutsamuirugby.com | 🔴 **05/10 — Pause complète de l'activité et de toute l'automatisation CSRA, plusieurs semaines (décision Cyril)** : routines marketing hebdo, boîte mail quotidienne et plans de séance coach désactivées. 18/09 — écart COCO COMMAND fermé : PR #21 « retrait PSG Academy » était mergée depuis le 27/08 (README corrigé) ; 13/09 — Adults Touch Rugby : tarif unique 200 THB/séance (PR #37) ; 12/09 — PR #38/#40/#41 (activation, fix domaine, coordonnées structurées) mergées | 🔴 En pause |
| [bot-trading-US](projets/bot-trading-us.md) | Signal Bot actifs US (RSI-2) + bot global temps réel | React 19 + Vite + TS | Vercel — `/trading.html` | 31/08 — cartographie graphify (mergée) | 🟢 Actif |
| [assistant-ai](projets/assistant-ai.md) | **Coco front desk** — réceptionniste IA WhatsApp/email + console | Next.js 14 + Claude + Supabase + Twilio | Vercel | 31/08 — cartographie graphify (mergée) | 🟢 Actif |
| [coco2](projets/coco2.md) | **Coco Samui Concierge** — chatbot touristique + serveur MCP | Astro + serverless + Claude Haiku | Vercel — coco-samui-ai.com | 🟢 **05/10 — Accélération décidée par Cyril (CSRA en pause, focus coco2)** : routine de génération de posts passée de 1×/semaine à 2×/semaine (lundi+jeudi), Bloom rechargé. 20/09 — PR #25 mergée (règle post + pipeline partenaires), post "vraie cuisine locale" publié et vérifié ; objectif 15 resorts partenaires avant le 15/12 ; 18/09 — posts Instagram semaine 07/09 confirmés publiés par Cyril | 🟢 Actif — priorité |
| [jamin-depth](projets/jamin-depth.md) | **Jammin's Depths** — plongée & récupération sous-marine : site + système d'agents + moteur COCO COMMAND | Next.js 15 + Supabase + WhatsApp + Telegram | Vercel | 16/09 — **PR #22 mergée : `coco-contenu` éteint par défaut (B4), publication manuelle par le propriétaire**, 29 brouillons/événements purgés ; 14/09 — reel Chumphon Pinnacle + White Rock publié (vérifié) ; 13/09 — 6 DSD réalisées (groupe Mario), revenu 35 100 THB / 5 265 THB part Cyril (15 %) ; 13/09 — **PR #21 mergée** (passerelle PostgREST + fiche unique + refus indélébile, 472 tests verts) ; 12/09 — **PR #20 mergée** (chantier 0 activation, CI, 428 tests). | 🟢 Actif |
| [Dancesoul-therapy](projets/dancesoul-therapy.md) | Marque movement-therapy de Hannah + site | Next.js 15 (SSG) | Vercel (main) | 04/08 — wireframes haute-fidélité des 5 écrans implémentés (dernier commit `main`, vérifié 17/09). ⚠️ La cartographie graphify du 31/08 annoncée « mergée sur `main` de chaque dépôt » **ne l'est pas ici** — corrigé le 17/09, voir journal. | 🟡 En veille |
| [helmetik](projets/helmetik.md) | `[À COMPLÉTER PAR CYRIL]` (Foot/Padel/Pétanque/Fitness, à confirmer) | `[À COMPLÉTER PAR CYRIL]` | — | 31/08 — cartographie graphify (1re trace mémoire) — dépôt non re-vérifié dans cette session (accès non demandé par Cyril, hors périmètre de cet audit) | ⚪ Non audité |
| [Koh-s-33-stadium](projets/koh-s-33-stadium.md) | `[À COMPLÉTER PAR CYRIL]` | — | — | Jamais (aucun commit) | ⚪ Non démarré |

⚠️ **COCO COMMAND** — le chef d'état-major transverse : la doctrine et l'agent vivent ici
(`.claude/agents/coco-command.md`, `brain/coco-command-playbook.md`), le moteur qui l'exécute
en continu vit dans `jamin-depth` (`src/command/`).

⚠️ **Deux « Coco » distincts** : `assistant-ai` (produit front desk pour commerces de services)
≠ `coco2` (concierge touristique de Koh Samui). Toujours vérifier duquel on parle.

## 🔍 Audit opérationnel

L'audit opérationnel et stratégique transverse (11/09/2026) vit dans
[`../audit-ops/`](../audit-ops/) — cartographie des 9 projets, audit des parcours, matrice
80/20, architecture cible, plan 90 jours, runbook solo et registre des risques.
Point d'entrée : [`00-synthese.md`](../audit-ops/00-synthese.md).

⚠️ **Constat central de l'audit — CORRIGÉ le 12/09.** L'audit affirmait que « le déficit est
l'activation : il manque ~8 variables d'environnement et 4 chats Telegram ». **C'était faux** :
les requêtes SQL sur la base de production montrent 104 événements journalisés depuis le
**20/08** et **104/104 notifiés sur Telegram**. Le chantier 0 était fait avant l'audit.

Le vrai constat : la boucle *journal + notification* tourne, mais `command_tasks` reste à
**0** — le contrat de tâche est écrit et inutilisé (`leads` et `command_kpis` ont bougé depuis,
voir ci-dessous). **Mise à jour 18/09** : sur les 29 événements en attente relevés par l'audit
du 12/09, une requête SQL directe n'en trouve plus que 2 au statut `WAITING_APPROVAL` réel
(les deux ont été clôturés cette session, confirmation de Cyril à l'appui — voir `journal.md`
18/09) ; le reste a dû être résolu individuellement sans que le flag `needs_owner` soit toujours
retombé en base — pas de raison de croire à un rattrapage massif en une fois, à re-vérifier au
prochain audit plutôt que supposé réglé.

**Règle qui en découle, pour tout agent** : ne jamais conclure qu'un système ne tourne pas à
partir de la seule lecture des dépôts — la configuration vit dans Vercel et les comptes tiers.
Interroger le système vivant (`list_projects`, une requête SQL, un appel d'API) avant
d'affirmer qu'il est inerte. Et toujours vérifier qu'une automatisation n'existe pas déjà.

## 📓 Journal

L'historique chronologique (jalons, décisions, avancées) est dans [`journal.md`](journal.md) —
une ligne horodatée par événement, la plus récente en haut.

## Règles d'usage

1. **Lecture** : tout agent ou sous-agent qui démarre une tâche sur un projet lit d'abord sa
   fiche `projets/<nom>.md` (identité, conventions, état, pièges connus).
2. **Écriture** : après une session significative validée par Cyril (feature livrée, décision,
   changement de cap, blocage), mettre à jour la fiche **et** ajouter une ligne au journal,
   horodatées.
3. **Zéro invention** : un fait non vérifié dans le dépôt source = `[À COMPLÉTER PAR CYRIL]`.
4. **Confidentialité** : ne jamais recopier ici du contenu confidentiel d'un autre dépôt
   (ex. `THE_DANCESOUL_METHOD.md`) — le référencer seulement.
