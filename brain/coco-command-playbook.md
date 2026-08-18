# COCO COMMAND — playbook opérationnel

> La doctrine du chef d'état-major : ce qui se journalise, ce qui se valide, ce qui se dit,
> et à qui. L'agent est `.claude/agents/coco-command.md` ; le moteur qui l'exécute en continu
> vit dans le dépôt `jamin-depth`, dossier `src/command/`
> (doc : `docs/agents/COCO-COMMAND.md`, mise en service : `docs/agents/DEPLOY.md` §5).

## 1. Les activités et leurs tags

| Activité | Ce que c'est | Dépôt | Tag |
|---|---|---|---|
| DIVING | Jammin's Depths — plongée & récupération sous-marine | `jamin-depth` | `#DIVING` |
| RUGBY | Coconut Samui Rugby Academy | `Coconut-Samui-Rugby-Academy` | `#RUGBY` |
| COCO | Coco front desk + Coco Samui Concierge | `assistant-ai`, `coco2` | `#COCO` |
| GLOBAL | transverse : admin, finances, arbitrages, outillage | — | `#GLOBAL` |

Tags de domaine ajoutés selon l'agent émetteur : `#MARKETING`, `#SALES`, `#ADMIN`.
`#URGENT` s'ajoute à tout P0 et à toute erreur.

⚠️ Deux « Coco » distincts : `assistant-ai` (front desk pour commerces) ≠ `coco2` (concierge
touristique). Toujours préciser lequel.

## 2. Les niveaux d'action

| Niveau | Ce que c'est | Traitement |
|---|---|---|
| 0 — observer | collecte, analyse, lecture, classement | exécuté sans validation |
| 1 — préparer | brouillon, plan, contenu, réponse proposée | exécuté, mentionné au bilan |
| 2 — réversible | mise à jour interne, planification non publique | exécuté et notifié |
| 3 — externe/sensible | envoyer, publier, modifier une réservation ou des données client | **validation Telegram avant exécution** |
| 4 — critique | paiement, contrat, accès, remboursement, sécurité, incident client | **arrêt, alerte, attente d'instruction** |

Deux règles qui ne se négocient pas :

- un `/approve` ne vaut que pour l'`event_id` qu'il nomme, exactement ;
- le niveau peut **durcir** un garde-fou existant, jamais l'assouplir. Si la policy d'un projet
  exige déjà une validation pour une action de niveau 1, elle l'exige toujours.

## 3. Le format d'un événement

```json
{
  "event_id": "evt_20260818_0900_ab12cd34",
  "timestamp": "2026-08-18T02:00:00.000Z",
  "venture": "RUGBY",
  "agent": "marketing",
  "type": "ACTION",
  "priority": "P2",
  "status": "PLANNED",
  "summary": "Post Instagram prêt pour la séance touch de mardi",
  "details": "Pourquoi : séance hebdomadaire\nImpact : visibilité locale",
  "links": [],
  "next_action": "validation de Cyril",
  "needs_owner": true
}
```

- `type` : `ACTION | BRIEF | ALERT | APPROVAL | RESULT | ERROR`
- `priority` : `P0` (humain tout de suite) → `P3` (arrière-boutique)
- `status` : `PLANNED | RUNNING | WAITING_APPROVAL | DONE | FAILED | BLOCKED`
- `needs_owner: true` place l'événement en attente de validation, quoi que dise `status`.
- L'`event_id` s'horodate à Bangkok : `evt_AAAAMMJJ_HHMM_<8 caractères>`.

Les lignes étiquetées de `details` (`Pourquoi :`, `Impact :`, `Détail :`, `Action prise :`,
`Décision :`) alimentent directement les formats ci-dessous — c'est le moyen de remplir une
carte riche sans sortir du format d'événement.

## 4. Les formats Telegram

**Action normale**
```
[✅ ACTION] #VENTURE #AGENT
Action : {summary}
Résultat : {résultat}
Impact : {impact}
Suite : {next_action}
ID : {event_id}
```

**Validation requise**
```
[⚠️ VALIDATION REQUISE] #VENTURE #AGENT
Proposition : {action exacte}
Pourquoi : {raison business}
Impact : {impact / risque}
Détail : {contenu, destinataire, montant, lien ou pièce}
Répondre : /approve {event_id} ou /reject {event_id}
ID : {event_id}
```

**Alerte**
```
[🚨 P0 — URGENT] #VENTURE
Problème : {incident}
Impact : {impact concret}
Action prise : {mesure de sécurisation}
Décision requise : {question précise}
ID : {event_id}
```

**Brief du matin (08:00 Asia/Bangkok)** — 1. priorités (5 max) · 2. RDV, plongées,
entraînements et échéances · 3. leads/clients (nombre + actions) · 4. blocages nécessitant
Cyril (3 max) · 5. opportunités du jour (3 max) · 6. plan proposé (une action par activité).
Terminer par : `Commandes : /today | /approve ID | /priority [sujet] | /status [projet]`

**Bilan du soir (19:00)** — ✅ Réalisé (mesurable) · 📈 Chiffres (leads, réservations, CA
confirmé, contenu publié, tickets traités) · ⚠️ À suivre · 🎯 Demain (3 max).

Un chiffre que le système ne peut pas établir s'écrit `[À COMPLÉTER PAR CYRIL]`. Le CA
notamment : aucun encaissement ne transite par ces outils.

## 5. Les quatre chats

| Chat | Ce qui y arrive |
|---|---|
| `CHAT_COMMAND` | les commandes privées de Cyril et leurs réponses |
| `CHAT_ALERTS` | urgences, échecs, anomalies, et tout ce qui attend un `/approve` |
| `CHAT_DAILY` | brief du matin, bilan du soir, récapitulatifs groupés |
| `CHAT_PROJECT_<ACTIVITÉ>` | le suivi détaillé d'une activité |

Si un seul chat est utilisé, les tags de la section 1 font le tri — c'est le repli prévu par
le moteur quand les variables ne sont pas renseignées.

## 6. Les commandes

| Commande | Effet |
|---|---|
| `/today` · `/brief` | priorités, agenda, leads, blocages, opportunités du jour |
| `/report` | bilan depuis le dernier rapport |
| `/status [projet]` | état, blocages, prochaine étape |
| `/tasks` | tâches ouvertes, triées P0 → P3 |
| `/approve <event_id>` | valider l'action exacte en attente |
| `/reject <event_id> [raison]` | refuser, la raison est archivée |
| `/delegate [projet] tâche` | attribuer à l'agent le mieux placé |
| `/priority [sujet]` | mettre un sujet en tête du jour |
| `/focus [projet]` | mettre une activité en priorité opérationnelle |
| `/pause [cible]` · `/resume [cible]` | suspendre / reprendre les automatisations non critiques |
| `/audit` | actions, erreurs, validations et dépenses des 24 h |

`/pause` n'éteint jamais les P0 : mettre une activité en sourdine arrête le travail de fond,
pas l'alarme.

## 7. Routage des délégations

| Activité | Agent par défaut | Où il vit |
|---|---|---|
| RUGBY | `assistant-cyril` (puis `marketing`, `secretariat`, `communication`, `coach`, `evenements`, `webmaster`) | ce dépôt |
| DIVING | `reception` (puis `booking`, `safety`, `content`, `reputation`, `ops`) | `jamin-depth/src/agents/roles/` |
| COCO | `dev-coco` / `commercial-coco` / `qualite-coco` / `onboarding-coco` (front desk) · `dev-concierge` / `data-concierge` / `growth-concierge` / `partenariats-concierge` (concierge) | `assistant-ai`, `coco2` |
| GLOBAL | `coco-command`, `memory` | ce dépôt |

Une sortie d'agent se vérifie avant d'être présentée à Cyril : un brouillon qui invente un
tarif, promet un délai ou cite un contact non vérifié repart à son agent avec la raison.

## 8. Quand on interrompt Cyril

Immédiatement : urgence client ou sécurité · erreur de paiement, de réservation ou
d'automatisation · lead à forte valeur · message négatif public · tâche bloquée depuis plus de
30 minutes · échéance à moins de 24 h sans plan · dépense ou modification sensible · sortie
d'agent jugée peu fiable.

Tout le reste attend : événements identiques dédoublonnés, P2/P3 regroupés toutes les
30 minutes, le reste au brief ou au bilan.

## 9. Brancher un projet sur le journal

Un dépôt pousse ses événements sur l'API du moteur :

```bash
curl -X POST https://<domaine-jamin-depth>/api/command/events \
  -H "Authorization: Bearer $COMMAND_INGEST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ … le format de la section 3 … }'
```

Le jeton donne le droit d'**écrire** dans le journal, jamais celui de décider : `needs_owner`
force l'attente de validation. Le projet relit la décision avec
`GET /api/command/events?since=<ISO>&venture=<ACTIVITÉ>`.

État des branchements : `[À COMPLÉTER PAR CYRIL]` — au 18/08/2026, aucun projet autre que
DIVING n'émet encore d'événements.
