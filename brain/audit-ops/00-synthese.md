# Audit opérationnel multi-projets — Synthèse

> Réalisé le 11/09/2026 · Périmètre : 3 dépôts explorés (`coco2`, `Coconut-Samui-Rugby-Academy`,
> `jamin-depth`) + 5 fiches projets de `brain/memoire/projets/`.
> Méthode : lecture du code et des registres, zéro invention. Tout chiffre sans source vérifiable
> est écrit `[À COMPLÉTER PAR CYRIL]`.

## ⚡ Mise à jour 12/09 — début d'exécution

Le lendemain de la remise de cet audit, une session de suivi a déjà livré du code pour 6 des
chantiers ci-dessous, en 3 PR (`jamin-depth` #20, `coco2` #20, CSRA #38 — toutes en CI verte,
en attente de merge) et traité 18 brouillons Gmail de prospection. Détail complet :
`05-plan-90-jours.md` (statuts par ligne) et `07-registre-risques.md` (R7 corrigé — faux
positif — et deux nouvelles décisions ouvertes : R7bis, R7ter).

**Ce qui a changé depuis hier** :
- L'outillage du chantier 0 existe (`npm run activate`) — reste à créer les comptes (BotFather,
  Supabase) que seul Cyril peut créer.
- Les fuites n°2 (leads coco2 perdus) et n°5 (201 fiches mortes) sont **corrigées dans le
  code**, en attente de merge.
- CSRA a désormais son émetteur programmatique — la 3ᵉ base de leads incompatible n'en est
  plus une, dès que les PR sont mergées et les variables posées.
- CI ajoutée sur `jamin-depth` : 428/428 tests tournent enfin sur chaque PR.
- **R7 (lien mort) était un faux positif** — corrigé quand même pour deux vrais problèmes
  trouvés en le vérifiant (traceur visible, erreur sur les langues parlées par Coco).
- **Aggravation découverte** : les brouillons de prospection hôtels dorment depuis 92 et 47
  jours, pas 37 — R1/fuite n°1 était sous-estimée.

---

## ⚠️ Correction majeure du 12/09 — la thèse centrale de cet audit était fausse

**Vérifié en interrogeant directement la base Supabase de production** (ce que l'audit du 11/09
n'avait pas fait — il a déduit l'état du système de l'absence de configuration dans les dépôts) :

| Mesure | Valeur réelle |
|---|---|
| Projet Supabase | `ACTIVE_HEALTHY`, créé le **17/08** |
| `command_events` | **104 événements**, le premier daté du **20/08** |
| Notifiés sur Telegram | **104 sur 104** (`notified_at` renseigné partout) |
| Agents émetteurs | `coco-command`, `content`, `growth-concierge`, `marketing` — sur GLOBAL, DIVING, RUGBY et COCO |
| `leads` · `command_tasks` · `command_kpis` | **0 · 0 · 0** |
| En attente de validation (`needs_owner`) | **29 événements** |

**Ce qui était faux** : « ~8 variables d'environnement ne sont pas renseignées et 4 chats
Telegram n'ont jamais été créés », « rien ne tourne ». Le chantier 0 était **déjà fait** —
Telegram compris — depuis **trois semaines avant** la rédaction de l'audit. Le journal tournait
et notifiait quotidiennement.

**Ce qui reste vrai, et c'est le vrai diagnostic** : la boucle *journal + notification Telegram*
fonctionne, mais les trois couches au-dessus sont écrites et **inutilisées** — `leads` (le CRM),
`command_tasks` (le contrat de tâche) et `command_kpis` (la mesure) sont à zéro. Le système
raconte ce qu'il fait ; il ne sait ni qui sont les clients, ni ce qu'il doit finir, ni où il en
est.

**Et le nombre qui compte aujourd'hui : 29 événements attendent ta validation.** C'est le vrai
goulot d'étranglement — pas l'activation.

**Leçon de méthode** : un audit qui conclut « rien ne tourne » à partir de la seule lecture des
dépôts se trompe si le système est configuré ailleurs (variables Vercel, comptes tiers). Une
requête SQL sur la base de production l'aurait démenti en dix secondes. Vérifier le système
vivant, pas seulement son code source.

---

## Le diagnostic en une phrase (corrigé le 12/09)

**Le système tourne, notifie et journalise depuis le 20/08. Ce qui manque n'est pas
l'activation : c'est le passage de la trace d'activité à la connaissance client — et une
fiabilité qui ne cède pas au premier 504.**

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
