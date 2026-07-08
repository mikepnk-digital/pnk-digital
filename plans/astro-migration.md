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

## Phase 0 status — DONE
- Installed `astro@7`, `@astrojs/react@6`, `@astrojs/sitemap@3` (React 19 compatible). Install needs `--force` on macOS because `@rollup/rollup-linux-arm64-gnu` is pinned in `dependencies` for the Linux CI build.
- Added `astro.config.mjs` (static output, `site`, `@` alias, Tailwind v4 Vite plugin, `VITE_*` env passthrough).
- Added parallel `astro`/`astro:dev`/`astro:build`/`astro:preview` scripts; left `dev`/`build` on Vite so the current site still ships until Phase 3.
- Smoke-tested: `astro build` produced real server-rendered HTML + sitemap; Vite build verified still working.
- **Finding for Phase 3:** `src/pages/` is Astro's reserved routing root, but it currently holds the React page components **and data files**. Astro ignores `.tsx`/`.jsx` there, but treated `src/pages/audit/prospects.ts` as an API endpoint route (`/audit/prospects`). Before converting, move data files (`prospects.ts`) to `src/data/`|`src/lib/`, and relocate the React page components (e.g. to `src/components/pages/`) so `src/pages/` contains only `.astro` routes.

## Phase 1 status — DONE
- `src/components/seo/BaseHead.astro` — all `<head>` content: favicons/manifest/MS tiles/theme-color, gtag (`AW-17989609549`), Inter fonts, per-page `title`/`description`/OG/Twitter, auto-`canonical` from `site`+path, optional `jsonLd`, optional `noindex`. Imports `src/index.css`.
- `src/layouts/Layout.astro` — `<html>`/`<body class="min-h-screen bg-abyss">` shell using BaseHead; nav/footer slots reserved for Phase 3.
- Layout-less pages (landing, audit) will use `BaseHead` directly.
- Verified: title/canonical/OG/JSON-LD render server-side; Tailwind v4 (`@theme` tokens) compiles through Astro's Vite pipeline.
- **Trailing-slash note:** `build.format: 'directory'` yields canonical `…/about/` (trailing slash). Current react-router uses no trailing slash. Phase 5 must make Astro `trailingSlash`, the CloudFront Function, and canonical tags agree to avoid redirects/duplicate-URL SEO issues.
- Per-page `page_view` gtag tracking from the old `Layout.tsx` `useEffect` is no longer needed — each Astro route is a full page load, so `gtag('config')` fires it automatically.

## Phase 2 status — DONE
- `src/content.config.ts` — `blog` collection via `glob` loader pointed at `./content/blog` (**no file move**); `id` derives from filename == existing slug/URL. Schema: `title, date (coerce→Date), excerpt, category, tags[], author(default "Mike Pink"), slug, published(default false)`.
- `astro.config.mjs` markdown — GFM on by default; replaced the old unthemed `rehype-highlight` with built-in **Shiki** (`github-dark`, `wrap`): themed, build-time, no client JS.
- `src/lib/posts.ts` — Astro-side helpers (`getPublishedPosts`, `getPostBySlug`, `getRelatedPosts`, `calculateReadingTime`, `formatDate`, `categories`). **`src/lib/blog.ts` left intact** so the current Vite build keeps working until Phase 3.
- Verified: 3 posts load newest-first, dates format, reading time computes, body renders to server HTML with auto heading-anchor `id`s.
- **Finding for Phase 3 (blog styling):** `.prose-custom` is **not** a CSS class — all blog markdown styling currently lives in `MarkdownRenderer.tsx`'s per-element `components={{…}}` className map (h2/p/ul/code/pre/blockquote/table…). Astro's native `<Content />` won't apply those. Port them to real CSS (a `.prose-custom { … }` block with descendant selectors) so server-rendered articles match the current look. Internal-link `<Link>` handling there becomes plain `<a>` (fine for MPA).

## Phase 3 status — DONE (big-bang conversion; builds 23 routes, all SSR)
Approach taken: each page kept as a React component but rendered as a **server-rendered island** (`client:load`) inside a thin `.astro` route — Astro SSRs the island to HTML at build (SEO fixed) and hydrates it (framer-motion + interactivity preserved). Minimal component-body churn.
- **Router retired via shim:** `src/lib/router.tsx` (SSR-safe `Link`→`<a>`, `useLocation`, `useParams`, `Navigate`, `Outlet`); swapped `react-router-dom` → `@/lib/router` across ~18 files. `react-router-dom` removed from deps.
- **Helmet retired:** stripped `<Helmet>` + import from all pages; SEO now flows through `Layout`/`BareLayout` props. About's Person JSON-LD moved to `about.astro`. `@dr.pogodin/react-helmet` removed from deps.
- **Layouts:** `Layout.astro` (Navbar `client:load` + `currentPath`, Footer `client:visible`); `BareLayout.astro` (no chrome) for landing + audit.
- **Param pages:** `BlogPostPage`/`AuditReportPage` take `slug` via prop; `blog/[slug]` uses the content collection for `getStaticPaths`, `audit/[slug]` uses `prospects.ts`.
- **Routes created:** index, about, services, services/ai-employees, blog, blog/[slug], contact, privacy-policy, terms-of-service, landing/web-developer-surrey (noindex), audit (noindex), audit/[slug] (noindex). WorkPage/CaseStudyPage stay disabled.
- **Entry retired:** deleted `App.tsx`, `main.tsx`, `components/layout/Layout.tsx`, root `index.html`. Scripts flipped to `astro dev`/`astro build`/`astro preview`.
- **Env fix:** `astro.config.mjs` now uses Vite `loadEnv` so `VITE_API_URL`/`VITE_ENVIRONMENT` are injected (Astro's client prefix is `PUBLIC_`, not `VITE_`). Verified the API Gateway URL is baked into the ContactForm island.
- **Verified per route:** SSR body content, per-page title/description/canonical, `og:type=article` on posts, About JSON-LD, `noindex` on landing/audit, contact `<form>` SSR.
- **Prose CSS (old Phase 5 task): not needed** — blog article keeps `MarkdownRenderer` (react-markdown SSRs inside the island), so its inline element styles carry over.

### Follow-ups (not blockers)
- **Sitemap includes noindex pages:** `@astrojs/sitemap` currently lists `/audit/*` and `/landing/*`. Add a `filter` in Phase 4 to exclude them (they're `noindex`).
- **Two blog data sources:** `src/lib/blog.ts` (glob, used by blog index/highlights/cards) + `astro:content` collection (used by `blog/[slug]` getStaticPaths). Works; consolidate later if desired.
- **Dead files — DELETED:** `vite.config.js`, `scripts/generate-sitemap.js` (+ empty `scripts/`), `vite-env.d.ts`, `src/pages/WorkPage.tsx`, `src/pages/CaseStudyPage.tsx`. Replaced Vite env types with `src/env.d.ts` (`astro/client` + `window.gtag` augmentation, still used by ContactForm); `tsconfig` include now `["src", ".astro/types.d.ts"]`.
- **Build-warning tidy-up — DONE:** moved all 12 React page components out of `src/pages/` into `src/react-pages/` (mirroring `landing/` + `audit/` subdirs; same depth under `src` so their internal imports are unchanged) and repointed the 12 `.astro` route imports. `src/pages/` now holds only `.astro` routes; build is warning-free.
- **Type-check:** `astro build` doesn't typecheck islands; run `astro check` sometime for TS coverage.
- **Confirm noindex intent** on `/audit` and `/landing/*` — set them noindex as a safe default; flip if you want them indexed.

## Phase 4 status — DONE (sitemap)
- `@astrojs/sitemap` `filter` excludes `/audit/*` and `/landing/*` (noindex). Verified `sitemap-0.xml` lists only indexable clean URLs.

## Phase 5 status — DONE (CDK / CloudFront) — synth verified, not yet deployed
- **URL format settled: no trailing slash.** `astro.config.mjs` → `trailingSlash: 'never'`, `build.format: 'file'` (emits `/about.html`). Matches the site's existing indexed URLs (`/about`, not `/about/`).
- **Canonical normalization:** BaseHead strips `.html`/trailing slash so canonical + `og:url` are the clean served URL (`/about`), matching the sitemap.
- **CloudFront Function (viewer-request)** in `website-stack.ts`: rewrites extensionless routes → `.html` (`/about`→`/about.html`, `/blog/x`→`/blog/x.html`), normalises a trailing slash, passes through the root and any path with a file extension (assets). Attached via `functionAssociations`.
- **Error responses:** 403 (S3/OAC missing key) and 404 → serve `/404.html` with a real **404** status (replacing the old 200-everywhere SPA fallback). Added `src/pages/404.astro`.
- **Unchanged:** bucket, OAC, security headers/CSP, ACM cert, DNS, API/DB stacks, `s3deploy` (still `../dist`).
- `npm run cdk:synth` succeeds; template contains the Function, `FunctionAssociations`, and the 404 error responses.

## Phase 6 — remaining (deploy + verify)
- `npm run cdk:deploy:dev` (runs `astro build` then deploys). Then verify on the dev CloudFront URL: clean routes resolve (`/about`, `/blog/<slug>`), a genuine unknown path returns the 404 page with 404 status, assets load, and view-source shows real content + correct canonical/OG.
- Resubmit `sitemap-index.xml` in Google Search Console; spot-check a page in the LinkedIn Post Inspector.
- Optional hardening: make the CloudFront Function 301-redirect `/about/` → `/about` (currently it rewrites without redirect — fine, since nothing links the slash variant and canonical points to the non-slash URL).

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
