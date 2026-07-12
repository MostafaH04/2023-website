import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

try {
  process.loadEnvFile();
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const configuredSite = process.env.PUBLIC_SITE_URL;
const site = configuredSite ?? 'http://localhost:4321';

if (configuredSite) {
  const deploymentUrl = new URL(configuredSite);
  const hasPath = deploymentUrl.pathname !== '/';
  const isWebOrigin = ['http:', 'https:'].includes(deploymentUrl.protocol);

  if (!isWebOrigin || hasPath || deploymentUrl.search || deploymentUrl.hash) {
    throw new Error(
      'PUBLIC_SITE_URL must be an HTTP(S) origin without a path, query, or hash.',
    );
  }
}

const sitemapFilter = (page) => {
  const pathname = new URL(page).pathname.replace(/\/$/, '') || '/';
  return !['/404', '/projects/software', '/projects/hardware'].includes(
    pathname,
  );
};

export default defineConfig({
  site,
  output: 'static',
  build: {
    format: 'directory',
  },
  integrations: [react(), sitemap({ filter: sitemapFilter })],
  redirects: {
    '/projects/software': '/projects?category=software',
    '/projects/hardware': '/projects?category=hardware',
  },
});
