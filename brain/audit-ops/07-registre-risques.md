# Registre des risques actifs

> Risques constatés dans le code et les registres au 11/09/2026. Chacun est sourcé.
> Gravité : 🔴 agir cette semaine · 🟠 sous 30 jours · 🟡 à surveiller

---

## 🔴 R1 — Relances envoyées après un refus

**Constat** : les séquences Superhuman non coupées ont réexpédié des mails à **Samui Pro
Nutrition les 11/08 et 24/08, alors qu'il avait refusé le 09/08**. Également Koh Fit (24/08) et
Elite Gym (15/08).
**Source** : `brain/pipeline.md`
**Impact** : réputation, sur une île où le réseau professionnel est petit et bavard.
**Traitement** : couper toutes les séquences automatiques (chantier 1.1). Tout envoi repasse par
brouillon validé, comme la règle du dépôt l'a toujours prévu.

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

## 🟠 R7bis — 15 doublons exacts dans les brouillons de prospection

**Constat (12/09)** : 33 brouillons pour 18 destinataires distincts. Le lot du 12/06 a été
recréé à l'identique le 27/07 (même texte, à l'octet près) — 15 brouillons sont donc des
doublons morts.
**Impact** : confusion à l'envoi, risque d'envoyer deux fois le même mail au même hôtel.
**Traitement** : suppression **non faite** — irréversible, en attente de l'accord explicite de
Cyril.

---

## 🟡 R7ter — numéro WhatsApp français dans la signature des 18 brouillons

**Constat (12/09)** : la signature des 18 brouillons porte `+33 6 62 72 61 99` (numéro
français), alors que tout le reste de Coco (cartes, QR, site) utilise `+66 63 375 3316`
(numéro thaï).
**Impact** : un hôtel de Samui devrait appeler la France pour joindre son concierge local.
**Traitement** : bascule **non faite** — en attente de la décision de Cyril.

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

*Mise à jour 12/09 — R7 clos (faux positif), R7bis et R7ter ouverts (décisions de Cyril
en attente).*

| Gravité | Nombre | Délai |
|---|---|---|
| 🔴 | 3 | Cette semaine |
| 🟠 | 4 (R7 → clos, R7bis ouvert) | Sous 30 jours |
| 🟡 | 6 (+ R7ter) | À surveiller |
| ✅ | 1 (R7) | Clos le 12/09 |

**Les 3 risques rouges se traitent en moins de 2 heures cumulées.**

**Correction de contexte (12/09)** : R1 (16 messages non envoyés, jusqu'à 37 jours) est en
réalité **plus grave côté prospection Coco AI** que ce que l'audit initial mesurait — les
brouillons d'approche hôtels dorment depuis **92 et 47 jours**, pas 37. Voir R7 ci-dessus.
