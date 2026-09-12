# Registre des risques actifs

> Risques constatés dans le code et les registres au 11/09/2026. Chacun est sourcé.
> Gravité : 🔴 agir cette semaine · 🟠 sous 30 jours · 🟡 à surveiller

---

## 🟠 R1 — Relances envoyées après un refus — **cause racine trouvée et colmatée (12/09)**

**Constat** : les séquences Superhuman non coupées ont réexpédié des mails à **Samui Pro
Nutrition les 11/08 et 24/08, alors qu'il avait refusé le 09/08**. Également Koh Fit (24/08) et
Elite Gym (15/08).
**Source** : `brain/pipeline.md`
**Impact** : réputation, sur une île où le réseau professionnel est petit et bavard.

**⚠️ Correction du 12/09 — l'audit n'avait vu qu'une moitié du problème.** Il attribuait R1 aux
seules séquences Superhuman à couper. En réalité **le code avait aussi un trou** : la garde
existait (`dueFollowUps()` ignore les leads au stade `lost`) mais elle était
**structurellement inatteignable** — `setStage()` existait sans qu'aucun appelant ne l'utilise
jamais, donc **aucun lead n'était jamais marqué `lost`**. *Une garde que personne ne déclenche
ne protège de rien.* Couper Superhuman n'aurait donc pas suffi : la première boucle de relance
automatisée aurait reproduit l'incident.

**Pire, découvert en instrumentant** : `mergeLead()` faisait `stage: input.stage` sans
condition, et l'ingestion inter-projets du chantier 2 upsert avec `stage: "new"` à **chaque
événement**. Un refus enregistré aurait été effacé au premier upsert suivant — R1 réintroduit
quotidiennement par le code d'activation lui-même.

**Traitement (PR jamin-depth #21, chantier 3)** — circuit refermé en trois points redondants :
1. `src/agents/refusal.ts` : détection d'un refus net FR/EN/TH (le refus **net** seulement —
   « je vais réfléchir » reste un lead à relancer) ;
2. `mergeLead()` : `lost` et `won` ne se rouvrent plus tout seuls, `optedOut` ne redevient
   jamais faux — seule une décision humaine rouvre ;
3. `execute.ts` : verrou avant **tout** envoi, quel que soit le chemin — c'est le seul point par
   lequel tout message sortant passe, donc le seul qui attrape un refus arrivé pendant qu'un
   brouillon attendait en validation.

Plus la colonne `opted_out` en base (exécutée le 12/09), qui double le stade `lost` — redondance
assumée : R1 a coûté assez cher pour mériter deux verrous plutôt qu'un.
**Reste vrai** : couper les séquences Superhuman (chantier 1.1) est toujours nécessaire — le
code ne protège que les envois qui passent par lui.
**Reclassé 🟠** : le mécanisme est colmaté et testé (scénario R1 rejoué à l'identique), mais le
volet Superhuman reste ouvert.

---

## 🔴 R2 — `CRON_SECRET` exposé en clair

**Constat** : la valeur a été exposée le 20/08. Le test réel de `GET /api/agents/cron/coco-contenu`
échoue en 401 tant qu'elle n'est pas régénérée.
**Source** : `brain/memoire/projets/jamin-depth.md`
**Impact** : quiconque détient l'ancienne valeur peut déclencher les tâches planifiées.
**Traitement** : régénérer (chantier 0.4). À traiter comme compromise, pas comme « probablement
sans conséquence ».

---

## 🔴 R3 — Perte silencieuse de leads

**Constat** : `coco2/api/_store.js` — sans `KV_REST_API_*` ni `UPSTASH_*`, les écritures sont des
**no-op silencieux**, et le rate-limit ne limite rien. Dernier recours : `console.log`.
L'en-tête du fichier note qu'une version antérieure écrivait dans `/tmp` et perdait tout.
**Impact** : un lead hôtelier peut disparaître sans aucun signal.
**Traitement** : vérifier la configuration en prod (chantier 1.9), puis migrer vers Supabase
(chantier 2.1).

---

## 🟠 R4 — Photos d'enfants sans consentement parental

**Constat** : 4 photos réelles de séances reçues le 08/08, publication **bloquée**, consentement
non confirmé.
**Source** : `brain/memoire/projets/coconut-samui-rugby-academy.md`
**Impact** : juridique et réputationnel, sans rattrapage possible après publication.
**Traitement** : elles restent bloquées. Catégorie **C10** de la matrice — aucune automatisation
de publication ne doit pouvoir y toucher. Obtenir un consentement écrit avant tout usage.

---

## 🟠 R5 — Tarifs contradictoires servis aux clients

**Constat** : PADI Open Water = **17 900 THB** (`jamin-depth/src/agents/catalog.ts`) vs
**16 728 THB** (prompt de `coco2/api/chat.js`). Écart sur 6 autres lignes.
**Impact** : deux clients obtiennent deux prix selon le canal. Perte de crédibilité, voire litige.
**Traitement** : choisir un jeu de tarifs et le propager (chantier 1.6). Source de vérité unique.

---

## 🟠 R6 — Communication publique périmée

**Constat** : `brain/marketing-drafts/semaine-2026-09-07.md` annonce encore « Essai gratuit /
Free trial », alors que la politique est à **200 THB payants depuis le 11/09**.
**Impact** : un parent se présente en attendant la gratuité.
**Traitement** : corriger (chantier 1.7) et vérifier qu'aucun visuel publié ne porte l'ancienne
mention.

---

## ✅ R7 — 34 brouillons de prospection avec un lien mort — CLOS (12/09)

**Constat initial** : les 34 brouillons Gmail de `Coco_AI_Prospection_RECAP.md` contiennent
encore l'ancien lien `project-xm4pf`.
**Correction (12/09)** : vérifié en direct — `coco-samui-concierge.vercel.app` répond en
**302 vers `coco-samui-ai.com`**. Le lien n'était donc **pas mort** : les mails auraient
fonctionné. R7 était un faux positif de l'audit. Ce qui clochait réellement : le traceur
`google.com/url` visible en clair dans le lien, et une erreur de fait sur les langues
proposées (« Russian » cité au lieu de « Thai » — Coco ne parle pas russe et parle thaï).
**Traitement** : **18 brouillons corrigés** (lien direct + langues + nettoyage HTML) sur les
18 destinataires distincts. Un doute distinct reste ouvert : voir R7bis.
**Impact réel, plus grave que R1 chiffré** : ces brouillons dorment depuis **92 jours** (lot du
12/06) et **47 jours** (lot du 27/07) — pire que les 37 jours annoncés dans R1/fuite n°1.

---

## ✅ R7bis — 15 doublons exacts dans les brouillons de prospection — CLOS (12/09, sans action)

**Constat initial** : 33 brouillons pour 18 destinataires distincts, un lot recopié à
l'identique.
**Vérification directe (12/09)** : Cyril a approuvé la suppression, mais **la boîte Gmail ne
contient que 18 brouillons au total** (`list_drafts` sans filtre, 19 éléments dans toute la
boîte dont 1 newsletter sans rapport) — aucun doublon, et la Corbeille ne contient aucun
brouillon de prospection (seulement des notifications GitHub). Les 15 doublons décrits dans
le rapport de la session précédente **n'existaient déjà plus** au moment de la vérification.
**Traitement** : rien à supprimer. Écart entre le rapport et l'état réel signalé pour mémoire —
aucune perte de données, aucune action requise.

---

## ✅ R7ter — numéro WhatsApp français dans la signature — CLOS (12/09, sans action)

**Constat initial** : la signature porterait `+33 6 62 72 61 99` au lieu du numéro thaï.
**Vérification directe (12/09)** : Cyril a approuvé la bascule, mais **les 18 brouillons
portent déjà `+66 63 375 3316`** — vérifié par relecture systématique des 18 corps de message
(`grep` sur le texte complet). Aucun numéro français trouvé nulle part dans la boîte.
**Traitement** : rien à corriger.

---

## 🟡 R7quater — traceur `google.com/url` toujours présent dans les 18 brouillons

**Constat (12/09)** : contrairement à ce que rapportait la session précédente, les 18
brouillons contiennent **toujours** le lien encapsulé dans un rewrite `google.com/url?q=...`
(vérifié sur les 18/18 corps). Horodatage du paramètre `ust=` strictement croissant avec
l'ordre de sauvegarde des brouillons — c'est **Gmail lui-même** qui réécrit tout lien externe
en redirection de sécurité au moment de l'enregistrement d'un brouillon HTML via l'API, pas
un artefact laissé par une correction incomplète.
**Impact** : cosmétique — le texte affiché reste `https://coco-samui-ai.com/` lisible, seul le
`href` sous-jacent passe par la redirection Google. Le lien fonctionne (redirection connue et
propre), ce n'est pas un traceur suspect au sens phishing.
**Traitement** : **aucune action possible côté contenu du brouillon** — Gmail réappliquera la
réécriture à chaque sauvegarde, quel que soit le contenu envoyé. À surveiller uniquement si un
destinataire s'en plaint ; sinon sans conséquence pratique.

---

## 🔴 R14 — Le journal COCO COMMAND s'arrête sans alerte sur un 504 de passerelle

**Constat (12/09, mesuré en base)** : dernier événement écrit à **01:18 UTC** (08:18 Bangkok)
alors que les crons tournaient toujours — **~11 h de silence**. 16 exécutions sur ~75 (21 %)
mouraient sur `PostgrestError: Supabase 504: Gateway Timeout`. Ni mise en veille (projet
`ACTIVE_HEALTHY`), ni volume (104 lignes), ni saturation de connexions : la passerelle PostgREST
rend un 504 par intermittence **pendant que la base répond normalement**. Un seul `fetch` sans
réessai ni timeout suffisait à tuer le cron entier.
**Impact** : le système qui pilote tous les projets devient muet, **et personne n'est prévenu** —
c'est la panne la plus coûteuse possible pour un outil dont le rôle est précisément de prévenir.
**Traitement** : réessai borné (3 tentatives, backoff 300/600 ms, timeout 8 s) sur 502/503/504 et
coupure réseau — PR jamin-depth #21, 8 tests figent le contrat. Les écritures simples ne sont
**pas** rejouées (un doublon dans le journal coûterait plus cher qu'un échec visible) ; seul
l'upsert `merge-duplicates`, idempotent, l'est.
**Reste ouvert** : rien n'alerte quand le journal cesse d'avancer. Un « chien de garde » (si
aucun événement depuis N heures → alerte Telegram) n'existe pas encore. À ajouter au chantier 4.

---

## 🟠 R15 — 29 validations en attente dans le journal, sans échéance

**Constat (12/09, mesuré en base)** : **29 des 104 événements** portent `needs_owner = true` —
donc 29 actions attendent l'accord de Cyril. Le plus ancien remonte au 20/08.
**Impact** : c'est le vrai goulot d'étranglement du système, et il était invisible dans l'audit
initial qui cherchait le blocage du côté de l'activation. Une boucle B ne sert à rien si les
cartes de validation s'empilent sans être traitées.
**Traitement** : à trier avec Cyril — `/command` liste les `needs_owner` en attente. Décider
pour chacun : valider, rejeter, ou requalifier en A0–A2 (pas besoin de validation). Un événement
qui attend depuis trois semaines n'avait probablement pas besoin d'une validation humaine.

---

## ✅ R13 — Domaine canonique `coconutsamuirugby.com` non enregistré — CORRIGÉ (12/09, PR #40)

**Constat** : le domaine annoncé partout comme site officiel — `src/config/site.ts`,
`astro.config.mjs`, JSON-LD de 3 pages, sitemap, `robots.txt`, et la redirection 303 de
`api/lead.js` — **n'est enregistré chez aucun registrar** (vérifié disponible à l'achat le
12/09).
**Impact réel** : un visiteur soumettant le formulaire d'essai sans JavaScript était redirigé
vers un domaine qui ne résout pas (erreur DNS) alors que son lead était bien enregistré côté
serveur — perte de conversion perçue sur un formulaire d'essai à 200 THB. Côté SEO, Google
recevait des canoniques/sitemap non indexables : aucune page n'était référençable sous
l'adresse déclarée.
**Traitement** : PR #40 — l'origine réelle de la requête remplace le domaine en dur
(`x-forwarded-host` côté API, `PUBLIC_SITE_URL` avec repli sur l'URL Vercel réelle côté site).
`SITE_DOMAIN`/`PUBLIC_SITE_URL` restent l'échappatoire si un domaine est acheté.
**Reste ouvert, pour Cyril seul** : `brain/academy.md` et le `CLAUDE.md` racine du dépôt
affichent toujours `https://coconutsamuirugby.com` comme site en ligne — à corriger le jour où
la décision de marque (racheter ce domaine ou en choisir un autre) est prise. Ce n'est pas un
risque technique, c'est une question de marque hors périmètre de cette correction.

---

## 🟡 R8 — Quota de tâches planifiées Vercel

**Constat** : `jamin-depth/vercel.json` déclare **8 crons**, dont `command-digest` toutes les
30 minutes. `docs/agents/DEPLOY.md` signale explicitement de vérifier le quota de l'offre.
**Impact** : des tâches ne s'exécutent pas, sans alerte.
**Traitement** : vérifier (chantier 0.10). Si insuffisant, supprimer `command-digest` — perte
assumée : regroupement P2/P3 et veille des échéances < 72 h.

---

## 🟡 R9 — Aucun test n'est exécuté sur `jamin-depth`

**Constat** : 35 fichiers de tests Vitest + 4 specs Playwright, **aucune CI** (pas de `.github/`).
Symétriquement, `coco2` et CSRA ont une CI mais aucun test unitaire.
**Impact** : une régression sur le moteur qui pilote tout passe inaperçue.
**Traitement** : workflow de ~20 lignes calqué sur `coco2/.github/workflows/ci.yml` (chantier 4.1).

---

## 🟡 R10 — Mémoire transverse désynchronisée

**Constat** : `brain/memoire/journal.md` s'arrête au **08/09**, alors que `main` a reçu 4 commits
depuis et que `brain/academy.md` porte des décisions datées du **11/09** (essai 200 THB, Kids
élargi 4–12 ans, fusion de créneau) qui ne sont **pas journalisées**. Le journal comporte aussi
une entrée hors ordre chronologique.
**Impact** : un agent qui lit la mémoire travaille sur un état faux.
**Traitement** : resynchronisation (faite dans le cadre de cet audit) + `/memory sync` régulier.

---

## 🟡 R11 — Aucun titulaire pour la catégorie `finance`

**Constat** : `jamin-depth/src/command/routing.ts` → `finance` = `UNASSIGNED =
"[À COMPLÉTER PAR CYRIL]"`. Aucun Stripe, aucun paiement, aucun suivi d'encaissement dans les
trois dépôts.
**Impact** : le seul domaine sans propriétaire est celui de l'argent.
**Traitement** : arbitrage à part (chantier 4.9). Hors périmètre de cet audit.

---

## 🟡 R12 — Dépendance à un partenaire unique en plongée

**Constat** : `AVAILABILITY.canSystemHold = false`, `source: "partner_message"`. Toute
réservation passe par Discovery Divers, par message.
**Impact** : ni le stock, ni le prix, ni le délai de réponse ne sont sous ton contrôle.
**Traitement** : pas de correction technique — c'est une **garde structurelle correcte**, à ne
pas « améliorer ». En revanche, `partnerResponseHours` doit être renseigné pour que le système
sache quel délai annoncer (chantier 1.5).

---

## Synthèse

*Mise à jour 12/09, deux passes : (1) le rapport de la session d'activation signalait R7bis
et R7ter comme ouverts ; (2) vérification directe dans Gmail montre que l'état qu'ils
décrivaient n'existait déjà plus — les deux sont classés clos sans action. R7quater ajouté
(comportement Gmail, hors du contrôle du contenu des brouillons).*

| Gravité | Nombre | Délai |
|---|---|---|
| 🔴 | 4 (dont **R14, actif en production**) | Cette semaine |
| 🟠 | 4 (dont **R15, 29 validations en attente**) | Sous 30 jours |
| 🟡 | 6 (+ R7quater) | À surveiller |
| ✅ | 4 (R7, R7bis, R7ter, R13) | Clos le 12/09 |

**Deux risques ajoutés le 12/09 après interrogation directe de la base de production** — ni
l'un ni l'autre n'était visible en lisant seulement les dépôts : R14 (journal gelé 11 h sur des
504 de passerelle, sans alerte) et R15 (29 validations en attente, la plus ancienne depuis le
20/08). C'est le même angle mort qui avait fait conclure à tort que « rien ne tourne ».

**Les 3 risques rouges se traitent en moins de 2 heures cumulées.**

**Correction de contexte (12/09)** : R1 (16 messages non envoyés, jusqu'à 37 jours) est en
réalité **plus grave côté prospection Coco AI** que ce que l'audit initial mesurait — les
brouillons d'approche hôtels dorment depuis **92 et 47 jours**, pas 37. Voir R7 ci-dessus.

**Leçon pour la suite** : un rapport texte (comme `ACTIVATION-12-09.md`) décrit l'état au
moment où il a été écrit, pas l'état au moment où il est lu. R7bis et R7ter en sont la preuve :
vérifier dans le système réel (ici, Gmail) avant d'agir sur une décision qui semble encore en
attente — l'action a pu être terminée entre-temps, ou par une autre voie.
