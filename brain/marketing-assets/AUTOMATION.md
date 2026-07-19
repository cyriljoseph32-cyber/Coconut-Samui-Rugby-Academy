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

### Étage 2 — Publication (Meta Business Suite — recommandé)

La routine prépare ; **Cyril publie**. Le plus simple pour programmer Instagram + Facebook
**ensemble**, gratuitement :

1. **Meta Business Suite** (business.facebook.com ou l'app mobile) — connecter la Page Facebook
   + le compte **Instagram Business/Creator**
2. Onglet **Planifier / Créer un post** → coller la caption livrée par la routine, ajouter le
   visuel PNG, cocher **Instagram + Facebook**
3. Choisir la date/heure (les créneaux sont dans le calendrier livré) → **Programmer**
4. Meta publie tout seul aux heures prévues, sur les deux réseaux

> Alternative : **Buffer** ou **Later** (offres gratuites) si Cyril préfère leur interface de
> calendrier. Même principe : la routine fournit le contenu prêt à coller.

## Option « tout automatique » (non activée)

Une auto-publication **sans relecture** (via Zapier + Meta Graph API) est techniquement possible
mais **contraire à la règle de marque actuelle** (risque : fautes, photos d'enfants sans accord
parental publiées automatiquement). À n'activer que sur décision explicite de Cyril, avec un
compte Zapier et une Page FB + compte IG Business connectés.

## Rappels marketing (toujours valables)

- **Photos d'enfants** : accord parental **obligatoire** avant publication.
- **Aucun tarif/horaire/date/nom de coach inventé** → `[À COMPLÉTER PAR CYRIL]`, CTA WhatsApp.
- Bilingue FR/EN, ton « Island Grit ».
