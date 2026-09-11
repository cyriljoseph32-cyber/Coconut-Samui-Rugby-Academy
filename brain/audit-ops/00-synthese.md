# Audit opérationnel multi-projets — Synthèse

> Réalisé le 11/09/2026 · Périmètre : 3 dépôts explorés (`coco2`, `Coconut-Samui-Rugby-Academy`,
> `jamin-depth`) + 5 fiches projets de `brain/memoire/projets/`.
> Méthode : lecture du code et des registres, zéro invention. Tout chiffre sans source vérifiable
> est écrit `[À COMPLÉTER PAR CYRIL]`.

---

## Le diagnostic en une phrase

**Le problème n'est pas le manque d'automatisation. C'est que ~85 % du système est déjà écrit,
testé, documenté — et jamais branché.**

Un moteur d'orchestration transverse complet existe (`jamin-depth/src/command/`, ~6 360 lignes,
35 fichiers de tests). Les adaptateurs Telegram, WhatsApp Cloud API, Supabase et Instagram sont
implémentés. Treize agents sont écrits et audités. Rien ne tourne, parce que **~8 variables
d'environnement ne sont pas renseignées et 4 chats Telegram n'ont jamais été créés.**

La conséquence est contre-intuitive et coûteuse : écrire plus d'automatisation n'apporterait
strictement rien aujourd'hui. Le seul chantier rentable à court terme est l'**activation**.

---

## Les 5 fuites actives, chiffrées

| # | Fuite | Constat vérifié | Source |
|---|---|---|---|
| 1 | **16 messages commerciaux écrits, jamais envoyés** | Relances Rugby School Thailand (76/100) et Six Senses (59/100) en brouillon Gmail **depuis le 05/08** — soit 37 jours. Kelsey Family CIC prêt depuis le 12/08. Olympia prêt depuis le 23/08. | `brain/pipeline.md` |
| 2 | **Les leads Coco AI peuvent disparaître** | `api/_store.js` : sans `KV_REST_API_*` ni `UPSTASH_*`, les écritures sont des **no-op silencieux** et le rate-limit ne limite rien. Le dernier recours est `console.log`. L'en-tête du fichier note qu'une version antérieure écrivait dans `/tmp` et perdait tout. | `coco2/api/lead.js`, `_store.js` |
| 3 | **Relances envoyées après un refus** | Séquences Superhuman non coupées : Samui Pro Nutrition relancé le 11/08 **puis le 24/08 alors qu'il avait refusé le 09/08**. Idem Koh Fit (24/08) et Elite Gym (15/08). Risque réputationnel sur une île où tout le monde se connaît. | `brain/pipeline.md` |
| 4 | **Trois bases de leads incompatibles** | Supabase (`jamin-depth`) · Vercel KV + webhook (`coco2`) · e-mail FormSubmit **non activé** (CSRA). Aucune vue client unifiée. Un même prospect peut être travaillé deux fois. | 3 dépôts |
| 5 | **201 fiches de données mortes** | `coco2/data/concierge-db/` (20 catégories × 10 fiches) n'est référencé par **aucun code exécutable**. Le chat répond depuis un prompt statique codé en dur dans `api/chat.js`. Le travail de curation est payé mais pas servi. | `coco2/api/chat.js` |

**Deux incohérences de données à trancher d'urgence** (elles produisent des réponses fausses aux clients) :

- **Tarifs plongée contradictoires** : PADI Open Water = **17 900 THB** (`jamin-depth/src/agents/catalog.ts`)
  vs **16 728 THB** (prompt de `coco2/api/chat.js`). Idem sur 6 autres lignes.
- **Essai CSRA** : la politique est passée à **200 THB payants le 11/09**, mais
  `brain/marketing-drafts/semaine-2026-09-07.md` annonce encore « Essai gratuit / Free trial ».

---

## Niveau d'automatisation réel, par projet

| Projet | Automatisation | Ce qui bloque |
|---|---|---|
| Coco AI Concierge | **~30 %** | Store KV non prouvé, base de 201 fiches non branchée, clics affiliés non trackés |
| CSRA (rugby) | **~20 %** | FormSubmit inactif, Zapier WhatsApp mort depuis le 26/08, Telegram absent |
| Jammin's Depths (plongée) | **~15 %** | Moteur codé et non branché ; 9 `TODO` dans `config.ts` bloquent les réponses |
| Underwater Recovery | **~5 %** | Pas de tarif publié, pas de funnel propre, hébergé dans le site plongée |

**Moyenne pondérée : ~20 %.** L'objectif 80 % est atteignable sans écrire de moteur — il est
déjà écrit.

---

## Les 3 décisions qui débloquent tout

Ces trois décisions conditionnent 80 % du gain. Le reste du plan en découle.

**1. Une seule base de leads : Supabase.**
Le schéma est déjà écrit (`jamin-depth/supabase/schema.sql`, 9 tables, déduplication par
empreinte incluse). `coco2` pousse déjà des événements vers l'API d'ingestion — il suffit
d'étendre. CSRA reçoit son premier émetteur programmatique. Coût : 0 €.

**2. Un seul poste de commandement : Telegram.**
Cartes à deux boutons déjà implémentées (`src/agents/adapters/telegram.ts`). Un chat par
activité (COCO / DIVING / RUGBY / GLOBAL) + alertes + quotidien. C'est le seul endroit où tu
valides. Coût : 0 €.

**3. Superhuman perd le droit d'envoyer seul.**
Toutes les séquences automatiques coupées. Tout envoi passe par brouillon validé. Non
négociable après l'incident du 11/08.

---

## Ce que ça change concrètement pour toi

| Aujourd'hui | Après le chantier 0 + 1 |
|---|---|
| Tu découvres les leads en fouillant WhatsApp | Ils arrivent dans un chat Telegram, qualifiés, avec un brouillon de réponse |
| Tu oublies des relances pendant 37 jours | La veille des échéances < 72 h tourne toutes les 30 min |
| Tu ne sais pas ce qui a été envoyé | Journal horodaté, preuve d'exécution obligatoire (`DONE` sans référence = `UNVERIFIED`) |
| Tu écris chaque post | Un brouillon par jour t'attend, tu valides d'un bouton |
| Tu n'as aucun chiffre | `/kpi` : leads, bookings, signups, revenue_thb, content_published, prospects |

Ton rôle se réduit à **valider, arbitrer, vendre, coacher** — la catégorie C de la matrice 80/20.

---

## Budget

Enveloppe retenue : **20–60 €/mois**. La cible tient dedans.

| Poste | Coût |
|---|---|
| Supabase (offre gratuite) | 0 € |
| Vercel Hobby | 0 € |
| Telegram Bot API | 0 € |
| WhatsApp Cloud API (1 000 conversations de service/mois incluses) | 0 € |
| Postiz ou équivalent (planification IG/FB) | ~15–20 € |
| API Anthropic (à l'usage, réponses par règles = 0 token) | `[À COMPLÉTER]` — dépend du volume réel |
| **Zapier** | **0 € — non réabonné**, décision du 26/08 maintenue |

---

## Ce que cet audit ne dit pas

Les 10 questions de cadrage sont restées sans réponse. En conséquence, les éléments suivants
sont `[À COMPLÉTER PAR CYRIL]` et ne sont **pas** estimés :

- CA réel par projet sur les 3 derniers mois
- Heures/semaine passées en admin, réponses clients et contenu
- Volume de demandes entrantes hebdomadaire et canal le plus rentable
- Abonnements payants réellement actifs
- Statut du `+66 63 375 3316` : WhatsApp Business API ou app perso
- Modèle d'encaissement plongée (direct vs commission Discovery Divers)

Ces trous n'empêchent pas d'exécuter les chantiers 0 et 1 — ils empêchent de **prioriser
finement** les chantiers 2 à 4. À remplir avant la semaine 3.

---

## Documents de l'audit

| Fichier | Contenu |
|---|---|
| `01-cartographie.md` | Les 9 projets, 13 colonnes, classement et synergies |
| `02-processus.md` | Parcours complets des 4 projets prioritaires |
| `03-matrice-8020.md` | Chaque tâche en A (100 % auto) / B (80 % + validation) / C (humain) |
| `04-architecture-cible.md` | Stack cible, flux, ce qu'on active / construit / supprime |
| `05-plan-90-jours.md` | Séquence exécutable, critère de fin vérifiable par chantier |
| `06-runbook-solo.md` | Ta journée et ta semaine type, seul |
| `07-registre-risques.md` | Risques actifs et leur traitement |
