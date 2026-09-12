import type { APIRoute } from "astro";
import { SITE } from "../config/site";

/**
 * robots.txt généré, plus statique.
 *
 * Le fichier de `public/` annonçait en dur le sitemap sur coconutsamuirugby.com,
 * un domaine jamais enregistré : les robots suivaient donc un lien mort. En le
 * générant, l'URL du sitemap suit automatiquement `SITE.domain`, quel que soit
 * le domaine servi.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE.domain}/sitemap-index.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
