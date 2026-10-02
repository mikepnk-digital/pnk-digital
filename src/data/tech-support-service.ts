// Tech Support landing page, version B (/tech-support/service).
// Copy is lifted from design-assets/copy/pnk-digital-landing-page-copy.md.
// Honesty rule (see service.astro): no client logos, testimonials, reviews,
// certifications, years trading, customer numbers or statistics.

import type { Faq, Plan, Step } from './tech-support';
import type { IconName } from '@/components/landing/Icon.astro';

export const PHONE_DISPLAY = '01252 279059';
export const PHONE_HREF = 'tel:+441252279059';

export const PRIMARY_CTA = 'Book a free 30-minute technology review';

export type IconItem = { icon: IconName; title: string; body: string };

export const problems = [
  'Nobody officially looks after your IT.',
  'Your website is managed by one supplier and your email by another.',
  'Nobody is quite sure who controls your domains and DNS.',
  'New starters and leavers are a hassle.',
  "When something breaks, you're not sure who to call.",
  "You're paying for technology you don't fully understand or use.",
];

export const services: IconItem[] = [
  { icon: 'monitor', title: 'Website', body: 'Keep your website secure, up to date and working properly.' },
  {
    icon: 'mail',
    title: 'Email & Microsoft 365',
    body: 'Manage users, mailboxes, security, permissions and everyday problems.',
  },
  {
    icon: 'globe',
    title: 'Domains & DNS',
    body: "We'll manage the technical foundations behind your website and email.",
  },
  {
    icon: 'shield-check',
    title: 'Security',
    body: 'Protect your business with sensible security measures, monitoring and best-practice configuration.',
  },
  {
    icon: 'wrench',
    title: 'Technical support',
    body: "When something isn't working, you have someone who can investigate it and get it sorted.",
  },
  {
    icon: 'zap',
    title: 'Automation & AI',
    body: "We'll identify repetitive work and look for practical ways to automate it and save your team time.",
  },
];

export const disciplines = [
  'IT support',
  'Software engineering',
  'Web development',
  'Automation',
  'AI',
  'Cloud infrastructure',
  'Custom software',
];

export const principles = [
  { lead: 'If something can be fixed,', rest: "we'll fix it." },
  { lead: 'If something can be simplified,', rest: "we'll simplify it." },
  { lead: 'If something can be automated,', rest: "we'll automate it." },
];

export const quotes = [
  "I'll sort it out.",
  'I think our web developer looks after that.',
  "I'll have to ask someone.",
  'Who actually has the password for that?',
];

export const plans: Plan[] = [
  {
    id: 'website-care',
    name: 'Website Care',
    price: 125,
    tagline: 'For businesses that want their website properly looked after.',
    features: [
      'Website hosting, updates and maintenance',
      'Domain, DNS and SSL management',
      'Daily backups',
      '24/7 uptime monitoring',
      'Monthly website health report',
      'Small content changes each month',
    ],
    note: 'Website only. For email, Microsoft 365 and wider support, see Business.',
  },
  {
    id: 'business',
    name: 'Business',
    price: 375,
    positioning: 'Your outsourced technology department.',
    tagline: 'We take responsibility for the technology your business runs on, so you have one person to call.',
    includes: 'Everything in Website Care, plus:',
    features: [
      'Microsoft 365 or Google Workspace administration',
      'New starters set up and leavers removed, properly',
      'Business email kept secure and out of spam',
      'Multi-factor authentication and password management rolled out',
      'Technical problems investigated and resolved',
      'Advice on where automation could save your team time',
      'Regular technology reviews',
      'Priority support',
    ],
    detail: 'Includes up to 4 hours of hands-on work each month. Anything larger is quoted before we start.',
    note: 'Most suitable for growing businesses without an internal IT team.',
  },
  {
    id: 'partner',
    name: 'Partner',
    price: 950,
    from: true,
    tagline: 'A hands-on technology partner for businesses that need things built, not just supported.',
    includes: 'Everything in Business, plus:',
    features: [
      'Around 10 hours of hands-on work each month, with priority response',
      'Ongoing development and custom software',
      'Business process automation and practical AI',
      'Cloud infrastructure management',
      'A 12-month technology roadmap, reviewed quarterly',
      'Supplier and software management',
    ],
    note: "£950 is the starting point. We'll scale the package around the work your business needs.",
  },
];

export const steps: Step[] = [
  {
    title: "Let's talk",
    when: 'Free, 30 minutes',
    body: "Book a free 30-minute technology review. We'll talk about your business, what's currently working and what's causing problems.",
  },
  {
    title: 'We take over',
    body: "We'll identify what needs attention and, if you decide to work with us, help bring your website, email, domains and other technology under control.",
  },
  {
    title: 'We look after it',
    body: "From then on, you've got someone you can call when something goes wrong – and someone looking for ways to make your technology work better.",
  },
];

export const reviewAreas = [
  'Your website',
  'Business email',
  'Microsoft 365 or Google Workspace',
  'Domains and DNS',
  'Security',
  'Backups',
  'User access',
  'Areas where technology could save your team time',
];

export const experience: IconItem[] = [
  { icon: 'cloud', title: 'Cloud infrastructure', body: 'AWS and modern cloud architectures.' },
  { icon: 'code', title: 'Web development', body: 'React, Node.js and modern web applications.' },
  { icon: 'layers', title: 'Business systems', body: 'Building software that supports real-world business processes.' },
  { icon: 'zap', title: 'Automation & AI', body: 'Finding practical ways to reduce repetitive work.' },
  { icon: 'globe', title: 'Websites & email', body: 'Domains, hosting, websites and business email.' },
];

export const securityItems = [
  'Multi-factor authentication',
  'Email security',
  'User access and permissions',
  'Domain and DNS security',
  'Software and website updates',
  'Backup considerations',
  'Security best-practice reviews',
];

export const automationItems = [
  'Automate repetitive administration',
  'Connect the software you already use',
  'Reduce manual data entry',
  'Generate documents and reports automatically',
  'Extract information from emails and PDFs',
  'Use AI where it genuinely saves time',
];

export const faqs: Faq[] = [
  {
    q: 'Do I need to have Microsoft 365?',
    a: "No. We can work with Microsoft 365, Google Workspace and other business systems. We'll help you make the most of what you're already using.",
  },
  {
    q: 'Do you provide support remotely?',
    a: "Yes. Most technical issues can be investigated and resolved remotely, which means you don't have to wait for someone to visit your office.",
  },
  {
    q: 'Do you replace our existing IT company?',
    a: 'Possibly – but not necessarily. We can work alongside an existing IT provider, website developer or other supplier. Our role is to give you a single technical point of contact and help make sure everything works together.',
  },
  {
    q: 'What size businesses do you work with?',
    a: "PNK Digital is primarily aimed at small and growing businesses that don't have their own dedicated IT department. Typically, that's businesses with around 5–50 employees.",
  },
  {
    q: 'Can you build things as well as support them?',
    a: "Yes. That's one of the things that makes PNK Digital different. If your business needs a website, integration, automation, AI solution or custom application, we can build it rather than simply recommending another supplier.",
  },
  {
    q: 'Is there a long-term contract?',
    a: "No. Plans are billed monthly in advance with a three-month minimum, then 30 days' notice to cancel. You can move between plans from your next billing date.",
  },
  {
    q: 'What if we use more than our included hours?',
    a: "We'll let you know as you get close to your allowance. Anything beyond it is either held until next month, charged at £80 an hour, or quoted as a fixed-price project. You decide, and nothing is billed without your agreement.",
  },
  {
    q: 'Do unused hours roll over?',
    a: "No. The allowance is there to cover the ongoing work of looking after your technology, so it resets each month. If you regularly need more, we'll suggest moving up a plan.",
  },
  {
    q: "What happens if you can't fix something?",
    a: "We'll investigate the problem, explain what we've found and agree the next step with you. If another specialist is needed, we'll help coordinate that rather than leaving you to figure it out yourself.",
  },
  {
    q: 'How do I get started?',
    a: "Book a free 30-minute technology review. We'll have a conversation about your business and work out whether PNK Digital is a good fit.",
  },
];

export const booking = {
  successLine: "We'll reply within one business day to arrange your free 30-minute technology review.",
};

export type ClientTestimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Small label under the attribution, e.g. "Domain and email". */
  services?: string;
  /** Short excerpt for a pull-quote. */
  pullQuote?: string;
};

// Client testimonials: read by the "What our clients say" cards and the
// pull-quote beside the booking form, so placeholders are replaced once here.
// Plain HTML only: no Review/AggregateRating structured data (self-serving
// reviews can trigger a Google manual action).
export const testimonials: ClientTestimonial[] = [
  {
    quote:
      "PNK Digital built our website and has looked after it, our domain and our email ever since. When something needs changing or isn't working, I send one message and it gets sorted. We don't have anyone technical in the business, so having one person who understands all of it and takes responsibility has made a real difference.",
    name: 'Richard Moger',
    role: 'Owner',
    company: 'Top Gardeners',
    services: 'Website, domain and email',
    pullQuote: 'I send one message and it gets sorted.',
  },
  {
    quote:
      "PNK Digital manages our domain and email. Before, we weren't sure who was responsible for what, and small issues took far too long to resolve. Now everything just works, and if we need anything, they deal with it quickly and explain it in plain English.",
    name: 'David Baker',
    role: 'Director',
    company: 'Baik Consulting',
    services: 'Domain and email',
  },
];
