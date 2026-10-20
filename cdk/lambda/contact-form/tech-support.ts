// POST /api/tech-support — booking form on the Tech Support Plans landing
// page (/tech-support; variant A retired, B live). Accepts JSON (JS-enhanced form, answers JSON)
// or a native urlencoded form post (no-JS fallback, answers with a 303 redirect).
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { TechSupportBookingInput, TechSupportEnquiryRecord, ValidationError } from './types';
// Bundled as strings by esbuild's text loader (see api-stack.ts), so the
// templates in /emails are the single source for each variant's auto-reply.
import autoReplyTemplateA from '../../../emails/tech-support-auto-reply-a.html';
import autoReplyTemplateB from '../../../emails/tech-support-auto-reply.html';

export interface TechSupportDeps {
  isRateLimited: (ip: string) => Promise<boolean>;
  save: (record: TechSupportEnquiryRecord) => Promise<void>;
  sendNotification: (subject: string, html: string, text: string) => Promise<void>;
  /** Sends the auto-reply to the person who submitted the form. */
  sendConfirmation: (to: string, subject: string, html: string, text: string) => Promise<void>;
  corsHeaders: Record<string, string>;
  /** Origins the no-JS redirect may point back to ('*' allows any). */
  allowedOrigins: string[];
  generateId: () => string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
// Essentials/Growth: version A. Website Care/Business: version B (now /tech-support).
const PLANS = ['Not sure', 'Essentials', 'Growth', 'Partner', 'Website Care', 'Business'];
const STAFF = ['', 'Just me', '2–5', '6–10', '11–25', '26–50', 'More than 50'];
const FALLBACK_ORIGIN = 'https://pnk-digital.com';

export async function handleTechSupport(
  event: APIGatewayProxyEventV2,
  deps: TechSupportDeps
): Promise<APIGatewayProxyResultV2> {
  const contentType = (event.headers['content-type'] || '').toLowerCase();
  const isNativeForm = contentType.includes('application/x-www-form-urlencoded');
  const rawBody = event.body
    ? event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body
    : '';
  const body: Record<string, unknown> = isNativeForm
    ? Object.fromEntries(new URLSearchParams(rawBody))
    : rawBody
      ? JSON.parse(rawBody)
      : {};
  const input = normaliseInput(body);
  const redirectBase = resolveOrigin(event, deps.allowedOrigins);

  const ok = (enquiryId?: string): APIGatewayProxyResultV2 =>
    isNativeForm
      ? redirect(`${redirectBase}/tech-support/thanks`)
      : json(200, { success: true, message: 'Thanks — we will be in touch shortly.', enquiryId }, deps);

  // Honeypot: bots auto-fill the hidden "website" field.
  if (input.website) {
    console.log('Tech support honeypot triggered');
    return ok();
  }

  // Time check (JS path only; a native form post has no timer). The no-JS
  // path relies on the honeypot and per-IP rate limit instead.
  if (!isNativeForm && (typeof input._t !== 'number' || input._t < 3000)) {
    console.log('Tech support time check failed:', input._t);
    return ok();
  }

  const ip = event.requestContext.http.sourceIp;
  if (await deps.isRateLimited(ip)) {
    const message = "You've sent several messages recently. Please wait a bit before sending another.";
    return isNativeForm ? redirect(`${redirectBase}/tech-support#book`) : json(429, { success: false, message }, deps);
  }

  const errors = validate(input);
  if (errors.length) {
    return isNativeForm
      ? redirect(`${redirectBase}/tech-support#book`)
      : json(400, { success: false, message: 'Validation failed', errors }, deps);
  }

  const record: TechSupportEnquiryRecord = {
    enquiryId: deps.generateId(),
    createdAt: new Date().toISOString(),
    name: input.name,
    email: input.email.toLowerCase(),
    company: input.businessName,
    phone: input.phone || undefined,
    staff: input.staff || undefined,
    plan: input.plan,
    message: input.headache,
    variant: input.variant,
    utm: Object.keys(input.utm).length ? input.utm : undefined,
    status: 'new',
    source: 'tech-support-plans',
    ipAddress: ip,
    userAgent: event.headers['user-agent'],
    ttl: Math.floor(Date.now() / 1000) + 63072000,
  };

  await deps.save(record);

  try {
    await deps.sendNotification(
      `[PNK Digital] Tech review request (${record.variant.toUpperCase()}) from ${record.name}, ${record.company}`,
      buildHtml(record),
      buildText(record)
    );
  } catch (emailError) {
    console.error('Failed to send tech support notification:', emailError);
  }

  try {
    await deps.sendConfirmation(
      record.email,
      record.variant === 'b' ? 'Your free technology review request – PNK Digital' : 'Your free tech review with Mike – PNK Digital',
      buildConfirmationHtml(record),
      buildConfirmationText(record)
    );
  } catch (emailError) {
    console.error('Failed to send tech support auto-reply:', emailError);
  }

  return ok(record.enquiryId);
}

function normaliseInput(body: Record<string, unknown>): TechSupportBookingInput {
  const str = (k: string, max = 200) => (typeof body[k] === 'string' ? (body[k] as string).trim().slice(0, max) : '');
  const utm: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = str(k, 200);
    if (v) utm[k] = v;
  }
  const plan = str('plan');
  const staff = str('staff');
  const t = body._t;
  return {
    name: str('name', 100),
    businessName: str('businessName', 150),
    email: str('email', 254),
    phone: str('phone', 40),
    staff: STAFF.includes(staff) ? staff : '',
    plan: PLANS.includes(plan) ? plan : 'Not sure',
    headache: str('headache', 5000),
    variant: str('variant') === 'b' ? 'b' : 'a',
    utm,
    website: str('website'),
    _t: typeof t === 'number' ? t : typeof t === 'string' && t ? Number(t) : undefined,
  };
}

function validate(input: TechSupportBookingInput): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!input.name) errors.push({ field: 'name', message: 'Please enter your name.' });
  if (!input.businessName) errors.push({ field: 'businessName', message: 'Please enter your business name.' });
  // Same rule as the form: \S+@\S+\.\S+
  if (!/^\S+@\S+\.\S+$/.test(input.email)) errors.push({ field: 'email', message: 'Please enter a valid email address.' });
  return errors;
}

function resolveOrigin(event: APIGatewayProxyEventV2, allowed: string[]): string {
  const candidates = [event.headers.origin, event.headers.referer]
    .filter((v): v is string => !!v)
    .map((v) => {
      try {
        return new URL(v).origin;
      } catch {
        return '';
      }
    });
  const match = candidates.find((o) => o.startsWith('https://') && (allowed.includes('*') || allowed.includes(o)));
  return match || FALLBACK_ORIGIN;
}

function redirect(location: string): APIGatewayProxyResultV2 {
  return { statusCode: 303, headers: { Location: location, 'Cache-Control': 'no-store' }, body: '' };
}

function json(statusCode: number, body: Record<string, unknown>, deps: TechSupportDeps): APIGatewayProxyResultV2 {
  return { statusCode, headers: deps.corsHeaders, body: JSON.stringify(body) };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function rows(r: TechSupportEnquiryRecord): [string, string][] {
  return [
    ['Name', r.name],
    ['Business', r.company],
    ['Email', r.email],
    ['Phone', r.phone || '—'],
    ['Staff', r.staff || '—'],
    ['Plan of interest', r.plan],
    ['Page variant', r.variant.toUpperCase()],
    ...Object.entries(r.utm || {}).map(([k, v]) => [k, v] as [string, string]),
  ];
}

function buildText(r: TechSupportEnquiryRecord): string {
  return [
    'New free tech review request (Tech Support Plans)',
    '',
    ...rows(r).map(([k, v]) => `${k}: ${v}`),
    '',
    'Biggest tech headache:',
    r.message || '—',
    '',
    '---',
    `Enquiry ID: ${r.enquiryId}`,
    `Submitted: ${r.createdAt}`,
  ].join('\n');
}

function buildHtml(r: TechSupportEnquiryRecord): string {
  const tr = rows(r)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;">${esc(k)}</td><td style="padding:6px 0;">${esc(v)}</td></tr>`
    )
    .join('');
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background:#f5f5f5;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;">
<h1 style="margin:0 0 16px;font-size:20px;color:#1b1720;">New free tech review request</h1>
<table role="presentation" style="border-collapse:collapse;font-size:15px;">${tr}</table>
<h2 style="margin:20px 0 8px;font-size:16px;color:#1b1720;">Biggest tech headache</h2>
<p style="margin:0;line-height:1.6;white-space:pre-wrap;">${esc(r.message || '—')}</p>
<p style="margin:24px 0 0;font-size:13px;color:#888;">Enquiry ID: ${esc(r.enquiryId)} · ${esc(r.createdAt)}</p>
</div></body></html>`;
}

// Fills the ${firstName} / ${company} placeholders in the variant's template:
// emails/tech-support-auto-reply-a.html (A) or tech-support-auto-reply.html (B).
function buildConfirmationHtml(r: TechSupportEnquiryRecord): string {
  return (r.variant === 'b' ? autoReplyTemplateB : autoReplyTemplateA)
    .split('${firstName}')
    .join(esc(r.name.split(' ')[0]))
    .split('${company}')
    .join(esc(r.company));
}

function buildConfirmationText(r: TechSupportEnquiryRecord): string {
  return r.variant === 'b' ? buildConfirmationTextB(r) : buildConfirmationTextA(r);
}

function buildConfirmationTextA(r: TechSupportEnquiryRecord): string {
  const firstName = r.name.split(' ')[0];
  return `Thanks, ${firstName}. Your free tech review is requested.

I've received your request for ${r.company}. It's a relaxed 30-minute video call: we'll look at your website, email and security, then I'll recommend what to fix first and which plan fits. No obligation, no hard sell.

I'll reply within one business day to arrange a time.

HOW IT WORKS
1. Free tech review (30 minutes, free): a short, plain-English summary of what needs attention.
2. Onboarding (within two weeks): your setup documented, anything urgent fixed straight away.
3. Ongoing support (every month): an update on every request, from start to finish.

PLANS AT A GLANCE
- Essentials, £125/mo: up to 1 hour a month, next business day response.
- Growth, £375/mo: up to 4 hours a month, same business day response.
- Partner, from £950/mo: up to 10 priority hours, response within 4 business hours.
Extra time £80/hour. Support hours Mon–Fri, 9am–5:30pm (excluding UK bank holidays), with 24/7 website monitoring.

In the meantime, if there's anything you'd like me to look at on the call, just reply to this email. I read every message personally.

Speak soon,
Mike Pink
Founder, PNK Digital

Compare the plans: https://pnk-digital.com/tech-support?utm_source=email&utm_medium=auto-reply&utm_campaign=tech-support#plans

---
PNK Digital is a trading name of Mike Pink Ltd.
Registered in England & Wales · Company No. 09029124
Registered Office: 7 Jubilee Lane, Farnham, Surrey GU104SZ
`;
}

function buildConfirmationTextB(r: TechSupportEnquiryRecord): string {
  const firstName = r.name.split(' ')[0];
  return `Thanks, ${firstName}. Your free technology review is requested.

We've received your request for ${r.company}. In your free 30-minute technology review, we'll talk through the technology your business relies on: your website, business email, Microsoft 365 or Google Workspace, domains and DNS, security, backups and user access, and where technology could save your team time.

You'll leave with a clearer picture of what's working, what needs attention and where you could improve. No obligation. No hard sell. Just straightforward advice.

We'll reply within one business day to arrange a time.

GETTING STARTED IS SIMPLE
1. Let's talk (free, 30 minutes): what's working, and what's causing problems.
2. We take over: if you decide to work with us, we bring your website, email, domains and other technology under control.
3. We look after it: someone to call when something goes wrong, and someone looking for ways to make your technology work better.

ONE PARTNER FOR YOUR BUSINESS TECHNOLOGY
Website, email & Microsoft 365, domains & DNS, security, technical support, and automation & AI.
One person. One point of contact. One place to go when technology gets in the way.

PLANS AT A GLANCE
- Website Care, £125/mo: for businesses that want their website properly looked after.
- Business, £375/mo (recommended): your outsourced technology department. Includes up to 4 hours of hands-on work each month.
- Partner, from £950/mo: a hands-on technology partner for businesses that need things built, not just supported. Around 10 hours of hands-on work each month.
Need more than your plan includes? We'll tell you before we do it and quote it as a fixed price. Plan clients get 10% off project work. No unexpected invoices.

MORE THAN IT SUPPORT
If something can be fixed, we'll fix it. If something can be simplified, we'll simplify it. If something can be automated, we'll automate it. And if your business needs something that doesn't exist yet, we can build it.

In the meantime, if there's anything you'd like us to look at on the call, just reply to this email.

Prefer to talk? Call us on 01252 279059.

Speak soon,
The PNK Digital team

Compare the plans: https://pnk-digital.com/tech-support?utm_source=email&utm_medium=auto-reply&utm_campaign=tech-support-service#plans

---
PNK Digital is a trading name of Mike Pink Ltd.
Registered in England & Wales · Company No. 09029124
Registered Office: 7 Jubilee Lane, Farnham, Surrey GU104SZ
`;
}
