# Cebra Partners website

Static marketing site for Cebra Partners, built with Astro 7 + Tailwind CSS 4 and deployed to GitHub Pages at https://cebrapartners.com. See `README.md` for project layout and how to add pages.

## Workflow: every change goes live

The owner wants every edit published. After making any change:

1. `npm run format` then `npm run build` (and `npm run check` for code changes) — fix anything that fails before committing.
2. Commit directly to `main` with a clear message and push (`git push`). No feature branches or PRs.
3. The push triggers `.github/workflows/deploy.yml`. Confirm the run succeeded and the change is visible on https://cebrapartners.com.

## Notes

- Node.js is installed at `C:\Program Files\nodejs`; it may not be on the Bash tool's PATH, so call `"/c/Program Files/nodejs/node.exe" node_modules/astro/bin/astro.mjs build` if `npm` isn't found.
- Site-wide details (email, description, nav menu) live in `src/config/site.ts`; the domain lives in `astro.config.mjs` (`site`).
- `/v2/` is a redesign preview with its own design system: `src/styles/v2.css`, `src/layouts/V2Layout.astro`, `src/components/v2/`. It is `noindex` and excluded from the sitemap. Keep v2 classes out of `global.css` (it has `@source not` rules for these paths) and keep text contrast at WCAG AA or better.
- Don't use stock images from the old Wix site (licensed for Wix only); only use photos the owner provides.
- The custom domain, DNS (Namecheap) and HTTPS are configured outside the repo — no `CNAME` file is needed.
