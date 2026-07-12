# Mostafa Hussein Portfolio

## Local development

Requirements: Node 22.12+ and npm 10+.

```sh
nvm use
npm ci
npm run dev
```

Copy `.env.example` to `.env` and set `PUBLIC_SITE_URL` to the production origin before a deployment build. This value supplies canonical URLs, social metadata, robots, and the sitemap.

## Validation

```sh
npm run check
npm test
npm run build
npm run test:budgets
npm run test:links
npm run test:e2e
```

The browser suite covers the primary routes, theme persistence, mobile dialog behavior, filtering and URL state, redirects, media fallbacks, and axe accessibility checks. See `TESTING.md` for the full device and release matrix.

## Content and assets

- Project data and validation: `src/data/projects.ts`
- Shared tokens and responsive layout: `src/styles/global.css`
- Theme/header island: `src/components/SiteHeader.tsx`
- Project filter island: `src/components/ProjectFilter.tsx`
- Résumé links point to the maintained Google Drive document.
- Responsive project media: `public/images/projects/`

The site is emitted as static HTML. `/projects/hardware` and `/projects/software` are compatibility redirects to the unified filtered grid.

## Cloudflare Pages

Use `npm run build` as the build command. `wrangler.jsonc` declares `dist` as the Cloudflare Pages output directory, so it cannot retain the old Create React App `build` setting. Set `PUBLIC_SITE_URL` in the production environment to the public site origin for canonical URLs and the sitemap.

The pre-migration CRA component files with existing uncommitted edits are intentionally outside Astro's build graph so that work is preserved for review; the production entry points are exclusively in `src/pages/`.
