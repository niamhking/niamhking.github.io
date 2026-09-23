// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The site is a GitHub Pages *user* site, so it is served from the domain root.
// `site` is required for canonical URLs, Open Graph tags and the generated sitemap.
export default defineConfig({
  site: 'https://niamhking.github.io',
  // Published straight from the branch: GitHub Pages is set to serve `/docs`
  // on main, so `npm run build` writes the site people actually visit.
  outDir: './docs',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Keep the build hermetic: every image is local, so no remote patterns are allowed.
    domains: [],
  },
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
