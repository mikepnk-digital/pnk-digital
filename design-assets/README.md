# Handoff: PNK Digital — Tech Support Plans landing pages (A/B)

## Overview
Two standalone, conversion-focused landing pages for the **Tech Support Plans** service on pnk-digital.com, built for an A/B test:

- **Version A — founder voice.** Positioned around Mike, a single named expert. Warm neutrals.
- **Version B — company voice.** Positioned as an organised service provider ("we", "our support team"). Cool slate neutrals, a UI-mockup hero and a service-standards panel. No individual is named.

Both pages share the same section order, offer, prices, components and booking form. Only voice, imagery and trust signals differ.

**Single primary goal:** book a free 30-minute tech review. Choosing a plan is secondary. Each plan button opens the booking form with that plan pre-selected.

## About the design files
The files in this bundle are **design references created in HTML**. They are prototypes that show the intended look, copy and behaviour, not production code to copy directly. They use an internal component runtime (`support.js`, `*.dc.html`). **Do not ship them.**

Your task is to **recreate these designs in the existing Astro static site** as `.astro` components, following the site's conventions (TypeScript, folder structure, linting, deployment).

### Landing pages must be isolated from the main site theme
These pages use a different colour scheme and visual theme from the rest of pnk-digital.com, so build them as **standalone landing pages**:

1. **Separate layout.** Create `src/layouts/LandingLayout.astro`. It must not use the main site's header, footer, nav or global theme stylesheet. It includes only:
   - `<head>` meta: title, description, OG tags, canonical URL
   - the Plus Jakarta Sans font
   - a minimal reset
   - the landing tokens
   - a `<slot />`

   Keep the site's analytics snippet, consent banner and favicon if they live in a shared head partial.
2. **Scoped tokens.** Define the design tokens (below) as CSS custom properties on a wrapper, e.g. `<div class="landing" data-theme="a">` or `data-theme="b"`. Shared components read only these variables (`var(--lp-ink)` and so on), so the same component renders in either theme.
3. **No style leakage.** Use Astro's scoped `<style>` blocks, or prefix every class with `lp-`. Make sure no global site CSS reaches these pages (and the reverse).
4. **Suggested routes:**
   - `/tech-support/`: version A (or whichever is the control)
   - `/tech-support/b/`: version B, with `<meta name="robots" content="noindex">` and a canonical link pointing to `/tech-support/`
   - Split traffic via the host's edge or middleware, or the A/B tool already in use. Add a `variant` field (`a` or `b`) to the booking form submission and to analytics events.
5. **Islands.** The site is static, so ship JavaScript only where it's needed (vanilla `<script>` or small islands, `client:visible`):
   - FAQ accordion (this can be native `<details>`/`<summary>` with no JS)
   - Compare-table mobile tabs
   - Sticky mobile CTA
   - Plan pre-selection and scroll-to-form
   - Booking form validation and submit

## Fidelity
**High-fidelity.** The colours, typography, spacing, copy and interactions are final. Recreate them pixel-accurately. All copy in the HTML files is final, except the items marked as placeholders (see "Placeholders and content gaps").

## Suggested component structure (Astro)
```
src/components/landing/
  LandingHeader.astro      logo + section links (desktop only) + "Book a free review" button
  HeroFounder.astro        version A hero (photo card)
  HeroCompany.astro        version B hero (client-portal UI mock-up)
  ProblemGrid.astro        4 pain points; props: items[], variant ('cards' | 'grid')
  ServiceGrid.astro        4 services with icons; props: items[], iconStyle ('tint' | 'solid')
  CtaStrip.astro           inline CTA bar; props: text
  PricingCard.astro        props: plan object (see data model)
  PricingSection.astro     heading + 3 cards + extra-hours note + CtaStrip
  CompareTable.astro       desktop grid / mobile tabs; props: plans[], groups[], highlight
  Steps.astro              props: steps[] (title, when, body, points?)
  FounderSection.astro     version A only
  WhySection.astro         version B: 4 reasons + ServiceStandards panel
  ServiceStandards.astro   dark panel listing response times
  Testimonials.astro       placeholder cards; props: items[] (attribution)
  Faq.astro                accordion; props: items[] (q, a)
  BookingBand.astro        pink band + BookingForm; props: intro, successLine
  BookingForm.astro        form + validation island
  StickyCta.astro          mobile-only fixed bar
src/data/tech-support.ts   plans, compare groups, FAQs, steps (shared, with per-variant overrides)
src/pages/tech-support/index.astro
src/pages/tech-support/b.astro
```
Keep the content in `tech-support.ts` so both pages and future service pages can reuse it. A and B differ only in a few strings (listed under "Copy differences, A vs B").

## Design tokens

### Shared
| Token | Value | Use |
|---|---|---|
| `--lp-pink` | `#ec008c` | CTA button fills, accent dots, popular-card outline |
| `--lp-pink-hover` | `#c8007a` | CTA hover |
| `--lp-pink-text` | `#b3006b` | Pink text, eyebrows, check icons, "Most popular" badge background (6.7:1 on white) |
| `--lp-pink-tint` | `#fdeef6` | Icon tiles, step-number circles, highlighted comparison-table column |
| `--lp-white` | `#ffffff` | |
| `--lp-success` | `#15803d` | Status dots in the B mock-up |
| `--lp-success-text` | `#0f5d2e` on `#e3f3e8` | "Resolved" pill in the B mock-up |

### Version A (warm neutrals)
| Token | Value |
|---|---|
| `--lp-ink` | `#1b1720` (headings, body emphasis, header button, footer) |
| `--lp-muted` | `#4a4550` (body copy) |
| `--lp-subtle` | `#6b6470` (placeholder text) |
| `--lp-surface` | `#faf7f5` (alternate section background) |
| `--lp-border` | `#e7e2de` |
| `--lp-input-border` | `#8a8189` (3.7:1, meets the non-text contrast requirement) |

### Version B (cool slate neutrals)
| Token | Value |
|---|---|
| `--lp-ink` | `#1b1720` (text) |
| `--lp-slate` | `#1f2a37` (header button, icon tiles, standards panel, mock-up frame, footer) |
| `--lp-slate-hover` | `#334155` |
| `--lp-muted` | `#4b5563` |
| `--lp-subtle` | `#64748b` |
| `--lp-surface` | `#f4f6f9` |
| `--lp-border` | `#e3e7ed` |
| `--lp-on-slate-muted` | `#cbd5e1` (labels on the slate panel) |
| `--lp-on-slate-rule` | `#3b4757` |

The footer logo "PNK" on the dark footer uses `#ff5cb0`.

### Typography
- Font: **Plus Jakarta Sans**, weights 400, 500, 600, 700 and 800 (Google Fonts, or self-host via `@fontsource/plus-jakarta-sans`). Fallback: `system-ui, sans-serif`.

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (hero) | `clamp(38px, 5.6vw, 66px)` (A) / `clamp(36px, 5.2vw, 62px)` (B) | 800 | 1.03–1.04 | -0.035em |
| H2 (section) | `clamp(30px, 3.8vw, 46px)` | 800 | 1.08 | -0.03em |
| H2 (compare) | `clamp(28px, 3.2vw, 38px)` | 800 | 1.1 | -0.03em |
| Band H2 | `clamp(34px, 4.4vw, 54px)` | 800 | 1.06 | -0.03em |
| Card H3 | 19–22px (plan name 26px) | 800 | 1.3 | -0.01 to -0.02em |
| Price | 48px | 800 | 1 | -0.035em |
| Hero subhead | `clamp(18px, 1.6vw, 21px)` | 400 | 1.55 | |
| Body | 16–18px | 400 | 1.6 | |
| Eyebrow | A: 14px / 700 / 0.06em; B: 13px / 800 / 0.1em; uppercase, `--lp-pink-text` | | | |
| Button (CTA) | **19px / 700** (see accessibility) | | | |
| Small / meta | 14–15px / 600–700 | | | |

Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.

### Spacing and layout
- Content max-width is `1160px`, centred. The header inner max-width is `1288px`.
- Section padding: `clamp(56px, 8vw, 112px)` vertical, `clamp(20px, 5vw, 64px)` horizontal.
- Header to section-content gap: `clamp(32px, 4vw, 48px)`.
- Grids use `repeat(auto-fit, minmax(min(100%, Xpx), 1fr))` with X = 250px (problems, services), 300px (pricing), 260px (steps) or 280px (testimonials). Gap is 20–24px.
- Two-column sections (hero, founder or why, FAQ, band) use `display: flex; flex-wrap: wrap` with flex-basis values around 320–460px, so they stack on mobile without media queries.
- The mobile breakpoint for JS behaviour is **760px**: below it, the header links hide, the comparison table switches to tabs and the sticky CTA turns on.

### Radius
| Element | A | B |
|---|---|---|
| Buttons | 999px (pill) | 12px (header button 10px) |
| Cards | 22–24px | 20px |
| Hero card / panel | 28px | 24px |
| Inputs | 12px | 12px |
| Badges | 999px / 6px | 8px / 6px |

### Shadows
- Hero card: `0 24px 48px -32px rgba(27,23,32,.35)` (A) / `0 30px 60px -30px rgba(31,42,55,.6)` (B)
- Form card: `0 30px 60px -30px rgba(60,0,35,.55)`
- Sticky bar: `0 -10px 30px -12px rgba(27,23,32,.25)`

## Sections (both versions, in order)

1. **Header.** Sticky, white at 95% opacity with backdrop blur, 1px bottom border, minimum height 68px.
   - Logo: "**PNK**" in pink + "Digital" in ink, 22px/800.
   - Desktop links (16px/600): Plans, How it works, FAQ.
   - Button: "Book a free review", dark fill (`--lp-ink` in A, `--lp-slate` in B), white 15px/700, minimum height 44px.
2. **Hero.** Surface background.
   - Eyebrow, H1, subhead, primary CTA "Book a free tech review" (pink), secondary text button "See plans" (underlined, pink 2px underline with a 7px offset), then a 3-item trust line with check icons.
   - Right column, version A: white card with an image slot (Mike's photo, 280px tall), "Hi, I'm Mike — your tech person.", one line of copy and 3 checks.
   - Right column, version B: slate-framed **client-portal mock-up**, built in HTML/CSS (not an image) and labelled "Illustrative example". It contains:
     - 3 status tiles: Website = Online, Backups = Daily, Email security = Protected
     - a 30-bar uptime strip (26 green, 4 grey for future days)
     - a "Support requests" list: REQ-1043 In progress, REQ-1042 Resolved, REQ-1041 Resolved

     Give it `role="img"` and a descriptive `aria-label`. **The mock-up must contain no percentages or statistics.**
3. **Problem.** 4 pain points.
   - A: tinted cards numbered 01–04.
   - B: a bordered grid with 1px dividers and slate line icons.
   - Followed by a **CtaStrip** (CTA repeat #1).
4. **What we look after.** 4 services with icons: website (monitor), email (envelope), security (shield with check), automation (lightning bolt).
   - A: pink-tint icon tiles, no card border.
   - B: bordered cards with solid slate icon tiles and white icons.
5. **Plans.** Surface background.
   - Heading, 3 PricingCards, the extra-hours note, then a CtaStrip on a white card (CTA repeat #2).
   - The highlighted plan (Growth by default) gets:
     - a 3px pink outline, inset -2px
     - a badge "Most popular": `#b3006b` background, white 14px/800 text, positioned 15px above the top-left
     - a pink filled button (the other cards get a 2px ink outline button that fills ink on hover)
   - Under every button: "We'll confirm the right plan on the call" (14px, muted).
6. **Compare plans.**
   - **Desktop:** a bordered table built as a CSS grid (`1.7fr` + three `1fr` columns). The highlighted plan's column is tinted `--lp-pink-tint`. Group header rows sit on the surface colour (13px/800 uppercase). Ticks are pink check icons, a dash marks "not included", and text cells hold the hours and response times. Include visually hidden "Included" / "Not included" text for screen readers.
   - **Mobile:** a pill segmented control (Essentials | Growth | Partner, `aria-pressed`; the active tab has an ink background). The highlighted plan is selected by default. Below it is a single-plan list with each row's label on the left and its value ("Included" / "Not included" / text) on the right.
7. **How it works.** Surface background. 3 step cards, each with a number in a pink-tint circle, a "when" pill, a title and a body. Version B adds bullet sub-points to steps 2 and 3.
8. **Founder (A) / Why PNK Digital (B).**
   - A: an image slot (Mike, 340–480px tall, 28px radius) beside an H2, an intro paragraph and 3 bold-led points.
   - B: a 2×2 grid of icon reasons beside the dark "Our service standards" panel, a `<dl>` with these rows:

     | Row | Value |
     |---|---|
     | Essentials response | Next business day |
     | Growth response | Same business day |
     | Partner response | Within 4 business hours |
     | Support hours | Mon–Fri, 9am–5:30pm |
     | Website monitoring | 24/7 |
     | Every request | Reference and status updates |
     | Reporting | Monthly health report |

     The panel ends with the footnote "Excluding UK bank holidays."
9. **Testimonials.** Clearly marked placeholders: dashed borders, a "Placeholder" tag and a header pill reading "Placeholder — add real, approved testimonials before launch". Version B attributes each card to a business type. **Do not ship these placeholders to production.** Hide the section behind a flag until real quotes exist.
10. **FAQ.** Accordion with a 64px minimum row height, a question at 17–19px/700, and a circular "+" icon that rotates 45° when open (`transition: transform .2s ease`). The first item is open by default. Version B adds 2 questions.
11. **Booking band.** `#ec008c` background, white H2, a 20px/700 white intro and 3 white check bullets, beside a white form card (28px radius). Covered in detail below.
12. **Footer.** Dark background (ink in A, slate in B), logo, and the line "UK tech consultancy / Managed tech support · pnk-digital.com · © 2026 PNK Digital".
13. **Sticky mobile CTA** (below 760px only). Fixed to the bottom, white, with a top border. "Free 30-min tech review" sits on the left and the pink button "Book a free review" on the right. Respect `env(safe-area-inset-bottom)`.
   - Show it once the page has scrolled more than 560px.
   - Hide it whenever the booking band is in the viewport (use an IntersectionObserver).
   - Add about 84px of bottom padding to the footer on mobile so the bar never covers content.

## Booking form
Fields (every field has a visible `<label>`):

| Field | Type | Required | Notes |
|---|---|---|---|
| Your name | text, `autocomplete="name"` | yes | |
| Business name | text, `autocomplete="organization"` | yes | |
| Email | email, `autocomplete="email"` | yes | |
| Phone | tel, `autocomplete="tel"` | no | label suffix "(optional)" |
| Number of staff | select | no | "Choose…", "Just me", "2–5", "6–10", "11–25", "26–50", "More than 50" |
| Plan of interest | select | no | "Not sure" (default), "Essentials", "Growth", "Partner" |
| What's your biggest tech headache? | textarea (3 rows) | no | placeholder "e.g. Our emails keep going to clients' spam folders" |

- **Layout:** fields sit in an auto-fit grid (`minmax(min(100%, 220px), 1fr)`), so they pair up on desktop and stack on mobile. The textarea is full width.
- **Submit button:** "Book my free review", full width, pink. Below it: "No obligation. We'll reply within one business day."
- **Validation:** runs on submit (use `novalidate` and custom messages).
  - Name: "Please enter your name."
  - Business name: "Please enter your business name."
  - Email (must match `\S+@\S+\.\S+`): "Please enter a valid email address."
  - Show each error below its field (14px/600, `#b3006b`), set `aria-invalid="true"`, and link it with `aria-describedby`.
  - Clear a field's error as soon as the user types in it.
- **Success state:** the form card is replaced by a `role="status"` panel:
  - a check icon, then "Thanks, {first name} — you're booked in."
  - A: "Mike will reply within one business day to arrange a time for your free 30-minute review."
  - B: "Our support team will reply within one business day to arrange your free 30-minute review."
  - a "Send another request" link that resets the form
- **Submission:** not built in the prototype. Connect it to the site's existing form handler (Netlify Forms, Formspree, an API route or similar). Include hidden fields: `variant` (a/b), `source` ("tech-support-plans") and the UTM parameters.
- **Plan pre-selection:** any plan card button:
  1. sets the Plan select to that plan
  2. smooth-scrolls to the band, offset by the 68px sticky header
  3. after about 700ms, focuses the Name field with `preventScroll`

  Generic CTAs scroll without changing the plan. A no-JS fallback could be `href="#book?plan=growth"` or a query string read on load.

## Interactions summary
- Every "Book a free tech review" or "Book a free review" control scrolls to the booking band (`#book`).
- "See plans" and the header links scroll to their sections, with a 68px offset.
- **Hover:** pink buttons darken to `#c8007a`, outline buttons fill with ink, and text links turn `#b3006b`.
- **Focus:** every interactive element has a visible outline.
  - Buttons on light backgrounds: `3px solid` ink or slate, offset 3px.
  - Inputs: `3px solid #ec008c`, offset 1px, with the border turning ink.
  - Use `:focus-visible`.
- **FAQ:** one item open at a time, with `aria-expanded` and `aria-controls`. Native `<details name="faq">` is an acceptable alternative.
- **Compare tabs (mobile):** buttons with `aria-pressed`.

## Accessibility notes (WCAG AA)
- White text on `#ec008c` measures **4.25:1**. That fails AA for normal text but passes for large text. That's why **every pink button uses 19px bold text**, which counts as large text (at least 18.66px bold, needing 3:1). Keep CTA text at that size or larger.
- Never set small pink text in `#ec008c` on white (also 4.25:1). Use `#b3006b` (6.7:1) for eyebrows, inline accents, error text and the "Most popular" badge background.
- In the pink band, all white text is either a heading or 20px bold. Small text sits inside the white form card.
- Input borders use `#8a8189`, which meets the 3:1 non-text contrast requirement.
- Use landmark and heading structure: `header`, `nav`, `main`, `section[aria-labelledby]` and `footer`, with exactly one H1.
- Respect `prefers-reduced-motion`: turn off smooth scrolling and the FAQ icon rotation.

## Copy differences, A vs B
All final copy is in the HTML files; lift it verbatim. The main differences:

| Section | A | B |
|---|---|---|
| Hero eyebrow | Tech Support Plans | Managed tech support |
| H1 | Your outsourced tech team, for a fixed monthly fee | Reliable tech support for growing businesses, at a fixed monthly fee |
| Trust line | 27 years in financial services tech · No call centres · Cancel with 30 days' notice | Defined response times · Every request tracked · Cancel with 30 days' notice |
| Plans H2 | Fixed monthly fees. No surprises. | Published prices. Defined service levels. |
| Plan wording | Monthly health email · Quarterly review call · 12-month tech roadmap | Monthly health report · Quarterly service review · 12-month technology roadmap |
| Extra hours note | Extra hours £80/hour. Larger projects quoted at a fixed price… | Additional hours £80/hour. Projects quoted at a fixed price… |
| Section 7 | Founder section (Mike) | Why PNK Digital + Our service standards |
| FAQ | 6 questions | 8 questions (+ team unavailable, + documentation) |
| Band intro | A relaxed video call with Mike… | A 30-minute video call with our support team… |

**Honesty constraint for B:** do not add team size, staff names, office locations, years trading, certifications, client counts or statistics anywhere on B, including meta tags and alt text.

## Data model (`src/data/tech-support.ts`)
```ts
type Plan = {
  id: 'essentials' | 'growth' | 'partner';
  name: string; price: number; from?: boolean;
  tagline: string; hours: string; response: string;
  includes?: string;            // "Everything in Essentials, plus:"
  features: string[];
};
type CompareGroup = { title: string; rows: { label: string; v: (boolean | string)[] }[] };
type Step = { title: string; when: string; body: string; points?: string[] };
type Faq = { q: string; a: string };
```
The values for each variant are written out in the `renderVals()` method of `Tech Support Plans.dc.html` (A) and `Tech Support Plans B.dc.html` (B).

## Placeholders and content gaps (must resolve before launch)
- **A:** two photos of Mike (hero card and founder section).
- **Both:** real, approved testimonials. Until then, hide the section.
- **B:** the FAQ answer for "What happens if your team is unavailable?" reads `[To be written]`.
- **Both:** the booking-form backend and a privacy-policy link near the submit button.

## Assets
- **Icons:** simple 24×24 stroke SVGs drawn inline (check, clock, arrow, monitor, envelope, shield, lightning bolt, lock, people/network, document, chat bubble, tag, plus). Replace them with the site's icon set if it has one (e.g. Lucide, which matches closely), keeping stroke width 2 (3 for checks).
- **Images:** none, apart from the Mike photo slots in A.
- **Font:** Plus Jakarta Sans.

## Files in this bundle
- `Tech Support Plans.dc.html`: version A, full page (copy and data in the logic class)
- `Tech Support Plans B.dc.html`: version B, full page
- `Tech Support Plans Preview.dc.html`: side-by-side desktop and mobile preview of both
- `PnkHero.dc.html`: version A hero
- `PnkHeroB.dc.html`: version B hero (portal mock-up)
- `PnkPricingCard.dc.html`: pricing card
- `PnkCompareTable.dc.html`: comparison table (desktop grid and mobile tabs)
- `PnkSteps.dc.html`: how-it-works steps
- `PnkFaq.dc.html`: FAQ accordion
- `PnkBookingBand.dc.html`: CTA band and booking form, with validation and success state
- `support.js`, `image-slot.js`: prototype runtime only, so the files open in a browser. **Not for production.**

Open `Tech Support Plans Preview.dc.html` in a browser, served from a local static server, to see both versions.
