import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site, url }) => {
  const base = site ?? new URL(url.origin);
  const sitemap = new URL('sitemap-index.xml', base);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
