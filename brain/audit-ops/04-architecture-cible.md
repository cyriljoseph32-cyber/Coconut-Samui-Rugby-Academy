# Architecture cible

> Contrainte de conception retenue : **administrable par une seule personne**, dans une enveloppe
> de **20–60 €/mois**, sur le socle **dépôts Git + agents** déjà en place. Pas de Notion, pas
> d'Airtable, pas de CRM tiers.

---

## Principe : un seul cerveau, un seul canal, une seule base

```
┌──────────────── ENTRÉES ────────────────┐
│  WhatsApp      Instagram     Formulaires │
│  (+66 63 375 3316)  @granola51   site×3  │
│        Chat Coco        E-mail           │
└───────────────────┬──────────────────────┘
                    │
                    ▼
      ┌─────────────────────────────┐
      │   API d'ingestion unique     │  POST /api/command/events
      │   Bearer COMMAND_INGEST_TOKEN│  (déjà écrite et testée)
      └─────────────┬───────────────┘
                    ▼
      ┌─────────────────────────────┐
      │        SUPABASE              │  9 tables, schéma déjà écrit
      │  leads · queue_items         │  RLS activée, service_role only
      │  command_events · _tasks     │  déduplication par empreinte
      │  command_kpis · audit_log    │
      └─────────────┬───────────────┘
                    ▼
      ┌─────────────────────────────┐
      │      COCO COMMAND            │  jamin-depth/src/command/
      │  journal · tâches · KPI      │  4 activités : COCO DIVING
      │  niveaux A0 → A4             │  RUGBY GLOBAL
      └──┬────────────┬───────────┬──┘
         │            │           │
      A0–A2         A3          A4
    exécution    carte       arrêt +
     directe    Telegram      alerte
                   │
                   ▼
         ┌──────────────────┐
         │    TELEGRAM       │  6 chats : COMMAND · ALERTS · DAILY
         │  ✅ / ❌ / ✏️      │  PROJECT_COCO · _DIVING · _RUGBY
         │  /approve <id>    │  TELEGRAM_ALLOWED_CHAT_IDS = toi
         └──────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │  SORTIES (toutes validées)        │
    │  WhatsApp Cloud API · Superhuman  │
    │  Postiz (IG/FB) · Google Calendar │
    └──────────────────────────────────┘
```

---

## Ce qu'on ACTIVE (ne rien écrire — juste brancher)

| Composant | Où | Ce qu'il manque |
|---|---|---|
| Moteur COCO COMMAND | `jamin-depth/src/command/` | Rien. Variables d'env |
| 8 tâches planifiées | `jamin-depth/vercel.json` | `CRON_SECRET` (**à régénérer**) |
| Base Supabase | `supabase/schema.sql` | Projet créé + SQL exécuté + **SQL v2** jamais lancé |
| Validation Telegram | `src/agents/adapters/telegram.ts` | Bot + 6 chats + 4 variables |
| Ingestion inter-dépôts | `/api/command/events` | `COMMAND_INGEST_TOKEN` des deux côtés |
| WhatsApp Cloud API | `src/agents/adapters/whatsapp.ts` | 4 variables + webhook relié |
| Qualification par règles | `src/agents/roles/reception.ts` | **Les 9 `TODO` de `config.ts`** |
| Brouillon de contenu quotidien | job `coco-contenu` | Telegram |
| Capture de leads Coco | `coco2/api/lead.js` | Rediriger vers l'ingestion |

---

## Ce qu'on CONSTRUIT (peu, et seulement après activation)

1. **Émetteur d'événements côté CSRA** — n'existe pas aujourd'hui : le lien CSRA ↔ COCO COMMAND
   est humain, pas programmatique. ~50 lignes, calquées sur `coco2/api/_command.js`.
2. **Brancher la base de 201 fiches** sur le chat Coco, en remplacement du prompt statique.
   C'est du travail déjà payé qui ne sert à rien aujourd'hui.
3. **Grille tarifaire Underwater Recovery** — 5 lignes. Débloque le projet à plus forte marge.
4. **Tracking des clics affiliés** — sans lui, le revenu d'affiliation Coco est invérifiable.
5. **CI sur `jamin-depth`** — 35 fichiers de tests + 4 specs Playwright qui ne tournent **nulle
   part**. Un workflow de 20 lignes, calqué sur `coco2/.github/workflows/ci.yml`.

---

## Ce qu'on SUPPRIME

| À supprimer | Pourquoi |
|---|---|
| `coco2` : `coco_landing_v2.jsx`, `coco_landing_EN.jsx`, `coco_action_plan*.jsx`, `landing/`, `coco-preview.html` | Frontends morts, hors build Astro |
| `coco2` : fichiers résiduels `20MB`, `creating` (0 octet), `_synctest.txt` | Déchets |
| `coco2` : `public/` racine | Déjà marqué « ne pas éditer » — le supprimer évite l'erreur |
| Séquences automatiques Superhuman | Risque réputationnel avéré |
| Abonnement Zapier | Décision du 26/08. Telegram + WhatsApp Cloud API le remplacent |

**Et à geler par écrit** : `bot-trading-US`, `helmetik`, `Koh-s-33-stadium`. Un projet gelé et
daté ne coûte plus de charge mentale. Un projet « en attente » en coûte tous les jours.

---

## Budget mensuel

| Poste | Coût | Note |
|---|---|---|
| Supabase | **0 €** | Offre gratuite largement suffisante au volume actuel |
| Vercel | **0 €** | Hobby. ⚠️ **Vérifier le quota de crons** : 8 déclarés, dont un toutes les 30 min |
| Telegram | **0 €** | |
| WhatsApp Cloud API | **0 €** | 1 000 conversations de service/mois incluses |
| Postiz (ou équivalent) | **~15–20 €** | Planification IG/FB |
| API Anthropic | `[À COMPLÉTER]` | Les réponses par règles coûtent **0 token** ; seule la reformulation consomme |
| Google Business Profile | **0 €** | À brancher pour les avis |
| **Total maîtrisé** | **~15–20 € + usage IA** | Dans l'enveloppe |

Si le quota de crons Vercel est insuffisant : supprimer `command-digest`. Perte assumée =
regroupement P2/P3 et veille des échéances < 72 h. Les briefs quotidiens restent.

---

## Trois décisions structurantes

**1. Supabase devient la seule base de leads.**
`coco2` cesse d'écrire dans Vercel KV et pousse vers l'ingestion. CSRA reçoit son premier
émetteur. Une personne = une fiche, quel que soit le canal d'entrée.
*Alternative écartée* : garder KV. Elle échoue silencieusement et ne permet aucune vue client.

**2. Telegram devient le poste de commandement unique.**
Un seul endroit où tu valides. Pas WhatsApp (tu y travailles déjà, tu ne verrais rien), pas
l'e-mail (trop lent), pas un dashboard web (tu ne l'ouvrirais pas).
*Condition* : `TELEGRAM_ALLOWED_CHAT_IDS` limité à toi seul. Un bouton de validation accessible
à n'importe qui n'est pas une validation.

**3. Superhuman n'envoie plus seul.**
Séquences coupées. Brouillons uniquement, comme la règle du dépôt l'a toujours prévu.
*Non négociable* : la preuve est faite le 11/08.

---

## Ce qui reste hors périmètre, à trancher plus tard

- **Facturation et encaissement** : aucun Stripe, aucun paiement, aucun suivi dans les trois
  dépôts. `routing.ts` n'a **aucun titulaire** pour la catégorie `finance`. C'est le plus gros
  trou fonctionnel restant.
- **Structure suédoise** : décision repoussée à ~mai 2027 pour raison de coût de création et de
  gestion. L'architecture ci-dessus est pilotable à distance sans modification — c'est précisément
  pour cela qu'elle tient sur Telegram et Supabase plutôt que sur des présences physiques.
