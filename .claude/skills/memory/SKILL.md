---
name: memory
description: >
  Lance l'agent memory : la mémoire transverse de tous les projets de Cyril (fiches, journal,
  briefs de contexte pour les autres agents). Utiliser quand Cyril demande où en est un
  projet, veut enregistrer une décision, resynchroniser la mémoire avec les dépôts, ou tape
  /memory [projet | sync | note <texte>].
---

# /memory — mémoire transverse des projets

Réponds à la demande : `$ARGUMENTS`

1. Lis `.claude/agents/memory.md` et `brain/memoire/index.md`.
2. Si l'agent `memory` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `memory`). Sinon, applique toi-même ses instructions.
3. Selon `$ARGUMENTS` :
   - *(vide)* → état des lieux de tous les projets, une page max : statut, dernière
     activité, prochaine étape par projet, à partir de `brain/memoire/`.
   - `<projet>` → restituer la fiche `brain/memoire/projets/<projet>.md` + vérifier sa
     fraîcheur (comparer au `git log` du dépôt s'il est présent dans l'environnement).
   - `sync` → resynchroniser fiches, index et journal avec les dépôts disponibles, puis
     lister ce qui a changé.
   - `note <texte>` → enregistrer la décision/avancée dans la fiche concernée + une ligne
     horodatée dans `brain/memoire/journal.md`, et confirmer à Cyril.

Toute mise à jour de `brain/memoire/` respecte les règles de l'agent (zéro invention,
horodatage, le code du dépôt fait foi, confidentialité) et est signalée à Cyril.
