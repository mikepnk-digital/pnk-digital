# PNK Digital — Website

The marketing and lead-generation site for [PNK Digital](https://www.pnk-digital.com), Mike Pink's solo senior full-stack development business. Built as a single-page React app with markdown-driven blog content, fronted by AWS infrastructure (CloudFront + S3) with a serverless contact/quote pipeline (API Gateway → Lambda → DynamoDB + SES).

---

## Technology

### Frontend

| Area | Stack |
| --- | --- |
| Framework | React 19 + TypeScript (mixed `.tsx` / `.jsx`) |
| Build tool | Vite 7 (`@vitejs/plugin-react`) |
| Routing | React Router 7 (with `lazy` + `Suspense` for code-splitting) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| Animation | Framer Motion 12 |
| Icons | `lucide-react` |
| SEO / `<head>` | `@dr.pogodin/react-helmet` |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-highlight` |
| Analytics | Google Ads / gtag (`AW-17989609549`) injected in `index.html` |
| Linting | ESLint 9 (flat config), `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |

The `@` alias resolves to `./src` (see `vite.config.js`). Vendor chunks are manually split into `react-vendor`, `markdown`, and `animation` to keep the initial bundle small.

### Backend / Infrastructure (AWS CDK)

Everything in `cdk/` is TypeScript CDK v2. The site deploys to two environments — `dev` and `prod` — selected via CDK context (`--context environment=prod`).

| Concern | AWS Service |
| --- | --- |
| Static hosting | S3 (private bucket) |
| CDN / TLS | CloudFront + ACM (cert in `us-east-1`) |
| API | API Gateway HTTP API (v2) |
| Compute | Lambda (Node.js 20, ARM64) — bundled with `NodejsFunction` / esbuild |
| Data | DynamoDB (`pnk-digital-enquiries-{env}`) with 3 GSIs (`email`, `status`, `ip-createdAt`) |
| Email | Amazon SES (notification + auto-reply) |
| DNS | Route 53 (hosted zone managed externally) |
| Logs | CloudWatch Logs (configurable retention per env) |

Security: CloudFront enforces HSTS, CSP, `X-Frame-Options: DENY`, referrer policy and a strict cache+OAC to S3. The Lambda applies a four-layer anti-spam pipeline (honeypot field, time-to-submit check, validation, per-IP rate limiting via the `ip-createdAt-index` GSI).

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Browser                                                     │
│  React SPA (Vite build → dist/)                              │
└──────────────┬───────────────────────────────────────────────┘
               │ HTTPS
               ▼
┌──────────────────────────────────────────────────────────────┐
│  CloudFront (custom domain, ACM cert, security headers)      │
│   • SPA fallback: 403/404 → /index.html                      │
│   • OAC → private S3 bucket                                  │
└──────────────┬───────────────────────────────────────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌──────────────┐   ┌────────────────────────────────────────┐
│  S3 Bucket   │   │  API Gateway HTTP API                  │
│  (static)    │   │  POST /api/contact                     │
└──────────────┘   │  POST /api/quote                       │
                   │  GET  /api/health                      │
                   └──────────────┬─────────────────────────┘
                                  │
                                  ▼
                   ┌──────────────────────────────────┐
                   │  Lambda: contact-form (Node 20)  │
                   │   1. Honeypot check              │
                   │   2. Time-based bot check        │
                   │   3. Input validation            │
                   │   4. IP rate-limit (3/hr)        │
                   └────┬──────────────────┬──────────┘
                        │                  │
                        ▼                  ▼
                 ┌─────────────┐    ┌──────────────┐
                 │  DynamoDB   │    │  SES         │
                 │  enquiries  │    │  notify +    │
                 │  + 3 GSIs   │    │  auto-reply  │
                 └─────────────┘    └──────────────┘
```

### CDK stack composition (`cdk/bin/app.ts`)

1. **DatabaseStack** — DynamoDB table, GSIs, point-in-time recovery (prod only), TTL field.
2. **ApiStack** — HTTP API, Lambda (with SES + DynamoDB IAM), throttling, log groups.
3. **Certificate Stack** — ACM cert in `us-east-1` (required by CloudFront) when a custom domain is configured.
4. **WebsiteStack** — S3 + CloudFront + OAC + security headers, deploys `dist/` via `BucketDeployment`.

DNS is managed outside CDK; the hosted zone ID is referenced for ACM DNS validation only.

### Content pipeline

Blog posts are plain markdown files in `content/blog/`. `src/lib/blog.ts` uses `import.meta.glob('/content/blog/*.md', { query: '?raw', eager: true })` so every post is bundled at build time, parsed with a tiny in-house frontmatter parser, sorted by date, and rendered through `react-markdown`. Related posts are scored by shared category (+3) and tags (+1). A `published: false` flag hides drafts.

A post-build script (`scripts/generate-sitemap.js`, wired into `npm run build`) regenerates `sitemap.xml` from the routes and blog content.

---

## Project structure

```
claude-dev/
├── cdk/                          AWS CDK app (TypeScript)
│   ├── bin/app.ts                CDK entry point — composes stacks per env
│   ├── lib/
│   │   ├── config/               dev.ts, prod.ts, types.ts
│   │   └── stacks/               website / api / database / dns
│   └── lambda/contact-form/      Lambda source (bundled by NodejsFunction)
├── content/blog/                 Markdown blog posts (frontmatter + MD)
├── docs/                         Internal docs
├── emails/                       Standalone HTML email templates (cold/nurture/follow-up)
├── public/                       Static assets served at site root (favicons, OG image, robots.txt)
├── scripts/
│   └── generate-sitemap.js       Runs after `vite build`
├── src/
│   ├── App.tsx                   Router + lazy-loaded routes
│   ├── main.tsx                  React 19 root
│   ├── index.css                 Tailwind entry
│   ├── assets/                   Logo SVG, images
│   ├── components/
│   │   ├── layout/               Navbar, Footer, Layout (with gtag page-view)
│   │   ├── sections/             Hero, ServicesOverview, CredibilitySection,
│   │   │                         BlogHighlights, CtaBanner, ContactForm, FeaturedWork
│   │   ├── ui/                   Button, Input, Section, GradientText,
│   │   │                         SectionHeading, ServiceCard, BlogPostCard,
│   │   │                         CaseStudyCard, MarkdownRenderer
│   │   ├── audit/                Mockup frame, score card, issue card,
│   │   │                         prospect card, audit header/footer
│   │   └── decorative/           Background / visual flourishes
│   ├── data/                     Static TS data: services, ai-employee-services,
│   │                             portfolio
│   ├── hooks/                    useMobile, useScrollState, useHashNavigation,
│   │                             useResponsiveClose
│   ├── lib/blog.ts               Markdown loader + frontmatter parser
│   ├── pages/                    Route components (see below)
│   └── utils/
│       ├── animations.js         Framer Motion variants (fadeInUp, stagger, etc.)
│       └── api.js                Contact-form fetch helper + ApiError class
├── tasks/                        Working notes
├── index.html                    Vite HTML entry (SEO meta, gtag, favicons)
├── vite.config.js                Vite + Tailwind + alias + manualChunks
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## Website pages

Routes are defined in `src/App.tsx`. Marketing pages share a common `<Layout>` (navbar + footer + gtag page-view tracking). Landing pages render bare for conversion focus.

### Main site (under `<Layout>`)

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `HomePage` | Hero, services overview, credibility section, blog highlights, CTA banner |
| `/about` | `AboutPage` | Mike's story, experience, positioning |
| `/services` | `ServicesPage` | Full service catalogue (data from `src/data/services.ts`) |
| `/services/ai-employees` | `AIEmployeesPage` | Dedicated page for the AI Employees offering — services, use cases, ROI, FAQ |
| `/blog` | `BlogPage` | Index of published posts from `content/blog/` |
| `/blog/:slug` | `BlogPostPage` | Renders a single markdown post + related posts |
| `/contact` | `ContactPage` | Contact form (posts to `/api/contact`) |
| `/privacy-policy` | `PrivacyPolicy` | Legal |
| `/terms-of-service` | `TermsOfService` | Legal |

Temporarily disabled in the router (kept for future enablement once real case studies exist):

- `/work` — `WorkPage` (portfolio index)
- `/work/:slug` — `CaseStudyPage`

### Landing pages (no nav/footer — conversion-focused)

| Path | Component | Purpose |
| --- | --- | --- |
| `/landing/web-developer-surrey` | `WebDeveloperSurreyPage` | Local-SEO / paid landing page targeting "web developer Surrey" |
| `/audit` | `AuditLandingPage` | Free-website-audit lead magnet for outbound prospecting (`noindex,nofollow`) |
| `/audit/:slug` | `AuditReportPage` | Personalised audit report rendered from prospect data in `src/pages/audit/prospects.ts` |

---

## Local development

```bash
npm install
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # Production build + sitemap generation → dist/
npm run preview      # Preview the production build locally
npm run lint         # ESLint
```

### Environment variables

Copy `.env.example` to `.env` and set:

```
VITE_API_URL=https://<api-id>.execute-api.eu-west-2.amazonaws.com
VITE_ENVIRONMENT=dev
```

If `VITE_API_URL` is empty, `src/utils/api.js` simulates a successful submission so the contact form works in local dev without the backend.

### Deploying infrastructure

```bash
npm run cdk:install        # Install CDK deps in cdk/
npm run cdk:diff:dev       # Preview changes against dev
npm run cdk:deploy:dev     # Build site + deploy dev stacks
npm run cdk:deploy:prod    # Build site + deploy prod stacks
npm run cdk:destroy:dev    # Tear down dev (prod is RETAIN)
```

`cdk:deploy:*` runs `vite build` first, then the CDK `BucketDeployment` syncs `dist/` to S3 and invalidates CloudFront.
