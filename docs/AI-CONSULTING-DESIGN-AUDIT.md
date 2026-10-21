# /ai-consulting design audit

**Date:** 2026-10-20
**Branch:** `site-update/phase-3` at 17021ec
**Scope:** `src/pages/ai-consulting.astro` and the landing components it uses, compared with the home page (`src/pages/index.astro` → `HomePage.jsx`) and the tech-support plans page (`src/pages/tech-support.astro`). Read-only; no files were changed.

**How this was checked.** The server on :4321 was not Astro at the time of the audit (it was `npx serve` on an unrelated Framer capture, returning 404 for every route), and :3000 was an unrelated CRA app. The audit therefore used the existing `dist/` build (built 15:23, includes 17021ec) served read-only and measured in headless Chrome using iframes set to exact widths (360 / 768 / 820 / 900 / 1024 / 1440). Anything marked **measured** comes from that run; anything marked **code-derived** is reasoned from the CSS.

## Progress (updated 2026-10-21)

| Item | Status |
|---|---|
| Quick wins 1–9 | Done, committed a292b73 |
| Change 1, booking band; Q2 (#db0082 button fill); Q3 (CTAs open the Cal modal, "Send message") | Done, committed f0e75d4 |
| Change 3, explicit grid breakpoints (pricing 1→3 at 1120px, steps 3 at 860px, quotes 2→4, experience 2→5) | Done, committed c262b47 |
| Change 4, header links from 900px and a `--lp-header-h: 72px` token driving scroll offsets | Done, committed c262b47 |
| Change 5, `--lp-focus` / `--lp-focus-on-pink` tokens, white on `.final`, `.diff`, `.problem-answer` | Done, committed c262b47 |
| Change 8, `--lp-border-strong`, `--lp-radius-inner` (12px in B, 14px in A), Cal dialog colours from landing tokens | Done, committed c262b47 |
| Change 9, sticky bar also hides over the final CTA and footer (`data-sticky-hide`) | Done, committed c262b47 |
| Change 10, CompareStrip `headingLevel` and `stack`; the ROI figures stay a compact table on phones (fits at 320px) | Done, committed c262b47 |
| Landing footer column titles h2 → h3; 44px footer link targets under 760px | Done, committed c262b47 |
| Change 12, home navbar and hero CTAs open the Cal modal | Partly done; the rest waits on Q1 |
| Change 2, shared section components: ProblemSplit, WhySection, QuoteGrid, ListCard, ExperienceGrid, FinalCta, BookingCopy; `.lp-split`, `.lp-statement`, `.lp-ink` primitives in LandingLayout. Pages went from 1027 and 983 lines to 472 and 409; screenshots pixel-identical | Done, committed 52bd3c2 |
| Change 6, hero compaction: shared eyebrow style with the dot (pill gone), trust list moved after the CTA. CTA 129–173px higher; inside the first screen at every tested size (was below it at 320×640 and 360×740). Eyebrow wording unchanged (Q6) | Done, committed e18999a |
| Change 7, type scale: `--lp-text-xs/sm/base/md/lg` (13/15/17/19/22), `--lp-h3` 22, `--lp-h3-lg` 26, `--lp-h2-band`; 93 declarations mapped across 21 components and both pages. Section h3s 6 sizes → 1 (plus plan names at 26). Left alone: mock-up internals, fluid display clamps, compact ROI table, header, Cal dialog, five unused theme-A components. Pages ~3% taller on phones (body text 16 → 17, leads 18 → 19) | Done, committed 94f7014 |
| Change 11: ServiceGrid `variant="compact"` (no icon tiles or cards; title and line under a hairline with a pink accent; 1 → 2 → 3 across) used for "What a pilot can look like" | Done, committed c2e4bda |
| Cal dialog "Pick a time" h2 inside the band's h3 | Left as is: the modal is its own context, and the same component needs h2 on home and /contact |
| Q4, page length (approved for /ai-consulting): "Safe by design" moved to straight after "Why PNK Digital" (above pricing; directly before pricing would put two tinted sections together). "Experience" removed, since all five areas are already in Why PNK's chips and copy. 15 → 14 sections; page 1600px shorter at 360, 940px at 1440 | Done, committed bd23847 |
| Q4 for /tech-support: "Security" moved to straight after "Why PNK Digital"; "Experience" removed (covered by the chips). ExperienceGrid component deleted as unused. Page ~1600px shorter at 360, ~900px at 1440. "Automation & AI" and "Local to you" still follow the booking band | Done, committed cafd440 |
| /tech-support background alternation: Security moved between "Who we help" and "Client stories" (both white; flush-top removed); "Automation & AI" now tinted so it no longer matches "Local to you". No neighbouring sections share a background on either page | Done, committed cafd440 |
| Q1, one design system: **decided 2026-10-21, the landing design (theme B) becomes the site system.** Brief in `plans/one-design-system-prompt.md`. Plan approved 2026-10-21: (a) rebuild every old page in Astro on a `SiteLayout` derived from `LandingLayout`; `LandingHeader` gets a site mode (5 nav links, phone, Book, menu below 1024px) and the landing pages keep their section-link header; `LandingFooter` is the only footer; a hidden Cal embed on every site page so every `data-book` opens the modal; `cta_click` extended to the rebuilt pages; audit mockups removed; Plus Jakarta Sans self-hosted in step 0 (Q5). Order: 0 foundation + 404, 1 home, 2 contact, 3 about + services, 4 blog, 5 work, 6 legal, 7 audit + Surrey, 8 cleanup | Done (steps below), not committed |
| Q1 step 0, foundation: `SiteLayout` (LandingLayout theme B + `LandingHeader site` + `LandingFooter` + hidden `BookingEmbed trigger={false}` + site-wide `cta_click` with `page` and `cta_location`); header site mode (5 links from 1080px, phone number from 1320px, `<details>` menu below 1080px that works without JS, closes on Esc and outside click; phone moves into the menu under 480px); Plus Jakarta Sans self-hosted (`@fontsource-variable/plus-jakarta-sans` 5.3.0, latin preloaded, latin-ext by unicode-range; Google Fonts gone from landing pages); `.lp-btn` 15px with 12px side padding below 360px (fixes the pre-existing 320px wrap of "Book a free 30-minute call" on both landing pages); 404 rebuilt on SiteLayout. Site pages now `lang="en-GB"` (was `en`). Known: the 404 has no h2, so the footer's h3s follow the h1 | Done, not committed |
| Q1 step 1, home: `index.astro` rebuilt on SiteLayout, copy unchanged. Bands: hero (surface, centred) > two doors (white, cards) > Why PNK (slate, photo via astro:assets) > What clients say (surface: case studies + Testimonial cards) > How it works (white; `Steps` gained optional `routes` for Support/AI) > [Latest Thinking, surface, build-time 90-day rule; hidden now] > #book (slate; "See available times" opens the site modal, falls back to the Cal.com page). New `PostCard.astro`, `calendar` icon. Head and JSON-LD identical; 37 → 0 `opacity:0` elements; JS 192 KB/27 scripts → 2 KB/5. Deleted: HomePage.jsx, Hero, ServicesOverview, CredibilitySection, ProofStrip, BlogHighlights, ParticleBackground, DataTransformationViz. astro check 8 → 5, tsc 30 → 25 (the deleted files held errors) | Done, not committed |
| Q1 step 2, contact: new `ContactForm.astro` (same fields, topics, honeypot, 3s guard, 60s cooldown, payload, `form_submitted` + Ads conversion; button "Send message"; tested with a mocked API, never the live one); `/contact` rebuilt (PageIntro, Cal card opening the modal, form + details) | Done, not committed |
| Q1 step 3, about + services: new `PageIntro` (centred h1, optional pink accent) and `SiteCta` (slate band, `data-book`; replaces CtaBanner); `ServiceGrid columns={2}`, `Steps columns={4}`; `services.ts` uses landing icon names. `:target` is exempt from the reveal offset so cross-page anchors (`/services#ai-mvps`) land at 72px | Done, not committed |
| Q1 step 4, blog: posts render at build time (`render(entry)`, `Prose.astro`); `smartypants: false` keeps quotes as written (article text identical to before); filter is progressive enhancement; `ShareLinks.astro` (copy button only with Clipboard API). `lib/blog.ts` (bundled every post into client JS) deleted | Done, not committed |
| Q1 step 5, work + case study (template checked by temporarily publishing a placeholder, then restored) | Done, not committed |
| Q1 step 6, privacy + terms: JSX bodies converted mechanically into `LegalDoc.astro`; text identical | Done, not committed |
| Q1 step 7, /audit, /audit/[slug], /landing/web-developer-surrey on LandingLayout with their own headers: Astro AuditHeader/AuditFooter/ScoreRing/IssueCard/ProspectCard, AA-safe score/severity colours; mockups removed (Mike). Surrey page now has LandingFooter, so it gains the LocalBusiness JSON-LD | Done, not committed |
| Q1 step 8, cleanup: deleted Layout, BareLayout, BaseHead, index.css, layout/, sections/, ui/, decorative/, hooks/, utils/animations, lib/router, audit .tsx + mockups, 5 theme-A components; uninstalled Tailwind, Framer Motion, lucide-react, React (+ @astrojs/react, types, eslint react plugins), react-markdown, remark-gfm, rehype-highlight; BookingEmbed dark theme removed; icon names/paths moved to `icons.ts` (fixes a tsc error in data files). Results: all 28 pages pass the checklist (verify.mjs) at 320–1440; every head + JSON-LD identical to before except Surrey's added LocalBusiness; built assets 3.6 MB → 524 KB, JS per page ~1–2 KB (was 23–508 KB); astro check 8 → 3, tsc ~30 → 3 (remaining: `src/lib/posts.ts` implicit any, pre-existing); lint passes. Open: footer h3s follow the h1 on pages with no h2 (404, /work empty, both thanks pages) | Done, not committed |
| Copy to revisit (Mike, 2026-10-21; left as is): /landing/web-developer-surrey says "£75/month" and "Book a Free 15-Minute Call", which differ from the rest of the site; /audit still says "designed custom mockups" and "We Show What's Possible… homepage concept" although the mockups are gone (`mockupDescription` in prospects.ts is now unused); Q6 items | Waiting on Mike |
| Q5 fonts: decided 2026-10-21, self-host Plus Jakarta Sans as part of step 0. Q6 still open | Q5 decided; Q6 waiting |

### Next session: the three open decisions

All audit code changes are committed on `site-update/phase-3` (latest c2e4bda; nothing pushed). Only these remain, and each needs Mike's decision first:

1. **Q1, one design system or two. DECIDED 2026-10-21: one system, the landing design. Start from `plans/one-design-system-prompt.md`.** Home (`HomePage.jsx`, Tailwind, Framer Motion) is dark neon: Inter, #f4178c, gradient buttons that fail contrast (white on the cyan end is 1.35:1; white on #f4178c at 16px is 3.93:1). The landing pages are light slate: Plus Jakarta Sans, #ec008c, button fill #db0082. Decide whether the landing system becomes the site system and whether #ec008c is the only brand pink. If yes, Change 12 follows: retire the gradient `Button` and `GradientText`, change `--color-brand-pink`, make the home Cal button AA-safe and remove the h1's `opacity:0` server render. Home's navbar and hero CTAs already open the Cal modal.
2. **Q5, fonts.** Both families load as render-blocking Google Fonts CSS (`LandingLayout.astro` head, `BaseHead.astro`). Both are OFL, so self-hosting is free. Decide whether to self-host and which family is the site face. This ties to Q1.
3. **Q6, copy flags.**
   - The hero eyebrow on /ai-consulting is 62 characters ("For businesses that want AI doing real work, not just a chatbot"). It wraps to 2 lines at 360px; shorter wording is wanted. It lives in `src/data/ai-consulting.ts` (`hero.eyebrow`).
   - Client stories on /ai-consulting are tech-support clients, with a placeholder note. An AI pilot quote is needed.
   - The pricing card aria-label ends in "… plan" (`PricingCard.astro`), which reads oddly for a one-off audit.

Smaller follow-ups, no decision needed:
- Five landing components are unused and could be deleted: CompareTable, ProblemGrid, HeroFounder, FounderSection and Testimonials (theme-A leftovers).
- Not yet checked on a real device: the scroll motion, the landing header between 760 and 900px (no section links and no menu), and the Cal.com modal on a phone.
- /tech-support: "Automation & AI" and "Local to you" still sit after the booking band.
- `pilotExamples` in `src/data/ai-consulting.ts` still carries icons that the compact list no longer shows.

---

## 1. Diagnosis

Ranked by impact.

### D1. The booking band gives the real booking action less weight than the message form

- `BookingBand.astro:45-55`: the Cal.com action is an auto-width pink button labelled "See available times" (`BookingEmbed.astro:21`, `:30`).
- Directly below it, the message form's submit is a full-width pink button labelled "Book a free 30-minute call" (`ai-consulting.astro:313`, `BookingForm.astro:103`).
- Measured at 1440: the submit (full width, 58px tall) clearly outweighs the calendar button.
- Every other CTA on the page promises "Book a free 30-minute call". That label lands on a form that only sends a message, and the success heading then says "Thanks – you're booked in." (`BookingForm.astro:111`).
- Result: two equal pink primaries next to each other, with the labels swapped relative to what each one does. Tech-support has the same problem (same component).

### D2. About 430 lines of page CSS are duplicated between the two landing pages

- Diffing the `<style>` blocks of `ai-consulting.astro:461-990` and `tech-support.astro` shows they are identical apart from comments, `.diff-foot`, `.roi` and `.more-block`.
- `ai-consulting.astro:7` says "keep the two in step". That is manual syncing, and it is how drift starts.
- Primitives that should be components: split + problem card, Why-PNK slate band, quote grid, list card, experience grid, final CTA, booking copy.

### D3. Auto-fit grids leave orphans and grey holes at tablet and small-laptop widths (measured)

| Grid | Code | 768 / 820 | 900 | 1024 | 1440 |
|---|---|---|---|---|---|
| Pricing (3) | `PricingSection.astro:66` minmax 300 | 2+1 | 2+1 | 2+1 | 3 |
| Experience (5) | `ai-consulting.astro:867` minmax 200 | 3+2 | 4+1 | 4+1 | 5 |
| Quotes (4) | `ai-consulting.astro:661` minmax 240 | 2+2 | 3+1 | 3+1 | 4 |
| Steps (3) | `Steps.astro:34` minmax 260 | 2+1 | 2+1 | 3 | 3 |

- The `.exp` grid draws its dividers with `gap:1px; background: var(--lp-border)` (`:868-869`). Empty cells therefore render as solid #e3e7ed blocks. At 1024: one card, then a grey slab three columns wide.
- At 1024, the Recommended pricing card sits top-right and the third card is stranded below it.

### D4. The section links in the landing header wrap between 760 and about 880px (measured)

- `LandingHeader.astro:97` shows the links from 760px, but the header doesn't have room at that width.
- Measured header height: 69px at 360, **117px at 768**, **93px at 820**, 72px from 900. At 768, "How it works" breaks onto three lines.
- `scroll-padding-top: 68px` (`LandingLayout.astro:37`) and `HEADER_OFFSET = 68` (`BookingForm.astro:126`) assume 68px, so anchor jumps land under the header at those widths.
- No horizontal overflow at any tested width on any of the three pages (scrollWidth = clientWidth).

### D5. The focus ring disappears on pink buttons over slate

- `LandingLayout.astro:285-288` sets `.lp-btn--pink:focus-visible { outline: 3px solid var(--lp-dark) }`.
- In theme B, `--lp-dark` is `--lp-slate` (#1f2a37), which is also the background of `.final` (`ai-consulting.astro:923-926`).
- The ring is offset 3px, so it sits on slate: **1.00:1**. Keyboard users lose focus on the last CTA on the page. Tech-support has the same problem.

### D6. The home page uses a different design system

| | Home | Landing pages |
|---|---|---|
| Theme | Dark neon (`index.css:3-27`) | Light slate |
| Brand pink | #f4178c (`index.css:21`) | #ec008c (`LandingLayout.astro:53`) |
| Font | Inter (`BaseHead.astro:16`) | Plus Jakarta Sans (`LandingLayout.astro:22`) |
| Headline | Gradient h1 (`Hero.jsx:55`) | Solid ink |
| Primary button | Pink→purple→cyan gradient with glow, 8px radius (`Button.jsx:5-10`) | Solid pink, 12px radius |
| Section padding (mobile / desktop) | 96 / 128px (`Section.jsx:27`) | 56 / 112px |
| Container | 1216px | 1160px |
| h1 sizes (measured) | 30 / 60 / 72px | 36 / 40 / 53 / 62px |

- Home also contains gradient text, orbs, particles and glow.
- The home h1 is server-rendered at `opacity:0` (Framer `initial`), so it stays invisible until hydration. Headless Chrome rendered a blank hero.
- The home navbar CTA goes to `/contact` (`Navbar.jsx:107`, `:181`); every other CTA goes to `#book`.

### D7. The ai-consulting hero runs long, so the pink CTA sits at the fold edge (measured)

| Width | Hero CTA top / bottom | Notes |
|---|---|---|
| 360 | 681 / 739px | h1 is 150px (4 lines at 36px). Tech-support's is 624/682. |
| 1024 | 687 / 745px | Below the fold on a 1024×768 iPad. |
| 1440 | 698 / 756px | Visible at 1440×900, but only just. |

What makes it long:
- A 62-character uppercase eyebrow inside a bordered pill (`HeroCompany.astro:128-141`). It runs to 3 lines at 360 and leaves "CHATBOT" alone on a line at 1440.
- A 3-item trust list placed above the CTA (`:46-48`).
- On mobile, until the sticky bar appears after 560px of scrolling, the only CTA in the fold is the slate header button.

### D8. Smaller issues

- **Two pink buttons stacked at the bottom on mobile.** `StickyCta.astro:21-33` only hides the bar over `#book`. At 360, the final CTA and the sticky bar show two identical pink buttons about 40px apart.
- **Final CTA and footer merge.** Both are slate (`LandingFooter.astro:113`), with no divider. Measured at 1440: about 192px of undifferentiated slate.
- **Pricing button labels wrap at 360.** The card is 262px wide inside its padding, and 19px text with 20–28px button padding doesn't fit. 19px is forced by the pink contrast (see the table below).
- **Hard-coded values that bypass tokens:**
  - `BookingBand.astro:135` radius 28px. Theme B's panel radius is 24.
  - `HeroCompany.astro:138` and `:342` use #d5dbe3.
  - `HeroCompany.astro:387` and `AuditPanel.astro:140` use #e8edf3.
  - `BookingEmbed.astro:138-141` uses theme-A warm greys (#5f5a63, #e7e2de) and a raw #ec008c (`:203`).
  - `HeroCompany.astro:132-140` re-declares the eyebrow tokens by hand.
- **No type scale.**
  - Body sizes 12–22px are used in every 1px step: 16px ×19, 15px ×19, 14px ×18, 17px ×12, and so on.
  - There are eight different display clamps outside `--lp-h1`/`--lp-h2`.
  - h3 comes in six sizes: 18 (`ai:892`), 20 (`ServiceGrid:77`, `CompareStrip:137`), 21 (`ai:691`, `ai:734`), 22 (`Steps:73`, `BookingBand:110`), 26 (`PricingCard:112`), 28 (`BookingForm` success).
- **Redundant tokens.** In theme B, `--lp-radius-card` and `--lp-radius-card-lg` are both 20px, and `--lp-rule`, `--lp-border` and `--lp-header-border` are all #e3e7ed.
- **Section nav order doesn't match page order.** `ai-consulting.astro:61-66` lists How → Pricing → Clients → FAQ; the page order is Clients → Pricing → How → FAQ. Tech-support uses a different order again ("Plans" first).
- **Two near-identical 6-card grids.** `ai:138` and `ai:225` use the same ServiceGrid treatment, and four icons repeat between them (clock, code, file, chat).
- **Small tap targets in the footer.** Footer links are 15px with no padding, about 22px tall (`LandingFooter.astro:183-187`). Passes WCAG 2.5.8 through spacing but misses the 44px target.
- **Wrong sticky-bar label.** `StickyCta.astro:14` uses aria-label "Book a review", which is tech-support wording.

### Heading hierarchy (ai-consulting)

There is exactly one h1: `HeroCompany.astro:42`. Rendered order:

- **h2 (section titles):** `ai:105`, `ai:132`, `ai:148`, `ai:164`, `ai:200`, `ai:222`, `ai:243`, `PricingSection:44`, `ai:295`, `ai:318` (book), `ai:345`, `ai:366`, `FaqSection:19`, `ai:401`. Footer: `LandingFooter:60` ×2 and `:74`.
- **h3, correctly placed:**
  - Services ×6 (`ServiceGrid:25`)
  - Compare cards ×3 (`CompareStrip:45`, under 760px only)
  - Examples ×6
  - Plan names ×3 (`PricingCard:30`), plus `ai:275` and `ai:282`
  - Steps ×3 (`Steps:19`)
  - Experience ×5 (`ai:377`)
  - Booking band: "Pick a time" (`BookingBand:46`), "Or send us a message" (`:53`), and the hidden success heading (`BookingForm:111`)
- **Problems:**
  1. `ai:227` h3 "Illustrative: 4 hours saved…" is followed by `CompareStrip:45` h3 cards ("10 people" and so on) at under 760px. Those cards are children of the ROI heading and should be h4.
  2. `BookingEmbed:35` puts an h2 "Pick a time" inside the h3 "Pick a time" card. Inverted level and duplicate text. Low impact, because the closed `<dialog>` isn't exposed to assistive tech.
  3. The landing footer uses h2 for its column titles; the main `Footer.jsx` uses h3.
- No headings are used purely for styling.

Tech-support has the same structure without the ROI problem. Home has one h1, and `Footer.jsx` column titles are h3.

### CTA analysis

**Placements on ai-consulting:** header (slate), hero (pink), CtaStrip (pink), 3 pricing cards (1 pink, 2 outline), `.more` (pink), booking-band Cal button (pink, "See available times"), form submit (pink), final (pink), sticky bar under 760px (pink).

| Page | Label used | Destination | Cal.com button |
|---|---|---|---|
| ai-consulting | "Book a free 30-minute call" (`config/site.ts:23`) on 10 controls | `#book` | "See available times", white on #ec008c, 19px/700 |
| tech-support | Same 10 | `#book` | Same |
| home | Same label; hero button is a gradient, navbar button is gradient 14px | Hero → `#book`, navbar → `/contact` | "See available times", white on #f4178c, 16px/600 (fails AA) |

- Wording is consistent across the three pages.
- What breaks it: the form submit carries the booking label while the actual booking button is labelled "See available times"; home sends its navbar CTA to a different place; and home's buttons look nothing like the landing ones.

### Pink contrast

All pairs computed with the WCAG formula.

| Use (file:line) | FG / BG | Ratio | AA normal 4.5 | AA large 3.0 | Non-text 3.0 |
|---|---|---|---|---|---|
| Pink buttons and band copy, all ≥19px/700 (`LandingLayout:267`, `BookingBand:62`, `ai:762-822`) | #fff / #ec008c | 4.25 | Fail | **Pass** (19px bold counts as large) | n/a |
| Button hover (`LandingLayout:272`) | #fff / #c8007a | 5.62 | Pass | Pass | n/a |
| `.review-call a:hover` (`ai:818`) | #1f2a37 / #ec008c | 3.42 | Fail | Pass (19px/700) | n/a |
| Eyebrows, links, icons, `.positioning` | #b3006b / #fff | 6.71 | Pass | Pass | Pass |
| Same, in surface sections | #b3006b / #f4f6f9 | 6.20 | Pass | Pass | Pass |
| Steps `.n`, `th.hl`, Audit `.rank` | #b3006b / #fdeef6 | 5.99 | Pass | Pass | Pass |
| Badge (14px/800), Audit `pill.pilot` (12px/800) | #fff / #b3006b | 6.71 | Pass | Pass | n/a |
| Diff eyebrow (`ai:554`), footer hover and focus (`LandingFooter:190`, `:198`) | #ff5cb0 / #1f2a37 | 5.13 | Pass | Pass | Pass |
| Popular border (`PricingCard:90`), compare `.hl` (`CompareStrip:132`), Audit row 1 (`AuditPanel:103`), `.mark`, `.dot`, rules, focus rings on white | #ec008c / #fff | 4.25 | n/a | n/a | Pass |
| Hero `.call` underline, focus rings on surface | #ec008c / #f4f6f9 | 3.92 | n/a | n/a | Pass |
| `.final-call` underline and default focus ring on slate | #ec008c / #1f2a37 | 3.42 | n/a | n/a | Pass (narrowly) |
| White quote rule on the pink band (`ai:801`) | #fff / #ec008c | 4.25 | n/a | n/a | Pass |
| **Pink button focus ring in `.final`** (`LandingLayout:286`) | #1f2a37 / #1f2a37 | **1.00** | n/a | n/a | **Fail** |
| Home: `text-brand-pink` on abyss | #f4178c / #0a0a0f | 5.03 | Pass | Pass | Pass |
| **Home: "See available times" (`index.astro:19`, 16px/600), step numbers (`HomePage.jsx:64`)** | #fff / #f4178c | 3.93 | **Fail** | Pass | n/a |
| **Home: gradient primary button** (`Button.jsx:5`; `Hero.jsx:75` 18px/600, `Navbar.jsx:108` 14px) | #fff / #f4178c → #8b5cf6 → #00f5ff | 3.93 / 4.23 / **1.35** | **Fail** | **Fail at the cyan end** | n/a |

The lightest version of #ec008c's hue that gives white text 4.5:1 is **#e40087 (4.52)**; #db0082 gives 4.85.

### 360 / 1440 summary

- **360 (measured):** no overflow; header 69px; hero CTA bottom at 739px; pricing cards stack, but their CTA labels wrap to 2 lines; the compare strip correctly switches to cards (`CompareStrip.astro:172`); the ROI strip also switches to 3 verbose cards for a 2×3 table that would fit as a table.
- **1440 (measured):** containers line up. The header's inner content box is 1288 − 2×64 = 1160px, the same as `--lp-max`. Section rhythm is a consistent 112px. The hero panel is centred vertically beside a much taller copy column, leaving about 150px of empty space above it.

---

## 2. Design direction

The landing system (theme B) is the stronger expression of PNK Digital: light, editorial, type-led, slate neutrals doing the structural work, with pink used as a scalpel. /ai-consulting should feel like a precise engineering consultancy rather than an AI startup. That means calm, evidence-first sections (ranked lists, numbers, comparison tables, one face), a strict type scale, and fewer card grids, with more contrast coming from typography and whitespace. Each viewport should have one dominant pink action. The saturated pink band should be reserved for the single booking moment, and inside it the Cal.com button should be the unmistakable primary.

**Token decisions:**
- Keep #ec008c as the brand pink. Add a `--lp-pink-cta` fill (proposed #db0082, 4.85:1) so button text can drop to 17px/700 without failing AA. Decision needed (see section 5).
- Collapse body text to 6 sizes and h3 to one size plus a large variant.
- One inner radius (12px) and one chip radius (6px).
- A per-surface `--lp-focus` token.
- Grids with explicit, item-count-aware breakpoints instead of auto-fit.
- The home page should eventually adopt this system rather than the other way round.

---

## 3. Suggested changes

Ranked by impact. "Also fixes" lists the other pages that benefit. `landing/web-developer-surrey` is React and uses none of these components.

### 1. Booking band hierarchy

- Files: `BookingBand.astro`, `BookingEmbed.astro`; call sites `ai-consulting.astro:303-315`, `tech-support.astro` BookingBand.
- `BookingBand.astro:48`, before: `<BookingEmbed linkClass="lp-btn lp-btn--pink" />`. After: `<BookingEmbed linkClass="lp-btn lp-btn--pink lp-btn--block" label={CALL_LABEL} />`
- `BookingBand.astro:46-47`: keep "Pick a time" as the h3 and make it the visually primary card.
- Form props on both pages, before: `submitLabel: PRIMARY_CTA`. After: `submitLabel: 'Send message'`.
- In `BookingForm.astro:103`, make the submit secondary: `lp-btn lp-btn--outline lp-btn--block submit`.
- Also fixes tech-support. The `label` prop also lets home and /contact match.
- Optional enhancement: have `[data-book]` clicks open the Cal dialog directly, keeping the `#book` anchor as the no-JS fallback.

### 2. Extract the duplicated sections into components

New files in `src/components/landing/`:

| Component | Replaces |
|---|---|
| `ProblemSplit.astro` | `.split`, `.problem-*`, `.mark` |
| `WhySection.astro` | `.diff*`, `.chips`, `.founder*`, `.principles`, `.build` |
| `QuoteGrid.astro` | `.quotes*` |
| `ListCard.astro` | `.list-card*`, `.ticks` |
| `ExperienceGrid.astro` | `.exp*` |
| `FinalCta.astro` | `.final*` |
| `BookingCopy.astro` | `.review-*` |

- Move `.split` into `LandingLayout.astro` primitives as `.lp-split`.
- Removes about 430 duplicated lines from each page. Also fixes tech-support.

### 3. Grid primitive with explicit breakpoints (`LandingLayout.astro`)

```css
.landing .lp-grid { display:grid; gap:var(--lp-grid-gap,20px); grid-template-columns:minmax(0,1fr); }
@media (min-width:700px){ .landing .lp-grid{ grid-template-columns:repeat(var(--cols-md,2),minmax(0,1fr)); } }
@media (min-width:1100px){ .landing .lp-grid{ grid-template-columns:repeat(var(--cols-lg,3),minmax(0,1fr)); } }
```

- Pricing (`PricingSection.astro:64-70`). Before: `repeat(auto-fit, minmax(min(100%, 300px), 1fr))`. After: a single column with `max-width:620px; margin-inline:auto` below 1100px, and `repeat(3, minmax(0,1fr))` from 1100px. Avoids both the 2+1 orphan and wrapping CTA labels in narrow 3-up cards.
- Experience (`ai:865-873`). Before: auto-fit 200 with `gap:1px; background:var(--lp-border)`. After: `--cols-md:2; --cols-lg:5`, plus `.exp li:last-child:nth-child(odd){grid-column:1/-1}` inside the md range so no empty grey cell can appear.
- Quotes: `--cols-md:2; --cols-lg:4`. Steps: `--cols-md:3` from 860px.
- Also fixes tech-support.

### 4. Header (`LandingHeader.astro`)

- `:97`: `@media (min-width: 760px)` → `@media (min-width: 900px)`.
- `:102-110`: add `white-space: nowrap;`.
- Add a `--lp-header-h: 68px` token and use it in `LandingLayout.astro:37` (`scroll-padding-top: var(--lp-header-h)`) and `BookingForm.astro:126`.
- Also fixes tech-support.

### 5. Focus ring token (`LandingLayout.astro:180-183`, `:285-292`)

- Before: `outline: 3px solid var(--lp-pink)` and `.lp-btn--pink:focus-visible { outline: 3px solid var(--lp-dark) }`.
- After: on `.landing`, set `--lp-focus: var(--lp-pink); --lp-focus-on-pink: var(--lp-dark);`, use those in the rules, and add `.final, .diff, .problem-answer { --lp-focus: var(--lp-white); --lp-focus-on-pink: var(--lp-white); }`.
- Also fixes tech-support.

### 6. Hero compaction (`HeroCompany.astro`)

- `:41`: replace the pill eyebrow with the shared `.lp-eyebrow` plus the dot, and delete `:128-141`. Matches every section eyebrow, removes the hard-coded #d5dbe3 and wraps cleanly.
- `:46-56`: move `<ul class="trust">` after `.ctas` / `.fine` in the DOM. Brings the CTA up by about 130px at 360 (code-derived).
- Also fixes tech-support.

### 7. Type scale tokens (`LandingLayout.astro:51-71`)

- Add `--lp-text-xs:13px; --lp-text-sm:15px; --lp-text-base:17px; --lp-text-md:19px; --lp-text-lg:22px; --lp-h3:22px; --lp-h3-lg:26px; --lp-h2-band: clamp(32px,4.2vw,50px)`.
- Map the existing values onto them:
  - 12 → xs (in mock-ups only)
  - 14 and 15 → sm
  - 16 and 17 → base
  - 18 to 20 → md
  - 21 and 22 → lg
  - All section h3s (ServiceGrid 20, Steps 22, CompareStrip 20, roi 21, more 21, exp 18, card-title 22) → `var(--lp-h3)`
  - PricingCard plan name → `--lp-h3-lg`
- Use `--lp-h2-band` in both `BookingBand.astro:83` (default 34–54) and `ai:763` (32–50) so the two band h2s match.
- Also fixes tech-support.

### 8. Radius and colour cleanup

- `BookingBand.astro:135`: `28px` → `var(--lp-radius-panel)`.
- Add a theme-B token `--lp-border-strong:#d5dbe3` and use it in `HeroCompany.astro:138` and `:342`.
- `#e8edf3` → `var(--lp-surface-2)` in `HeroCompany:387` and `AuditPanel:140`.
- Inner radii 14 and 10 (`HeroCompany:243`, `:287`, `:352`; `AuditPanel:53`, `:99`; `PricingCard:148`) → a new `--lp-radius-inner:12px`.
- `BookingEmbed.astro:138-141`, before: hard-coded values. After: `--cal-ink: var(--lp-ink,#1b1720); --cal-muted: var(--lp-muted,#5f5a63); --cal-line: var(--lp-border,#e7e2de)`, and at `:203` use `var(--lp-pink,#ec008c)`.
- Also fixes tech-support and /contact.

### 9. End-of-page rhythm

- `LandingFooter.astro:112-116`: add `border-top: 1px solid var(--lp-on-slate-rule, rgba(255,255,255,.12));`.
- `StickyCta.astro:21`: observe `[data-booking-band], [data-sticky-hide]`, and add `data-sticky-hide` to the final section and the footer.
- Also fixes tech-support.

### 10. CompareStrip props

- Add `headingLevel?: 3 | 4` (used at `:45`) and `stack?: boolean` (default true). Pass `headingLevel={4} stack={false}` for the ROI table at `ai:228`.

### 11. Second grid on the page

- Give ServiceGrid a `variant="compact"` (no icon tile; title plus body in a 2–3 column list) and use it for `pilotExamples` at `ai:225`. Breaks the run of identical cards and the repeated icons.

### 12. Home alignment (needs sign-off)

- Retire the gradient `Button` primary (`Button.jsx:5-10`) and `GradientText` (`Hero.jsx:55`, `SectionHeading.jsx:26`).
- Change `--color-brand-pink` to #ec008c (`index.css:21`).
- Make the home Cal button 19px/700 or use the AA-safe CTA fill.
- Point the navbar CTA to `#book` on home.
- Remove the `opacity:0` SSR on the h1.

---

## 4. Quick wins

About 20 minutes in total, each a one-line edit.

> **Status: all nine applied on 2026-10-20** (committed a292b73 on `site-update/phase-3`). Item 2 was also applied to tech-support's `.final`. Item 9 maps the pills to theme B's `--lp-surface-2`, which is #eef1f5, slightly lighter than the old #e8edf3.

1. `LandingFooter.astro:115`: add `border-top: 1px solid var(--lp-on-slate-rule, rgba(255,255,255,.12));`
2. `LandingLayout.astro:286`: `outline: 3px solid var(--lp-dark);` → `outline: 3px solid var(--lp-focus-on-pink, var(--lp-dark));`. Then add `--lp-focus-on-pink: var(--lp-white);` inside `.final` at `ai-consulting.astro:924` and in tech-support's `.final`.
3. `LandingHeader.astro:97`: `(min-width: 760px)` → `(min-width: 900px)`.
4. `LandingHeader.astro:108`: add `white-space: nowrap;` to `.links a`.
5. `BookingBand.astro:135`: `border-radius: 28px;` → `border-radius: var(--lp-radius-panel);`
6. `StickyCta.astro:14`: `aria-label="Book a review"` → `aria-label="Book a call"`.
7. `ai-consulting.astro:61-66`: reorder to Clients, Pricing, How it works, FAQ, matching the DOM order. Do the same in `tech-support.astro:73-78` (Clients, Plans, How it works, FAQ).
8. `BookingEmbed.astro:203`: `#ec008c` → `var(--lp-pink, #ec008c)`.
9. `HeroCompany.astro:387` and `AuditPanel.astro:140`: `#e8edf3` → `var(--lp-surface-2)`.

---

## 5. Open questions

1. **One design system or two?** Home is dark neon (Inter, #f4178c, gradients); the landing pages are light slate (Plus Jakarta Sans, #ec008c). Should the landing system become the site system, with home migrating to it? Can #ec008c be confirmed as the only brand pink?
2. **Pink CTA fill.** White on #ec008c is 4.25:1, which forces all button text to 19px bold, and that makes labels wrap in pricing cards at 360. Accept a slightly deeper fill for buttons only, #db0082 (4.85:1), so labels can drop to 17px? The band and accents would stay #ec008c.
3. **Booking flow.** Should every "Book a free 30-minute call" open the Cal.com modal directly, instead of scrolling to `#book` and needing a second click? Can the message form's button read "Send message"? Its success heading, "Thanks – you're booked in.", is inaccurate when no call has been booked (copy flag).
4. **Page length.** /ai-consulting has 14 bands. "Safe by design" and "Experience" sit after the booking band, and "Experience" repeats "Why PNK Digital" (27 years in financial services). Move "Safe by design" above pricing and fold "Experience" into "Why PNK Digital"?
5. **Fonts.** Both families load from Google Fonts as render-blocking third-party CSS (`LandingLayout.astro:19-24`, `BaseHead.astro:14-16`). Both are OFL, so self-hosting costs nothing. Which family should be the site face?
6. **Copy flags (not changed).**
   - The hero eyebrow is 62 characters. Could it be shortened?
   - The client stories on the AI page are tech-support clients, with a placeholder note. When will an AI pilot quote be available?
   - The pricing card aria-label ends in "… plan" (`PricingCard.astro:53`), which reads oddly for a one-off audit.
