# CSRA — Coconut Samui Rugby Academy

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-07-20.
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

## État & prochaines étapes (2026-08-01)

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
- Prochaine échéance : confirmation du RDV Samui Fitness Lab (mardi), suivi des premières
  réponses aux emails envoyés le 01/08, et vérification que les 4 envois textile sont bien
  partis lundi 8h.

## Pièges connus

- Ne jamais inventer tarifs/horaires/dates : pas encore publiés.
- Gmail/Calendar passent par les connecteurs claude.ai de Cyril — vérifier que le bon compte
  (`coconutrugbyacademy@gmail.com`) est connecté avant de gérer la boîte, sinon le dire.
