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
  config/site.ts        Company name, email, description and the header menu links
  layouts/BaseLayout.astro  The page shell: header, footer, fonts
  components/           Reusable pieces (SeoHead, Header, Footer, Button)
  pages/                One file per page — the file name becomes the URL
    index.astro         → /  (hero, Acquire/Operate/Grow, About the founder, Contact)
    404.astro           → shown for unknown URLs
  styles/global.css     Design system: colours, fonts, Tailwind setup
  assets/images/        Photos and logo (automatically resized and converted to WebP)
public/                 Files copied as-is (favicon, hero contour drawing)
```

Old addresses `/about/` and `/v2/` redirect to the home page (set in `astro.config.mjs`).

## Design system

Defined in `src/styles/global.css`:

- **Type:** Fraunces (serif) for headings, Inter for body text and small uppercase labels (`eyebrow`).
- **Colours:** dark "ink" sections with light "fog" text, light "paper" sections with dark "body" text, and amber/violet brand accents. Every text colour pairing meets WCAG AA contrast (most meet AAA) — check any new pairing before using it for text.
- **Motion:** subtle fade-up on load (`enter`) and on scroll (`reveal`); both are switched off for visitors who prefer reduced motion.

## Common edits

**Change text** — edit the page in `src/pages/`. Company-wide details (email, description) live in `src/config/site.ts`.

**Add a new page** — create a file in `src/pages/`, e.g. `src/pages/portfolio.astro`:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---

<BaseLayout title="Portfolio" description="Businesses that are part of Cebra Partners.">
  <section class="bg-paper text-body">
    <div class="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <p class="eyebrow text-violet">Portfolio</p>
      <h1 class="mt-4 font-serif text-5xl font-semibold tracking-tight text-ink md:text-6xl">Our businesses</h1>
      <p class="mt-8 max-w-[65ch] text-lg leading-relaxed">…</p>
    </div>
  </section>
</BaseLayout>
```

It will be live at `/portfolio/`. To show it in the header menu, add `{ label: 'Portfolio', href: '/portfolio/' }` to `nav` in `src/config/site.ts`.

**Add a section to the home page** — copy one of the `<section>` blocks in `src/pages/index.astro` (dark: no background class; light: `bg-paper text-body`) and give it an `id` if the menu should link to it (e.g. `/#portfolio`).

**Change colours or fonts** — edit the `@theme` block in `src/styles/global.css`.

**Change the hero drawing** — it's `public/images/contours.svg`. Only use photos or artwork you own or have a licence for — the stock photo on the old Wix site is licensed for Wix sites only, so it isn't used here.

**Add or replace a photo** — drop the file in `src/assets/images/` and use it with Astro's `<Image>` component (see the About section in `src/pages/index.astro`).

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
