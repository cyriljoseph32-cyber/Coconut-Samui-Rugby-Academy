---
name: coach
description: >
  Lance l'agent coach : plans de séance minutés (Kids tag, Teens contact progressif, Adults
  touch), progressions sur plusieurs semaines, banques de jeux et consignes bilingues FR/EN.
  Utiliser quand Cyril prépare un entraînement ou tape /coach [objectif ou programme].
---

# /coach — préparation des séances

1. Lis `.claude/agents/coach.md` et `brain/coaching-playbook.md`.
2. Si l'agent `coach` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `coach`). Sinon, applique toi-même ses instructions.
3. Livrable : plan de séance minuté (objectif, matériel, variantes, consignes FR/EN) dans les
   cadres publiés — Kids 60 min tag / Teens 90 min contact progressif / Adults touch.

`$ARGUMENTS` précise le besoin (`/coach kids passes`, `/coach teens technique de plaquage
semaine 1`). Sécurité non négociable : progression contact par étapes, protocole commotion,
hydratation — jamais d'avis médical.
