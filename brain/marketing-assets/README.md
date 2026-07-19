# Marketing assets — générateur de posters CSRA

Générateur de visuels de posts **aux couleurs et typos de la marque** (Fraunces + Schibsted
Grotesk chargées via Google Fonts, badge logo réel depuis `public/logo-badge-512.webp`).
Format **1080×1350** (4:5) — feed Instagram & Facebook.

> Ces posters typographiques ne remplacent pas les **vraies photos de séances** (recap terrain,
> live) — pour celles-là, utiliser des photos réelles avec **accord parental** si des enfants
> apparaissent. Le générateur sert aux posts « graphiques » : essai gratuit, annonces, covers de
> carrousel, sunset.

## Régénérer les visuels

```bash
# 1. Générer les fichiers HTML (logo auto-embarqué depuis public/)
node brain/marketing-assets/gen-posters.cjs /chemin/de/sortie

# 2. Rendre chaque HTML en PNG 1080×1350 via Chromium (headless)
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome   # chemin de l'env. remote
for p in poster-free-trial poster-kids-session poster-tournament poster-sunset-touch; do
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1080,1350 \
    --virtual-time-budget=9000 --default-background-color=00000000 \
    --screenshot="/chemin/de/sortie/$p.png" "/chemin/de/sortie/$p.html"
done
```

`--virtual-time-budget=9000` laisse le temps aux Google Fonts de se charger. Sans réseau,
les polices de repli (DejaVu Serif / Liberation Sans) prennent le relais.

## Palette (rappel `brain/marketing-playbook.md`)

| Rôle | Hex |
|---|---|
| Ink (petrol profond) | `#004848` |
| Palm (lagoon teal) | `#007890` |
| Fern | `#009090` / `#60c0c0` |
| Sand (crème chaud) | `#f0d890` |
| Clay (accent, parcimonie) | `#c07830` |

## Contenu produit (semaine 2026-07-20)

`semaine-2026-07-20/` :
- `programme.md` — calendrier éditorial complet IG + Facebook, captions FR/EN, hashtags, créneaux
- `poster-free-trial.png` — Vendredi · conversion essai gratuit
- `poster-kids-session.png` — Mercredi · carrousel « Une séance Kids, étape par étape »
- `poster-tournament.png` — Jeudi · annonce tournoi inter-écoles
- `poster-sunset-touch.png` — Dimanche · Adults sunset touch

## Améliorer / éditer

Modifier les blocs `posters` dans `gen-posters.js` (texte, mise en page). Pour une image
**photographique** (vraie ambiance rugby générée par IA), utiliser le connecteur **Bloom**
(marque déjà onboardée : *Coconut Samui Rugby Academy*) — nécessite des crédits Bloom sur le
workspace « Cyril's Team ».
