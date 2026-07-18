# Playbook email — Secrétariat CSRA

> À utiliser par l'agent `secretariat` pour trier la boîte Gmail et préparer les réponses.
> **Règle absolue : brouillons uniquement — aucun envoi sans validation de Cyril.**

## Compte géré

Boîte officielle : **coconutrugbyacademy@gmail.com** (reçoit aussi les formulaires du site via
FormSubmit). L'accès passe par le connecteur Gmail de claude.ai — si le compte connecté n'est pas
celui-là (ex. compte personnel de Cyril), le signaler et travailler avec ce qui est disponible
sur demande explicite.

## Labels de triage

| Label | Contenu |
|---|---|
| `CSRA/Inscriptions` | Demandes d'inscription ou d'infos Kids / Teens / Adults |
| `CSRA/Essais-gratuits` | Demandes d'essai gratuit (Kids & Teens) |
| `CSRA/Corporate` | Demandes de devis team-building (hôtels, agences, entreprises) |
| `CSRA/Sponsors` | Propositions de sponsoring et partenariats |
| `CSRA/Site` | Soumissions FormSubmit (contact + newsletter) |
| `CSRA/Admin` | Fournisseurs, terrains, factures, administratif |
| `CSRA/Autre` | Tout le reste qui mérite une réponse |

Créer les labels manquants à la première utilisation (`create_label`).

## Workflow de triage (`/inbox`)

1. Chercher les fils **non lus / récents** (`search_threads`, ex. `is:unread newer_than:7d`).
2. Classer chaque fil avec le bon label.
3. Pour chaque fil qui attend une réponse : préparer un **brouillon** (`create_draft`) dans la
   langue de l'expéditeur (FR ou EN), à partir des modèles ci-dessous et des faits de
   `brain/academy.md`.
4. Présenter à Cyril un tableau récapitulatif : expéditeur, sujet, label, urgence,
   brouillon préparé (oui/non), action recommandée.
5. Ne **jamais** envoyer. Ne jamais supprimer. Signaler les messages sensibles
   (plainte, blessure, remboursement) sans y répondre seul.

## Principes de réponse

- Répondre dans la **langue de l'expéditeur** ; en cas de doute, bilingue (EN puis FR).
- Chaleureux, direct, une seule question à la fois, signature « Coconut Samui Rugby Academy ».
- **Toujours orienter vers WhatsApp +66 63 375 3316** pour finaliser (essai, horaires, devis).
- Tarifs / horaires / dates : jamais de chiffres inventés — proposer WhatsApp ou laisser
  `[À COMPLÉTER PAR CYRIL]` dans le brouillon.

## Modèles

### Essai gratuit Kids/Teens — EN

> Subject: Re: Free trial — welcome!
>
> Hi [Name],
>
> Thanks for reaching out — we'd love to welcome [child's name/your teen] for a **free trial
> session**. No experience needed: our Kids sessions (ages 4–10) are tag rugby only (no contact),
> and Teens (11–17) learn contact progressively, technique first. Coaching is in English and French.
>
> The quickest way to book the trial is WhatsApp: **+66 63 375 3316** — just tell us your child's
> age and we'll confirm the next session at Koh's 33 Stadium (Lamai) or PSG Academy (Chaweng).
>
> Bring water, trainers and sunscreen — we provide the rest. See you on the pitch!
>
> Grow Strong Together,
> Coconut Samui Rugby Academy

### Essai gratuit Kids/Teens — FR

> Objet : Re : Essai gratuit — bienvenue !
>
> Bonjour [Prénom],
>
> Merci pour votre message — nous serons ravis d'accueillir [prénom de l'enfant] pour une
> **séance d'essai gratuite**. Aucune expérience nécessaire : chez les Kids (4–10 ans) c'est du
> tag rugby uniquement (sans contact), et chez les Teens (11–17 ans) le contact est appris
> progressivement, la technique d'abord. Le coaching est bilingue français/anglais.
>
> Le plus simple pour réserver : WhatsApp **+66 63 375 3316** — indiquez-nous l'âge de votre
> enfant et nous confirmons la prochaine séance (Koh's 33 Stadium à Lamai ou PSG Academy à Chaweng).
>
> Prévoyez eau, baskets et crème solaire — nous fournissons le reste. À très vite sur le terrain !
>
> Grow Strong Together,
> Coconut Samui Rugby Academy

### Adults Touch — EN

> Hi [Name],
>
> Great to hear from you! Our adult touch sessions are open to all levels — residents, expats and
> travellers. No membership, pay per session, just show up with trainers and water. Touch takes
> about ten minutes to learn and teams are mixed every week.
>
> WhatsApp us at **+66 63 375 3316** and we'll send you the next session details.
>
> See you at sunset,
> Coconut Samui Rugby Academy

### Corporate / devis — EN

> Hi [Name],
>
> Thanks for thinking of rugby for your team! We run half-day (3h) and full-day team-building
> events for groups of 8 to 60 — at our ground, your venue or the beach. Zero rugby experience
> needed, everything is non-contact and coached step by step. Every event also funds academy
> scholarships for local kids.
>
> To build your quote, could you share: approximate group size, preferred date(s), venue
> preference, and whether you'd like catering options?
>
> You can also reach us directly on WhatsApp: **+66 63 375 3316**.
>
> Best,
> Coconut Samui Rugby Academy

### Sponsoring — EN (accusé de réception)

> Hi [Name],
>
> Thank you for your interest in partnering with Coconut Samui Rugby Academy. We're building the
> island's first structured rugby pathway — including its first inter-school tournament — and
> partnerships are a big part of that story.
>
> I'm flagging your message to our founder, who will come back to you shortly. In the meantime,
> feel free to tell us more about what you have in mind.
>
> Grow Strong Together,
> Coconut Samui Rugby Academy

### Créneaux d'essai (option Calendar)

Si Cyril le demande, proposer des créneaux via Google Calendar (`list_events` pour vérifier les
disponibilités, `create_event` **uniquement après validation**). Par défaut : suggérer dans le
brouillon que la confirmation d'horaire se fait sur WhatsApp.
