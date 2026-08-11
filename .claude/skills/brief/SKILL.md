---
name: brief
description: >
  Point quotidien de l'assistant personnel de Cyril : résumé des emails en attente, agenda
  Google Calendar, rappels marketing et 3 actions recommandées. Utiliser quand Cyril demande
  son brief, son point du jour, ou tape /brief.
---

# /brief — point quotidien de Cyril

Produis le brief quotidien selon les instructions de l'assistant personnel.

1. Lis `.claude/agents/assistant-cyril.md` et `CLAUDE.md`.
2. Si l'agent `assistant-cyril` est disponible comme sous-agent, délègue-lui via le tool
   Agent (subagent_type: `assistant-cyril`). Sinon, applique toi-même ses instructions.
3. Structure fixe, en français, une page max :
   - 📬 Boîte mail (connecteur Gmail — messages en attente, urgences)
   - 📅 Agenda (connecteur Google Calendar — aujourd'hui + prochains jours)
   - 📣 Marketing (rythme du playbook : post prévu ? idée à valider ?)
   - ✅ 3 actions max, classées par impact
   - Une question utile pour finir

Avant de proposer un brouillon ou de redemander une décision déjà en suspens dans un brief
précédent (ex. « je prépare le brouillon de relance ? »), **vérifier d'abord dans Gmail** (mails
envoyés récents + `list_drafts`) si Cyril a déjà répondu ou déjà préparé un brouillon lui-même —
il agit souvent directement depuis son téléphone sans passer par l'agent. Si c'est le cas,
constater l'état réel (envoyé / brouillon en attente) au lieu de re-proposer une action déjà
faite, et mettre à jour `brain/pipeline.md` avec le contenu trouvé.

Si un connecteur est absent, produire le brief avec ce qui est disponible et indiquer
clairement la section manquante.
