# Audit Pages → Outreach Launch — Build Plan

**Goal:** Ship the uncommitted personalised audit pages to production, then turn on the cold-outreach pipeline using the existing email-tracking infrastructure, ending with the first 6 real prospect emails sent.

**Date:** 11 June 2026
**Status:** Planning (execution next session)
**Tracer-bullet approach:** Each phase ends with something observable in production or in the inbox. Stop after any phase and you still have something useful.

---

## What's already in place (don't re-do)

- `src/pages/audit/AuditLandingPage.tsx` (178 LOC) — outreach landing page, already sets `noindex,nofollow`
- `src/pages/audit/AuditReportPage.tsx` (246 LOC) — per-prospect report at `/audit/:slug`
- `src/pages/audit/prospects.ts` (576 LOC) — 6 fully-researched prospect entries with categorised issues + impact statements
- `src/components/audit/` — `AuditHeader`, `AuditFooter`, `IssueCard`, `MockupFrame`, `ProspectCard`, `ScoreCard`
- `src/components/audit/mockups/` — 6 React mockup components (Coffee, Dance, Dental, GinChocolate, Menswear, Pub)
- Routes already wired in `src/App.tsx` (lines 19–20, 28–29): `/audit` and `/audit/:slug` mount **without** `<Layout>` for conversion focus
- Email-tracking infra **live** at `~/Sites/Claude/pnk-tracking` (API + dashboard on AWS eu-west-2)
- Five cold-email templates in `emails/`: cold-local-business, agency-partnership, tech-startup, follow-up, nurture
- 17 named prospects with pitch angles in Obsidian `Projects/PNK Digital/Local Businesses/Priority Prospects.md`
- 6 of those prospects already have audit data in `prospects.ts`:
  1. The Wheatsheaf Farnham (pub)
  2. The Holistic Dental Centre (dental)
  3. John Goodridge Menswear
  4. Gin & Chocolate Shop
  5. Birdies Coffee House
  6. Farnham Dance

## Open question to resolve before starting

**URL strategy reconciliation.** Three conventions across the planning docs vs. the repo:
- `/google-ads/web-developer-surrey` (Google Ads Strategy note)
- `/local-web-design`, `/agency-partner`, `/web-app-development`, `/speed-up-your-site` (Email→LP note)
- `/landing/web-developer-surrey`, `/audit`, `/audit/:slug` (what actually exists)

**Proposal:** Keep `/audit/*` as the outreach magnet (already built), keep `/landing/*` for paid traffic, ignore the older `/google-ads/*` and `/local-*` names from the notes. Update the notes to match the repo, not the other way round. Decide in Phase 0.

---

## Phase 0 — Reconcile + verify (½ evening)

End state: build is green, routes load, URL strategy is decided, audit pages render cleanly on each prospect slug.

- [ ] Read `AuditReportPage.tsx` and `AuditLandingPage.tsx` end-to-end — flag any TODOs, placeholder copy, lorem ipsum
- [ ] Read `prospects.ts` for typos, missing pitch angles, or wrong `currentUrl` values
- [ ] Run `npm run dev` and click through:
  - `/audit` (landing page — `noindex` should be set)
  - `/audit/the-wheatsheaf-farnham`
  - `/audit/the-holistic-dental-centre` (or whatever the slug is)
  - All 6 prospects, on desktop + mobile widths
- [ ] Run `npm run build` — confirm no TS errors, sitemap generates (note: audit pages **should not** be in the sitemap — verify `scripts/generate-sitemap.js` excludes them or skip them manually)
- [ ] Decide URL strategy (see Open Question above). If keeping `/audit/*` and `/landing/*`, update Obsidian notes to match — kill references to `/google-ads/*` and `/local-web-design`

**Stop condition:** every audit page renders correctly and the build passes.

---

## Phase 1 — Commit + deploy to prod (1 evening)

End state: `/audit` and `/audit/:slug` live on https://www.pnk-digital.com, no leakage into search engines.

- [ ] Verify `robots.txt` in `public/` blocks `/audit/*` (or that page-level `noindex` is sufficient — AuditLandingPage already does this dynamically; check it fires on each report page too)
- [ ] Single commit, scoped properly:
  ```
  Add personalised website audit pages for outreach

  Adds /audit landing page and per-prospect /audit/:slug report
  pages used as the cold-outreach lead magnet. Includes 6 prospect
  audits with custom mockup components. Pages are noindex.
  ```
- [ ] Smoke-test prod build locally: `npm run build && npm run preview`
- [ ] `npm run cdk:diff:prod` — sanity-check the diff (should only be content changes in S3)
- [ ] `npm run cdk:deploy:prod`
- [ ] Verify on prod:
  - `https://www.pnk-digital.com/audit` returns the landing page
  - `https://www.pnk-digital.com/audit/the-wheatsheaf-farnham` returns the report
  - Curl with `User-Agent: Googlebot` — should still serve the page, but the `noindex` meta should be in the HTML

**Stop condition:** all 6 audit URLs work on prod and are tagged noindex.

---

## Phase 2 — Wire sending infrastructure (1 week, mostly waiting on DNS/warmup)

End state: a tracked email can be sent from `hello@outreach.pnk-digital.com` and the open/click appears in the pnk-tracking dashboard.

### 2a. Sending domain (½ evening + 24h DNS wait)
- [ ] Choose ESP — **Brevo** (free tier, per Outreach Email Plan note)
- [ ] Set up sending subdomain `outreach.pnk-digital.com` in Route 53
- [ ] Add SPF, DKIM, DMARC records (Brevo will provide the exact values)
- [ ] Verify with mail-tester.com — target score ≥ 9/10

### 2b. Hook tracking into the send flow (1 evening)
The Email Tracking Setup note describes a planned `pnpm send` CLI. Two options:
- **Option A (faster):** manually run each email through the tracking API (`/api/track` to register, then inject pixel + rewrite links) before pasting into Brevo
- **Option B (right):** build the `pnpm send` CLI in `~/Sites/Claude/pnk-tracking` — takes a template + recipient list, registers each, injects pixel, rewrites links, sends via Brevo API. ~2-3 hours.

Recommend **A for the first 6 sends**, **B before scaling past 10**.

### 2c. Conversion plumbing on the audit pages (½ evening)
- [ ] Add Microsoft Clarity to `pnk-digital.com` (free, behind the `noindex` so it'll only see real prospects)
- [ ] Decide a UTM convention. Suggested: `?utm_source=outreach&utm_medium=email&utm_campaign=farnham-audit-2026-06&utm_content=<prospect-slug>`
- [ ] Confirm the existing contact form on `/audit` posts to `/api/contact` with a recognisable `source` field — currently the Lambda sets `source: 'contact-form'`. Add a `source: 'audit-outreach'` path so leads from this campaign are tagged in DynamoDB

### 2d. Warm-up (parallel, 5–10 days passive)
- [ ] Day 1–3: send 2–5 emails/day to known contacts (mum, friends, old colleagues) from the new subdomain, ask them to reply
- [ ] Day 4–7: ramp to 10/day, mix replies + cold
- [ ] Stop sending if Brevo flags reputation issues

**Stop condition:** mail-tester ≥ 9/10, you've sent a test email to yourself, opened it, clicked a link, and seen both events appear in the pnk-tracking dashboard.

---

## Phase 3 — First send: 6 personalised prospect emails (1 evening)

End state: 6 cold emails out the door on a Tuesday morning, each with a personalised audit-URL in it.

- [ ] Take the `cold-local-business.html` template from `emails/`
- [ ] For each of the 6 prospects with audit pages, hand-personalise:
  - Recipient name + business name
  - Pitch-angle paragraph (already written in Priority Prospects note — quote them verbatim where possible)
  - Their audit URL: `https://www.pnk-digital.com/audit/<slug>?utm_source=outreach&utm_medium=email&utm_campaign=farnham-audit-2026-06&utm_content=<slug>`
  - Cal.com booking link
- [ ] Find each prospect's contact email — Companies House, their footer, LinkedIn, or call the shop and ask
- [ ] Stage all 6 in Brevo, schedule for **Tuesday 09:30**
- [ ] Send

### Day 0 — same afternoon
- [ ] Check tracking dashboard at 14:00, 17:00, 21:00 — log opens + URL clicks in a simple sheet
- [ ] Check Microsoft Clarity for any sessions on `/audit/*`

### Day 4 — first follow-up
- [ ] For anyone who opened but didn't reply: send a one-line "did you get a chance to look at the audit?" follow-up
- [ ] For anyone who clicked through to the audit but didn't book: send a "happy to walk you through what I'd change" follow-up

**Stop condition:** all 6 sent + follow-ups queued.

---

## Phase 4 — Scale (rolling, ~2 weeks)

End state: 17 audit pages live, 50–60 emails sent in batches of 10–15, first qualified lead or first definitive "no, this channel doesn't work for me" decision.

- [ ] For each of the remaining 11 priority prospects in the Obsidian note, generate audit content using the existing `prospects.ts` schema. The structure is fixed; only the per-prospect issues + mockup vary. ~30 min per prospect including writing the mockup component.
- [ ] Add each new prospect to `prospects.ts` and `mockups/index.tsx`
- [ ] Commit + deploy in batches of 3–5 to amortise build/deploy time
- [ ] Send a new batch of 10 emails every Tue/Thu morning
- [ ] Weekly review of metrics — target from the Outreach Email Plan note:
  - Open rate 40–60%
  - Click rate 5–15%
  - Reply rate 5–10%
- [ ] If reply rate < 3% after 50 sends — stop scaling and rewrite the cold copy, don't keep pushing

**Stop condition:** first booked discovery call (the actual KPI) OR 50 sends with < 3% reply rate (the kill criterion).

---

## What I will NOT do in this plan

- Build the custom CRM (Technical/CRM System Plan.md). Spreadsheet + DynamoDB enquiries table is enough until Phase 4 has actual numbers to justify it.
- Launch Google Ads. Different channel, do it after audit-outreach proves out (or doesn't).
- Touch the AI Employees page or the Financial Growth Plan Phase 1 reconciliation. Both are valuable but unrelated to this thread.
- Reconcile the `/google-ads/*` and `/local-*` URLs from the planning notes with what's actually shipped — beyond a 5-minute decision in Phase 0. Don't rabbit-hole on URL strategy.

---

## Quick reference — files this plan will touch

| Phase | File / location |
| --- | --- |
| 0 | `src/pages/audit/*.tsx`, `src/pages/audit/prospects.ts`, `scripts/generate-sitemap.js`, `public/robots.txt` |
| 1 | git commit + `cdk:deploy:prod` (no file changes once Phase 0 is done) |
| 2 | Route 53 (outside repo), Brevo (outside repo), optional `~/Sites/Claude/pnk-tracking` for the CLI, `cdk/lambda/contact-form/index.ts` to add the `audit-outreach` source tag, `index.html` to add Clarity script |
| 3 | `emails/cold-local-business.html` for each personalised copy (don't commit personalisations) |
| 4 | `src/pages/audit/prospects.ts`, `src/components/audit/mockups/*` |
