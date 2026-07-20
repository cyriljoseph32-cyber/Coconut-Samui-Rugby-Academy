# Mémoire transverse — les projets de Cyril

> Registre vivant de l'agent `memory`. Mis à jour après chaque session de travail significative
> validée par Cyril.
> Audit initial : 2026-07-20, à partir des 6 dépôts GitHub de `cyriljoseph32-cyber`.
> Règle : en cas de contradiction, le code et les docs du dépôt concerné font foi — c'est la
> mémoire qui se resynchronise (`/memory sync`), jamais l'inverse.

## 🗺️ Vue d'ensemble

| Projet | Quoi | Stack | Déploiement | Dernière activité | Statut |
|---|---|---|---|---|---|
| [CSRA](projets/coconut-samui-rugby-academy.md) | Académie de rugby : site + brain agentique (QG des agents) | Astro + Tailwind | Vercel — coconutsamuirugby.com | 19/07 — intégration Postiz (PR #7) | 🟢 Actif |
| [bot-trading-US](projets/bot-trading-us.md) | Signal Bot actifs US (RSI-2) + bot global temps réel | React 19 + Vite + TS | Vercel — `/trading.html` | 17/07 — merge PR #2 | 🟢 Actif |
| [assistant-ai](projets/assistant-ai.md) | **Coco front desk** — réceptionniste IA WhatsApp/email + console | Next.js 14 + Claude + Supabase + Twilio | Vercel | 17/07 — PR #3 « client launch » | 🟢 Actif |
| [coco2](projets/coco2.md) | **Coco Samui Concierge** — chatbot touristique + serveur MCP | Astro + serverless + Claude Haiku | Vercel — coco-samui-ai.com | 12/07 — base 20/20 catégories | 🟢 Actif |
| [Dancesoul-therapy](projets/dancesoul-therapy.md) | Marque movement-therapy de Hannah + site | Next.js 15 (SSG) | Vercel (main) | 04/07 — refonte home | 🟡 En veille |
| [Koh-s-33-stadium](projets/koh-s-33-stadium.md) | `[À COMPLÉTER PAR CYRIL]` | — | — | Jamais (aucun commit) | ⚪ Non démarré |

⚠️ **Deux « Coco » distincts** : `assistant-ai` (produit front desk pour commerces de services)
≠ `coco2` (concierge touristique de Koh Samui). Toujours vérifier duquel on parle.

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
