---
name: sponsors
description: >
  Lance l'agent communication en mode prospection : identifie des sponsors et partenaires
  potentiels sur Koh Samui (hôtels, écoles, commerces, marques sport), vérifie les contacts
  et prépare les emails d'approche FR/EN. Utiliser quand Cyril cherche des sponsors ou tape
  /sponsors [segment ou cible].
---

# /sponsors — prospection sponsors & partenaires

1. Lis `.claude/agents/communication.md` et `brain/communication-playbook.md`
   (segments cibles, modèles Bronze→Platinum, règles).
2. Si l'agent `communication` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `communication`). Sinon, applique toi-même ses instructions.
3. Workflow : proposer une liste de cibles **vérifiées** (WebSearch — jamais d'email deviné)
   → Cyril choisit → brouillons d'approche personnalisés → ajout au `brain/pipeline.md`.

`$ARGUMENTS` peut préciser un segment (`/sponsors hôtels Lamai`) ou une cible nommée.
Tout engagement (montants, contreparties, rendez-vous) reste la décision de Cyril.
