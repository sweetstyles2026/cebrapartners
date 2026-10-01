# Cebra Partners website

The public website for Cebra Partners, built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com) and hosted for free on GitHub Pages.

Astro turns the pages in `src/pages/` into plain static HTML at build time, so the live site is fast, has no server to maintain, and ships almost no JavaScript.

## Running it on your computer

You need [Node.js](https://nodejs.org) 22.12 or newer (24 LTS recommended). On Windows:

```sh
winget install OpenJS.NodeJS.LTS
```

Then, from this folder:

```sh
npm install      # first time only: downloads the dependencies
npm run dev      # starts a local preview at http://localhost:4321 that reloads as you edit
```

Other commands:

| Command           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `npm run build`   | Builds the production site into `dist/`                       |
| `npm run preview` | Serves the built `dist/` folder locally                       |
| `npm run check`   | Type-checks the project                                       |
| `npm run format`  | Formats all files with Prettier (also sorts Tailwind classes) |

## Project layout

```text
src/
  config/site.ts        Company name, email, description and the navigation menu
  layouts/BaseLayout.astro  The page shell: background, header, footer
  layouts/V2Layout.astro    The page shell for the /v2/ redesign
  components/           Reusable pieces (SeoHead, SiteHeader, SiteFooter, ArrowButton)
  components/v2/        Pieces used only by the /v2/ redesign
  pages/                One file per page — the file name becomes the URL
    index.astro         → /
    about.astro         → /about/
    v2/index.astro      → /v2/ (redesign preview)
    404.astro           → shown for unknown URLs
  styles/global.css     Tailwind setup, brand colours and fonts
  styles/v2.css         Design system for the /v2/ redesign
  assets/images/        Photos and logo (automatically resized and converted to WebP)
public/                 Files copied as-is (favicon, background drawing)
```

## Common edits

**Change text** — edit the page in `src/pages/`. Company-wide details (email, description) live in `src/config/site.ts`.

**Add a new page** — create a file in `src/pages/`, e.g. `src/pages/portfolio.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="Portfolio" description="Businesses that are part of Cebra Partners.">
  <section class="page-grid pt-10 lg:pt-14">
    <div class="lg:col-start-2">
      <h1 class="font-display text-4xl font-bold sm:text-[50px] sm:leading-tight">Portfolio</h1>
      <p class="mt-4 max-w-3xl">…</p>
    </div>
  </section>
</BaseLayout>
```

It will be live at `/portfolio/`. To show it in the menu, add `{ label: 'Portfolio', href: '/portfolio/' }` to `nav` in `src/config/site.ts`.

**Change colours or fonts** — edit the `@theme` block in `src/styles/global.css`. For example `--color-sunrise` and `--color-dusk` are the two ends of the background gradient.

**Change the background** — the line drawing is `public/images/backdrop.svg`. To use a photo instead, put it in `public/images/` and change `--backdrop-image` in `src/styles/global.css`, e.g. `url('/images/my-photo.jpg')`. Only use photos you own or have a licence for — the stock photo on the old Wix site is licensed for Wix sites only, so it isn't used here.

**Add or replace a photo** — drop the file in `src/assets/images/` and use it with Astro's `<Image>` component (see `src/pages/about.astro`).

## The /v2/ redesign

`/v2/` is a single-page redesign with the same content, built on its own design system (`src/styles/v2.css`: Fraunces headings, Inter body text, IBM Plex Mono labels, dark "ink" and light "paper" sections with the orange-to-violet brand gradient as an accent). Every text colour pairing meets WCAG AA contrast. It doesn't share styles with the main site, so either design can change without affecting the other.

While it's a preview it is hidden from search engines (`noindex`, and left out of the sitemap). To make it the main site: move its content into `src/pages/index.astro`, then remove `noindex` from `V2Layout.astro` and the `/v2/` filter in `astro.config.mjs`.

## Publishing (GitHub Pages)

Every push to `main` builds and deploys the site automatically via `.github/workflows/deploy.yml`. Progress is visible under the repository's **Actions** tab.

### One-time setup

1. **Enable Pages:** on GitHub open the repository → **Settings → Pages** → under _Build and deployment_ set **Source** to **GitHub Actions**.
2. **Point the domain at GitHub (Namecheap):** Namecheap → **Domain List → Manage → Advanced DNS**. Delete the default parking records (the `CNAME` for `www` and the `URL Redirect` for `@`), then add:

   | Type         | Host  | Value                        |
   | ------------ | ----- | ---------------------------- |
   | A Record     | `@`   | `185.199.108.153`            |
   | A Record     | `@`   | `185.199.109.153`            |
   | A Record     | `@`   | `185.199.110.153`            |
   | A Record     | `@`   | `185.199.111.153`            |
   | CNAME Record | `www` | `sweetstyles2026.github.io.` |

   Optional IPv6 (AAAA records for `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

3. **Connect the domain:** back in **Settings → Pages**, enter `cebrapartners.com` under **Custom domain** and save. Once the DNS check passes (minutes to a few hours), tick **Enforce HTTPS**.
4. **Recommended:** verify the domain for your GitHub account (**profile Settings → Pages → Add a domain**) so no one else can claim it.

No `CNAME` file is needed in the repository: when deploying with GitHub Actions the custom domain is managed entirely from the Pages settings.

If the domain ever changes, update `site` in `astro.config.mjs` as well — it's used for canonical links, social previews and the sitemap.
