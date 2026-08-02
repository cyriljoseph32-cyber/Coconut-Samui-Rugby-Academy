# CSRA — Coconut Samui Rugby Academy

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-08-02.
> Dépôt : `cyriljoseph32-cyber/Coconut-Samui-Rugby-Academy` (branche par défaut `main`).

## Identité

- La première académie de rugby structurée de Koh Samui — « Grow Strong Together. »
- Fondateur : Cyril. Coaching bilingue FR/EN. Programmes : Kids (4–10) · Teens (11–17) ·
  Adults Touch (18+) · Corporate Team-Building.
- https://coconutsamuirugby.com · Instagram @coconut_samui_rugby ·
  WhatsApp +66 63 375 3316 · coconutrugbyacademy@gmail.com
- Lieux d'entraînement : Koh's 33 Stadium (Lamai) · PSG Academy (Chaweng).

## Stack & déploiement

- Site Astro + Tailwind, déployé sur Vercel. `npm run dev` / `npm run build`.
- Le dépôt est aussi le **QG du brain agentique** : agents dans `.claude/agents/`
  (assistant-cyril, marketing, secretariat, communication, evenements, webmaster, coach,
  memory), skills dans `.claude/skills/`, base de connaissances `brain/`.

## Fichiers clés & conventions

- **Source de vérité factuelle** : `src/config/site.ts` (contacts, lieux) et
  `src/data/programs.ts` (programmes, FAQ). `brain/` en est dérivé — si un fait change côté
  `src/`, resynchroniser `brain/` dans le même commit.
- `brain/pipeline.md` — registre vivant des relances/prospects (agent `communication`).
- `brain/marketing-assets/` — générateur de posters 1080×1350 (HTML → Chromium headless) +
  automatisation Postiz (`AUTOMATION.md`, `POSTIZ.md`).
- Règles communes (CLAUDE.md) : validation humaine obligatoire, zéro invention,
  ton « Island Grit », français avec Cyril.

## État & prochaines étapes (2026-08-02)

- Site en ligne ; placeholders restants listés dans `brain/academy.md` — tarifs, horaires,
  dates de camps : `[À COMPLÉTER PAR CYRIL]`.
- Brain agentique créé le 18/07 ; 1re vague de relances envoyée les 18–19/07
  (voir `brain/pipeline.md`) ; intégration Postiz mergée le 19/07 (PR #7).
- Prochaine échéance : suivis J+7 des relances (~25/07) — détail dans le pipeline.
- 2026-08-02 : audit des connecteurs MCP de la session (voir Pièges connus ci-dessous) →
  correction du routage boîte mail dans `secretariat.md`/`communication.md`/`assistant-cyril.md`
  et de `marketing.md` — PR #10 (branche `claude/mcp-setup-automation-gvu3i6`).

## Pièges connus

- Ne jamais inventer tarifs/horaires/dates : pas encore publiés.
- **Boîte académie = connecteur Superhuman Mail, pas Gmail générique.** Vérifié le 2026-08-02 :
  dans la session de Cyril, le connecteur Gmail/Calendar générique (`mcp__Gmail__*`,
  `mcp__Google_Calendar__*`) est lié à son compte **personnel** `cyril.joseph32@gmail.com`
  (utilisé par `assistant-cyril` pour le brief/agenda). La boîte officielle
  `coconutrugbyacademy@gmail.com` est connectée via **Superhuman Mail**
  (`mcp__Superhuman_Mail__*`, `acting_email: coconutrugbyacademy@gmail.com` — seul compte listé
  par `list_accounts`, marqué `isPrimary`). `secretariat` et `communication` ont été corrigés
  pour utiliser Superhuman ; si un jour `list_accounts` ne renvoie plus ce compte, le signaler
  à Cyril plutôt que de basculer silencieusement sur le connecteur Gmail générique (qui
  répondrait avec sa boîte perso, pas celle de l'académie).
