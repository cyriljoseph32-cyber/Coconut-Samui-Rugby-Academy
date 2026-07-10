# Coconut Samui Rugby Academy — Website

The first structured rugby academy on Koh Samui. Static site built with
[Astro](https://astro.build) + Tailwind CSS, designed for Cloudflare Pages.

**Tagline:** Grow Strong Together.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Deploy (Vercel via GitHub)

1. Go to [vercel.com/new](https://vercel.com/new) and import this GitHub repo.
2. Framework preset: **Astro** (auto-detected via `vercel.json`) — build command
   `npm run build`, output `dist`. No changes needed, just click **Deploy**.
3. In Project → Settings → Git, make sure the **Production Branch** matches the
   branch that contains the site code (merge to `main` first, or point it at the
   feature branch).
4. Add the custom domain in Project → Settings → Domains.

Every push to the production branch then deploys automatically; other branches
get preview URLs.

## Before launch — replace placeholders

All contact placeholders live in **`src/config/site.ts`**:

- [ ] `whatsappNumber` — real number, digits only (e.g. `66812345678`)
- [ ] `email`, `instagram`, `location` (venue name, Google Maps URL, lat/lng)
- [ ] Forms (contact + newsletter) use [FormSubmit](https://formsubmit.co) → `SITE.email`, no key
      needed. Submit the contact form once after deploy, then click **Activate** in the one-time
      email FormSubmit sends to that inbox — after that every submission is delivered.
- [ ] `domain` here **and** `site` in `astro.config.mjs` + `Sitemap:` line in `public/robots.txt`
- [ ] GA4 + Microsoft Clarity snippets in `src/layouts/Base.astro` (commented stubs in `<head>`)
- [ ] Camp dates in `src/pages/camps-events.astro`
- [ ] Real photos in `src/pages/gallery.astro` (tiles are marked placeholders)
- [ ] Coach bios in `src/pages/about.astro`
- [ ] Set up Google Business Profile + Search Console (submit `/sitemap-index.xml`)

## Structure

- `src/config/site.ts` — single source of truth for contact details
- `src/data/programs.ts` — all program content (copy, FAQs, CTAs)
- `src/components/Logo.astro` + `LogoMark.astro` — "Palm Lineout" logo system
- `src/lib/schema.ts` — JSON-LD helpers (Course, Event, FAQ)
- `src/pages/` — one file per page; program pages generate from `programs.ts`

## Brand quick reference

Art direction "Island Grit" — editorial, type-led, asymmetric. All colour tokens
are OKLCH, defined once in `src/styles/global.css` under `@theme`, **sampled from
the official badge logo** (`public/logo-badge-*.webp`, from Instagram
@coconut_samui_rugby).

| Token | Role | Sampled from |
|---|---|---|
| `--color-ink` | Deep petrol — text, dark sections | badge outlines `#004848` |
| `--color-palm` | Primary lagoon teal | `#007890` |
| `--color-fern` | Living turquoise | `#009090`/`#60c0c0` |
| `--color-paper` | Warm cream background | badge ring `#f0d890` (lightened) |
| `--color-sand` | Cream surfaces | `#f0d890` |
| `--color-clay` | Coconut-husk accent — used sparingly | `#c07830` |
| Display font | Fraunces Variable (optical serif) | — |
| Body font | Schibsted Grotesk Variable | — |

Coaching languages are French & English (per the Instagram bio) — reflected in
hero stats, mission copy and the Kids program FAQ.

Base element styles are wrapped in `@layer base` so Tailwind utilities always win.
Buttons: use `paper` / `outlinePaper` variants on dark backgrounds (never override
colours via `class`, or conflicting utilities cancel out).
