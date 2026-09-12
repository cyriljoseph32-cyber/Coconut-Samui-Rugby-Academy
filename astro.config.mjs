import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// L'URL publique du site, en un seul endroit.
//
// `coconutsamuirugby.com` a longtemps été écrit ici comme domaine cible, mais il
// n'a jamais été enregistré (confirmé par Cyril le 12/09). Les canoniques, le
// JSON-LD et le sitemap annonçaient donc à Google des URL qui ne résolvent pas.
// La valeur par défaut est l'origine qui sert réellement le site ; poser
// PUBLIC_SITE_URL suffira à basculer le jour où un domaine est acheté.
const SITE_URL = process.env.PUBLIC_SITE_URL || "https://coconut-samui-rugby-academy.vercel.app";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
