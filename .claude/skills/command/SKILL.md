---
name: command
description: >
  Lance COCO COMMAND, le chef d'état-major : point transverse sur tous les projets de Cyril
  (rugby, plongée, Coco, global), arbitrage des priorités, délégation aux agents, préparation
  des actions qui demandent sa validation. Utiliser quand Cyril veut piloter l'ensemble plutôt
  qu'un projet, ou tape /command [brief | bilan | status <projet> | delegate <tâche> | approve <id>].
---

# /command — le chef d'état-major

Demande : `$ARGUMENTS`

1. Lis `.claude/agents/coco-command.md` et `brain/coco-command-playbook.md`.
2. Si l'agent `coco-command` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `coco-command`). Sinon, applique toi-même ses instructions.
3. Selon `$ARGUMENTS` :
   - *(vide)* ou `brief` → le brief opérationnel du jour, au format du playbook.
   - `bilan` / `report` → le bilan depuis le dernier point.
   - `status <projet>` → état, blocages et prochaine étape de l'activité (lire aussi
     `brain/memoire/projets/<projet>.md`).
   - `delegate <tâche>` → choisir l'agent, préparer le brief de délégation, le proposer.
   - `approve <event_id>` / `reject <event_id>` → rappeler que la validation se fait sur
     Telegram, sur l'identifiant exact, et où en est l'action.
   - `tasks` → tout ce qui est ouvert, du P0 au P3.

Rappels : niveaux 3 et 4 jamais exécutés sans accord explicite de Cyril ; zéro invention
(`[À COMPLÉTER PAR CYRIL]`) ; réponse en français, directe, lisible sur téléphone.
Le moteur (journal, Telegram, briefs automatiques) vit dans le dépôt `jamin-depth`,
`src/command/` — voir `brain/memoire/projets/jamin-depth.md`.
