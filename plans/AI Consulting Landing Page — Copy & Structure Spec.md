# AI Consulting Landing Page — Copy & Structure Spec

Oct 20, 2026 · @Mike

Spec for pnk-digital.com/ai-consulting, written to hand to Claude Code; it follows the structure and conventions of the live /tech-support page.

## Build brief for Claude Code

Create a new page at `/ai-consulting` in the existing Astro site (Astro v7) by cloning the structure, components and styling of `/tech-support`; change only content, anchors and the two things flagged below. The live page's conventions to reproduce:

- **Layout pattern:** every section is an eyebrow label (small caps, e.g. "Why PNK Digital") → H2 → one or two short paragraphs → a bullet list or card grid → optional CTA button. Keep that rhythm.
- **Sticky nav with in-page anchors:** `#how`, `#pricing`, `#clients`, `#faq`, plus a pink "Book a free call" button. Anchor names for this page are given in the structure section.
- **Primary CTA everywhere:** one button label used throughout, linking to the `#book` form. Secondary CTA is the phone link `tel:+441252279059` labelled "Call PNK Digital 01252 279059". Under every CTA pair: "No obligation. No hard sell."
- **Booking form at `#book`:** same fields as tech-support (Your name, Business name, Email, optional free-text), same privacy line, same "We'll reply within one business day." Change the free-text prompt and button label per the copy section.
- **Pricing cards:** three cards, middle one marked "Recommended", each with a name, one-line tagline, price, CTA button, bullet list, and a small note under the list. Reuse the tech-support card component.
- **Testimonials:** quote block with name, role, company, and a one-line "what we do for them" tag. Reuse the existing two clients until an AI-specific quote exists.
- **Brand:** pink `#ec008c` for CTAs and accents; existing fonts and spacing; same header and footer as every other page.
- **Meta:** title, description and OG tags as given in the notes section; `theme-color` stays `#ec008c`.

Two deliberate differences from /tech-support:

1. **Price shapes differ.** Audit and pilot are one-off fixed prices; only the third card is monthly. The card component needs a price label that can read "£1,950 one-off", "from £6,500 fixed price" and "from £2,750/month".
2. **A "How it compares" strip** (three columns: Strategy consultant / Automation agency / PNK Digital) does not exist on tech-support; build it as a simple three-column table or card row, mobile-stacked.

Voice: match the live site's "we" company voice. If an A/B variant in first person ("I") is built later, it is a content swap only, not a layout change.

Do not change `/tech-support`, except to add one link to the new page from its "Automation & AI" section ("Want AI built into a process, not just talked about? See AI consulting →").

## Page structure

Fourteen sections, in this order, mirroring the tech-support page's flow (problem → what we do → why us → who it's for → proof → pricing → how it works → book → depth sections → FAQ → close). Nav: How it works · Pricing · Clients · FAQ · \[Book a free AI Fit Call\].

| # | Section | Anchor | Component (reuse from /tech-support) | CTA |
| --- | --- | --- | --- | --- |
| 1 | Hero | — | Hero: eyebrow, H1, sub, 3 bullets, CTA pair, illustrative panel | Primary + phone |
| 2 | Sound familiar? | — | Eyebrow + H2 + paragraphs + bullet list | — |
| 3 | What we do | — | Six-card icon grid | Primary |
| 4 | How it compares | — | NEW three-column comparison strip | — |
| 5 | Why PNK Digital | — | Eyebrow + H2 + tag chips + bold bullets | — |
| 6 | Who we help | — | H2 + paragraph + quoted-phrases list | — |
| 7 | Client stories | `#clients` | Two testimonial blocks | — |
| 8 | Pricing | `#pricing` | Three pricing cards + "what's included / what if more" note | Card CTAs + primary |
| 9 | How it works | `#how` | Three numbered steps | — |
| 10 | Book | `#book` | Two-column: "what we'll look at" list + pull-quote, booking form | Form submit |
| 11 | Safe by design | — | Eyebrow + H2 + paragraphs + bullet list (mirrors the Security section) | — |
| 12 | Experience | — | Five-card expertise grid | — |
| 13 | FAQ | `#faq` | Accordion, 8 questions | — |
| 14 | Closing CTA | — | H2 + two lines + CTA pair | Primary + phone |

The hero's illustrative panel replaces the "client portal" mock with an "AI Opportunity Audit" mock: three ranked workflow cards, each with hours-saved-per-month and a status chip (Pilot · Next · Later), labelled "Illustrative example" exactly as the tech-support panel is.

## Copy

Final text, section by section. Labels in bold are the eyebrow lines; the primary CTA label everywhere is **Book a free 30-minute AI Fit Call**.

### 1. Hero

**Eyebrow:** For businesses that want AI doing real work, not just a chatbot

**H1:** AI that actually does the work. Built into your business.

**Sub:** We find the processes AI can take off your team, build the first one into the tools you already use, and leave you able to run it. Fixed prices. You own everything.

- No vague strategy decks.
- No £20,000 agency minimums.
- No client data going somewhere you don't understand.

**Buttons:** Book a free 30-minute AI Fit Call · Call PNK Digital 01252 279059

**Small print:** No obligation. No hard sell.

**Illustrative panel:** title "AI Opportunity Audit · Illustrative example". Rows: "Client review prep — 22 hrs/month — Pilot"; "Inbox triage and draft replies — 15 hrs/month — Next"; "Monthly reporting pack — 6 hrs/month — Later". Footer line: "Hours saved are estimates agreed with your team."

### 2. Sound familiar?

**H2:** Everyone's using ChatGPT. Nothing has actually changed.

Most businesses we talk to have already tried AI. Someone's got a subscription, a few people use it for emails, and the owner has sat through three sales demos.

But the work still takes as long as it did. Because nobody has looked at how the business actually runs, picked the right process, and built AI into it properly.

- You don't know which process to start with.
- Staff use AI tools in ways nobody has agreed or checked.
- You're not sure what's safe to do with client data.
- Every vendor says their tool is the answer.
- You've got a plan from somewhere, but nothing got built.
- You suspect it could save hours a week, but you can't prove it.

That's where PNK Digital comes in.

We work out where AI will pay in your business, build it, and show you the hours it saves.

### 3. What we do

**Eyebrow:** What we do

**H2:** From "where do we start?" to one workflow live and measured.

We're not a strategy firm and we're not a software agency. We're the senior engineer who can do the thinking and the building, then hand it over.

- **AI Opportunity Audit** — Two weeks. We map how your team works, rank the processes AI could take on, check the data risks and name the first pilot. You get a written report and a fixed quote.
- **Pilot Build** — One workflow, built into the tools you already use, with a human sign-off step. Training, a written runbook and 30 days of measurement included.
- **Fractional AI Lead** — Two to four days a month to run the roadmap, build the next workflows, filter the vendors and keep your team using what's been built.
- **Team AI Workshop** — A half day, hands-on with your own documents, plus an AI use policy your business can adopt.
- **Safe AI setup** — Accounts, data boundaries, approval steps and a plain-English policy, so staff can use AI without you worrying about client data.
- **AI delivery for dev teams** — If you have developers, we install the agentic coding workflow we use ourselves and pair with your team for a sprint.

One person. One fixed price per step. Nothing built that you don't own.

**Button:** Book a free 30-minute AI Fit Call

### 4. How it compares

**Eyebrow:** How it compares

**H2:** Three ways to get AI into your business.

|  | Strategy consultant | Automation agency | PNK Digital |
| --- | --- | --- | --- |
| What you get | A roadmap and a workshop | A build, if the project is big enough | A ranked plan, then the build, then the hand-over |
| Typical starting cost | £3,000–£8,500 for a discovery workshop | £8,000–£25,000 minimum per agent | £1,950 audit, credited against your pilot |
| Who does the work | A consultant who doesn't build | A delivery team you'll rarely meet | One senior engineer, start to finish |
| Knows your sector | Sometimes | Rarely | 27 years in financial and professional services |
| Who owns the result | You own the slides | Often the agency's platform | You: code, prompts, accounts, documentation |

Market figures from published UK pricing, October 2026.

### 5. Why PNK Digital

**Eyebrow:** Why PNK Digital

**H2:** The AI consultant who ships.

PNK Digital isn't a marketing consultancy that learned prompting last year, and it isn't a helpdesk.

We're software engineers with **27 years of delivering systems in financial services** — insurance claims, pensions, life insurance — where data is sensitive and compliance is not optional. And we build with AI every day: agentic coding, multi-agent workflows, self-hosted models, document retrieval.

Tag chips: Software engineering · Financial services · Workflow automation · AI agents · Cloud infrastructure · Data protection

- If AI can save your team time, **we'll show you where, with numbers.**
- If an off-the-shelf tool is the right answer, **we'll tell you, and we don't resell anything.**
- If it needs building, **we'll build it and hand it over.**

And if AI isn't right for your business yet, **we'll say so in the audit** and you'll have lost two weeks, not a year.

### 6. Who we help

**Eyebrow:** Who we help

**H2:** Built for firms with real admin and real responsibilities.

PNK Digital's AI work is designed for owner-led businesses of roughly **10–100 people** in professional and financial services: insurance brokers, IFAs, accountants, solicitors, recruiters, property firms, and SaaS companies with a small dev team.

If you recognise any of these:

- "We spend hours every week on documents that follow the same pattern."
- "Our inbox is the business."
- "We can't use AI because of client data — can we?"
- "Our developers have Copilot, but delivery hasn't changed."

…there is almost certainly one process worth starting with.

### 7. Client stories

**Eyebrow:** Client stories

**H2:** Businesses that trust us with the technology they run on.

Use the two existing testimonials (Richard Moger, Top Gardeners; David Baker, Baik Consulting) with their existing tags. Under them: "Our first AI pilots are live now. Ask about them on your free AI Fit Call." Replace this line with an AI-specific quote as soon as one exists.

### 8. Pricing

**Eyebrow:** Pricing

**H2:** Fixed prices. Decide one step at a time.

Each step has a price, a deliverable and a decision point. Nobody is asked to commit to the next step until the last one has paid for itself. All prices exclude VAT.

**Card 1 — AI Opportunity Audit** Find out where AI will pay in your business. **£1,950 one-off**

- Interviews with your key people
- Map of your processes, tools and data
- Ranked list of AI opportunities with estimated hours saved
- Data protection and risk check
- A named first pilot, with a fixed quote
- Written report and a one-hour readout Note: Two weeks. Credited in full against a pilot booked within 30 days.

**Card 2 — Pilot Build** (Recommended) One workflow, built and measured. **from £6,500 fixed price** Everything in the Audit, plus:

- One workflow built into the tools you already use
- Human approval step on anything that touches a customer
- Two training sessions for your team
- Written runbook so you can run it without us
- 30 days of measurement: hours saved, errors, adoption
- You own the code, prompts, accounts and documentation Note: Typically £6,500–£12,000 depending on the workflow. Quoted exactly in the audit, before anything starts.

**Card 3 — Fractional AI Lead** Someone senior owning AI in your business, part time. **from £2,750/month** Everything in the Pilot, plus:

- Two or four days a month, your choice
- The next workflows built and rolled out
- Vendor pitches filtered before they reach you
- Monthly staff drop-in clinic
- Adoption and hours-saved report to the owner each month
- AI policy kept current as the rules change Note: £2,750 for two days, £4,500 for four. Three-month minimum, then 30 days' notice.

**Under the cards:**

### Just want to get your team started?

A half-day **Team AI Workshop** is **£1,250**: hands-on with your own documents and tools, and you leave with an AI use policy. Also available as a follow-on after any pilot.

### What happens if you need more?

Anything outside a fixed scope is quoted before we start. No day rates, no surprise invoices.

**Button:** Book a free 30-minute AI Fit Call

### 9. How it works

**Eyebrow:** How it works

**H2:** Getting started is simple.

1. **Step 1: Let's talk** — Free, 30 minutes. We'll talk about how your business runs, where the time goes and whether an audit is worth doing. You'll leave with at least one thing you can try yourself.
2. **Step 2: We find the opportunity** — The two-week audit. We talk to your people, map the work, check the data risks and name the first pilot with a fixed price.
3. **Step 3: We build it, measure it, hand it over** — The pilot goes live in your tools with a human check. After 30 days you'll know the hours it saves, and you'll be able to run it without us.

You get on with running the business. We'll make the technology do more of the work.

### 10. Book

**H2:** Not sure where AI fits? Let's take a look.

Book a free 30-minute AI Fit Call and we'll talk through how your team actually works.

We'll look at things like:

- Where your team's time goes each week
- Documents and emails that follow a pattern
- The tools you already pay for
- What client data you handle, and the rules around it
- Anything staff are already doing with AI
- Whether an audit is worth it, or whether a quick fix will do

Pull-quote: "I send one message and it gets sorted." — Richard Moger, Top Gardeners

You'll leave with a clearer picture of what AI could take off your plate, and a straight answer on whether it's worth going further.

No obligation. No hard sell. Just straightforward advice.

Prefer to talk? Call PNK Digital on 01252 279059

**Form:** Your name \* · Business name \* · Email \* · What takes up most of your team's time? (optional) **Button:** Book my free AI Fit Call No obligation. No hard sell. We'll reply within one business day. How we use your details: privacy policy.

### 11. Safe by design

**Eyebrow:** Safe by design

**H2:** AI should reduce your risk, not add to it.

Most of the businesses we work with handle client data they're responsible for. So every workflow we build starts from what's safe, not from what's clever.

We don't believe in sending your data to tools nobody has checked.

What that looks like in practice:

- Your data stays in accounts you control
- A person approves anything that goes to a customer
- Clear rules on what staff can and can't put into AI tools
- UK GDPR considered in every audit, with a written note on each pilot
- No client data used to train anyone's model
- A plain-English AI use policy you can hand to staff, included

### 12. Experience

**Eyebrow:** Experience

**H2:** Technology expertise you can rely on.

PNK Digital is built on 27 years of designing and delivering software for businesses, most of it in financial services. Our experience spans:

- **Financial and professional services** — Insurance claims, pensions and life insurance systems where accuracy and compliance matter.
- **AI engineering** — Agentic workflows, document retrieval, multi-agent systems and self-hosted models, in daily use.
- **Workflow automation** — Connecting the systems a business already runs and removing the manual steps between them.
- **Cloud infrastructure** — AWS and modern cloud architectures.
- **Web and business systems** — React, Node.js and software that supports real business processes.

So when you talk to PNK Digital about AI, you're not talking to someone who read about it. You're talking to someone who builds with it every day.

### 13. FAQ

**H2:** Frequently asked questions

Anything else? Ask us on your free AI Fit Call.

**Do we need to buy new software?** Usually not for a first pilot. Most workflows are built into the tools you already have: Microsoft 365, Google Workspace, your CRM, your practice system. If a tool is needed, we'll recommend it and you'll buy it directly; we don't resell anything.

**What if AI isn't right for us?** Then the audit will say so, with reasons, and you'll have the written process map anyway. We'd rather tell you in two weeks than find out after a build.

**Who owns what gets built?** You do. The code, prompts, accounts, configuration and documentation are yours from day one, and the runbook is written so you can run it without us.

**Is our data used to train anything?** No. We use business-grade AI accounts under your control, with training on your data switched off, and we'll document exactly which data goes where.

**Is this different from the tech-support plans?** Yes. Tech support looks after the technology you already have. AI consulting finds and builds new ways of working. Tech-support clients get a discount on AI work, and a pilot can be looked after under a support plan afterwards.

**Can we stop the retainer?** Yes. Three-month minimum, then 30 days' notice. What's been built keeps working.

**How much time will this take from our team?** Around four to six hours in total for the audit, spread across a few people. The pilot needs a named person to test and approve, typically an hour or two a week for a few weeks.

**How do we get started?** Book a free 30-minute AI Fit Call. We'll talk through how your business works and tell you honestly whether an audit is worth doing.

### 14. Closing CTA

**H2:** Stop talking about AI. Put it to work.

Your business has at least one process that's eating hours it doesn't need to.

Get one experienced engineer who can **find it, build it, measure it and hand it over.**

**Buttons:** Book a free 30-minute AI Fit Call · Call PNK Digital 01252 279059

No obligation. No hard sell.

## Design, SEO and tracking notes

**Tone.** Plain English, short sentences, no jargon on the page ("agentic", "RAG" and "LLM" stay off it; "workflow", "process" and "hours saved" do the work). Same confident, un-salesy register as /tech-support: say what we do, say what we won't do, say the price.

**Visuals.** No stock AI imagery (no glowing brains, no robots). Reuse the tech-support illustration style for the hero panel: a flat UI mock with pink accents. Icons for the six "What we do" cards from the same icon set as the existing page.

**Meta.**

- Title: `AI Consulting for Small Businesses | PNK Digital`
- Description: `We find the processes AI can take off your team, build the first one into the tools you already use, and hand it over. Fixed prices from £1,950. Book a free 30-minute AI Fit Call.`
- OG/Twitter: same title and description; reuse the site OG image until a page-specific one exists.
- Canonical: `https://pnk-digital.com/ai-consulting`
- H1 once; H2 per section; FAQ marked up with `FAQPage` JSON-LD; pricing cards marked up with `Service` + `Offer` JSON-LD (three offers, GBP, ex VAT).

**Tracking.** One conversion event: form submit on `#book`. Secondary events: clicks on any primary CTA, phone link clicks, pricing anchor views. Use whatever the tech-support page already uses so the two pages report side by side.

**Links to add elsewhere.** Nav or services list on the homepage; one line in the "Automation & AI" section of /tech-support; footer "Services" list gets "AI Consulting".

**Before launch.** Replace the testimonial placeholder line once an AI-specific quote exists; confirm the £80/hour overage figure on /tech-support still applies to AI work or state otherwise; proof the comparison-strip market figures against the proposition doc's Sources section each quarter.
