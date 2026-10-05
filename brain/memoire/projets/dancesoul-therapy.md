# Dancesoul-therapy — DanceSoulTherapy

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-09-17 (resynchronisation
> complète, `git log origin/main` — écart graphify corrigé, aucun autre changement constaté).
> Dépôt : `cyriljoseph32-cyber/Dancesoul-therapy` (branche par défaut `main`).
> Dernier commit `main` : `64226c3` (04/08/2026, wireframes haute-fidélité des 5 écrans) —
> aucune activité depuis, vérifié le 17/09.

## Identité

- Marque premium de movement-therapy (thérapie par le mouvement, somatique) à Koh Samui.
  Signature : **Awaken · Express · Heal**. Fondatrice : **Hannah** (contacts dans
  `lib/site.ts` — source unique, jamais en dur dans les pages).
- Positionnement : moderne, **ni mystique ni religieux** ; pratique de bien-être émotionnel,
  **jamais** de promesse médicale (gouvernance des claims).

## Stack & déploiement

- Next.js 15 App Router (SSG), CSS maison à tokens OKLCH (pas de Tailwind, pas de lib
  d'animation), Vercel déployé depuis `main`.
- Branche de travail du projet : `claude/dancesoultherapy-business-plan-r7g02j` ;
  ship = ff-merge vers `main`.

## Fichiers clés & conventions

- `CLAUDE.md` — design system strict, à lire avant tout : gold = « bijouterie » seulement,
  Cormorant Garamond + Manrope, grille 12 colonnes asymétrique, radius 2px, et une
  **ban-list** du look « AI/template » (gradients pastel, blobs, lotus/chakra,
  centered-everything, emoji déco…).
- Contenu dans `lib/site.ts` + `lib/posts.ts` (Sanity = Phase 3, voir `SITE_SCOPE.md`).
- **Confidentiel** : `THE_DANCESOUL_METHOD.md` (IP cœur de la méthode) — reste dans ce
  dépôt, ne jamais le recopier ailleurs. Marque : `BRAND_BLUEPRINT.md`, `brand/`.
- Vérification avant ship : `npm run build` → smoke curl de toutes les routes → screenshots
  Playwright 1280×900 et 375×780 → revue ban-list → contraste WCAG AA.

## Équipe d'agents (créée le 2026-07-20)

`.claude/agents/` du dépôt : `webmaster-dst` (site + design system — `/dst-site`),
`contenu-dst` (copy/articles/posts — `/dst-contenu`), `lancement-dst` (checklist de
lancement, coordination — `/dst-lancement`). Garde-fous communs : ban-list design absolue,
jamais de claim médical, brouillons uniquement, IP confidentielle jamais copiée.

## Cartographie du code (graphify) — ⚠️ corrigé le 2026-09-17, jamais mergée ici

- La ligne du 31/08 affirmait `graphify-out/` **« mergé sur `main` »** (PR #4/#5) sur ce
  dépôt — **vérifié faux le 17/09** : `git log --oneline --all` (toutes branches, y compris
  distantes) ne contient aucun commit mentionnant « graphify », il n'existe aucun dossier
  `graphify-out/` dans le répo, et `CLAUDE.md` n'a pas de section « Cartographie du code ».
  Le dernier commit sur `main` est `64226c3` (04/08, wireframes haute-fidélité) — plus récent
  que le 31/08 aurait dû produire un commit graphify après lui, ce qui n'est pas le cas.
  Écart probable : la passe transverse du 31/08 a réellement touché CSRA, coco2 et
  jamin-depth, mais la ligne de journal généralisait à tort aux 7 dépôts. Non refait dans
  cette session (aucune demande de Cyril) — seule la mémoire est corrigée.

## État & prochaines étapes (2026-07-20)

- Dernier commit : 04/07 — refonte de la home (« conversion spine »).
- TODOs ouverts (owner : Hannah) : handle Cal.com → `CAL_LINK` dans `lib/site.ts`,
  horaires réels, photos bio/portrait/galerie, vrais avis, domaine `dancesoultherapy.com`
  sur Vercel.

## Pièges connus

- Ne jamais introduire d'élément de la ban-list design ni de claim médical.
- Imagerie : compositions autorales (SVG feuillage, grain) en attendant le shoot de Hannah —
  jamais de stock spa ; l'egress du sandbox bloque les CDN d'images (vérifier le
  téléchargement avant d'intégrer toute image distante).
