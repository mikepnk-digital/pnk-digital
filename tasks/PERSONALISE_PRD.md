# PRD: PNK Digital Website Rebuild

## Introduction/Overview

PNK Digital (pnk-digital.com) is a founder-led digital development business run by Mike, a contract developer specialising in React front ends and AWS integrations. The current site positions PNK Digital as a traditional agency — using "we/our" language, listing an overly broad range of services, and presenting a pricing configurator that spans £3k–£250k+. It contains no portfolio, case studies, testimonials, or evidence to support its claims (3x faster, 50%+ cost savings). The result is a site that looks like every other small agency trying to punch above its weight.

This rebuild will reposition PNK Digital as a **transparent, founder-led operation** that leverages AI-accelerated development to deliver React/AWS projects at a speed and cost point that traditional agencies cannot match. The site will be rebuilt from scratch with new information architecture, messaging, content strategy, and a blog section to establish thought leadership.

### The Core Problem

The current site undermines trust by presenting as something it isn't (a team-based agency) while failing to communicate what actually makes PNK Digital compelling — a senior developer with deep React/AWS expertise who uses AI tooling to operate at agency-level output as a solo operator.

---

## Goals

1. **Reposition PNK Digital** as a founder-led, AI-accelerated development business (not a generic agency).
2. **Build trust and credibility** through honest positioning, a clear personal narrative, and placeholder infrastructure for portfolio/case studies.
3. **Narrow the service offering** to reflect Mike's genuine expertise: React front ends, AWS integrations, and AI-powered development workflows.
4. **Simplify the conversion path** by replacing the pricing configurator with a straightforward discovery call CTA.
5. **Establish a content/thought leadership platform** via a blog section with a defined content strategy.
6. **Ensure the site itself demonstrates the quality of work** — it should be a showcase of clean, fast, modern React development.

---

## User Stories

### Prospective Client (Startup Founder / Product Owner)
- As a **startup founder**, I want to quickly understand what PNK Digital does and who's behind it, so I can decide if this is the right person to build my product.
- As a **product owner at an SME**, I want to see evidence of past work and relevant expertise, so I can justify bringing in an external developer.
- As a **prospective client**, I want to read about the founder's approach to AI-accelerated development, so I can understand how it benefits my project timeline and budget.
- As a **prospective client**, I want a simple way to start a conversation about my project, without filling in a complex configurator.

### Blog Reader / Potential Lead
- As a **business owner curious about AI development**, I want to read practical insights about how AI is changing software development, so I can make informed decisions about my own tech investments.
- As a **blog reader**, I want to easily navigate between articles and find content relevant to my interests (e.g., AI tooling, React development, startup tech strategy).

### Mike (Site Owner)
- As the **site owner**, I want placeholder sections for portfolio items that I can populate over time without restructuring the site.
- As the **site owner**, I want a blog system where I can publish articles easily to build authority and drive organic traffic.

---

## Functional Requirements

### FR1: Site Structure & Navigation

1.1. The site must have the following top-level pages:
  - **Home** — Hero, value proposition, services overview, featured work (placeholders), blog highlights, CTA
  - **About** — Mike's story, background, approach, why PNK Digital exists
  - **Services** — Focused service offerings with detail pages
  - **Work** — Portfolio/case studies section (placeholder-ready)
  - **Blog** — Article listing and individual article pages
  - **Contact** — Simple contact form and discovery call booking

1.2. The main navigation must include: Home, Services, Work, Blog, About, Contact.

1.3. A persistent header CTA button must link to the Contact page (e.g., "Let's Talk" or "Book a Call").

1.4. The site must include a footer with: navigation links, services links, email address, location (Surrey, UK), and links to any relevant social profiles (LinkedIn, GitHub).

### FR2: Home Page

2.1. The hero section must communicate the core value proposition in a single clear headline. The messaging must focus on **outcomes for the client** (speed to market, production-quality results, cost efficiency) rather than leading with "AI-powered" as the primary hook.

2.2. A subheading must briefly explain **who Mike is and what PNK Digital does** — establishing the founder-led positioning immediately (e.g., "Founded by a senior React & AWS developer, PNK Digital uses AI-accelerated workflows to deliver production-ready applications in weeks, not months.").

2.3. The hero must include a primary CTA (e.g., "Book a Discovery Call") and an optional secondary CTA (e.g., "See My Work").

2.4. Below the hero, a **services overview section** must display 3–4 core services as cards with brief descriptions and links to the Services page. Services must be scoped to Mike's actual expertise (see FR4).

2.5. A **featured work section** must display 2–3 portfolio items as cards. Initially these will show placeholder content with a clear visual treatment that doesn't look broken or empty — e.g., "Case study coming soon" cards with category labels, or demo project cards if available.

2.6. A **blog highlights section** must display the 2–3 most recent blog posts as cards with title, excerpt, date, and a "Read more" link.

2.7. A **credibility/trust section** must include at least two of the following: a brief personal bio with photo, key stats or metrics (only if substantiated), technology logos (React, AWS, Next.js, etc.), or a short testimonial (placeholder-ready).

2.8. The page must end with a **full-width CTA section** driving to the Contact page.

### FR3: About Page

3.1. The About page must tell Mike's story: his background as a contract React/AWS developer, what led him to start PNK Digital, and his thesis on AI-accelerated development.

3.2. The page must include a **professional photo of Mike**.

3.3. The page must clearly state that PNK Digital is a **founder-led operation**, not an agency with a hidden team. This should be framed as a strength (low overhead, direct communication, senior expertise on every project, no account managers or juniors).

3.4. The page must include a section on **how Mike works** — his process, his use of AI tooling, and what that means for clients (faster delivery, lower costs, iterative approach).

3.5. The page may include a **values or principles section**, but it must be concise and avoid generic corporate language. Each value should be specific and connected to a tangible client benefit.

3.6. The page must include a CTA to the Contact page.

### FR4: Services Page

4.1. The services offered must be narrowed to reflect Mike's genuine expertise. The primary services must be:

  - **React Application Development** — SPAs, dashboards, customer-facing web apps, marketing sites built with React/Next.js. Emphasise production-quality, scalable code.
  - **AWS Integration & Infrastructure** — Backend services, API development, serverless architecture, deployment pipelines, cost-optimised cloud infrastructure.
  - **AI-Powered MVPs & Rapid Prototyping** — Taking a product idea from concept to deployed application in 2–4 weeks using AI-accelerated development. Ideal for startups and businesses wanting to validate ideas quickly.
  - **AI Integration for Existing Products** — Embedding AI capabilities (chatbots, content generation, intelligent automation) into existing applications using OpenAI, Claude API, and similar tools.

4.2. Each service must have its own detail section or card containing: a clear description of what's included, who it's for (target client), example deliverables, and relevant technology tags.

4.3. Services must **not** include: iOS/Android native development, WordPress/Webflow development, or broad "AI Consulting / Strategy" services that imply a consultancy team. If clients need adjacent services outside Mike's core skills, this can be handled conversationally — it should not be listed as a service.

4.4. Each service section must include a CTA to start a conversation about that type of project.

### FR5: Work / Portfolio Page

5.1. The Work page must support displaying portfolio items as **case study cards** in a grid or list layout.

5.2. Each case study card must include: project title, brief description (1–2 sentences), category/service type, technology tags, and a thumbnail image.

5.3. Clicking a case study card must link to a **full case study page** (or expandable section) containing: the problem/brief, the approach, key technical decisions, the outcome, timeline, and screenshots or a live link.

5.4. The page must accommodate **placeholder cards** for the initial launch. Placeholders should be visually intentional (not broken-looking) — e.g., "New case study coming soon" with a category label, or silhouette/wireframe treatment.

5.5. The page structure must make it easy to add new case studies over time without redesigning the page.

5.6. The page should include a brief introductory paragraph explaining that PNK Digital is a new venture and that the portfolio is actively growing, linking to Mike's broader experience as context.

### FR6: Blog Section

6.1. The blog must have an **article listing page** displaying posts in reverse chronological order, with: title, publication date, excerpt (first 150–200 characters or a custom excerpt), category/tag, and estimated reading time.

6.2. Each blog post must have its own **individual article page** with: full article content rendered from Markdown, publication date, estimated reading time, category/tags, author attribution (Mike), and social sharing links (LinkedIn, X/Twitter, copy link).

6.3. The article page must include a **related articles section** at the bottom showing 2–3 other posts.

6.4. The article page must include a **CTA section** after the article content (e.g., "Working on something similar? Let's talk." linking to Contact).

6.5. The blog listing page must support **filtering by category/tag**.

6.6. The blog must support the following initial content categories:
  - **AI & Development** — Posts about AI-powered development workflows, tools, and the future of software development.
  - **Technical Insights** — Deep dives into React, AWS, architecture decisions, and practical development topics.
  - **Business & Strategy** — Thoughts on the changing digital landscape, how businesses should approach tech investment, build vs buy decisions.
  - **Project Spotlights** — Write-ups of interesting builds, technical challenges solved, or process walkthroughs (can overlap with portfolio).

6.7. Blog content must be authored in Markdown files for easy creation and management.

### FR7: Content Strategy Guidance

7.1. The blog should launch with **at least 2–3 seed articles** to avoid looking empty. Recommended initial topics:

  - "Why I Started PNK Digital: A Developer's Bet on AI-Accelerated Development" — The founder's story, establishing credibility and narrative.
  - "What AI-Powered Development Actually Means (And What It Doesn't)" — Demystifying the approach, addressing scepticism, positioning as an honest voice in a hype-filled space.
  - "The £50k Website Is Dead: How AI Is Changing What Software Should Cost" — A provocative take that speaks directly to the target client's pain point and aligns with the broader industry conversation.

7.2. Ongoing content cadence target: **2 articles per month** covering a mix of the categories defined in FR6.6.

7.3. Content should aim to be **practical and opinionated** rather than generic. Each article should include concrete examples, specific tools/approaches, and a clear point of view. Avoid writing that could have been generated by any AI without domain expertise.

7.4. Articles should naturally link to the Services and Contact pages where relevant, but should not be overtly salesy.

### FR8: Contact Page & Conversion Flow

8.1. The pricing configurator must be **completely removed**.

8.2. The Contact page must include a **simple contact form** with the following fields: Name, Email, Company (optional), "Tell me about your project" (textarea), and a submit button.

8.3. The Contact page must prominently feature a **"Book a Discovery Call" CTA** linking to a scheduling tool (e.g., Calendly or Cal.com). This should be positioned as the primary action, with the form as a secondary option.

8.4. The Contact page must display: email address (hello@pnk-digital.com), location (Surrey, UK), and expected response time.

8.5. The Contact page should include a brief section explaining **what to expect** from a discovery call (e.g., "A 30-minute conversation to understand your project, discuss approach, and give you an honest assessment of timeline and cost. No obligation, no hard sell.").

8.6. All CTAs across the site that previously linked to the configurator must be updated to link to the Contact page or discovery call booking.

### FR9: Messaging & Tone of Voice

9.1. All site copy must use **"I" or the PNK Digital brand name** instead of "we/our/team/consultants". The sole exception is when referring to collaborative work with a client (e.g., "together we'll define the scope").

9.2. The tone must be: **direct, confident, knowledgeable, and approachable**. Not corporate, not salesy, not trying to sound bigger than reality.

9.3. Copy must lead with **client outcomes and benefits** (speed, cost, quality, direct senior-level expertise) rather than leading with technology or process.

9.4. Claims must be **substantiated or removed**. The current "3x faster" and "50%+ cost reduction" stats must either be backed by evidence or replaced with qualitative statements (e.g., "Weeks, not months" instead of "3x faster").

9.5. AI should be positioned as a **tool and accelerator**, not the entire identity. The expertise is Mike's — AI amplifies it. Avoid making it sound like the AI is doing all the work.

9.6. Competitor comparisons (e.g., "while agencies are still debating architecture") should be used sparingly and with a confident rather than dismissive tone.

### FR10: Design & Technical Requirements

10.1. The site must be built with **React/Next.js** — it should serve as a demonstration of Mike's core technical capability.

10.2. The site must be **fully responsive** across desktop, tablet, and mobile.

10.3. The site must achieve a **Lighthouse performance score of 90+** on both mobile and desktop.

10.4. The visual design may retain the current dark theme aesthetic if desired, but must feel modern, clean, and professional — not generic "tech startup template."

10.5. The site must include proper **SEO foundations**: semantic HTML, meta titles/descriptions for all pages, Open Graph tags for social sharing, a sitemap, and structured data where appropriate (Organisation, Person, BlogPosting).

10.6. Blog article pages must support **Markdown rendering** with proper typography, code blocks with syntax highlighting, images, and embedded content.

10.7. The site must include **analytics** (e.g., Google Analytics, Plausible, or similar) to track page views, blog engagement, and contact form submissions.

10.8. Contact form submissions must be delivered reliably — either via a serverless function (AWS SES/Lambda) or a form service (e.g., Formspree, Getform).

---

## Non-Goals (Out of Scope)

- **CMS integration** — Blog posts will be authored as Markdown files in the codebase for now. A headless CMS (e.g., Sanity, Contentful) may be added later but is not in scope for this phase.
- **E-commerce or payment processing** — No online purchasing or payment functionality.
- **Client portal or login area** — No authenticated user areas.
- **Multi-language support** — English only.
- **Real portfolio content** — The PRD specifies placeholder-ready structures. Populating with actual case studies is a separate content task.
- **Pricing configurator rebuild** — The configurator is being removed, not redesigned.
- **Native mobile app or PWA** — Standard responsive website only.
- **WordPress, Webflow, or Webflow-to-code migration** — Clean rebuild in React/Next.js.

---

## Design Considerations

- The current dark theme with cyan/magenta/purple accents is visually distinctive. Consider retaining the colour palette while cleaning up the layout to feel less "template-like."
- Typography should be sharp and readable, particularly for blog content which will be long-form.
- The site should feel **personal** — small touches like a photo, a conversational tone, and hand-picked details signal that a real person is behind this, not a corporate machine.
- Case study placeholder cards should use a consistent visual treatment (e.g., dashed borders, muted colours, "Coming soon" labels) that looks intentional.
- The discovery call CTA should be the most visually prominent interactive element on every page.

---

## Technical Considerations

- **Framework:** Next.js (App Router) with React — aligns with Mike's core expertise and serves as a portfolio piece itself.
- **Hosting:** AWS (Amplify, S3 + CloudFront, or similar) — again, demonstrates AWS capability.
- **Blog engine:** Markdown files processed at build time (e.g., using `gray-matter` + `next-mdx-remote` or similar). This keeps things simple and avoids CMS dependencies.
- **Contact form:** AWS SES + Lambda, or a third-party form service for simplicity.
- **Scheduling:** Embed or link to Cal.com / Calendly for discovery call booking.
- **Analytics:** Plausible or Fathom for privacy-friendly analytics (or Google Analytics if preferred).
- **Deployment:** CI/CD pipeline deploying on push to main branch.
- **Domain:** Existing domain pnk-digital.com to be retained.

---

## Success Metrics

1. **Trust & positioning clarity** — A non-technical person visiting the site can, within 10 seconds, understand: who Mike is, what PNK Digital does, and why it's different from a traditional agency.
2. **Conversion rate** — Contact form submissions and discovery call bookings increase vs. current site (baseline to be established post-launch).
3. **Blog engagement** — Blog posts achieve measurable organic traffic within 3 months of consistent publishing (target: 500+ monthly blog page views within 6 months).
4. **SEO performance** — Key pages rank for relevant long-tail terms (e.g., "React developer Surrey", "AI-powered MVP development UK", "freelance AWS developer").
5. **Lighthouse scores** — All pages score 90+ on Performance, Accessibility, Best Practices, and SEO.
6. **Portfolio readiness** — The Work page structure successfully accommodates the addition of new case studies without requiring page redesign.

---

## Open Questions

1. **Photo/headshot** — Does Mike have a professional photo ready to use, or does one need to be taken/sourced?
2. **Discovery call tool** — Which scheduling tool does Mike want to use (Cal.com, Calendly, other)?
3. **Analytics preference** — Privacy-friendly analytics (Plausible/Fathom) or Google Analytics?
4. **Domain/hosting** — Is the current hosting setup on AWS, or does it need to be migrated?
5. **Social profiles** — Which social links should be included (LinkedIn, GitHub, X/Twitter, others)?
6. **Existing enquiries** — Is the current contact form generating any leads that need to be preserved during the transition?
7. **Content authoring** — Will Mike write blog posts himself, use AI assistance, or a combination? (This affects whether any drafting tooling needs to be considered.)
8. **Brand assets** — Are there existing brand guidelines, logo files, and colour definitions, or should the rebuild establish these fresh?
