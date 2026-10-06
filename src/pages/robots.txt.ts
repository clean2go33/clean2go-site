import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';
// Production : tout est indexable. Passer PUBLIC_NOINDEX=1 pour un environnement de préproduction.
export const GET: APIRoute = () => {
  const block = import.meta.env.PUBLIC_NOINDEX === '1';
  const body = block
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /envoyer.php\nDisallow: /merci/\n\nSitemap: ${new URL('/sitemap-index.xml', SITE.url).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
