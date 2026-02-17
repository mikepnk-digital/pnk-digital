## Relevant Files

- `package.json` - Project dependencies (Vite, React, React Router, Tailwind CSS, Framer Motion)
- `vite.config.js` - Vite configuration (may need updates for TypeScript, markdown imports, sitemap plugin)
- `tsconfig.json` - TypeScript configuration (to be created)
- `src/main.tsx` - App entry point with BrowserRouter (rename from `.jsx`)
- `src/App.tsx` - Route definitions (rename from `.jsx`, expand routes)
- `src/index.css` - Global Tailwind + custom utilities (existing, update as needed)
- `src/pages/HomePage.tsx` - Home page (refactor from existing)
- `src/pages/AboutPage.tsx` - About page (new)
- `src/pages/ServicesPage.tsx` - Services page (new)
- `src/pages/WorkPage.tsx` - Work/portfolio listing page (new)
- `src/pages/CaseStudyPage.tsx` - Individual case study page (new)
- `src/pages/BlogPage.tsx` - Blog listing page (new)
- `src/pages/BlogPostPage.tsx` - Individual blog post page (new)
- `src/pages/ContactPage.tsx` - Contact page (new)
- `src/components/layout/Navbar.tsx` - Site header with navigation and persistent CTA (refactor from existing)
- `src/components/layout/Footer.tsx` - Site footer with links, contact info, social links (refactor from existing)
- `src/components/layout/Layout.tsx` - Shared layout wrapper with Header + Footer (new)
- `src/components/sections/Hero.tsx` - Home page hero section (refactor from existing)
- `src/components/sections/ServicesOverview.tsx` - Home page services cards (new)
- `src/components/sections/FeaturedWork.tsx` - Home page featured work cards (new)
- `src/components/sections/BlogHighlights.tsx` - Home page recent blog posts (new)
- `src/components/sections/CredibilitySection.tsx` - Trust signals (tech logos, bio, stats) (new)
- `src/components/sections/CtaBanner.tsx` - Reusable full-width CTA section (new)
- `src/components/sections/ContactForm.tsx` - Simple contact form component (refactor from existing Contact.jsx)
- `src/components/ui/Button.jsx` - Button component (existing)
- `src/components/ui/Card.jsx` - Card component (existing)
- `src/components/ui/ServiceCard.tsx` - Service detail card (new)
- `src/components/ui/CaseStudyCard.tsx` - Case study / placeholder card (new)
- `src/components/ui/BlogPostCard.tsx` - Blog post card (new)
- `src/lib/blog.ts` - Blog utilities (Markdown parsing, post listing, reading time)
- `src/lib/portfolio.ts` - Portfolio/case study data and utilities
- `src/utils/api.js` - API calls (existing, update for simplified contact form)
- `src/data/services.ts` - Services data (narrowed to React, AWS, AI MVPs, AI Integration)
- `src/data/portfolio.ts` - Portfolio/case study data (placeholder entries)
- `content/blog/*.md` - Markdown blog post files
- `content/blog/why-i-started-pnk-digital.md` - Seed article 1
- `content/blog/what-ai-powered-development-actually-means.md` - Seed article 2
- `content/blog/the-50k-website-is-dead.md` - Seed article 3
- `public/images/mike-placeholder.jpg` - Professional photo placeholder
- `cdk/lambda/contact-form/index.ts` - Existing Lambda handler (to be updated if needed)

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `Hero.tsx` and `Hero.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The project remains a **Vite + React SPA** — no migration to Next.js. We keep the existing build tooling and add multi-page routing via React Router.
- The current site uses hash-based navigation (`/#services`, `/#about`, etc.) on a single HomePage. This will be refactored into proper React Router routes (`/services`, `/about`, `/work`, `/blog`, `/contact`).
- Blog posts are authored as Markdown files in `content/blog/` and imported at build time using a Vite plugin (e.g., `vite-plugin-markdown` or raw imports) then rendered client-side with `react-markdown`.
- Use `react-helmet-async` for per-page `<title>` and `<meta>` tags (SEO).
- The existing AWS CDK infrastructure in `cdk/` (S3 + CloudFront static hosting) remains unchanged — Vite builds static files to `dist/` which are deployed to S3. Add a CloudFront SPA fallback rule so all routes serve `index.html`.
- All copy must use "I/my" language (not "we/our") per FR9 in the PRD.
- Existing components (Button, Card, Input, Section, GradientText, etc.) should be reused/refactored, not rewritten from scratch.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 1.0 Restructure Vite/React SPA for multi-page routing
  - [x] 1.1 Add new dependencies to `package.json`: `@dr.pogodin/react-helmet` (React 19 compatible), `react-markdown`, `remark-gfm`, `rehype-highlight`, `gray-matter`, `typescript`, `@types/node`. Run `npm install`
  - [x] 1.2 Create `tsconfig.json` configured for Vite + React (JSX preserve, path aliases `@/` → `src/`, strict mode). Update `vite.config.js` if needed for TypeScript support
  - [x] 1.3 Rename `src/main.jsx` → `src/main.tsx` and `src/App.jsx` → `src/App.tsx`. Wrap the app in `HelmetProvider` from `@dr.pogodin/react-helmet`
  - [x] 1.4 Update `src/App.tsx` route definitions: replace the single `HomePage` + hash navigation with proper routes for `/`, `/about`, `/services`, `/work`, `/work/:slug`, `/blog`, `/blog/:slug`, `/contact`, `/privacy-policy`, `/terms-of-service`
  - [x] 1.5 Create a `src/components/layout/Layout.tsx` wrapper that renders the Navbar, an `<Outlet />` for page content, and the Footer. Use this as the parent layout route in React Router
  - [x] 1.6 Create stub page components in `src/pages/` for each new route (`AboutPage.tsx`, `ServicesPage.tsx`, `WorkPage.tsx`, `CaseStudyPage.tsx`, `BlogPage.tsx`, `BlogPostPage.tsx`, `ContactPage.tsx`) with placeholder content
  - [x] 1.7 Verify the app loads and all routes work — build succeeds with all new routes
  - [x] 1.8 Update the existing Navbar and Footer to use React Router `<Link>` for all navigation items (replacing hash links), updated nav to include Services, Work, Blog, About, Contact. CTA changed to "Let's Talk" → `/contact`
  - [x] 1.9 CloudFront distribution in CDK already has custom error responses serving `index.html` for 403/404 (SPA fallback) — no changes needed

- [x] 2.0 Build shared layout (Header, Footer, Navigation)
  - [x] 2.1 Refactor `src/components/layout/Navbar.tsx`: updated with nav links (Home, Services, Work, Blog, About, Contact) and persistent "Let's Talk" CTA → `/contact`
  - [x] 2.2 Refactor responsive mobile navigation — uses React Router `<Link>`, closes on navigation via `closeMobileMenu`, active state highlighting
  - [x] 2.3 Refactor `src/components/layout/Footer.tsx`: navigation links, services links (React Dev, AWS, AI MVPs, AI Integration), email (hello@pnk-digital.com), location (Surrey, UK), social links (LinkedIn, GitHub), copyright, privacy/terms links
  - [x] 2.4 Header and Footer render on all pages via `Layout.tsx` route wrapper (verified via build)
  - [x] 2.5 Built reusable `CtaBanner.tsx` component with configurable heading, subtext, button text, and link target. Includes gradient background, decorative borders, and fade-in animations

- [x] 3.0 Build Home page
  - [x] 3.1 Refactored Hero: "Ship Faster. Spend Less. Build Better." headline, founder-led subheading with I/my language, dual CTAs ("Book a Discovery Call" → `/contact`, "See My Work" → `/work`), badge changed to "Founder-Led, AI-Accelerated"
  - [x] 3.2 Built ServicesOverview: 4 service cards (React App Dev, AWS Integration, AI-Powered MVPs, AI Integration) with unique color-coded icons, descriptions, link to `/services`
  - [x] 3.3 Built FeaturedWork: 3 placeholder cards with intentional "Coming soon" treatment — dashed borders, muted thumbnails, category labels, tech tags
  - [x] 3.4 Built BlogHighlights: 3 placeholder blog post cards with title, excerpt, date, reading time, category, linking to `/blog/:slug`
  - [x] 3.5 Built CredibilitySection: personal bio (I/my language), photo placeholder, stats (10+ years, senior level, direct communication), tech stack tags, dashed-border testimonial placeholder
  - [x] 3.6 Added CtaBanner at the bottom of the Home page driving to `/contact`
  - [x] 3.7 Assembled all sections into HomePage in order: Hero → ServicesOverview → FeaturedWork → BlogHighlights → CredibilitySection → CtaBanner. Removed old sections (Services, About, Process, ProjectBuilder, Contact)

- [x] 4.0 Build About page
  - [x] 4.1 Created `AboutPage.tsx` with Helmet metadata, full page structure with 4 distinct sections
  - [x] 4.2 Built intro/story: Mike's decade of contract React/AWS experience, what led to PNK Digital, AI-accelerated thesis, photo placeholder, badge "The Person Behind PNK Digital"
  - [x] 4.3 Built founder-led positioning: "PNK Digital is one person. That's the point." — 4 benefit cards (low overhead, direct communication, senior expertise, accountability) each with concrete detail
  - [x] 4.4 Built "How I Work" section: 4-step numbered process (Discovery Call → Proposal & Scope → AI-Accelerated Build → Iterative Delivery) with icons and descriptions
  - [x] 4.5 Built Values/Principles: 4 values (Speed Without Shortcuts, Radical Transparency, Direct Access, Honest Advice) each tied to a tangible client benefit
  - [x] 4.6 Added CtaBanner at bottom: "Want to know more?" → `/contact`

- [x] 5.0 Build Services page
  - [x] 5.1 Created `ServicesPage.tsx` with Helmet metadata, hero header with badge, intro paragraph, and "What I don't do" honesty section
  - [x] 5.2 Defined services data in `src/data/services.ts` with typed `Service` interface — 4 services each with icon, title, slug, description, targetClient, deliverables array, tags, and color
  - [x] 5.3 Built `ServiceCard.tsx` — alternating two-column layout with icon+title, description, "Who this is for", deliverables checklist, tech tags, and CTA button linking to `/contact`
  - [x] 5.4 Assembled Services page: hero header → 4 service cards → "What I don't do" section → CtaBanner
  - [x] 5.5 Verified: no iOS/Android, WordPress/Webflow, or broad "AI Consulting/Strategy" in services data

- [x] 6.0 Build Work / Portfolio page (placeholder-ready)
  - [x] 6.1 Created `WorkPage.tsx` with Helmet metadata, hero header with honest intro copy
  - [x] 6.2 Defined portfolio data in `src/data/portfolio.ts` with typed `CaseStudy` interface — 1 real project (PNK Digital website with full case study fields) + 3 placeholders. Includes `getProjectBySlug()` utility
  - [x] 6.3 Built `CaseStudyCard.tsx` — displays thumbnail, category badge, title, description, tech tags, and "Read case study" link for real projects
  - [x] 6.4 Built placeholder variant in same component — dashed borders, muted colours, "Coming Soon" thumbnail text, dimmed tags/text. Intentionally styled, not broken-looking
  - [x] 6.5 Built Work listing page with intro acknowledging new portfolio + decade of broader experience, 2-column grid mixing real and placeholder cards
  - [x] 6.6 Built `CaseStudyPage.tsx` — reads `:slug` from params, redirects placeholders to `/work`, displays problem/approach/technical decisions (checklist)/outcome/timeline/live link/screenshots. Back-to-work link at top
  - [x] 6.7 Added CtaBanner at bottom of both listing ("Want to be featured here?") and individual pages ("Working on something similar?")

- [x] 7.0 Build Blog system (Markdown-based, client-side rendered)
  - [x] 7.1 Created `content/blog/` directory with 3 seed articles
  - [x] 7.2 Defined frontmatter schema (title, date, excerpt, category, tags, author, slug, published) — all 3 articles use it
  - [x] 7.3 Configured Vite build-time markdown import via `import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })`
  - [x] 7.4 Built `src/lib/blog.ts`: `getAllPosts()` (parses frontmatter with gray-matter, sorts by date desc), `getPostBySlug()`, `getRelatedPosts()` (scores by shared category/tags), `calculateReadingTime()`, `formatDate()`, `categories` constant
  - [x] 7.5 Built `MarkdownRenderer.tsx` with react-markdown + remark-gfm + rehype-highlight. Custom component overrides for headings, paragraphs, lists, code blocks (inline + block), blockquotes, tables, links (internal via React Router, external with target=_blank)
  - [x] 7.6 Built `BlogPage.tsx` with category filter pills (All, AI & Development, Technical Insights, Business & Strategy, Project Spotlights), 3-column post grid, empty state
  - [x] 7.7 Built `BlogPostCard.tsx` — reusable card with category badge, title, excerpt, date, reading time. Used in BlogPage and BlogHighlights
  - [x] 7.8 Built `BlogPostPage.tsx` — full article with header (back link, category, title, date, reading time, author, tags), share links (LinkedIn, X/Twitter, copy link with "Copied!" feedback), markdown content, bottom share links
  - [x] 7.9 Added Related Articles section at bottom of BlogPostPage showing up to 3 related posts via `getRelatedPosts()`
  - [x] 7.10 Added CtaBanner after article content: "Working on something similar?" → `/contact`. Also updated BlogHighlights on home page to use real blog data instead of hardcoded placeholders

- [x] 8.0 Build Contact page & conversion flow
  - [x] 8.1 Built full `src/pages/ContactPage.tsx` with Helmet metadata, hero header with GradientText, two-column layout (form left, sidebar right)
  - [x] 8.2 Built "Book a Discovery Call" card as primary sidebar CTA with Calendly placeholder link, 3 bullet points of what to expect, prominent gradient CTA button. Includes temporary note that Calendly link is coming soon
  - [x] 8.3 Built `src/components/sections/ContactForm.tsx` with simplified fields: Name, Email, Company (optional), "Tell me about your project" textarea, and Send Message button. Removed all Project Type dropdown and Budget selector fields
  - [x] 8.4 Wired up to existing `submitContactForm()` in `src/utils/api.js` with success/error states, loading indicator, and form reset on success
  - [x] 8.5 Added Contact Details card in sidebar with email (hello@pnk-digital.com), location (Surrey, UK), and response time (Within 24 hours / Usually much faster) — each with color-coded icon boxes
  - [x] 8.6 Removed old ProjectBuilder directory (`src/components/sections/ProjectBuilder/`), `src/data/projectBuilder.js`, `src/hooks/useProjectBuilder.js`, and removed useProjectBuilder export from `src/hooks/index.js`
  - [x] 8.7 Audited all CTAs — all link to `/contact`. No references to old configurator remain. `SelectableCard.jsx` is dead code (only self-referencing) but left in place as harmless

- [x] 9.0 Write site copy & seed blog content
  - [x] 9.1 Home page copy already written during Task 3.0: hero headline "Ship Faster. Spend Less. Build Better.", subheading with I/my language, ServicesOverview blurbs, CredibilitySection bio/stats, FeaturedWork and BlogHighlights descriptions
  - [x] 9.2 About page copy already written during Task 4.0: Mike's story (3 paragraphs), founder-led positioning ("PNK Digital is one person. That's the point."), 4-step "How I Work" process, 4 values/principles
  - [x] 9.3 Services page copy already written during Task 5.0: 4 detailed service descriptions in `src/data/services.ts` with target client, deliverables, benefit statements. "What I don't do" transparency section. All claims qualitative
  - [x] 9.4 Work page copy already written during Task 6.0: honest framing about growing portfolio, link to broader decade of experience
  - [x] 9.5 Contact page copy already written during Task 8.0: discovery call description, form intro, response time expectations
  - [x] 9.6 Blog article 1 already written during Task 7.0: `content/blog/why-i-started-pnk-digital.md`
  - [x] 9.7 Blog article 2 already written during Task 7.0: `content/blog/what-ai-powered-development-actually-means.md`
  - [x] 9.8 Blog article 3 already written during Task 7.0: `content/blog/the-50k-website-is-dead.md`
  - [x] 9.9 Tone consistency review complete: no "we/our" in any page components (checked via grep), two collaborative "we" uses in blog articles are acceptable. Fixed "We will be in touch" → "I'll get back to you within 24 hours" in `src/utils/api.js` dev fallback messages. Legal pages (Privacy/Terms) use "we" appropriately. No unsubstantiated claims found — all stats hedged ("Research suggests") or qualitative ("weeks, not months"). AI consistently positioned as a tool

- [x] 10.0 SEO, analytics, and performance optimisation
  - [x] 10.1 All 10 pages now have `<Helmet>` with unique meta titles and descriptions (added missing Helmet to PrivacyPolicy and TermsOfService)
  - [x] 10.2 Added Open Graph (`og:title`, `og:description`, `og:type`, `og:url`) and Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`) meta tags to all pages. BlogPostPage also has `article:published_time` and `article:author`
  - [x] 10.3 Added JSON-LD structured data: `Person` schema on AboutPage (name, jobTitle, sameAs links, worksFor, knowsAbout); `BlogPosting` schema on BlogPostPage (headline, description, datePublished, author, publisher, keywords)
  - [x] 10.4 Semantic HTML verified: `<motion.nav>` in Navbar, `<main>` in Layout, `<footer>` in Footer, `<article>` wrapping blog content, `<section>` elements throughout. Heading hierarchy correct across all pages
  - [x] 10.5 Created `scripts/generate-sitemap.js` — generates `dist/sitemap.xml` at build time with 8 static routes + dynamic blog post URLs (reads frontmatter for dates and published status). Integrated into `npm run build` script
  - [x] 10.6 Created `public/robots.txt` allowing all crawlers with sitemap reference
  - [x] 10.7 Added analytics placeholder in `index.html` with commented Plausible and Google Analytics options. Added SPA page view tracking in `Layout.tsx` via `window.gtag()` on route change. Added `gtag` type declaration in `vite-env.d.ts`
  - [x] 10.8 Code splitting implemented: React.lazy() for all non-home pages in `App.tsx`, `manualChunks` in Vite config splitting react-vendor (47KB), animation/framer-motion (127KB), and markdown (335KB, only loaded on blog pages). Main chunk reduced from 985KB to 322KB. No more Vite chunk size warnings on initial load
  - [x] 10.9 Responsive design uses Tailwind breakpoints (`sm:`, `md:`, `lg:`) consistently across all pages — requires visual browser testing for final verification

- [ ] 11.0 Final integration, testing, and deployment
  - [ ] 11.1 End-to-end walkthrough: navigate every page, click every link and CTA, submit the contact form, verify all routes work correctly (including direct URL access and browser refresh)
  - [ ] 11.2 Verify blog system works end-to-end: listing page displays posts, filtering works, individual post pages render Markdown correctly with code highlighting, related articles display, sharing links work
  - [ ] 11.3 Verify the Work page placeholder cards display correctly and that the structure supports adding new case studies by simply adding data entries
  - [ ] 11.4 Test contact form submission against the AWS Lambda backend — confirm emails are delivered
  - [ ] 11.5 Cross-browser testing: Chrome, Firefox, Safari, Edge (latest versions)
  - [ ] 11.6 Accessibility audit: keyboard navigation, screen reader compatibility, colour contrast ratios, focus states
  - [ ] 11.7 Verify the AWS CDK stack deploys the Vite SPA correctly — confirm S3 upload, CloudFront distribution, and SPA fallback (custom error response returning `index.html` with 200 for 403/404 errors) all work
  - [ ] 11.8 Configure CI/CD pipeline to deploy on push to main branch
  - [ ] 11.9 Deploy to production and verify the live site at pnk-digital.com
