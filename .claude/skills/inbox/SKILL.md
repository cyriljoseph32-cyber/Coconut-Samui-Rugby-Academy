---
name: inbox
description: >
  Lance l'agent secrétariat de la Coconut Samui Rugby Academy : triage de la boîte Gmail,
  labels, et brouillons de réponses FR/EN. Utiliser quand Cyril demande de traiter ses
  emails ou tape /inbox [instruction optionnelle].
---

# /inbox — triage de la boîte mail CSRA

Traite la boîte Gmail selon les instructions de l'agent secrétariat.

1. Lis `.claude/agents/secretariat.md`, `brain/email-playbook.md` et `brain/academy.md`.
2. Si l'agent `secretariat` est disponible comme sous-agent, délègue-lui la tâche via le tool
   Agent (subagent_type: `secretariat`). Sinon, applique toi-même ses instructions avec les
   outils Gmail du connecteur claude.ai.
3. Par défaut (sans `$ARGUMENTS`) : triage des fils non lus des 7 derniers jours, labels,
   brouillons pour les messages en attente de réponse, puis tableau récapitulatif en français.

Rappels : **brouillons uniquement, jamais d'envoi, jamais de suppression**. Si le connecteur
Gmail est absent ou connecté au mauvais compte, le signaler à Cyril.
