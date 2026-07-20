# WhatsApp — canal d'envoi (via Zapier) — CSRA

> WhatsApp est le **canal de conversion nº 1** de l'académie (`+66 63 375 3316`,
> `wa.me/66633753316`). Ce playbook décrit comment les agents peuvent **envoyer** des
> messages WhatsApp — relances leads, réponses partenaires — via le connecteur **Zapier
> WhatsApp Business**, dans le respect de la règle de marque (validation de Cyril obligatoire).

## Décision de Cyril (2026-07-20) — Option A

- **Les conversations WhatsApp restent sur l'app du téléphone de Cyril.** C'est là qu'il lit
  et gère ses échanges au quotidien. On **ne migre pas** le numéro vers l'API Cloud.
- **Zapier sert uniquement à *envoyer*** des messages (relances, réponses) depuis les agents,
  quand Cyril le demande. WhatsApp Business est **déjà connecté** dans le Zapier de Cyril.

## Ce que le connecteur permet — et ne permet pas

| Capacité | Dispo ? | Détail |
|---|---|---|
| **Envoyer un texte** | ✅ | `send_freeform_message` — **seulement dans les 24 h** après le dernier message du contact |
| **Envoyer un template** | ✅ | `send_template_message` — hors fenêtre 24 h, **templates approuvés par Meta** uniquement |
| **Envoyer un média** (image/PDF) | ✅ | `send_media_message` — même fenêtre 24 h |
| **Lire une pièce jointe** | ⚠️ | `get_attachment` — nécessite un `media_id` précis (pas de navigation) |
| **Lire / lister les conversations** | ❌ | **Aucune action de lecture.** L'historique n'est pas accessible par API. |

> ⚠️ **La fenêtre des 24 h est la contrainte clé.** Un message libre ne part que si le contact
> t'a écrit dans les dernières 24 h. Pour relancer un lead plus ancien (J+3, J+7…), il faut un
> **template approuvé**. Sans template approuvé disponible → **on ne peut pas** envoyer via
> Zapier : Cyril écrit alors le message à la main depuis son téléphone.

## Workflow (WhatsApp n'a pas de « brouillon »)

Contrairement à Gmail, WhatsApp n'a pas de brouillon. Le circuit de validation est donc :

1. L'agent **prépare le texte** du message (FR ou EN selon le contact) et le **propose à Cyril**
   dans le chat — avec le destinataire et le rappel de la fenêtre 24 h.
2. Cyril **valide** explicitement (« envoie à X »).
3. **Seulement alors** l'agent envoie via l'action Zapier ci-dessous.
4. L'agent **journalise** l'envoi dans `brain/pipeline.md` (date, canal WhatsApp, contenu résumé).

> Jamais d'envoi WhatsApp sans le « oui » explicite de Cyril, exactement comme pour les emails.

## Action Zapier — référence technique (pour les agents)

Envoi d'un texte libre (fenêtre 24 h) :

- Outil : `execute_zapier_write_action`
- `selected_api` : `App228834CLIAPI` · `tool_name` : `whatsapp_business_send_freeform_message`
- `params` :
  - `recipient` — numéro au **format international** (ex. `+66633753316`)
  - `message_text` — le texte (≤ 4096 caractères)
  - `context_message_id` *(option)* — répondre en fil à un message précis
  - `preview_url` *(option)* — `include` pour afficher l'aperçu d'un lien, sinon `ignore`

Hors 24 h → `whatsapp_business_send_template_message` (template approuvé requis) ·
Média → `whatsapp_business_send_media_message`.

## Règles absolues (identiques aux autres canaux)

1. **Validation de Cyril obligatoire** avant tout envoi — WhatsApp est un canal public sortant.
2. **Rien d'inventé** : ni tarif, ni horaire, ni date de camp, ni nom de coach → `[À COMPLÉTER PAR CYRIL]`.
3. **Ton « Island Grit »**, bilingue FR/EN selon le contact ; concis (WhatsApp = messages courts).
4. **Photos d'enfants** : accord parental avant tout envoi d'image identifiant un mineur.
5. Après envoi validé, **mettre à jour `brain/pipeline.md`** (canal = WhatsApp).

## Si un jour Cyril veut *voir* WhatsApp dans le brain (non retenu aujourd'hui)

Lire les conversations exigerait de passer le numéro sur la **WhatsApp Business Cloud API**
(Meta) — incompatible avec l'app téléphone sur le même numéro — puis de créer un **Zap
déclencheur** « New Inbound Message » routant chaque nouveau message vers un stockage lisible
(libellé Gmail `CSRA/WhatsApp` ou Google Sheet). Cela ne récupère **pas** l'historique passé,
seulement les nouveaux messages. Option B (numéro dédié) ou C (migration) — à rouvrir seulement
sur décision explicite de Cyril.
