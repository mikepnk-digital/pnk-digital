# Astro Migration Plan — SEO-readable static site on existing CDK/AWS

**Goal:** Make every route server-render real HTML so search engines and social/AI crawlers can read the site, while keeping the S3 + CloudFront (CDK) infrastructure with minimal disruption.

**Decision:** Astro **static output (SSG)** + **full conversion, big-bang** (retire `react-router-dom`, `react-helmet`, and the SPA fallback). No SSR, no Lambda@Edge, no new CDK stacks.

---

## Problem statement

The site is a pure client-side SPA:
- `index.html` ships an empty `<div id="root">`; content, routing, and `<head>` tags are produced in-browser after JS runs.
- CloudFront maps all 403/404 → `/index.html` (200) — the SPA catch-all.
- `react-helmet` sets per-page meta client-side (used in all 11 pages) → crawlers that don't run JS (LinkedIn, Slack, ChatGPT, Perplexity) see a blank shell; Googlebot indexes it unreliably.

Astro pre-renders each route to static HTML at build time. Interactive React pieces become **islands**; surrounding copy is real HTML in the initial response.

## Target architecture

- Astro SSG, output to `dist/` (unchanged deploy target).
- React kept as islands via `@astrojs/react` for: framer-motion animations, `ParticleBackground`, `DataTransformationViz`, `GradientOrb`, `ContactForm`, `Navbar` mobile menu, `MarkdownRenderer` (if kept), audit mockups.
- Static marketing copy, headings, blog article body → server-rendered HTML.
- Tailwind v4 via `@tailwindcss/vite` (works unchanged; Astro runs on Vite).
- Contact form continues POSTing to API Gateway/Lambda (`VITE_API_URL`) — now read via `import.meta.env` inside the island.

## What gets replaced

| Today | With Astro |
|---|---|
| `react-helmet` (11 pages) | Shared `<BaseHead>` / `Layout.astro`, per-page meta as props |
| `src/lib/blog.ts` parser + `import.meta.glob` | Content Collections (typed schema, built-in `gray-matter`) |
| `scripts/generate-sitemap.js` | `@astrojs/sitemap` |
| `react-router-dom` (`App.tsx`, `main.tsx`) | File-based routes in `src/pages/` |
| `useHashNavigation` / router hooks | Astro routing + anchor links; keep hooks only inside islands |
| CloudFront 403/404 → index.html (200) | CloudFront Function URL rewrite + real `/404.html` |

## Route map (`src/pages/`)

| Current route | Astro file | Notes |
|---|---|---|
| `/` | `index.astro` | uses Layout |
| `/about` | `about.astro` | |
| `/services` | `services.astro` | |
| `/services/ai-employees` | `services/ai-employees.astro` | |
| `/blog` | `blog/index.astro` | lists collection |
| `/blog/:slug` | `blog/[slug].astro` | `getStaticPaths` from collection |
| `/contact` | `contact.astro` | ContactForm island |
| `/privacy-policy` | `privacy-policy.astro` | |
| `/terms-of-service` | `terms-of-service.astro` | |
| `/landing/web-developer-surrey` | `landing/web-developer-surrey.astro` | **no** Layout |
| `/audit` | `audit/index.astro` | no Layout |
| `/audit/:slug` | `audit/[slug].astro` | `getStaticPaths` from `prospects.ts`; no Layout |

`/work` + `/work/:slug` remain disabled (as in current `App.tsx`).

---

## Phases

### Phase 0 — Scaffold Astro
- Add deps: `astro`, `@astrojs/react`, `@astrojs/sitemap`.
- `astro.config.mjs`: `output: 'static'`, `site: 'https://pnk-digital.com'`, integrations `[react(), sitemap()]`, `vite: { plugins: [tailwindcss()] }`, `build: { format: 'directory' }`, `@` alias → `./src`.
- Update `package.json` scripts: `dev` → `astro dev`, `build` → `astro build` (drop the sitemap script call).
- Keep `dist/` as the output; CDK `s3deploy` is unchanged.

### Phase 1 — Base Layout + SEO
- `src/layouts/Layout.astro`: port `index.html` `<head>` verbatim (favicons, manifest, MS tiles, theme-color, fonts, gtag `AW-17989609549`).
- `<BaseHead>` component taking `title`, `description`, `ogImage`, `canonical`; renders OG + Twitter tags per page (replaces react-helmet).
- Move `src/index.css` import into Layout.

### Phase 2 — Blog Content Collection
- `src/content.config.ts`: `blog` collection with schema (`title`, `date`, `excerpt`, `category`, `tags[]`, `author` default "Mike Pink", `slug`, `published`).
- Move `content/blog/*.md` → `src/content/blog/` (or point loader at `content/blog`).
- Reading-time: keep `calculateReadingTime`; `getRelatedPosts` logic ports to a small util over the collection.
- Retire `src/lib/blog.ts` custom parser once pages consume the collection.

### Phase 3 — Convert all pages (big bang)
- Build each `.astro` page from Phase-0 route map; move static JSX to Astro markup, wrap interactive components as islands with the right directive:
  - `client:load` — above-the-fold interactivity (Navbar, Hero CTA).
  - `client:visible` — animations / below-the-fold (ParticleBackground, viz, blog cards, contact form).
- Blog article: render collection body with `remark-gfm` + `rehype-highlight` configured in `astro.config.mjs` `markdown` options (replaces `react-markdown` pipeline for article bodies).
- Delete `App.tsx`, `main.tsx`, and router usage; remove `react-router-dom`, `@dr.pogodin/react-helmet` from deps.
- Convert page-level `.jsx`/`.tsx` that were React pages; **shared UI components stay React** and render as islands or via Astro's JSX where static.

### Phase 4 — Sitemap
- `@astrojs/sitemap` auto-emits `sitemap-index.xml`; set changefreq/priority defaults; confirm `robots.txt` references it.
- Delete `scripts/generate-sitemap.js`.

### Phase 5 — CDK (`cdk/lib/stacks/website-stack.ts`)
- Add a **CloudFront Function** (viewer-request) that: appends `index.html` to URIs ending in `/`, and appends `/index.html` to extensionless paths (directory-index resolution for the OAC/REST S3 origin).
- Attach it to `defaultBehavior.functionAssociations`.
- Replace `errorResponses`: serve `/404.html` with **404** status (drop the 403/404 → index.html 200 SPA fallback). Optionally keep a 403→404.html mapping for S3 access-denied on missing keys.
- Everything else (bucket, OAC, ResponseHeadersPolicy/CSP, ACM cert, API/DB stacks, `s3deploy`) unchanged.
- CSP note: current `script-src 'self' 'unsafe-inline' 'unsafe-eval'` already covers Astro hydration + inline gtag — no change required.

### Phase 6 — Verify
- Local: `astro build` then `curl`/view-source `/`, `/services`, `/blog/<slug>` → assert real content + correct `<title>`/OG in the raw HTML (no JS).
- Deploy dev: `npm run cdk:deploy:dev`; verify routes, trailing-slash behavior, and a genuine 404.
- Post-deploy: resubmit sitemap in Google Search Console; spot-check with the LinkedIn Post Inspector / social debuggers.

---

## Risks & watch-items
- **Trailing slashes / URL format:** `build.format: 'directory'` yields `/about/`. Keep URLs consistent with current inbound links (the CloudFront Function + `trailingSlash` config must agree) to avoid redirect loops or 404s. Verify canonical tags match.
- **Islands hydration cost:** prefer `client:visible` over `client:load` for anything below the fold to keep the SEO/perf win.
- **React 19 + `@astrojs/react`:** confirm the integration version supports React 19 at implementation time.
- **`import.meta.env` vars:** `VITE_API_URL` / `VITE_ENVIRONMENT` still injected by Vite through Astro; confirm they resolve inside islands.
- **Analytics/audit pages:** the audit report pages read `prospects.ts` — ensure `getStaticPaths` enumerates them (they become publicly crawlable HTML; confirm that's intended, or add `noindex`).

## Net infra change summary
- **New:** one CloudFront Function (~30 lines), attached in the existing Website stack.
- **Changed:** `errorResponses` block; `build`/`dev` npm scripts.
- **Unchanged:** S3 bucket, OAC, security headers/CSP, ACM certificate, DNS, API + Database stacks, `s3deploy` deployment, `dist/` output path.
