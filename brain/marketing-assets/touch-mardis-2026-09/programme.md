# Série Touch Rugby du mardi — Instagram + Facebook (suite sept.–oct. 2026)

> Suite de `touch-mardis-2026-08/` (couvrait les mardis 28/07 → 25/08, plus le poster ad hoc du
> 08/09 — voir décision de format ci-dessous). Événement inchangé : **Touch rugby, chaque mardi
> 19h–20h30, Koh's 33 Stadium (Lamai)** — sans contact, tous niveaux, adultes.

## Décision de format : on repart sur le poster graphique (pas Bloom en continu)

**Contexte** : le post du mardi 8/09 a rompu une fois avec le format de la série — visuel
photo-réaliste généré via Bloom (brand CSRA déjà onboardée) au lieu du poster typographique
habituel, publié avec succès (`brain/memoire/journal.md`, entrée 2026-09-06). La raison de
cette exception était ponctuelle : les 4 vraies photos Kids/Teens de l'académie restent
bloquées (accord parental non confirmé), donc pas de photo exploitable pour ce post-là — Bloom
a comblé le manque une fois.

**Recommandation pour la suite (15/09 → 13/10) : revenir au poster graphique plat**, comme
`touch-mardis-2026-08/`. Justification :

1. **Cohérence de marque** — le poster typographique (Fraunces + Schibsted Grotesk, palette
   Ink/Palm/Sand/Clay, badge logo) est le format qui a porté **cette annonce hebdomadaire
   récurrente depuis fin juillet** (5 semaines). C'est ce visuel-là que l'audience associe à
   « touch rugby du mardi » ; le switch du 8/09 était motivé par une contrainte (pas de photo),
   pas par une préférence créative actée par Cyril. Rebasculer *chaque* semaine sur un rendu
   photo-réaliste généré rendrait le rendez-vous hebdo moins reconnaissable, pas plus.
2. **Coût** — le générateur HTML→PNG local est gratuit et déterministe (aucun crédit Bloom
   consommé). Une génération Bloom par semaine, sur ~10 semaines, consomme des crédits du
   compte pro de Cyril pour un post récurrent à faible enjeu créatif (l'annonce ne change que
   la date) — les crédits sont mieux réservés à des contenus où le rendu photo apporte une
   vraie valeur (recap terrain, campagnes ponctuelles, futurs posts one-off comme le 8/09 en
   l'absence de vraie photo).
3. **Temps** — les 5 posters ci-dessous ont été générés et rendus en quelques minutes
   (script + Chromium headless, aucune attente). Bloom est asynchrone (~60–90 s par image) et
   mieux amorti sur des visuels à plus forte valeur ajoutée créative qu'une annonce datée
   récurrente.

**Si Cyril préfère au contraire généraliser le style Bloom** (photo-réaliste) pour toute la
série à partir de maintenant — cohérence avec le post du 8/09 déjà publié — c'est un choix
légitime et facile à basculer : le brief de génération Bloom est fourni en alternative
ci-dessous pour chacune des 5 dates, prêt à lancer sur confirmation. **Ce point reste à
trancher par Cyril** ; en l'absence de décision contraire, les visuels livrés dans ce dossier
sont les posters graphiques (option recommandée), déjà générés.

## Créneaux (5 posts — publication le dimanche soir, 2 jours avant la séance)

| Date de séance | Visuel | Publication prévue | Canaux |
|---|---|---|---|
| Mardi 15 septembre | `poster-touch-2026-09-15.png` | dimanche 13/09, 18h Samui | Instagram + Facebook |
| Mardi 22 septembre | `poster-touch-2026-09-22.png` | dimanche 20/09, 18h Samui | Instagram + Facebook |
| Mardi 29 septembre | `poster-touch-2026-09-29.png` | dimanche 27/09, 18h Samui | Instagram + Facebook |
| Mardi 6 octobre | `poster-touch-2026-10-06.png` | dimanche 04/10, 18h Samui | Instagram + Facebook |
| Mardi 13 octobre | `poster-touch-2026-10-13.png` | dimanche 11/10, 18h Samui | Instagram + Facebook |

## Légende (identique chaque semaine, date adaptée)

> Mise à jour vs. la série 08/2026 : le tarif Adults Touch est maintenant confirmé (350 THB la
> séance ou 1 200 THB le mois, confirmé par Cyril le 31/08/2026 — `brain/academy.md` ligne 68)
> et ajouté à la légende. L'ancienne série ne l'affichait pas car non confirmé à l'époque.

**FR** — Touch rugby ce mardi 🌴🏉 [Mardi X], 19h–20h30, Koh's 33 Stadium (Lamai). Sans contact,
tous niveaux, ambiance conviviale — résidents, expats, voyageurs : viens comme tu es.
350 THB la séance ou 1 200 THB le mois, sans engagement.
📲 DM ou WhatsApp +66 63 375 3316

**EN** — Touch rugby this Tuesday — [Tuesday X], 7–8:30pm, Koh's 33 Stadium (Lamai). No contact,
all levels, social vibe. 350 THB/session or 1,200 THB/month, no commitment. Just show up.

**Hashtags** — #touchrugby #kohsamui #samuiexpats #lamai #adultsrugby #growstrongtogether

## Régénérer les visuels (option retenue : poster graphique)

Le générateur dédié `gen-touch-poster.cjs` produit les 5 mardis de cette série (15/09, 22/09,
29/09, 06/10, 13/10). Même mise en page que `touch-mardis-2026-08/gen-touch-poster.cjs` (bloc
central titre/date/heure/lieu centré verticalement).

```bash
node brain/marketing-assets/touch-mardis-2026-09/gen-touch-poster.cjs /chemin/de/sortie
# puis rendre chaque .html en .png 1080×1350 via Chromium headless :
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
for p in poster-touch-2026-09-15 poster-touch-2026-09-22 poster-touch-2026-09-29 poster-touch-2026-10-06 poster-touch-2026-10-13; do
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1080,1350 \
    --virtual-time-budget=9000 --default-background-color=00000000 \
    --screenshot="/chemin/de/sortie/$p.png" "/chemin/de/sortie/$p.html"
done
```

Les 5 PNG de ce dossier ont déjà été générés et rendus de cette façon (police de repli
DejaVu Serif / Liberation Sans — la sandbox n'a pas accès à Google Fonts en sortie réseau ;
comportement identique à la série 08/2026).

## Brief de génération Bloom (option alternative — sur confirmation de Cyril)

Si Cyril demande de généraliser le style photo-réaliste du 8/09, voici le brief pour chacune
des 5 dates (brand CSRA déjà onboardée sur Bloom, `bloom_list_brands` /
`bloom_search_user_images` pour réutiliser des références) :

- **Prompt de base** (identique chaque semaine, seule la date/heure change dans l'overlay
  texte ajouté après coup, ou en légende Instagram plutôt que dans l'image) :
  *« Photo-realistic action shot of a mixed adult touch rugby game at sunset on a grass field
  in Koh Samui, Thailand — warm golden-hour light, players mid-pass or mid-run, casual social
  atmosphere, tropical palms in the background, Island Grit brand palette (deep teal #004848,
  lagoon teal #007890, warm sand #f0d890, clay accent #c07830) visible in the lighting/tone,
  no visible logos on clothing, no text overlay. »*
- **Format** : 1080×1350 (4:5), cadrage feed Instagram/Facebook.
- **Références** : réutiliser l'image du 8/09 (`bloom_search_user_images`) comme
  `reference_image_ids` pour garder une cohérence visuelle semaine après semaine.
- **Texte/date** : ajouté en légende (comme ci-dessus), pas incrusté dans le visuel — évite de
  regénérer l'image pour chaque date, un seul visuel « type » peut être réutilisé ou décliné.
- **Échec Bloom** (`content_safety` ou crédits épuisés) : retenter une fois sur le modèle
  `standard` si blocage de contenu ; sinon revenir au poster graphique pour cette semaine-là.

## Publication

- **Postiz** (recommandé) : `node brain/marketing-assets/postiz-push.cjs brain/marketing-assets/touch-mardis-2026-09/manifest.json`
  → crée les 5 posts en **brouillon**, prêts à programmer (nécessite `POSTIZ_API_KEY`, voir `../POSTIZ.md`).
- **Manuel** : coller la légende + le visuel de chaque mardi dans Meta Business Suite et programmer aux dates ci-dessus.

> ⚠️ Rien n'est publié sans la validation de Cyril. Publication en **brouillon** par défaut.
> Horaires/lieu confirmés (Koh's 33 Stadium, mardi 19h–20h30). Tarif confirmé (350 THB/séance,
> 1 200 THB/mois) — `brain/academy.md` ligne 68.
