# PNK Digital — Email Templates

Production-ready HTML email templates for outreach campaigns via Brevo (or any ESP).

## Templates

| File | Purpose | Type |
|------|---------|------|
| `cold-local-business.html` | Cold outreach to local businesses around Farnham, Surrey | Graphical |
| `agency-partnership.html` | White-label dev partnership pitch to agencies | Graphical |
| `tech-startup.html` | Pitch to tech companies/startups needing dev resource | Graphical |
| `follow-up.html` | Simple follow-up after no reply | Text-only |
| `nurture.html` | Light check-in / value-share email | Text-only |

## Structure

**Templates 1-3** have two sections:
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
