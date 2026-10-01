// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The public URL of the site. Used for canonical links, Open Graph tags and the sitemap.
  // If the domain ever changes, update it here (and in the GitHub Pages settings).
  site: 'https://cebrapartners.com',
  integrations: [
    sitemap({
      // /v2/ is a redesign preview; keep it out of the sitemap until it replaces the main site.
      filter: (page) => !new URL(page).pathname.startsWith('/v2/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
