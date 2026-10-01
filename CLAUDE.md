# Cebra Partners website

Static marketing site for Cebra Partners, built with Astro 7 + Tailwind CSS 4 and deployed to GitHub Pages at https://cebrapartners.com. See `README.md` for project layout and how to add pages.

## Workflow: every change goes live

The owner wants every edit published. After making any change:

1. `npm run format` then `npm run build` (and `npm run check` for code changes) — fix anything that fails before committing.
2. Commit directly to `main` with a clear message and push (`git push`). No feature branches or PRs.
3. The push triggers `.github/workflows/deploy.yml`. Confirm the run succeeded and the change is visible on https://cebrapartners.com.

## Notes

- Node.js is installed at `C:\Program Files\nodejs`; it may not be on the Bash tool's PATH, so call `"/c/Program Files/nodejs/node.exe" node_modules/astro/bin/astro.mjs build` if `npm` isn't found.
- Site-wide details (email, description, header menu) live in `src/config/site.ts`; the domain and old-URL redirects live in `astro.config.mjs`.
- The site is a single page (`src/pages/index.astro`) using the design system in `src/styles/global.css` (Fraunces headings, Inter body/labels, ink/paper surfaces, amber/violet accents). Keep text contrast at WCAG AA or better; the owner disliked monospace "code" fonts, so don't use them.
- The owner removed an "Experience at a glance" highlights section (commit `0427c2d` has it) and may want it back later.
- Don't use stock images from the old Wix site (licensed for Wix only); only use photos the owner provides.
- The custom domain, DNS (Namecheap) and HTTPS are configured outside the repo — no `CNAME` file is needed.
