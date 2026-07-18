---
name: events
description: >
  Lance l'agent événements : rétroplanning et checklists pour un camp de vacances, le tournoi
  inter-écoles ou un événement corporate, avec coordination des autres agents. Utiliser quand
  Cyril organise un événement ou tape /events [type d'événement].
---

# /events — organisation d'événements CSRA

1. Lis `.claude/agents/evenements.md` et `brain/events-playbook.md`.
2. Si l'agent `evenements` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `evenements`). Sinon, applique toi-même ses instructions.
3. Livrable : rétroplanning daté (à partir du modèle J-45 → J+2), checklists, et la liste des
   tâches à déléguer (marketing, communication, secretariat, agenda).

`$ARGUMENTS` précise l'événement (`/events camp octobre`, `/events tournoi inter-écoles`,
`/events corporate hôtel X`). Dates, lieux et prix restent `[À COMPLÉTER PAR CYRIL]` tant que
non validés.
