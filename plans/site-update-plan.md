# pnk-digital.com Update Plan for Claude Code

Oct 20, 2026 · @Mike

Three phases of site changes from the site review, in the order they pay back, with a paste-ready prompt at the end. Save this file as `docs/site-update-plan.md` in the site repo before running the prompt.

## Decisions and assumptions

Decided today:

- **Voice:** company voice ("PNK Digital", "we") across the whole site. Home, about, services, blog index and contact are rewritten from first person; Mike still appears by name and photo as the founder and the person who does the work.
- **AI Employees page:** retired. `/services/ai-employees` becomes a 301 to `/ai-consulting`; its use-case grid and ROI table move to `/ai-consulting` as a new section.
- **Booking:** Cal.com, embedded inline on `/contact` and inside every `#book` section, with the existing form kept as the fallback beside it.
- **Scope:** all twelve review items, in three phases. Each phase is one Claude Code session and one pull request.

Assumed (change if wrong):

- Experience is stated as **27 years** everywhere; "25" is replaced.
- Location for local SEO is **Farnham, Surrey**, matching the registered office; the service area is "Farnham, Surrey and the surrounding area, remote across the UK".
- The free call is called **"free 30-minute call"** on every page; landing pages may keep their qualifier ("technology review", "AI Fit Call") in the eyebrow, not the button.
- Response promise is **"within one business day"** everywhere.
- The Cal.com event link will be `https://cal.com/pnk-digital/30min`; the prompt tells Claude Code to read it from one config value so it's a one-line change.
- Phone number **01252 279059** appears in the header CTA area, footer and every contact block.

## Phase 1 — quick wins (one session, one PR)

Goal: every page can take a booking, nothing on the site contradicts anything else, and there is one AI product.

**1.1 Site config.** Create a single source of truth (`src/config/site.ts` or the existing equivalent) for: phone, email, Cal.com link, years of experience (27), location (Farnham, Surrey), response promise, free-call label. Replace every hard-coded instance.

**1.2 Booking.** Add a `BookingEmbed` component wrapping the Cal.com inline embed (load the script lazily; show a "Book a time" link to the Cal.com page as the no-JS fallback). Place it: on `/contact` above the message form; inside the `#book` section of `/tech-support` and `/ai-consulting` beside the existing form (two columns on desktop, calendar first on mobile). Keep the forms.

**1.3 Phone everywhere.** Add the phone link to the header next to the CTA, the footer "Get in touch" block and the `/contact` details.

**1.4 Consistency fixes.** "25 years" → config value; "Four focused services" → removed; "Discuss a AWS project" / "Discuss a AI project" → "Discuss an AWS project" / "Discuss an AI project"; "within 24 hours" → config value; every CTA button that books the call reads "Book a free 30-minute call"; the empty "What I don't do" section on `/services` is removed.

**1.5 Voice to company.** Rewrite `/`, `/about`, `/services`, `/contact` and the blog index intro from "I" to "we / PNK Digital". Rules: keep every fact, price and claim; keep Mike's name and photo where they appear; "I'm Mike" sentences become "PNK Digital is run by Mike Pink, …". Don't touch individual blog post bodies (they are dated, personal essays and can stay first person).

**1.6 AI consolidation.**

- Add a section to `/ai-consulting` after "Who we help" titled **"What a pilot can look like"**: the six use-case cards from `/services/ai-employees` (email triage, meeting prep, developer productivity, sales pipeline, finance automation, HR and onboarding), rewritten in company voice without emoji, plus the ROI table reframed as "Illustrative: 4 hours saved per person per week".
- Add a `301` from `/services/ai-employees` to `/ai-consulting` (Astro redirects config or the hosting layer; check which the site uses).
- Remove "AI Employees for Your Team" and "AI Integration for Existing Products" from `/services`; fold the AI Integration deliverables (LLM integration, RAG, document processing) into the AI Consulting entry as "If it needs building, we build it: …".
- On `/tech-support`, change the Partner plan's "Business process automation and practical AI" bullet to "Business process automation (AI work is quoted separately — see AI consulting)" with a link.
- One workshop price: £1,250 (half day). Remove every other workshop price.

**1.7 Landing-page face.** On `/tech-support` ("Why PNK Digital") and `/ai-consulting` ("Why PNK Digital"), add Mike's photo and a one-line caption: "Mike Pink, founder — the person who does the work." Add a LinkedIn link in the footer (URL supplied by Mike).

**1.8 Bug.** On `/ai-consulting`, the comparison strip renders both as a table and as a card list; show the table from the tablet breakpoint up and the cards below it.

**Done when:** build passes; every page has a working calendar or a link to one; grep finds no "25 years", no "I'm Mike" outside blog posts, no "24 hours"; `/services/ai-employees` redirects.

## Phase 2 — structure (one session, one PR)

Goal: a business owner landing on the homepage sees the two recurring-revenue offers first and understands in ten seconds what PNK Digital is.

**2.1 Homepage rebuild.** Keep the layout system and components; replace the content in this order:

1. **Hero.** Eyebrow: "Technology partner for small and growing businesses". H1: "One experienced partner for the technology your business runs on." Sub: "Support, AI and software, delivered by a senior engineer with 27 years in financial services — fixed prices, plain English, no agency layers." Buttons: "Book a free 30-minute call" (to `#book` or `/contact`) and phone.
2. **Two doors.** Two large cards side by side: *Run your business* → Tech Support Plans (from £125/month) and AI Consulting (from £1,950); *Build something* → Web apps, AWS, MVPs (link to `/services#build`). Each card: three bullets and a "See how it works" link.
3. **Why PNK Digital.** Mike's photo, the "one person, that's the point" argument from `/about` condensed to four bullets, three stats: 27 years · Financial services · One point of contact.
4. **Proof strip.** The two testimonials now, with slots for the case studies from Phase 3. Component should accept a list so adding a third is content-only.
5. **How it works.** The three steps shared by both landing pages (talk → we take over / find the opportunity → we look after it / build and hand over).
6. **Latest thinking.** Keep, but only render if the newest post is under 90 days old; otherwise hide the section.
7. **Book.** `BookingEmbed` plus phone.

Title tag: "Technology Support, AI and Software for Small Businesses | PNK Digital, Farnham". Meta description rewritten to match.

**2.2 Services page.** Reduce to two groups with anchors:

- `#run` — **Run your business:** Tech Support Plans, AI Consulting (each: one paragraph, who it's for, three deliverables, link to its page).
- `#build` — **Build something:** Web Application Development, AWS Integration & Infrastructure, AI-Powered MVPs (keep existing content, company voice, CTA "Discuss a project" → `/contact`).

Intro: "Two ways we work with you." Remove the "four focused services" framing. Title tag: "Services | PNK Digital".

**2.3 About page.** Keep the structure and most of the copy (it's good). Add: one paragraph after the opening on the financial-services background (insurance claims, pensions, life insurance; what that teaches about data and compliance); one paragraph on why support and AI services were added ("the businesses we built software for kept asking who looks after the rest"). Replace "25" with config. Add LinkedIn under the photo. Add a short "Based in Farnham, Surrey; working with businesses across the UK" line.

**2.4 Contact page.** Order: H1 and one line; `BookingEmbed`; a three-way selector (Support / AI / Build) above the form that changes the free-text prompt ("What's causing problems?" / "What takes up your team's time?" / "Tell us about your project"); contact details with phone, email, location, response promise. Remove the "Book a Discovery Call" explainer block (the calendar is the explainer).

**2.5 Navigation.** Header: Services · Tech Support · AI Consulting · About · Blog · \[Book a free 30-minute call\] · phone. Footer services: Tech Support, AI Consulting, Web App Development, AWS Integration, AI-Powered MVPs (links to the `/services` anchors). Remove AI Integration from the footer.

**Done when:** the homepage fold on a 390px phone shows the H1, one button and the first "door"; `/services` has exactly five services under two headings; all internal links resolve; Lighthouse performance stays at or above the current score.

## Phase 3 — proof and SEO (one session, one PR; content from Mike)

Goal: the site can show one real result per service and can be found for local searches.

**3.1 Case studies.** Add a `case-studies` content collection (title, client or anonymised sector, service, problem, what we did, result with a number, quote, date). Build `/work` as the index and `/work/[slug]` pages using the existing blog layout. Add a `CaseStudyCard` component and render up to three on the homepage proof strip and the matching one on each landing page. Ship with placeholder entries marked `draft: true` so nothing fake is published; Mike fills them.

**3.2 Local SEO.**

- `/tech-support`: title "IT Support for Small Businesses in Farnham, Surrey | PNK Digital"; add "Farnham, Surrey" to the hero sub; add a short "Local to you" block before the FAQ (based in Farnham, on-site across Surrey and Hampshire when needed, remote across the UK).
- `/ai-consulting`: title "AI Consulting for Small Businesses in Surrey & the UK | PNK Digital".
- Footer: a NAP block (name, address, phone) marked up as `LocalBusiness` JSON-LD with `areaServed`, `openingHours` and `sameAs` (LinkedIn). One map link to Google Maps, no embed.
- `/contact`: Google Business Profile reviews link once the profile exists (config value; hidden when empty).

**3.3 Structured data.** `FAQPage` on both landing pages; `Service` + `Offer` for the pricing tiers on both; `Organization` site-wide; `Article` on blog posts.

**3.4 Open Graph.** Generate per-page OG images at build time (Astro + satori or the existing approach) for home, the two landing pages, `/work` and each case study: title, one line, pink accent, logo.

**3.5 Blog.** Rename "Project Spotlights" to "Work" and point it at `/work`. Hide empty categories. Hide the "Latest thinking" homepage section when the newest post is older than 90 days (built in Phase 2). Add a `draft` flag so posts can be staged.

**3.6 Measurement.** One analytics event, `call_booked`, fired on Cal.com's `bookingSuccessful` embed event with the page path; one `form_submitted` per form; `phone_clicked` on tel links. Whatever analytics the site already uses; if none, add a privacy-respecting one (Plausible or Umami) with no cookie banner needed.

**Done when:** `/work` renders with drafts hidden; Rich Results Test passes on both landing pages; each key page has its own OG image; the three events fire in the analytics dashboard.

## Content you supply

Claude Code must not invent any of these; the plan tells it to leave a clearly marked placeholder or hide the block until the value exists.

- [ ] Cal.com account and the 30-minute event link
- [ ] LinkedIn profile URL
- [ ] Confirm Farnham, Surrey as the public location and the service-area wording
- [ ] Three case studies (one each: support, AI, build), each with one number
- [ ] Third and fourth testimonials, not about email; one AI-specific quote when the first audit closes
- [ ] Google Business Profile created and verified; reviews link
- [ ] Opening hours for the LocalBusiness markup
- [ ] Decision on analytics tool if none is in place

## Prompt for Claude Code

Run one phase per session. Paste this, changing only the phase number.

```markdown
Update this Astro site according to docs/site-update-plan.md. This session covers PHASE 1 only. Read the whole plan first, including "Decisions and assumptions" and "Content you supply", then read every page, layout, component and config file the phase touches before changing anything.

Working rules:
- Follow the plan's section numbers in order and refer to them in commit messages (e.g. "1.4 consistency fixes").
- Reuse existing components and styles. Create a new component only where the plan names one (BookingEmbed, CaseStudyCard). No new dependencies except the Cal.com embed script and, in Phase 3 only, an OG image generator and analytics if the plan calls for them.
- Every value the plan says comes from config (phone, email, Cal.com link, years, location, response promise, call label, LinkedIn) is read from one site config file. Where I have not supplied a value yet, use an obvious placeholder constant (e.g. LINKEDIN_URL = "") and hide the element when it is empty; never invent a URL, quote, client, number or case study.
- Copy changes: keep every fact, price and claim exactly; change only voice and what the plan specifies. Do not shorten or "improve" copy the plan doesn't mention.
- Before writing code, list: the files you will touch, any place the plan conflicts with how the site is actually built, and anything in the phase you cannot do with what's in the repo. Stop and ask me about conflicts; proceed on everything else.
- Keep the dev server running and check each changed page at 390px and 1280px widths. Run the build at the end and fix any errors.
- Work on a branch named site-update/phase-1 and open a pull request with a description that lists each plan item as done, partially done (with why) or skipped (with why).

At the end give me: the PR link, the "Done when" checklist from the plan with each item ticked or not, and the list of placeholders still waiting on content from me.
```
