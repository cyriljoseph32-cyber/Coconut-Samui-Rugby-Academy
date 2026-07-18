---
name: marketing
description: >
  Lance l'agent marketing de la Coconut Samui Rugby Academy pour créer un contenu :
  post ou reel Instagram, campagne, flyer, calendrier éditorial. Utiliser quand Cyril
  demande un contenu promotionnel ou tape /marketing [demande].
---

# /marketing — contenu marketing CSRA

Traite la demande de Cyril (`$ARGUMENTS` si fourni, sinon demande-lui ce qu'il veut produire)
en suivant **exactement** les instructions de l'agent marketing.

1. Lis `.claude/agents/marketing.md`, `brain/academy.md` et `brain/marketing-playbook.md`.
2. Si l'agent `marketing` est disponible comme sous-agent, délègue-lui la tâche via le tool
   Agent (subagent_type: `marketing`) et restitue son livrable. Sinon, applique toi-même les
   instructions de `.claude/agents/marketing.md`.
3. Livre un brouillon prêt à valider (caption FR/EN, hashtags, visuel, format, créneau).
   Rien n'est publié — Cyril valide.

Sans argument, propose par défaut : le prochain post du calendrier éditorial hebdomadaire.
