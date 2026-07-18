---
name: relances
description: >
  Lance l'agent communication pour l'audit des relances : croise brain/pipeline.md avec l'état
  réel de la boîte Gmail, liste qui doit être relancé, et prépare les brouillons de relance à
  valider. Utiliser quand Cyril demande ses relances ou tape /relances.
---

# /relances — audit et brouillons de relance

1. Lis `.claude/agents/communication.md`, `brain/pipeline.md` et
   `brain/communication-playbook.md`.
2. Si l'agent `communication` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `communication`). Sinon, applique toi-même ses instructions.
3. Workflow : vérifier dans Gmail si les contacts du pipeline ont répondu depuis → tableau
   « qui relancer, pourquoi, quelle cadence » → brouillons Gmail pour les relances validées
   par Cyril → mise à jour de `brain/pipeline.md`.

Rappels : brouillons uniquement, max 2 relances par contact, réponse à Cyril en français.
`$ARGUMENTS` peut cibler un contact précis (ex. `/relances alan`).
