# PNK Digital — Email Templates

Production-ready HTML email templates for outreach campaigns via Brevo (or any ESP).

## Templates

| File | Purpose | Type |
|------|---------|------|
| `cold-local-business.html` | Cold outreach to local businesses around Farnham, Surrey | Graphical |
| `agency-partnership.html` | White-label dev partnership pitch to agencies | Graphical |
| `tech-startup.html` | Pitch to tech companies/startups needing dev resource | Graphical |
| `tech-support-service.html` | Managed tech support plans pitch (company voice, links to `/tech-support`) | Graphical |
| `tech-support-auto-reply-a.html` | Auto-reply to a free tech review booking from the retired version A page (founder voice, warm neutrals) | Graphical |
| `tech-support-auto-reply.html` | Auto-reply to a free tech review booking on `/tech-support` (version B: company voice, slate) | Graphical |
| `ai-consulting-auto-reply.html` | Auto-reply to a free AI Fit Call booking on `/ai-consulting` (company voice, slate) | Graphical |
| `follow-up.html` | Simple follow-up after no reply | Text-only |
| `nurture.html` | Light check-in / value-share email | Text-only |

## Structure

**Graphical templates** (1-3 and `tech-support-service.html`) have two sections:
- **Top:** Personal plain-text intro with placeholders
- **Bottom:** Graphical mini landing page (hero, service cards, comparison, process steps, tech stack, testimonial, footer)

**Templates 4-5** are text-only with a minimal signature.

## Placeholders

Replace these `{{placeholders}}` before sending:

### All templates
| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{first_name}}` | Recipient's first name | `Sarah` |
| `{{company_name}}` | Their company name | `Acme Design` |
| `{{unsubscribe_url}}` | Brevo unsubscribe link | `{{ unsubscribe }}` in Brevo |

### Graphical templates (1-3)
| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{personal_hook}}` | Opening line referencing something specific about them | `I saw your new store opening on South Street — congrats!` |
| `{{specific_value}}` | What you could specifically do for them | `I could build you a booking system that saves your team 10+ hours a week on phone calls.` |

### Tech support (`tech-support-service.html`)
Uses `{{personal_hook}}` and `{{specific_value}}` as above, plus:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{sender_name}}` | Name in the sign-off | `The PNK Digital team` |

Written in version B's company voice ("we"). Keep its honesty rule in any copy you add, including `{{personal_hook}}` and `{{specific_value}}`: no individual's name, team size, locations, years trading, certifications, client counts or statistics. The plan prices and service standards mirror `src/data/tech-support.ts` and `ServiceStandards.astro`; update both if they change. Links carry `utm_source=email&utm_medium=outreach&utm_campaign=tech-support-service`, which the booking form records.

### Tech support auto-replies (`tech-support-auto-reply-a.html`, `tech-support-auto-reply.html`)
Sent automatically by the `/api/tech-support` Lambda (`cdk/lambda/contact-form/tech-support.ts`) to the person who books, picking the template that matches the page variant. esbuild bundles both files into the Lambda as text, so edits here go live on the next deploy. Uses JS template-literal placeholders like `auto-reply.html`, filled from the booking record:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `${firstName}` | First word of the `name` field | `Sarah` |
| `${company}` | The `businessName` field | `Acme Design` |

- **A** mirrored the retired version A page: first person, signed by Mike, version A colours. Links use `utm_campaign=tech-support`.
- **B** mirrors `/tech-support`: company voice, signed "The PNK Digital team", version B colours and the same honesty rule as `tech-support-service.html`. Links use `utm_campaign=tech-support-service`.

Both links use `utm_source=email&utm_medium=auto-reply`. The plain-text versions live in `tech-support.ts`; keep them in step with the HTML.

### Follow-up (#4)
| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{specific_value}}` | What you originally pitched | `web development` |

### Nurture (#5)
| Placeholder | Description | Example |
|-------------|-------------|---------|
| `{{preheader_text}}` | Email preview text | `Quick tip on website speed` |
| `{{value_content}}` | Main value paragraph — a tip, insight, or observation | `I was reading about Google's latest Core Web Vitals update and noticed most local business sites are going to take a hit...` |
| `{{value_detail}}` | Supporting detail or second paragraph | `The fix is usually straightforward — optimise images, defer scripts, and sort out layout shift. Most sites can go from a 40 to 90+ score in an afternoon.` |
| `{{soft_cta}}` | Gentle call-to-action, no hard sell | `If you're curious how your site stacks up, I'm happy to run a quick audit — no strings attached.` |

## Using with Brevo

1. **Create a template** in Brevo → Campaigns → Email Templates → New Template
2. **Paste the HTML** into the code editor (not the drag-and-drop builder)
3. **Replace `{{unsubscribe_url}}`** with Brevo's built-in tag: `{{ unsubscribe }}`
4. **Map contact attributes** — Brevo uses `{{ contact.FIRSTNAME }}` syntax, so replace:
   - `{{first_name}}` → `{{ contact.FIRSTNAME }}`
   - `{{company_name}}` → `{{ contact.COMPANY }}` (or custom attribute)
5. **For dynamic placeholders** like `{{personal_hook}}`, either:
   - Create custom contact attributes in Brevo and use `{{ contact.PERSONAL_HOOK }}`
   - Or manually customise per-send for smaller batches
6. **Send a test** to yourself and check rendering across Gmail, Outlook, and Apple Mail

## Local Preview

Open `preview.html` in a browser to see all templates side by side. Each template is loaded in an iframe with its own scroll.

## Technical Notes

- **Table-based layout** for Outlook/Gmail compatibility
- **Inline CSS** on all elements — `<style>` block only for responsive media queries (progressive enhancement)
- **600px max width** on desktop, fluid on mobile
- **No images** — all icons use Unicode/HTML entities
- **Tested for:** Gmail (web + mobile), Apple Mail, Outlook 2016+

## Brand Colours

| Colour | Hex | Usage |
|--------|-----|-------|
| Brand Pink | `#f4178c` | Accents, headings, CTA highlights |
| Neon Cyan | `#00f5ff` | Tech badges, links |
| Dark BG | `#1a1a2e` | Hero, footer, card backgrounds |
| Deep Black | `#0a0a0f` | Alternating dark sections |
| Text Primary | `#e4e4e7` | Body text on dark |
| Text Secondary | `#a1a1aa` | Muted/supporting text |
