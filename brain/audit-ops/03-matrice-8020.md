# Étape 3 — Matrice 80/20 : automatisation et validation humaine

> **Principe directeur** : on ne conçoit pas un nouveau modèle de gouvernance. On allume celui
> qui est déjà écrit dans `jamin-depth/src/command/levels.ts`.
>
> | Catégorie | Niveau COCO COMMAND | Mécanisme |
> |---|---|---|
> | **A** — 100 % automatisable | A0–A2 | Exécution directe, journalisée |
> | **B** — 80 % + validation | **A3** | Carte Telegram 2 boutons → `/approve <event_id>` |
> | **C** — 100 % humain | **A4** | Arrêt + alerte + attente |
>
> Règles dures déjà codées, à conserver : une tâche sans condition de fin est **refusée**
> (`VagueTaskError`) · un `DONE` sans `reference_url` est marqué **`UNVERIFIED`** · `/pause` ne
> suspend **jamais** les P0 · un dépôt tiers ne peut **pas s'auto-approuver** (tout événement
> de niveau ≥ 3 entre en `WAITING_APPROVAL`).

---

## Catégorie A — Automatisable à 100 %

Répétitif, prévisible, faible risque, vérifiable. Aucune validation. Tout est journalisé.

| # | Tâche | Déclencheur | Mécanisme | Où ça vit | Statut |
|---|---|---|---|---|---|
| A1 | Enregistrer tout lead entrant | Message / formulaire / chat | Écriture dans `leads` | Supabase | **À activer** |
| A2 | Dédupliquer et fusionner les identités | Nouveau lead | Empreinte + fusion IG/WhatsApp/e-mail | `processed_events` | **Codé** |
| A3 | Étiqueter la conversation (projet, langue, intention) | Lead enregistré | Détection par règles, **0 token** | `roles/reception.ts` | **Codé** |
| A4 | Créer / mettre à jour la fiche client | Lead qualifié | Upsert | Supabase | **Codé** |
| A5 | Mettre à jour les statuts de pipeline | Action effectuée | `tasks.ts` | `command_tasks` | **Codé** |
| A6 | Synthétiser une conversation longue | Fin d'échange | Résumé ancré | `command_events` | **Codé** |
| A7 | Brief du matin (08 h) | Cron `0 1 * * *` | `morning-brief` → Telegram | `jobs.ts` | **À activer** |
| A8 | Bilan du soir (19 h) | Cron `0 12 * * *` | `evening-report` | `jobs.ts` | **À activer** |
| A9 | Bilan hebdo (dimanche 18 h) | Cron `0 11 * * 0` | `command-week` | `jobs.ts` | **À activer** |
| A10 | Veille des échéances < 72 h | Cron `*/30 * * * *` | `command-digest` + regroupement P2/P3 | `notify.ts` | **À activer** |
| A11 | Rappel de séance / de sortie | J-1 | Message sortant sur gabarit approuvé | `templates` | **À activer** |
| A12 | Agréger les KPI | Quotidien | `kpi.ts` | `command_kpis` | **À activer** |
| A13 | Classer et nommer les documents | Fichier ajouté | Convention de nommage | Dépôts / Drive | **À construire** |
| A14 | Journaliser toute action avec preuve | Toute action | `journal.ts` + `audit.ts` | `audit_log` | **Codé** |
| A15 | Détecter une déviation sécurité (P0) | Regex `safetyRe` | Réponse pré-écrite 6 langues + webhook + alerte | `coco2/api/chat.js` | **Actif** |

**Lecture** : 11 des 15 lignes sont déjà écrites. Le travail n'est pas de les coder — c'est de
renseigner les variables d'environnement.

---

## Catégorie B — 80 % automatisé, validation d'un geste

L'agent fait tout : détecte, rédige, prépare. **Tu appuies sur un bouton.** Si tu ne réponds pas,
rien ne part — jamais d'envoi par défaut.

| # | Tâche | Ce que fait l'agent | Ce que tu fais | Garde-fou codé |
|---|---|---|---|---|
| B1 | **Répondre à un lead entrant** | Qualifie, rédige dans la langue du client, ancre sur le catalogue | ✅ Envoyer / ✏️ Corriger / ❌ Rejeter | Garde mot-à-mot : refuse toute promesse de place, météo, faune, délai, prix hors catalogue, aptitude médicale |
| B2 | **Relancer selon la cadence** | Détecte J+3/J+7 ou J+7/J+21, rédige | ✅ Envoyer | **Max 2 relances** (`FOLLOW_UP.maxPerLead`) · jamais entre **20 h et 8 h** · jamais sur un dossier santé |
| B3 | **Envoyer un devis sur catalogue** | Compose depuis `catalog.ts` | ✅ Envoyer | Refus si le prix n'est pas au catalogue |
| B4 | **Publier un contenu** | Génère le brouillon du jour (pilier en rotation) + visuel Bloom | ✅ Publier via Postiz | `mustNotClaim` par pilier · **aucune photo d'enfant sans consentement** |
| B5 | **Approcher un partenaire / sponsor** | Source, score, rédige FR/EN | ✅ Envoyer, **un par un** au-dessus de 70/100 | Plafond **3 partenaires/jour** |
| B6 | **Demander un avis** | Détecte la fin de prestation, rédige | ✅ Envoyer | Jamais après un incident ou une réclamation |
| B7 | **Créer un événement agenda** | Prépare le créneau | ✅ Confirmer | Écriture Calendar **uniquement après accord explicite** |
| B8 | **Répondre à un commentaire public** | Rédige | ✅ Publier | Jamais sur un sujet sécurité ou médical |

**Plafonds quotidiens** (décidés le 21/08, à conserver) : **3 contenus · 5 relances · 3 partenaires**.
Ils existent pour que tu puisses lire ce que tu valides. Les augmenter, c'est revenir à valider
sans lire — donc à ne plus valider du tout.

---

## Catégorie C — 100 % humain, jamais automatisé

Aucune de ces lignes ne doit jamais passer en B, quelle que soit la pression.

| # | Décision | Pourquoi elle reste humaine |
|---|---|---|
| C1 | **Aptitude médicale à plonger** | Sécurité vitale. Aucune exception |
| C2 | **Gestion d'un incident de sécurité** | Déjà classé P0 / A4 : arrêt et alerte |
| C3 | **Confirmer / modifier / annuler une réservation** | Tu ne détiens pas le stock (`canSystemHold = false`). Le système renvoie `human-performed:` même approuvé |
| C4 | **Prix hors catalogue, remise, geste commercial** | Marge et positionnement |
| C5 | **Engagement juridique ou financier** | Contrat, bail, société, investisseur |
| C6 | **Publier une photo d'enfant** | Consentement parental. 4 photos bloquées depuis le 08/08 — elles restent bloquées |
| C7 | **Relation sensible partenaire** | Discovery Divers, écoles, Erik, avocat |
| C8 | **Recrutement, coaching, pédagogie** | Ton métier, pas celui d'un agent |
| C9 | **Trancher entre deux projets** | Arbitrage de fondateur |
| C10 | **Réactiver un projet gelé** | Décision écrite et datée, jamais par dérive |

---

## Où passe le 80/20 — répartition cible

| Catégorie | Part du volume de tâches | Ton temps |
|---|---|---|
| **A** — automatique | ~55 % | **0 %** |
| **B** — validée d'un geste | ~30 % | ~15 % (lecture + clic) |
| **C** — humaine | ~15 % | **~85 %** de ton temps, sur la valeur réelle |

**Total automatisé ou assisté : ~85 %.** L'objectif 80 % est dépassé — non pas en ajoutant des
automatisations, mais en allumant celles qui dorment.

---

## Ce qu'on n'automatise pas, et pourquoi

Trois tentations à écarter explicitement, parce qu'elles reviendront :

1. **Publication Instagram/Facebook sans relecture** (via Zapier + Meta Graph). Explicitement
   écartée dans le dépôt CSRA : risque de photo d'enfant sans accord parental. La décision tient.
2. **DM Instagram automatiques.** Hors périmètre technique de toute façon — la permission
   `instagram_manage_messages` exige une revue Meta. Ne pas y consacrer d'effort.
3. **Séquences d'e-mails autonomes** (le mode Superhuman actuel). La preuve est faite le 11/08 :
   une séquence non supervisée relance un prospect qui a déjà refusé. À couper.

Une automatisation qui envoie sans que personne ne lise n'est pas un gain de temps. C'est un
transfert de risque vers ta réputation.
