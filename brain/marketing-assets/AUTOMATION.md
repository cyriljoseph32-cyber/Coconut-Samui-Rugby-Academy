# Automatisation des posts Instagram + Facebook — CSRA

## Comment ça marche (2 étages)

L'automatisation respecte la **règle de marque** : *rien n'est publié sans la validation de Cyril*.
Elle automatise la **préparation**, pas la publication.

### Étage 1 — Génération automatique (Routine Claude)

Une **Routine** (`trig_01YX3uvWF1bJx436BNFbG7YS`, « Génération hebdo posts CSRA ») se déclenche
**chaque dimanche ~08h13 heure Samui** (cron `13 1 * * 0` UTC). À chaque déclenchement :

1. Une **session fraîche** lit `brain/marketing-playbook.md` + `brain/academy.md`
2. Elle produit le **calendrier de la semaine** (Lun/Mer/Ven/Dim) : captions FR/EN, hashtags,
   brief visuel, créneau — versions Instagram **et** Facebook
3. Elle génère les **4 visuels de marque 1080×1350** via `gen-posters.cjs` + Chromium
4. Elle **livre le tout à Cyril** (fichiers + résumé) et envoie une **notification push + email**

> ⚙️ Gérer la routine : la désactiver / changer l'horaire depuis les paramètres Routines de
> claude.ai, ou demander à l'assistant « change l'heure de la routine posts » / « désactive-la ».

**Pré-requis pour les visuels automatiques** : `gen-posters.cjs` et le dossier
`brain/marketing-assets/` doivent être sur la **branche par défaut** (`main`) que la session
fraîche clone. Tant que ce n'est pas fusionné dans `main`, la routine produit le **calendrier
texte** mais pas les visuels. → fusionner la branche de travail dans `main` pour activer les
visuels auto.

**Limite** : les sessions de la routine tournent **sans connecteurs** (pas de Gmail/Bloom/Canva).
Ce n'est pas un problème : les visuels sont générés en local (Chromium), aucun crédit requis.

### Étage 2 — Publication (Postiz — planificateur retenu)

Les posts sont poussés dans **[Postiz](https://postiz.com)** (le planificateur de l'académie),
**en brouillon**, par `postiz-push.cjs`. Cyril relit et programme dans Postiz — *rien n'est publié
sans sa validation*.

- Si la variable `POSTIZ_API_KEY` est définie, la routine écrit un `manifest.json` et lance
  automatiquement `node brain/marketing-assets/postiz-push.cjs <manifest.json>` → les posts
  (Instagram + Facebook, caption + visuel) apparaissent dans Postiz, prêts à programmer.
- Installation complète (clé API, canaux à connecter, variables d'environnement) :
  **`brain/marketing-assets/POSTIZ.md`**.

> Alternative manuelle (si Postiz non configuré) : coller le contenu livré dans **Meta Business
> Suite** (gratuit, IG + FB ensemble) et programmer les dates du calendrier.

## Option « tout automatique » (non activée)

Une auto-publication **sans relecture** (via Zapier + Meta Graph API) est techniquement possible
mais **contraire à la règle de marque actuelle** (risque : fautes, photos d'enfants sans accord
parental publiées automatiquement). À n'activer que sur décision explicite de Cyril, avec un
compte Zapier et une Page FB + compte IG Business connectés.

## Rappels marketing (toujours valables)

- **Photos d'enfants** : accord parental **obligatoire** avant publication.
- **Aucun tarif/horaire/date/nom de coach inventé** → `[À COMPLÉTER PAR CYRIL]`, CTA WhatsApp.
- Bilingue FR/EN, ton « Island Grit ».
