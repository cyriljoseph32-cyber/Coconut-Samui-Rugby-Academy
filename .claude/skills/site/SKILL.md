---
name: site
description: >
  Lance l'agent webmaster : mises à jour du site coconutsamuirugby.com (contenus, camps, bios,
  photos, SEO, checklist de lancement), avec build de vérification et travail sur branche.
  Utiliser quand Cyril demande une modification du site ou tape /site [demande].
---

# /site — mises à jour du site web

1. Lis `.claude/agents/webmaster.md`, `README.md` et `src/config/site.ts`.
2. Si l'agent `webmaster` est disponible comme sous-agent, délègue-lui via le tool Agent
   (subagent_type: `webmaster`). Sinon, applique toi-même ses instructions.
3. Workflow : modification dans `src/` → resynchroniser `brain/` si un fait change →
   `npm run build` doit passer → commit sur la branche de travail → push → URL de preview
   Vercel à Cyril. Jamais de push direct sur `main`.

`$ARGUMENTS` précise la demande (`/site ajoute les dates du camp`, `/site bios coachs`).
Sans argument : proposer les prochains items de la checklist de lancement du README.
