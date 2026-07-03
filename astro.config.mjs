import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO: replace with the final production domain once registered.
export default defineConfig({
  site: "https://coconutsamuirugby.com",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
