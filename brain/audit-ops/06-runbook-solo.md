# Runbook solo — ta journée et ta semaine

> Conçu pour **une seule personne**, sans assistant, depuis un téléphone.
> Tout passe par Telegram. Si une routine demande d'ouvrir un ordinateur, elle est mal conçue.

---

## La journée type

### 08 h 00 — Brief (5 min, au café)

Le job `morning-brief` t'envoie dans le chat `DAILY` :
- les leads entrants de la nuit, déjà qualifiés
- les relances dues aujourd'hui
- les échéances à moins de 72 h
- l'agenda du jour
- **3 actions recommandées, pas plus**

Tu lis. Tu ne réponds à rien tout de suite.

### 08 h 15 — Le contenu du jour

Le job `coco-contenu` t'envoie un brouillon de post (pilier en rotation) + le visuel Bloom.
**Un bouton.** ✅ publier · ✏️ corriger · ❌ passer.

### Au fil de la journée — les cartes de validation

Chaque lead entrant déclenche une carte Telegram avec un brouillon de réponse déjà rédigé,
dans la bonne langue, ancré sur le catalogue.
**Tu lis les 4 lignes. Tu appuies.** Si tu es sous l'eau ou sur le terrain, rien ne part —
c'est normal, et c'est mieux que l'inverse.

Plafonds quotidiens, pour que tu puisses réellement lire ce que tu valides :
**3 contenus · 5 relances · 3 partenaires.**

### 19 h 00 — Bilan (3 min)

Le job `evening-report` récapitule : ce qui est parti, ce qui attend encore, ce qui a échoué.
Si quelque chose attend depuis plus de 48 h, il remonte en tête.

---

## La semaine type

| Jour | Rituel | Durée |
|---|---|---|
| **Lundi** | `/status coco` · `/status rugby` · `/status diving` — où en est chaque activité | 10 min |
| **Mercredi** | `/tasks` — ce qui est en retard, ce qu'on abandonne | 5 min |
| **Vendredi** | `/kpi` — saisir `revenue_thb` de la semaine. **Le seul chiffre que le système ne peut pas deviner** | 5 min |
| **Dimanche 18 h** | Bilan hebdo automatique (`command-week`). Tu lis, tu arbitres la semaine suivante | 15 min |

**Total hebdomadaire de pilotage : ~40 minutes.**

---

## Les commandes à connaître

Elles existent déjà, toutes codées dans `src/command/commands.ts` :

| Commande | Usage |
|---|---|
| `/today` | Ce qui se passe maintenant |
| `/brief` · `/report` · `/week` | Rejouer un brief à la demande |
| `/status <projet>` | État d'une activité (`coco`, `rugby`, `diving`, `global`) |
| `/tasks` | Tâches ouvertes et en retard |
| `/approve <id>` · `/reject <id> [raison]` | Valider ou refuser une action A3 |
| `/delegate <projet> objectif \| fini quand … \| avant …` | Confier une tâche — **les 3 parties sont obligatoires** |
| `/kpi [projet] [métrique] [valeur]` | Saisir ou lire un chiffre |
| `/priority` · `/focus` | Réordonner |
| `/pause` · `/resume` | Mettre en veille — **ne suspend jamais les P0** |
| `/silence` | Couper le bruit sans couper les alertes |
| `/audit` | Ce qui a été fait, avec preuve |
| `/help` | Le rappel |

---

## Les règles que le système t'impose (et pourquoi c'est bien)

1. **Une tâche sans condition de fin est refusée.** « S'occuper des sponsors » n'est pas une
   tâche. « Envoyer les 3 relances Gold avant vendredi » en est une.
2. **Un `DONE` sans référence est marqué `UNVERIFIED`.** Dire que c'est fait ne suffit pas.
3. **Une métrique non saisie ressort `[À COMPLÉTER PAR CYRIL]`, jamais zéro.** Un zéro inventé
   est pire que pas de chiffre : il se propage dans les décisions.
4. **`/pause` ne suspend jamais un P0.** Une urgence sécurité passe toujours.
5. **Rien ne part si tu ne réponds pas.** Le silence n'est jamais un accord.

---

## Quand tu pars plonger / coacher / voyager

`/pause` met en veille les boucles B (relances, contenu, approches). Les boucles A continuent
(captation, qualification, journal, veille). Les P0 passent toujours.
`/resume` relance. Tu reçois alors un récapitulatif de ce qui a attendu.

C'est ce qui rend le système compatible avec une conduite à distance, y compris depuis la Suède.

---

## Ce que tu ne fais plus jamais

- Chercher « qui était cette personne » dans WhatsApp
- Écrire un premier jet de réponse à une demande standard
- Tenir un pipeline à la main
- Te souvenir d'une relance
- Rédiger un post de zéro
- Te demander ce qui a été envoyé ou non

## Ce que tu fais toujours toi-même

- Décider d'un prix hors catalogue
- Juger d'une aptitude à plonger
- Gérer un incident
- Signer quoi que ce soit
- Publier une photo d'enfant *(consentement parental — et pas d'exception)*
- Parler aux partenaires sensibles
- Coacher
- Arbitrer entre tes projets

---

## Le test de bonne santé du système

Une fois par mois, pose-toi trois questions :

1. **Ai-je validé sans lire, au moins une fois ?** Si oui, les plafonds sont trop hauts.
2. **Une carte est-elle restée sans réponse plus de 72 h ?** Si oui, la boucle ne sert à rien —
   la couper ou la corriger.
3. **Le bilan du dimanche contient-il des chiffres réels ?** Si non, le système tourne à vide.
