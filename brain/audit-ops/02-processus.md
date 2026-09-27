# Étape 2 — Audit des processus

> Pour chaque parcours : déclencheur · étapes actuelles · acteurs et outils · données nécessaires ·
> résultat attendu · actions manuelles répétitives · erreurs possibles · coût en temps · priorité ·
> part automatisable.
>
> Le coût en temps est marqué `[À COMPLÉTER]` quand il dépend du volume hebdomadaire réel, qui
> n'est pas connu. La **fréquence** est en revanche établie par les registres.

---

## P1 — Acquisition et premier contact (les 4 projets)

| | |
|---|---|
| **Déclencheur** | Message WhatsApp, DM Instagram, soumission de formulaire, e-mail entrant, conversation sur le chat Coco |
| **Étapes actuelles** | Tu vois la notification → tu lis → tu réponds quand tu peux → parfois tu notes, souvent non |
| **Acteurs / outils** | Toi seul. WhatsApp (app perso), Instagram, Gmail/Superhuman, formulaires |
| **Données nécessaires** | Identité, canal, projet concerné, besoin, dates, taille de groupe, langue |
| **Résultat attendu** | Un lead enregistré, qualifié, avec une prochaine action datée |
| **Actions manuelles répétitives** | Recopier le contexte de tête à chaque message ; chercher « qui était cette personne déjà » |
| **Erreurs possibles** | Lead jamais enregistré (cas courant) ; double traitement du même prospect via deux canaux ; réponse tardive |
| **Coût en temps** | `[À COMPLÉTER]` — dépend du volume |
| **Priorité** | **P0** |
| **Automatisable** | **100 %** pour la captation, l'enregistrement et la déduplication. Le code existe : déduplication par empreinte `venture\|agent\|type\|summary`, fusion par personne (Instagram + WhatsApp) dans la table `leads` |

**Point noir structurel** : trois destinations incompatibles aujourd'hui — Supabase, Vercel KV,
e-mail FormSubmit non activé. Tant qu'elles coexistent, aucune vue client n'est possible.

---

## P2 — Qualification et réponse initiale

| | |
|---|---|
| **Déclencheur** | Lead enregistré |
| **Étapes actuelles** | Lecture, compréhension du besoin, rédaction d'une réponse depuis zéro |
| **Acteurs / outils** | Toi. Aucun gabarit systématisé en usage |
| **Données nécessaires** | Catalogue de prix, politiques (annulation, acompte, paiement, point de RDV, assurance, âge minimum), horaires |
| **Résultat attendu** | Réponse exacte, dans la langue du client, sous SLA |
| **Actions manuelles répétitives** | Réécrire les mêmes 10 réponses (prix, horaires, niveau requis, ce qui est inclus) |
| **Erreurs possibles** | **Promesse non tenable** : garantir une place, annoncer la météo ou la faune, donner un prix hors catalogue, se prononcer sur l'aptitude médicale |
| **Coût en temps** | `[À COMPLÉTER]` |
| **Priorité** | **P0** |
| **Automatisable** | **80 %** — brouillon généré, tu valides |

**Le code existe déjà et il est bon.** `jamin-depth/src/agents/roles/reception.ts` qualifie par
règles (langue, dates, taille de groupe, niveau, signaux de sécurité) — **zéro token** pour un
message normal. Deux gardes indépendantes : une matrice de types d'action (`money`, `booking`,
`publishing`, `legal`) et un garde mot-à-mot qui **refuse tout brouillon promettant** une place,
la météo, la faune, un délai de réponse, un prix hors catalogue ou une aptitude à plonger.

⚠️ **Ce qui le bloque** : les 9 `TODO` de `src/agents/config.ts`. Chaque champ vide bloque toute
une famille de réponses. **C'est le point le plus rentable de l'audit : 9 champs à remplir
débloquent un pan entier d'automatisation.** Coût : une heure de ta part. Gain : permanent.

---

## P3 — Devis et tarification

| | |
|---|---|
| **Déclencheur** | Demande qualifiée |
| **Étapes actuelles** | Prix de tête ou recopié ; corporate CSRA et Underwater Recovery = improvisation |
| **Données nécessaires** | Grille tarifaire complète et **unique** |
| **Erreurs possibles** | **Deux jeux de tarifs plongée coexistent** : OW 17 900 (`catalog.ts`) vs 16 728 (prompt `coco2/api/chat.js`). Un client peut recevoir deux prix différents selon le canal |
| **Priorité** | **P0** |
| **Automatisable** | **80 %** sur catalogue ; **0 %** hors catalogue (reste catégorie C) |

**Trous tarifaires bloquants** : Corporate CSRA `[À COMPLÉTER]` · Underwater Recovery
**aucune grille** · spécialités PADI et groupe privé `TODO`.

---

## P4 — Relance commerciale

| | |
|---|---|
| **Déclencheur** | Échéance de cadence atteinte sans réponse |
| **Étapes actuelles** | Tu y penses, ou pas. Le pipeline est tenu à la main |
| **Acteurs / outils** | `brain/pipeline.md`, brouillons Gmail/Superhuman |
| **Résultat attendu** | Relance envoyée à J+3/J+7 (lead) ou J+7/J+21 (école, sponsor), **max 2** |
| **Actions manuelles répétitives** | Relire 77 lignes de pipeline pour savoir qui relancer |
| **Erreurs possibles** | **Deux erreurs réelles et documentées** : (a) 16 relances écrites jamais envoyées, certaines depuis 37 jours ; (b) relance automatique envoyée **après un refus** (Samui Pro Nutrition, 11/08 puis 24/08) |
| **Priorité** | **P0** |
| **Automatisable** | **80 %** — détection d'échéance et rédaction automatiques, **envoi validé** |

**La règle est déjà écrite** (`brain/communication-playbook.md`) : J+3/J+7, J+7/J+21, max 2
relances, toute relance en brouillon. Elle n'est simplement appliquée par aucun mécanisme.
La veille des échéances < 72 h existe aussi : job `command-digest`, toutes les 30 min.

---

## P5 — Réservation, paiement, confirmation

| | |
|---|---|
| **Déclencheur** | Client dit oui |
| **Étapes actuelles** | **Plongée** : message au partenaire Discovery Divers, attente, confirmation. **CSRA** : le client vient, c'est tout |
| **Données nécessaires** | Disponibilité réelle — que tu ne détiens pas en plongée |
| **Erreurs possibles** | Promettre une place qu'on n'a pas |
| **Priorité** | **P1** |
| **Automatisable** | **0 % pour la confirmation elle-même** — et c'est volontaire |

**Garde structurelle à conserver telle quelle** : `execute.ts` ne confirme, ne modifie et
n'annule **jamais** une réservation, même approuvée — il renvoie `human-performed:<type>`.
`AVAILABILITY.canSystemHold = false`, `source: "partner_message"`. C'est correct : tu ne
détiens pas le stock. Ne pas « améliorer » ce point.

---

## P6 — Livraison, support, avis, fidélisation

| | |
|---|---|
| **Déclencheur** | Prestation effectuée |
| **Étapes actuelles** | Rien de systématique. Demande d'avis au cas par cas |
| **Résultat attendu** | Avis Google/TripAdvisor, réachat, parrainage |
| **Erreurs possibles** | Demander un avis trop tard, ou à quelqu'un de mécontent |
| **Priorité** | **P1** |
| **Automatisable** | **80 %** — déclenchement et rédaction auto, envoi validé |

Le rôle `reputation` existe dans `src/agents/`. Google Business Profile est documenté mais **non
branché** (`docs/agents/CONNECTORS.md` §4). C'est le levier le moins cher pour l'acquisition
plongée et rugby : un flux d'avis constant bat n'importe quelle campagne payante à ce budget.

---

## P7 — Prospection partenaires et sponsors

| | |
|---|---|
| **Déclencheur** | Décision de démarcher un segment |
| **Étapes actuelles** | Sourcing, scoring, rédaction, brouillon, **envoi manuel** |
| **Acteurs / outils** | Agents `communication` (CSRA) et `partenariats-concierge` (coco2), Superhuman |
| **État réel** | 62 prospects scorés (`brain/sponsor-prospects.md`) · 77 lignes de pipeline · **34 brouillons coco2 prêts** |
| **Erreurs possibles** | ⚠️ Les 34 brouillons coco2 contiennent **encore l'ancien lien `project-xm4pf`** — à corriger avant tout envoi, sinon 34 premiers contacts avec un lien mort |
| **Priorité** | **P1** |
| **Automatisable** | **80 %** — sourcing, scoring et rédaction auto ; envoi validé, **un par un pour les cibles à fort enjeu** |

Plafonds déjà décidés le 21/08 : **3 contenus, 5 relances, 3 partenaires par jour**. À conserver.

---

## P8 — Production, validation et publication de contenu

| | |
|---|---|
| **Déclencheur** | Calendrier éditorial (rotation de piliers) |
| **Étapes actuelles** | Agent rédige → brouillon dans le dépôt → **tu publies à la main** |
| **Acteurs / outils** | Agents `marketing` / `growth-concierge`, **Bloom** (branché, outil visuel par défaut depuis le 24/08), Postiz (partiel) |
| **État réel** | Posts coco2 #2 (02/09), #3 (04/09), #4 (06/09) restés « Brouillon — à valider ». **Seul le post #1 du 31/08 a été réellement publié**, manuellement. La salve du 07/09 n'est ni mergée ni validée |
| **Erreurs possibles** | **Publier une photo d'enfant sans consentement parental** — 4 photos bloquées depuis le 08/08. Publier « essai gratuit » alors que la politique est à 200 THB depuis le 11/09 |
| **Priorité** | **P2** |
| **Automatisable** | **80 %** — génération auto, **publication validée, toujours** |

Le job `coco-contenu` (cron `15 1 * * *`, ~08h15 Samui) compose déjà un brouillon quotidien,
le crée en `DRAFT` et envoie une carte Telegram à boutons. Il ne peut pas inventer un sujet :
`CONTENT_PILLARS` impose angle, plan bilingue et `mustNotClaim`. **Il ne tourne pas** — Telegram
n'est pas configuré.

---

## P9 — Reporting et pilotage

| | |
|---|---|
| **Déclencheur** | Quotidien 08 h / 19 h, hebdo dimanche 18 h |
| **Étapes actuelles** | Aucun reporting. Aucune valeur de KPI enregistrée nulle part |
| **Résultat attendu** | Savoir chaque matin ce qui bouge et ce qui bloque |
| **Priorité** | **P1** |
| **Automatisable** | **100 %** pour l'agrégation ; la saisie de `revenue_thb` reste manuelle |

Les jobs existent : `morning-brief` (08 h), `evening-report` (19 h), `command-week` (dimanche
18 h), `command-digest` (30 min). Les métriques `/kpi` existent : `leads`, `bookings`,
`signups`, `revenue_thb`, `content_published`, `prospects`. Règle saine déjà codée : une
métrique non saisie ressort `[À COMPLÉTER PAR CYRIL]`, **jamais zéro** — un zéro inventé est
pire que pas de chiffre.

---

## P10 — Gestion documentaire et administration

| | |
|---|---|
| **Déclencheur** | Devis, contrat, facture, document administratif |
| **Étapes actuelles** | Fichiers dispersés entre dépôts, Drive et machine locale |
| **État réel** | 4 contrats `.docx` dans `coco2/Contrats/`, devis X-Treme QT2026080001 (130 000 THB TTC), decks, 2 tableurs de prospection |
| **Erreurs possibles** | Travailler sur une version périmée ; ne pas retrouver un devis en négociation |
| **Priorité** | **P2** |
| **Automatisable** | **100 %** pour le classement et le nommage ; **0 %** pour l'engagement contractuel |

⚠️ **Angle mort** : `routing.ts` n'attribue **aucun titulaire** à la catégorie `finance` →
`UNASSIGNED = "[À COMPLÉTER PAR CYRIL]"`. Aucune facturation, aucun suivi de paiement,
aucun encaissement n'est outillé dans les trois dépôts. Aucun Stripe, aucun paiement nulle part.
C'est le plus gros trou fonctionnel du portefeuille après la base de leads.

---

## Synthèse des goulots, par gravité

| Rang | Goulot | Effet | Coût de la correction |
|---|---|---|---|
| 1 | **Aucun canal de validation branché** (Telegram absent) | Bloque **toutes** les boucles de catégorie B | ~30 min de config |
| 2 | **Aucune base de leads unique** | Pas de vue client, pas de relance fiable | ~2 h (schéma déjà écrit) |
| 3 | **9 `TODO` dans `config.ts`** | Bloque les réponses automatiques plongée | ~1 h de décisions |
| 4 | **16 messages prêts non envoyés** | Perte commerciale sèche, immédiate | ~1 h de tri |
| 5 | **Séquences Superhuman non maîtrisées** | Risque réputationnel actif | ~15 min |
| 6 | **Tarifs contradictoires** | Réponses fausses aux clients | ~30 min |
| 7 | **Pas de grille Underwater Recovery** | Bloque le projet à plus forte marge | ~1 h |
| 8 | **Aucun outil de facturation** | Pas de suivi d'encaissement | à arbitrer |

**Les 7 premiers coûtent moins d'une journée de travail cumulée.** C'est tout le sujet de cet audit.
