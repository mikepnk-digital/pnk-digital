import { Bot, Wrench, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AIServiceTier {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  price: string;
  priceDetail: string;
  color: string;
  description: string;
  tiers: {
    name: string;
    price: string;
    features: string[];
  }[];
  cta: string;
}

export const aiEmployeeServices: AIServiceTier[] = [
  {
    icon: Bot,
    title: 'Setup & Deployment',
    subtitle: 'One-time deployment of personalised AI assistants',
    price: 'From £5,000',
    priceDetail: 'one-time',
    color: 'neon-cyan',
    description:
      'Discovery workshop, gateway deployment, per-employee agent configuration, tool integrations, custom skills, and 2-week onboarding support.',
    tiers: [
      {
        name: 'Starter',
        price: '£5,000',
        features: ['Up to 5 employees', 'Standard integrations', '3 custom skills', '2-week onboarding'],
      },
      {
        name: 'Growth',
        price: '£10,000',
        features: ['Up to 20 employees', 'Custom integrations', '10 custom skills', 'Admin dashboard'],
      },
      {
        name: 'Enterprise',
        price: '£15,000+',
        features: ['Unlimited employees', 'Bespoke skills', 'SSO & audit logging', 'SLA included'],
      },
    ],
    cta: 'Get a Quote',
  },
  {
    icon: Wrench,
    title: 'Ongoing Management',
    subtitle: 'Monthly support and evolution of your AI workforce',
    price: 'From £500/month',
    priceDetail: 'per month',
    color: 'neon-purple',
    description:
      'Monitoring, skill updates, onboarding/offboarding, usage analytics, ROI reporting, and priority support.',
    tiers: [
      {
        name: 'Essential',
        price: '£500/mo',
        features: ['Monitoring & uptime', 'Monthly updates', 'Email support', 'Usage analytics'],
      },
      {
        name: 'Professional',
        price: '£1,000/mo',
        features: ['Monthly strategy call', '2 new skills/month', 'Priority support', 'ROI reporting'],
      },
      {
        name: 'Premium',
        price: '£2,000/mo',
        features: ['Dedicated Slack channel', 'Unlimited skills', 'Quarterly business review', '4-hour response SLA'],
      },
    ],
    cta: 'Learn More',
  },
  {
    icon: GraduationCap,
    title: 'Team Training',
    subtitle: 'Get your team using AI assistants effectively',
    price: 'From £1,000',
    priceDetail: 'per workshop',
    color: 'brand-pink',
    description:
      'Hands-on workshops covering daily workflows, prompt techniques, automation design, and AI strategy for leadership.',
    tiers: [
      {
        name: 'Foundations',
        price: '£1,000',
        features: ['Half-day workshop', 'Up to 15 people', 'Hands-on setup', 'Daily workflow training'],
      },
      {
        name: 'Power Users',
        price: '£1,500',
        features: ['Full-day workshop', 'Up to 15 people', 'Custom workflows', 'Advanced prompting'],
      },
      {
        name: 'Leadership',
        price: '£2,000',
        features: ['Half-day for management', 'ROI measurement', 'AI strategy', 'Change management'],
      },
    ],
    cta: 'Book a Workshop',
  },
];

export const useCases = [
  {
    emoji: '📧',
    title: 'Email Triage',
    description: 'Classify, prioritise, draft replies, mark junk as read',
  },
  {
    emoji: '📅',
    title: 'Meeting Prep',
    description: 'Pull relevant docs, summarise previous notes, draft agendas',
  },
  {
    emoji: '💻',
    title: 'Developer Productivity',
    description: 'PR reviews, CI monitoring, bug investigation, documentation',
  },
  {
    emoji: '📊',
    title: 'Sales Pipeline',
    description: 'CRM updates via chat, lead research, follow-up reminders',
  },
  {
    emoji: '💰',
    title: 'Finance Automation',
    description: 'Expense categorisation, invoice matching, cash flow alerts',
  },
  {
    emoji: '🏢',
    title: 'HR & Onboarding',
    description: 'New starter setup, policy Q&A, training reminders',
  },
];

export const roiData = [
  { teamSize: '10 people', timeSaved: '40 hours', annualValue: '£40,000' },
  { teamSize: '25 people', timeSaved: '100 hours', annualValue: '£100,000' },
  { teamSize: '50 people', timeSaved: '200 hours', annualValue: '£200,000' },
];

export const faqs = [
  {
    question: 'What tools does it integrate with?',
    answer:
      'Gmail, Outlook, Google Calendar, Slack, Teams, WhatsApp, GitHub, Jira, CRM systems, and more via custom skills.',
  },
  {
    question: 'Is our data secure?',
    answer:
      'Yes - the AI runs on your infrastructure. No data leaves your network. Enterprise-grade security with audit logging and role-based access controls.',
  },
  {
    question: 'How long does setup take?',
    answer: 'Typically 2–4 weeks from discovery to deployment.',
  },
  {
    question: 'Do employees need technical skills?',
    answer:
      'No - they interact via chat (WhatsApp, Slack, Teams) in natural language. It feels like messaging a colleague.',
  },
  {
    question: 'Can we try it with a small team first?',
    answer:
      'Absolutely - our Starter package is designed for exactly this. Start with 5 employees and scale from there.',
  },
  {
    question: 'What happens if we cancel?',
    answer:
      "You own the deployment. We'll hand over full documentation and you can self-manage or find another provider. No vendor lock-in.",
  },
];
