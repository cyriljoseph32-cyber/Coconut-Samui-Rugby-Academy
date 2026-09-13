# Mémoire transverse — les projets de Cyril

> Registre vivant de l'agent `memory`. Mis à jour après chaque session de travail significative
> validée par Cyril.
> Audit initial : 2026-07-20, à partir des 6 dépôts GitHub de `cyriljoseph32-cyber`.
> Règle : en cas de contradiction, le code et les docs du dépôt concerné font foi — c'est la
> mémoire qui se resynchronise (`/memory sync`), jamais l'inverse.

## 🗺️ Vue d'ensemble

| Projet | Quoi | Stack | Déploiement | Dernière activité | Statut |
|---|---|---|---|---|---|
| [CSRA](projets/coconut-samui-rugby-academy.md) | Académie de rugby : site + brain agentique (QG des agents) | Astro + Tailwind | Vercel — coconutsamuirugby.com | 12/09 — **PR #38 activation (émetteur COCO COMMAND, `api/lead.js`, essai 200 THB), CI verte, non mergée** ; 11/09 — **audit opérationnel multi-projets** (`brain/audit-ops/`, 8 documents) ; 11/09 — essai payant 200 THB (PR #35) et fusion du créneau Kids/Teens 4-12 ans samedis 16:30-17:30 (PR #34) ; 08/09 — RDV IFDS (Sylvie Torrente) : refus séance découverte/périscolaire, dossier clos | 🟢 Actif |
| [bot-trading-US](projets/bot-trading-us.md) | Signal Bot actifs US (RSI-2) + bot global temps réel | React 19 + Vite + TS | Vercel — `/trading.html` | 31/08 — cartographie graphify (mergée) | 🟢 Actif |
| [assistant-ai](projets/assistant-ai.md) | **Coco front desk** — réceptionniste IA WhatsApp/email + console | Next.js 14 + Claude + Supabase + Twilio | Vercel | 31/08 — cartographie graphify (mergée) | 🟢 Actif |
| [coco2](projets/coco2.md) | **Coco Samui Concierge** — chatbot touristique + serveur MCP | Astro + serverless + Claude Haiku | Vercel — coco-samui-ai.com | 12/09 — **PR #20 activation (fuites n°2 et n°5 corrigées : ingestion toujours appelée, 201 fiches branchées), CI verte, non mergée** ; 12/09 — 18 brouillons Gmail de prospection corrigés ; 06/09 — resynchro posts Instagram : seul le post « Ask Coco » (31/08) réellement publié | 🟢 Actif |
| [jamin-depth](projets/jamin-depth.md) | **Jammin's Depths** — plongée & récupération sous-marine : site + système d'agents + moteur COCO COMMAND | Next.js 15 + Supabase + WhatsApp + Telegram | Vercel | 12/09 — **PR #20 activation (CI ajoutée, 428/428 tests verts ; `npm run activate`/`import:leads`), non mergée** ; 02/09 — PR #16 `coco-contenu` + calendrier éditorial rouverte | 🟢 Actif |
| [Dancesoul-therapy](projets/dancesoul-therapy.md) | Marque movement-therapy de Hannah + site | Next.js 15 (SSG) | Vercel (main) | 31/08 — cartographie graphify | 🟡 En veille |
| [helmetik](projets/helmetik.md) | `[À COMPLÉTER PAR CYRIL]` (Foot/Padel/Pétanque/Fitness, à confirmer) | `[À COMPLÉTER PAR CYRIL]` | — | 31/08 — cartographie graphify (1re trace mémoire) | ⚪ Non audité |
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

Le vrai constat : la boucle *journal + notification* tourne, mais `leads`, `command_tasks` et
`command_kpis` sont à **0 · 0 · 0** — le CRM, le contrat de tâche et la mesure sont écrits et
inutilisés. Et **29 événements attendent la validation de Cyril**, le plus ancien depuis le
20/08.

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
