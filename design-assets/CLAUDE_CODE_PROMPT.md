I'm adding two A/B-test landing pages for my "Tech Support Plans" service to this Astro site. The design handoff is in `design_handoff_tech_support_landing/`. Read `README.md` there first; it is the spec. The `*.dc.html` files are high-fidelity HTML design references. Recreate them; don't copy them. They depend on a prototype runtime (`support.js`) that must not ship. All final copy and data are in the `renderVals()` method of `Tech Support Plans.dc.html` (version A) and `Tech Support Plans B.dc.html` (version B). Lift the copy verbatim.

## Before you write code
1. Explore the repo: Astro version, TypeScript setup, folder conventions, existing layouts, global CSS, how fonts and analytics load, any existing form handling, and the hosting/deploy config (Netlify, Vercel, Cloudflare or other).
2. Give me a short plan: the files you'll create, how you'll isolate the landing theme, the form backend you propose, and how traffic will be split. Wait for my OK.

## Requirements
**Isolation.** These pages use a different colour scheme and theme from the main site.
- Create `src/layouts/LandingLayout.astro`. It must not use the site's header, footer, nav or global theme CSS.
- Reuse only the shared head essentials: favicon, analytics, consent banner and SEO meta helpers, if they exist.
- Scope all styles: put design tokens as CSS custom properties on a `.landing[data-theme="a"|"b"]` wrapper, and use Astro scoped styles.
- Nothing may leak into, or out of, the rest of the site.

**Routes**
- `/tech-support/`: version A.
- `/tech-support/b/`: version B, with `noindex` and a canonical link to `/tech-support/`.
- Traffic split: propose the simplest option for our host, e.g. edge middleware with a sticky cookie. Keep both URLs directly reachable for QA.

**Components.** Build reusable, typed components in `src/components/landing/`, as listed in the README. Both pages share PricingCard, CompareTable, Steps, Faq, BookingBand/BookingForm, CtaStrip and StickyCta, themed only through tokens. Put plans, compare groups, steps and FAQs in `src/data/tech-support.ts`, with per-variant overrides.

**JavaScript.** The site is static, so ship minimal JS: small `<script>` tags or islands only for these:
- Compare-table mobile tabs.
- Sticky mobile CTA, which shows after 560px of scroll and hides while the booking band is visible (IntersectionObserver).
- Plan pre-selection on scroll to `#book`, with a 68px header offset and focus on the Name field afterwards.
- Form validation and success state.

The FAQ can be `<details name="faq">`. Everything must still render and be usable with JS disabled.

**Booking form.**
- Fields, validation messages and the success state are exactly as specified in the README.
- Submit to the backend we agree in the plan.
- Include hidden fields: `variant`, `source=tech-support-plans`, and any UTM parameters from the URL.
- Fire an analytics event on successful submit, with variant and plan, using whatever analytics the site already has.

**Fidelity**
- Match the designs closely: Plus Jakarta Sans (self-host via `@fontsource` if the site self-hosts fonts), the exact hex tokens, `clamp()` type scale, spacing, radii, shadows, and hover/focus states.
- Mobile-first. The JS breakpoint is 760px.
- Use inline SVG icons as in the designs, or Lucide equivalents if the site already uses Lucide.

**Accessibility (WCAG AA)**
- Pink CTA buttons keep 19px bold white text, because #ec008c only passes contrast as large text.
- Small pink text uses #b3006b.
- Labelled fields, `aria-invalid` and `aria-describedby` on errors, visible `:focus-visible` outlines, one H1 per page, landmarks, and `prefers-reduced-motion` respected.

**Honesty constraint (version B).** No individual's name, team size, locations, years trading, certifications, client counts or statistics anywhere: copy, meta or alt text. The hero portal mock-up is HTML/CSS labelled "Illustrative example", with `role="img"` and an aria-label.

**Placeholders**
- Version A has two image slots for photos of Mike. Use `src/assets/landing/mike-hero.jpg` and `mike-founder.jpg` with Astro `<Image>`, and a neutral fallback if the files are missing.
- Testimonials sit behind a `SHOW_TESTIMONIALS` flag, off by default.
- The version B FAQ "What happens if your team is unavailable?" keeps `[To be written]`. Add a TODO comment.

## When done
- Run the build and fix all type and lint errors.
- Check both pages at 390px and 1280px, test the form, plan pre-selection and the sticky bar, and run a Lighthouse or axe accessibility pass.
- Summarise what you built, how to switch or adjust the A/B split, and the remaining TODOs: photos, testimonials, the FAQ answer, and a privacy-policy link beside the submit button.
