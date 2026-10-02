// Tech Support Plans landing pages (/tech-support A/B test).
// Version A copy is lifted verbatim from the design handoff (renderVals() in
// "Tech Support Plans.dc.html"). Version B (/tech-support/service) has its own
// copy in tech-support-service.ts; the types here are shared by both.

export type Variant = 'a' | 'b';
export type PlanId = 'essentials' | 'growth' | 'partner' | 'website-care' | 'business';

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  from?: boolean;
  /** Bold one-line positioning under the plan name (version B). */
  positioning?: string;
  tagline: string;
  hours?: string;
  response?: string;
  /** e.g. "Everything in Essentials, plus:" */
  includes?: string;
  features: string[];
  /** Small line under the features, above `note` (version B). */
  detail?: string;
  /** Small italic line under the features (version B). */
  note?: string;
};

export type CompareValue = boolean | string;
export type CompareGroup = { title: string; rows: { label: string; v: CompareValue[] }[] };
export type Step = { title: string; when?: string; body: string; points?: string[] };
export type Faq = { q: string; a: string };
export type Testimonial = { quote: string; name?: string; attribution: string };

export type TechSupportContent = {
  plans: Plan[];
  highlight: PlanId;
  compareGroups: CompareGroup[];
  steps: Step[];
  faqs: Faq[];
  testimonials: Testimonial[];
  booking: { intro: string; successLine: string };
};

/**
 * Testimonials are placeholders until real, approved quotes exist.
 * Keep this false in production.
 */
export const SHOW_TESTIMONIALS = false;

export const STAFF_OPTIONS = ['Just me', '2–5', '6–10', '11–25', '26–50', 'More than 50'] as const;
export const PLAN_OPTIONS = ['Not sure', 'Essentials', 'Growth', 'Partner'] as const;

/** Compare-table column heads, derived from plans (e.g. "from £950/mo"). */
export const planPriceLabel = (p: Plan) => `${p.from ? 'from ' : ''}£${p.price}/mo`;

const PLACEHOLDER_QUOTE = "Client quote goes here. Use a real quote, with the client's permission.";

const contentA: TechSupportContent = {
  highlight: 'growth',
  plans: [
    {
      id: 'essentials',
      name: 'Essentials',
      price: 125,
      tagline: 'For businesses that mainly need their website looked after.',
      hours: 'Up to 1 hour of small changes a month',
      response: 'Next business day response',
      features: [
        'Website hosting, SSL (the padlock that keeps visitors safe) and domain renewals managed',
        'Daily backups and monthly updates',
        '24/7 uptime monitoring – we know if your site goes down',
        'Monthly health email',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 375,
      tagline: 'For teams that rely on email and Microsoft 365 or Google Workspace every day.',
      hours: 'Up to 4 hours a month',
      response: 'Same business day response',
      includes: 'Everything in Essentials, plus:',
      features: [
        'Microsoft 365 or Google Workspace admin – starters, leavers, mailboxes, licences',
        "Email security (SPF, DKIM, DMARC), so your email isn't spoofed or sent to spam",
        'Two-step login (MFA) and password manager rollout',
        'Monthly analytics and search check',
        'Quarterly review call',
      ],
    },
    {
      id: 'partner',
      name: 'Partner',
      price: 950,
      from: true,
      tagline: 'For businesses ready to cut admin and plan their tech properly.',
      hours: 'Up to 10 priority hours a month',
      response: 'Response within 4 business hours',
      includes: 'Everything in Growth, plus:',
      features: [
        'Automation and AI projects – forms, quotes, reporting, CRM integrations',
        'Supplier management – we deal with your other providers',
        'Cyber Essentials preparation',
        '12-month tech roadmap',
      ],
    },
  ],
  compareGroups: [
    {
      title: 'Website',
      rows: [
        { label: 'Hosting, SSL and domain renewals managed', v: [true, true, true] },
        { label: 'Daily backups and monthly updates', v: [true, true, true] },
        { label: '24/7 uptime monitoring', v: [true, true, true] },
        { label: 'Monthly health email', v: [true, true, true] },
        { label: 'Monthly analytics and search check', v: [false, true, true] },
      ],
    },
    {
      title: 'Email and accounts',
      rows: [
        { label: 'Microsoft 365 / Google Workspace admin', v: [false, true, true] },
        { label: 'Email security, so you stay out of spam', v: [false, true, true] },
      ],
    },
    {
      title: 'Security',
      rows: [
        { label: 'Two-step login (MFA) and password manager', v: [false, true, true] },
        { label: 'Cyber Essentials preparation', v: [false, false, true] },
      ],
    },
    {
      title: 'Projects and planning',
      rows: [
        { label: 'Quarterly review call', v: [false, true, true] },
        { label: 'Automation and AI projects', v: [false, false, true] },
        { label: 'Supplier management', v: [false, false, true] },
        { label: '12-month tech roadmap', v: [false, false, true] },
      ],
    },
    {
      title: 'Support',
      rows: [
        { label: 'Hours included each month', v: ['1 hour', '4 hours', '10 priority hours'] },
        { label: 'Response time', v: ['Next business day', 'Same business day', 'Within 4 business hours'] },
      ],
    },
  ],
  steps: [
    {
      title: 'Free tech review',
      when: '30 minutes, free',
      body: "A video call to look at your website, email, accounts and security. You'll get a short, plain-English summary of what needs attention.",
    },
    {
      title: 'Onboarding',
      when: 'Within two weeks',
      body: 'We document your setup – who has access to what, and where everything lives – and fix anything urgent straight away.',
    },
    {
      title: 'Ongoing support',
      when: 'Every month',
      body: "Email or use the support form whenever you need something. You'll get an update on every request, from start to finish.",
    },
  ],
  faqs: [
    {
      q: 'What happens if I go over my hours?',
      a: "We'll always tell you before it happens – nothing over your plan's hours is done without your OK. Extra time is £80 an hour. If you regularly need more, we'll look at whether a different plan works out cheaper.",
    },
    {
      q: 'Do unused hours roll over?',
      a: "No. Hours reset each month. That's what keeps the fee fixed and guarantees time is set aside for you.",
    },
    {
      q: "What's the minimum term?",
      a: "Three months to start, so onboarding has time to pay off. After that it's rolling monthly – cancel with 30 days' notice.",
    },
    {
      q: 'Can I change plans?',
      a: 'Yes. Move up or down whenever you like, and the change applies from your next billing date.',
    },
    {
      q: 'What are your support hours?',
      a: 'Monday to Friday, 9am to 5:30pm, excluding UK bank holidays. Website monitoring runs 24/7, so problems are spotted even when the office is closed.',
    },
    {
      q: "What isn't included?",
      a: 'Hardware, printers, on-site visits and 24/7 emergency cover. If you need any of those, we can recommend trusted partners.',
    },
  ],
  testimonials: [
    { quote: PLACEHOLDER_QUOTE, name: 'Client name', attribution: 'Role, Business name' },
    { quote: PLACEHOLDER_QUOTE, name: 'Client name', attribution: 'Role, Business name' },
    { quote: PLACEHOLDER_QUOTE, name: 'Client name', attribution: 'Role, Business name' },
  ],
  booking: {
    intro:
      "A relaxed video call with Mike. We'll look at your website, email and security, then recommend what to fix first and which plan fits.",
    successLine: 'Mike will reply within one business day to arrange a time for your free 30-minute review.',
  },
};

export const techSupportContent: Record<'a', TechSupportContent> = { a: contentA };
