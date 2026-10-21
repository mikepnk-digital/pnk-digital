# Prompt: one design system for pnk-digital.com

Paste everything below the line into a fresh Claude Code session in this repo.

---

Move pnk-digital.com to one design system: the landing-page design used by `/tech-support` and `/ai-consulting`. This is a decision already made (design audit question Q1). Don't reopen it, and don't move the landing pages towards the home page.

## Context to read first
1. `docs/AI-CONSULTING-DESIGN-AUDIT.md`. Read the Progress table, the "Next session" section, section D6 (how the two systems differ) and Change 12 (home alignment). The file is untracked and lives only in this repo.
2. Local memory `project_landing-design-audit`, and the Obsidian note `Claude/Memory/pnk-digital-landing-design-audit.md`. These hold the decisions and conventions.
3. The landing system itself: `src/layouts/LandingLayout.astro` (tokens on `.landing[data-theme='b']`, plus the `.lp-*` primitives) and `src/components/landing/*`.

## The target system (landing theme B)
- **Look:** light editorial, with slate neutrals. Font is Plus Jakarta Sans. Brand pink is `#ec008c`; button fills use `--lp-pink-cta` `#db0082`, so white text passes AA at 17px.
- **Type scale:** `--lp-text-xs/sm/base/md/lg` (13/15/17/19/22). h3 is `--lp-h3` 22 and `--lp-h3-lg` 26. Use `--lp-h1` and `--lp-h2`. Don't add raw px font sizes.
- **Tokens:**
  - radii, including `--lp-radius-inner`
  - focus tokens (`--lp-focus` and `--lp-focus-on-pink`, white on slate)
  - `--lp-border-strong`
  - `--lp-header-h` (72px)
- **Sections:** neighbouring sections alternate backgrounds (white / surface / slate / pink). White sections are transparent, so any check must walk up to the actual colour.
- **Motion:** `src/lib/landing-motion.ts`. Use `data-reveal`, `data-reveal-stagger` and `.lp-intro`, gated by `html.lp-motion`, which is off for reduced motion and when JS is off. Don't nest reveal targets.
- **Booking:** every "Book a free 30-minute call" CTA opens the Cal.com modal via `data-book`. The message form's button says "Send message".

## What has to change
Everything that still uses the old dark-neon system (Tailwind v4 + `src/index.css`, Inter, `#f4178c`, gradient `Button` and `GradientText`, orbs, particles, Framer Motion):
- **Pages on `Layout.astro`, rendered by React pages in `src/react-pages/`:**
  - `/` (`HomePage.jsx`)
  - `/about`
  - `/services`
  - `/work` and `/work/[slug]`
  - `/blog` and `/blog/[slug]`
  - `/contact`
  - `/privacy-policy` and `/terms-of-service`
  - `404`
- **Pages on `BareLayout.astro`:** `/audit`, `/audit/[slug]` and `/landing/web-developer-surrey`.
- **Shared chrome:** `src/components/layout/Navbar.jsx` and `Footer.jsx`. The landing pages have their own `LandingHeader` and `LandingFooter`.

Known issues the change should fix:
- Gradient buttons fail contrast. White on the cyan end is 1.35:1, and white on `#f4178c` at 16px is 3.93:1.
- The home h1 is server-rendered at `opacity:0`.

## How to work
1. **Plan before editing.** Inventory every page, layout and shared component on the old system, with its current structure and content. Propose the approach and the order, then stop for my approval. The key choice is between:
   - **(a) Rebuild:** rebuild the pages in Astro on `LandingLayout` (or a new site layout derived from it) using the `src/components/landing` components, and retire the React page shells; or
   - **(b) Reskin:** re-theme the existing React/Tailwind pages onto the landing tokens.

   Recommend one and say what each costs, including SEO, routes, structured data, analytics and the blog/work content collections.
2. **Keep everything that works.** Keep every route and URL, the SEO meta, the JSON-LD, the GA events (`cta_click`, `phone_clicked`, `tech_review_booked`), the Cal.com modal behaviour, the case-study and blog content, and the copy, unless I agree a change. Don't change copy without asking.
3. **One site header and footer.** Decide how the landing header and footer relate to a site-wide navbar. The landing pages deliberately have no main-site nav, so keep that unless I say otherwise.
4. **Work in small, verifiable steps.** Do one page or shared piece at a time. I commit explicitly: don't commit until I say "commit". End commit messages with the attribution line the session gives you.
5. **Remove dead code as you go.** Once nothing uses them, delete the old-system pieces: Tailwind theme, GradientText, gradient Button, orbs, particles, DataTransformationViz, and Framer Motion if it's unused. Also delete these five unused theme-A landing components: CompareTable, ProblemGrid, HeroFounder, FounderSection and Testimonials.

## Verification (each step)
- **Build:** `npm run build`. Serve `dist/` with `python3 -m http.server 4417 --bind 127.0.0.1` from inside `dist`. localhost:4321 is NOT the Astro dev server; it's an unrelated `npx serve`.
- **Check in headless Chrome** (playwright-core with `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`) at 320, 360, 768, 1024 and 1440px:
  - no horizontal overflow and no wrapped button labels;
  - one h1 per page, with a sensible heading order;
  - neighbouring section backgrounds alternate;
  - every `data-book` CTA opens the Cal modal;
  - anchor links land below the 72px header;
  - motion reveals everything after scrolling, and everything is visible with reduced motion and with JS off.
- **Contrast:** check every text and background pair you introduce, with AA as the minimum.
- **Type check:** `npx --no-install astro check`. The baseline is 8 pre-existing errors in files outside this work, and `npx tsc --noEmit -p .` has about 30. Don't add any.
- **Look at it:** take screenshots and look at them before reporting.

## Still open alongside this (ask me; don't decide)
- **Q5, fonts:** self-host Plus Jakarta Sans instead of render-blocking Google Fonts? Both families are OFL.
- **Q6, copy flags:** the 62-character /ai-consulting hero eyebrow, an AI pilot client quote, and the PricingCard "… plan" aria-label.

## Housekeeping
- After meaningful work, write an Obsidian session note in `Claude/Sessions/YYYY-MM-DD-topic.md`.
- Update `Claude/Memory/pnk-digital-landing-design-audit.md`.
- Update the audit doc's Progress table.
