# Coconut Samui Rugby Academy — Brain agentique

Ce dépôt contient deux choses :

1. **Le site web** de l'académie — Astro + Tailwind, déployé sur Vercel (voir `README.md`).
2. **Le brain agentique** — la base de connaissances (`brain/`) et l'équipe d'agents
   (`.claude/agents/`) qui aident Cyril à gérer l'académie au quotidien.

## L'académie en bref

| | |
|---|---|
| Nom | Coconut Samui Rugby Academy (CSRA) |
| Tagline | Grow Strong Together. |
| Positionnement | La première académie de rugby structurée de Koh Samui |
| Site | https://coconutsamuirugby.com |
| WhatsApp | +66 63 375 3316 (`wa.me/66633753316`) |
| Email | coconutrugbyacademy@gmail.com |
| Instagram | [@coconut_samui_rugby](https://www.instagram.com/coconut_samui_rugby) |
| Lieux | Koh's 33 Stadium (Lamai) · PSG Academy (Chaweng) — Koh Samui, Thaïlande |
| Coaching | Bilingue français / anglais |
| Programmes | Kids (4–10) · Teens (11–17) · Adults Touch (18+) · Corporate Team-Building |

Détails complets dans `brain/academy.md`. **Source de vérité factuelle** : `src/config/site.ts`
(contacts, lieux) et `src/data/programs.ts` (programmes, FAQ) — le dossier `brain/` en est
dérivé ; en cas de contradiction, `src/` gagne et il faut resynchroniser `brain/`.

## L'équipe d'agents

| Agent | Rôle | Raccourci |
|---|---|---|
| `marketing` (`.claude/agents/marketing.md`) | Posts Instagram, campagnes, flyers, copy FR/EN | `/marketing` |
| `secretariat` (`.claude/agents/secretariat.md`) | Triage de la boîte Gmail, brouillons de réponses | `/inbox` |
| `assistant-cyril` (`.claude/agents/assistant-cyril.md`) | Chef d'orchestre : brief quotidien, agenda, délégation | `/brief` |

## Règles communes à tous les agents

1. **Validation humaine obligatoire** : jamais d'envoi d'email, de publication ni d'action
   externe sans accord explicite de Cyril. Emails → brouillons Gmail uniquement.
   Posts → texte/visuel à valider.
2. **Bilinguisme** : répondre à Cyril en **français**. Les contenus destinés au public
   (emails, posts) sont en français et/ou en anglais selon le destinataire — l'académie est
   bilingue FR/EN, c'est un argument de marque.
3. **Zéro invention** : ne jamais inventer tarifs, horaires, dates de camps ou noms de coachs.
   Ces informations ne sont pas encore publiées — écrire `[À COMPLÉTER PAR CYRIL]` et le signaler.
4. **Ton de marque** « Island Grit » : direct, chaleureux, sans jargon corporate, fierté
   insulaire, valeurs rugby (respect, courage, collectif). Détails dans
   `brain/marketing-playbook.md`.
5. **Connecteurs** : Gmail et Google Calendar passent par les connecteurs claude.ai de Cyril.
   Pour gérer la boîte officielle `coconutrugbyacademy@gmail.com`, ce compte doit être connecté
   dans les paramètres claude.ai (Settings → Connectors). Si le connecteur est absent ou pointe
   sur un autre compte, le dire clairement au lieu de simuler.

## Base de connaissances (`brain/`)

- `brain/academy.md` — fiche complète : programmes, FAQ, contacts, liens WhatsApp pré-remplis,
  état du site (placeholders restants).
- `brain/marketing-playbook.md` — marque, ton, piliers de contenu Instagram, hashtags,
  formats de posts, calendrier éditorial type.
- `brain/email-playbook.md` — labels Gmail, règles de triage, modèles de réponses FR/EN.

## Site web — développement

```bash
npm install
npm run dev      # serveur local
npm run build    # build de production → dist/
```

Conventions du site (design system, boutons, couleurs OKLCH) : voir `README.md`.
