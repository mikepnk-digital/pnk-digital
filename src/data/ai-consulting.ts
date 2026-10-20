// AI Consulting landing page (/ai-consulting), company voice, version B theme.
// Copy is verbatim from "plans/AI Consulting Landing Page — Copy & Structure
// Spec.md"; change it there first, then here.
// Not bound by the /tech-support honesty rule: this page's copy deliberately
// states years of experience, market prices and illustrative hours saved.

import type { Faq, Plan, Step } from './tech-support';
import type { IconItem } from './tech-support-service';
import { CALL_LABEL, RESPONSE_PROMISE, YEARS_EXPERIENCE } from '@/config/site';

export { PHONE_DISPLAY, PHONE_HREF, testimonials } from './tech-support-service';

export const PRIMARY_CTA = CALL_LABEL;

/** Hidden `source` on the booking form; the API picks the auto-reply by it. */
export const BOOKING_SOURCE = 'ai-consulting';

export const hero = {
  eyebrow: "For businesses that want AI doing real work, not just a chatbot",
  title: 'AI that actually does the work. Built into your business.',
  sub: 'We find the processes AI can take off your team, build the first one into the tools you already use, and leave you able to run it. Fixed prices. You own everything.',
  reassurance: [
    'No vague strategy decks.',
    'No £20,000 agency minimums.',
    "No client data going somewhere you don't understand.",
  ],
};

export const auditMock = {
  title: 'AI Opportunity Audit',
  rows: [
    { title: 'Client review prep', hours: '22 hrs/month', state: 'Pilot' },
    { title: 'Inbox triage and draft replies', hours: '15 hrs/month', state: 'Next' },
    { title: 'Monthly reporting pack', hours: '6 hrs/month', state: 'Later' },
  ],
  footer: 'Hours saved are estimates agreed with your team.',
};

export const problems = [
  "You don't know which process to start with.",
  'Staff use AI tools in ways nobody has agreed or checked.',
  "You're not sure what's safe to do with client data.",
  'Every vendor says their tool is the answer.',
  "You've got a plan from somewhere, but nothing got built.",
  "You suspect it could save hours a week, but you can't prove it.",
];

export const services: IconItem[] = [
  {
    icon: 'file',
    title: 'AI Opportunity Audit',
    body: 'Two weeks. We map how your team works, rank the processes AI could take on, check the data risks and name the first pilot. You get a written report and a fixed quote.',
  },
  {
    icon: 'zap',
    title: 'Pilot Build',
    body: 'One workflow, built into the tools you already use, with a human sign-off step. Training, a written runbook and 30 days of measurement included.',
  },
  {
    icon: 'clock',
    title: 'Fractional AI Lead',
    body: 'Two to four days a month to run the roadmap, build the next workflows, filter the vendors and keep your team using what\'s been built.',
  },
  {
    icon: 'chat',
    title: 'Team AI Workshop',
    body: 'A half day, hands-on with your own documents, plus an AI use policy your business can adopt.',
  },
  {
    icon: 'shield-check',
    title: 'Safe AI setup',
    body: 'Accounts, data boundaries, approval steps and a plain-English policy, so staff can use AI without you worrying about client data.',
  },
  {
    icon: 'code',
    title: 'AI delivery for dev teams',
    body: 'If you have developers, we install the agentic coding workflow we use ourselves and pair with your team for a sprint.',
  },
];

export type CompareColumn = { label: string; highlight?: boolean };
export type CompareRow = { label: string; values: string[] };

export const compare: { columns: CompareColumn[]; rows: CompareRow[]; source: string } = {
  columns: [
    { label: 'Strategy consultant' },
    { label: 'Automation agency' },
    { label: 'PNK Digital', highlight: true },
  ],
  rows: [
    {
      label: 'What you get',
      values: [
        'A roadmap and a workshop',
        'A build, if the project is big enough',
        'A ranked plan, then the build, then the hand-over',
      ],
    },
    {
      label: 'Typical starting cost',
      values: [
        '£3,000–£8,500 for a discovery workshop',
        '£8,000–£25,000 minimum per agent',
        '£1,950 audit, credited against your pilot',
      ],
    },
    {
      label: 'Who does the work',
      values: [
        "A consultant who doesn't build",
        "A delivery team you'll rarely meet",
        'One senior engineer, start to finish',
      ],
    },
    {
      label: 'Knows your sector',
      values: ['Sometimes', 'Rarely', `${YEARS_EXPERIENCE} years in financial and professional services`],
    },
    {
      label: 'Who owns the result',
      values: ['You own the slides', "Often the agency's platform", 'You: code, prompts, accounts, documentation'],
    },
  ],
  source: 'Market figures from published UK pricing, October 2026.',
};

export const disciplines = [
  'Software engineering',
  'Financial services',
  'Workflow automation',
  'AI agents',
  'Cloud infrastructure',
  'Data protection',
];

export const principles = [
  { lead: 'If AI can save your team time,', rest: "we'll show you where, with numbers." },
  { lead: "If an off-the-shelf tool is the right answer,", rest: "we'll tell you, and we don't resell anything." },
  { lead: 'If it needs building,', rest: "we'll build it and hand it over." },
];

export const quotes = [
  'We spend hours every week on documents that follow the same pattern.',
  'Our inbox is the business.',
  "We can't use AI because of client data — can we?",
  "Our developers have Copilot, but delivery hasn't changed.",
];

export const plans: Plan[] = [
  {
    id: 'ai-audit',
    name: 'AI Opportunity Audit',
    price: 1950,
    priceSuffix: 'one-off',
    tagline: 'Find out where AI will pay in your business.',
    features: [
      'Interviews with your key people',
      'Map of your processes, tools and data',
      'Ranked list of AI opportunities with estimated hours saved',
      'Data protection and risk check',
      'A named first pilot, with a fixed quote',
      'Written report and a one-hour readout',
    ],
    note: 'Two weeks. Credited in full against a pilot booked within 30 days.',
  },
  {
    id: 'ai-pilot',
    name: 'Pilot Build',
    price: 6500,
    from: true,
    priceSuffix: 'fixed price',
    tagline: 'One workflow, built and measured.',
    includes: 'Everything in the Audit, plus:',
    features: [
      'One workflow built into the tools you already use',
      'Human approval step on anything that touches a customer',
      'Two training sessions for your team',
      'Written runbook so you can run it without us',
      '30 days of measurement: hours saved, errors, adoption',
      'You own the code, prompts, accounts and documentation',
    ],
    note: 'Typically £6,500–£12,000 depending on the workflow. Quoted exactly in the audit, before anything starts.',
  },
  {
    id: 'ai-lead',
    name: 'Fractional AI Lead',
    price: 2750,
    from: true,
    tagline: 'Someone senior owning AI in your business, part time.',
    includes: 'Everything in the Pilot, plus:',
    features: [
      'Two or four days a month, your choice',
      'The next workflows built and rolled out',
      'Vendor pitches filtered before they reach you',
      'Monthly staff drop-in clinic',
      'Adoption and hours-saved report to the owner each month',
      'AI policy kept current as the rules change',
    ],
    note: "£2,750 for two days, £4,500 for four. Three-month minimum, then 30 days' notice.",
  },
];

export const steps: Step[] = [
  {
    title: "Let's talk",
    when: 'Free, 30 minutes',
    body: "We'll talk about how your business runs, where the time goes and whether an audit is worth doing. You'll leave with at least one thing you can try yourself.",
  },
  {
    title: 'We find the opportunity',
    body: 'The two-week audit. We talk to your people, map the work, check the data risks and name the first pilot with a fixed price.',
  },
  {
    title: 'We build it, measure it, hand it over',
    body: "The pilot goes live in your tools with a human check. After 30 days you'll know the hours it saves, and you'll be able to run it without us.",
  },
];

export const reviewAreas = [
  "Where your team's time goes each week",
  'Documents and emails that follow a pattern',
  'The tools you already pay for',
  'What client data you handle, and the rules around it',
  'Anything staff are already doing with AI',
  'Whether an audit is worth it, or whether a quick fix will do',
];

export const safetyItems = [
  'Your data stays in accounts you control',
  'A person approves anything that goes to a customer',
  "Clear rules on what staff can and can't put into AI tools",
  'UK GDPR considered in every audit, with a written note on each pilot',
  "No client data used to train anyone's model",
  'A plain-English AI use policy you can hand to staff, included',
];

export const experience: IconItem[] = [
  {
    icon: 'shield',
    title: 'Financial and professional services',
    body: 'Insurance claims, pensions and life insurance systems where accuracy and compliance matter.',
  },
  {
    icon: 'network',
    title: 'AI engineering',
    body: 'Agentic workflows, document retrieval, multi-agent systems and self-hosted models, in daily use.',
  },
  {
    icon: 'zap',
    title: 'Workflow automation',
    body: 'Connecting the systems a business already runs and removing the manual steps between them.',
  },
  { icon: 'cloud', title: 'Cloud infrastructure', body: 'AWS and modern cloud architectures.' },
  {
    icon: 'code',
    title: 'Web and business systems',
    body: 'React, Node.js and software that supports real business processes.',
  },
];

export const faqs: Faq[] = [
  {
    q: 'Do we need to buy new software?',
    a: "Usually not for a first pilot. Most workflows are built into the tools you already have: Microsoft 365, Google Workspace, your CRM, your practice system. If a tool is needed, we'll recommend it and you'll buy it directly; we don't resell anything.",
  },
  {
    q: "What if AI isn't right for us?",
    a: "Then the audit will say so, with reasons, and you'll have the written process map anyway. We'd rather tell you in two weeks than find out after a build.",
  },
  {
    q: 'Who owns what gets built?',
    a: 'You do. The code, prompts, accounts, configuration and documentation are yours from day one, and the runbook is written so you can run it without us.',
  },
  {
    q: 'Is our data used to train anything?',
    a: "No. We use business-grade AI accounts under your control, with training on your data switched off, and we'll document exactly which data goes where.",
  },
  {
    q: 'Is this different from the tech-support plans?',
    a: 'Yes. Tech support looks after the technology you already have. AI consulting finds and builds new ways of working. Tech-support clients get a discount on AI work, and a pilot can be looked after under a support plan afterwards.',
  },
  {
    q: 'Can we stop the retainer?',
    a: "Yes. Three-month minimum, then 30 days' notice. What's been built keeps working.",
  },
  {
    q: 'How much time will this take from our team?',
    a: 'Around four to six hours in total for the audit, spread across a few people. The pilot needs a named person to test and approve, typically an hour or two a week for a few weeks.',
  },
  {
    q: 'How do we get started?',
    a: "Book a free 30-minute AI Fit Call. We'll talk through how your business works and tell you honestly whether an audit is worth doing.",
  },
];

export const booking = {
  successLine: `We'll reply ${RESPONSE_PROMISE} to arrange your free 30-minute AI Fit Call.`,
};
