# Dancesoul-therapy — DanceSoulTherapy

> Fiche mémoire — agent `memory`. Dernière mise à jour : 2026-07-20.
> Dépôt : `cyriljoseph32-cyber/Dancesoul-therapy` (branche par défaut `main`).

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
