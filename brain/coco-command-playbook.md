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
| A0 — observer | collecte, analyse, lecture, classement | exécuté sans validation |
| A1 — préparer | brouillon, plan, contenu, réponse proposée | exécuté, mentionné au bilan |
| A2 — réversible | mise à jour interne, planification non publique | exécuté et notifié |
| A3 — externe/sensible | envoyer, publier, modifier une réservation ou des données client | **validation Telegram avant exécution** |
| A4 — critique | paiement, contrat, accès, remboursement, sécurité, incident client | **arrêt, alerte, attente d'instruction** |

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

Champs facultatifs, tous absents de la v1 : `task_id` (la tâche dont l'événement rend compte),
`category` (`sales | content | marketing | partner | operations | finance | support |
product`), `impact`, `reference_url` / `reference_id` (**la preuve**, voir section 10),
`error_message` (sur `FAILED` / `ERROR` uniquement), `repo`.

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

**Bilan du soir (19:00)** — ✅ Réalisé (mesurable) · 📈 Chiffres (leads, réservations,
inscriptions, prospects, CA confirmé, contenu publié, tickets traités) · ⚠️ À suivre ·
🎯 Demain (3 max).

**Bilan hebdomadaire (dimanche 18:00)** — résultats chiffrés · ce qui a généré le plus de
valeur (3 max, **preuve exigée**) · ce qui a échoué (3 max) · automatisations à améliorer ·
opportunités · une décision recommandée, ou l'aveu qu'il n'y en a pas.

**Tâche terminée**

```
[✅ TERMINÉ] #{ACTIVITÉ} #{CATÉGORIE}
Action : {ce qui a été fait}
Résultat : {la référence vérifiable}
Impact : {revenu, temps, risque évité}
Suite : {prochaine étape}
ID : {event_id}
```

**Arbitrage** — quand deux options se valent, ne jamais poser une question ouverte :

```
Décision nécessaire : {question}

Option A : {action + impact}
Option B : {action + impact}
Recommandation Coco : {A ou B} — {raison en une phrase}

Répondre : A / B / /approve {event_id}
```

Un chiffre que le système ne peut pas établir s'écrit `[À COMPLÉTER PAR CYRIL]`. Le CA
notamment : aucun encaissement ne transite par ces outils. Voir section 9.

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
| `/delegate [projet\|rôle] objectif` | ouvrir une tâche et l'attribuer |
| `/kpi [projet] [métrique] [valeur]` | saisir un chiffre que le système ne peut pas connaître |
| `/week` | bilan de la semaine (aussi envoyé le dimanche 18 h) |
| `/priority [sujet]` | mettre un sujet en tête du jour |
| `/focus [projet]` | mettre une activité en priorité opérationnelle |
| `/pause [cible]` · `/resume [cible]` | suspendre / reprendre les automatisations non critiques |
| `/audit` | actions, erreurs, validations et dépenses des 24 h |

`/pause` n'éteint jamais les P0 : mettre une activité en sourdine arrête le travail de fond,
pas l'alarme.

## 7. Le contrat de tâche

Une tâche déléguée n'est pas une phrase, c'est un engagement vérifiable. Le moteur
(`jamin-depth/src/command/tasks.ts`) **refuse** d'en créer une qui ne pourrait pas être close :

- un objectif de moins de 15 caractères — « marketing », « SEO » — est un thème, pas un but ;
- une condition de fin (`definition_of_done`) vide rend la tâche inclôturable ;
- une tâche de niveau A3 ou plus qui prétendrait se passer de validation est rejetée.

```
/delegate RUGBY relancer les écoles de Lamai | fini quand 5 brouillons prêts | avant 2026-09-01
```

Les deux options sont facultatives. Sans « fini quand », la condition écrite par défaut est
« objectif atteint et résultat journalisé avec une référence vérifiable » — et la réponse le dit.

Chaque tâche naît avec son événement (`task_id` ↔ `event_id`), et chaque clôture en écrit un
autre. Une échéance à moins de 72 h dont personne n'a écrit la suite remonte toute seule.

### Mauvaise tâche / bonne tâche

| ✖️ | ✅ |
|---|---|
| « Fais du marketing pour Jammin's Depths » | « Préparer 3 brouillons de Reels ciblant les Français arrivant à Samui sous 30 jours. Fini quand : 3 brouillons + légendes FR prêts à valider. Rien n'est publié sans `/approve`. » |

## 8. Routage des délégations

Le moteur route sur le couple **(activité, catégorie)** vers un agent qui existe réellement
(`jamin-depth/src/command/routing.ts`).

| Activité | sales / support | contenu / marketing | partenaires | opérations | produit |
|---|---|---|---|---|---|
| DIVING | `reception` | `content` | `ops` | `ops` | `[À COMPLÉTER PAR CYRIL]` |
| RUGBY | `communication` · `secretariat` | `marketing` | `communication` | `secretariat` | `webmaster` |
| COCO | `commercial-coco` · `qualite-coco` | `growth-concierge` | `partenariats-concierge` | `qualite-coco` | `dev-coco` |
| GLOBAL | `coco-command` | `coco-command` | `coco-command` | `coco-command` | `coco-command` |

**La catégorie `finance` n'a de titulaire nulle part** : aucun agent de Cyril ne touche à
l'argent. Une tâche financière s'ouvre avec `[À COMPLÉTER PAR CYRIL]` et lui revient.

Les rôles du mandat (`growth_director`, `diving_sales_agent`, `sales_crm_agent`,
`rugby_admin_agent`…) sont des **alias** vers ces agents — `/delegate` les accepte tels quels.
Ils ne correspondent à aucun fichier : créer seize agents pour coller au vocabulaire aurait
dédoublé l'équipe réelle.

Une sortie d'agent se vérifie avant d'être présentée à Cyril : un brouillon qui invente un
tarif, promet un délai ou cite un contact non vérifié repart à son agent avec la raison.

## 9. Les chiffres : saisis, jamais devinés

Aucun paiement, aucune réservation et aucune inscription ne transitent par le système. Il ne
peut ni les compter ni les extrapoler.

```
/kpi DIVING bookings 3 deux Open Water
/kpi RUGBY signups 2
```

Métriques : `leads`, `bookings`, `signups`, `revenue_thb`, `content_published`, `prospects`.

**Toute métrique non saisie sort `[À COMPLÉTER PAR CYRIL]` — jamais zéro.** Une absence de
saisie et un zéro constaté ne disent pas la même chose, et le jour où le bilan confond les
deux, plus personne ne le lit.

## 10. La preuve d'exécution

Un agent ne peut pas affirmer qu'une action a eu lieu sans référence vérifiable : URL, message
ID, commit, réservation, brouillon Gmail. Ce n'est pas une consigne mais une contrainte du
code — un événement `DONE` de type `ACTION` ou `RESULT` sans `reference_url` ni
`reference_id` ressort marqué **« non vérifié — aucune référence fournie »**, y compris quand
l'agent remplit lui-même son champ `impact` : la mention se surajoute au lieu de céder la place.

Conséquence directe : dans le bilan hebdomadaire, la rubrique « ce qui a généré le plus de
valeur » ne retient que ce qui a laissé une preuve.

## 11. Quand on interrompt Cyril

Immédiatement : urgence client ou sécurité · erreur de paiement, de réservation ou
d'automatisation · lead à forte valeur · message négatif public · tâche bloquée depuis plus de
30 minutes · échéance à moins de 24 h sans plan · dépense ou modification sensible · sortie
d'agent jugée peu fiable.

Tout le reste attend : événements identiques dédoublonnés, P2/P3 regroupés toutes les
30 minutes, le reste au brief ou au bilan.

## 12. Brancher un projet sur le journal

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

Champs facultatifs : `category`, `task_id`, `impact`, `reference_url`, `reference_id`,
`error_message`, `repo`. Voir la section 10 pour la contrainte de preuve.

État des branchements : `[À COMPLÉTER PAR CYRIL]` — au 20/08/2026, aucun projet autre que
DIVING n'émet encore d'événements.
