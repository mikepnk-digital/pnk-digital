import {
  Monitor,
  Smartphone,
  Settings,
  Lightbulb,
  Plug,
  Shield,
  Layers,
  Link,
  Zap,
  Clock,
  Calendar,
} from 'lucide-react';

export const projectTypes = [
  {
    id: 'website',
    icon: Monitor,
    title: 'Website Development',
    shortDesc: 'Marketing sites & web platforms',
  },
  {
    id: 'application',
    icon: Smartphone,
    title: 'Application Development',
    shortDesc: 'Mobile & web applications',
  },
  {
    id: 'software',
    icon: Settings,
    title: 'Software Tools',
    shortDesc: 'Dashboards & automation',
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'AI Consulting',
    shortDesc: 'Strategy & roadmap planning',
  },
  {
    id: 'integration',
    icon: Plug,
    title: 'AI Integration',
    shortDesc: 'Embed AI into your workflows',
  },
  {
    id: 'support',
    icon: Shield,
    title: 'Ongoing Support',
    shortDesc: 'Maintenance & updates',
  },
];

export const featureCategories = [
  {
    id: 'core',
    category: 'Core Features',
    icon: Layers,
    features: [
      { id: 'responsive', label: 'Responsive Design' },
      { id: 'cms', label: 'Content Management System' },
      { id: 'ecommerce', label: 'E-commerce Functionality' },
      { id: 'auth', label: 'User Authentication' },
      { id: 'dashboard', label: 'Admin Dashboard' },
      { id: 'core-other', label: 'Other' },
    ],
  },
  {
    id: 'integrations',
    category: 'Integrations',
    icon: Link,
    features: [
      { id: 'api', label: 'REST / GraphQL APIs' },
      { id: 'payment', label: 'Payment Processing' },
      { id: 'crm', label: 'CRM Integration' },
      { id: 'analytics', label: 'Analytics & Tracking' },
      { id: 'ai-features', label: 'AI-Powered Features' },
      { id: 'integrations-other', label: 'Other' },
    ],
  },
  {
    id: 'scale',
    category: 'Scale & Support',
    icon: Shield,
    features: [
      { id: 'hosting', label: 'Managed Hosting' },
      { id: 'performance', label: 'Performance Optimization' },
      { id: 'seo', label: 'SEO Optimization' },
      { id: 'maintenance', label: 'Ongoing Maintenance' },
      { id: 'scale-other', label: 'Other' },
    ],
  },
];

export const timelineOptions = [
  {
    id: 'urgent',
    label: 'Urgent',
    duration: '2-4 weeks',
    icon: Zap,
    description: 'Fast-track delivery',
    accentColor: 'magenta',
  },
  {
    id: 'standard',
    label: 'Standard',
    duration: '1-2 months',
    icon: Clock,
    description: 'Recommended pace',
    accentColor: 'cyan',
  },
  {
    id: 'flexible',
    label: 'Flexible',
    duration: '3+ months',
    icon: Calendar,
    description: 'Extended timeline',
    accentColor: 'purple',
  },
];

export const budgetRanges = [
  { id: '3k-25k', label: '£3k - £25k', tier: 'Starter' },
  { id: '25k-50k', label: '£25k - £50k', tier: 'Growth' },
  { id: '50k-100k', label: '£50k - £100k', tier: 'Scale' },
  { id: '100k-250k', label: '£100k - £250k', tier: 'Enterprise' },
  { id: '250k+', label: '£250k+', tier: 'Custom' },
];

// Complexity calculation based on selections
export function calculateComplexity(selections) {
  let score = 0;

  // Project type weights
  const typeWeights = {
    'website': 2,
    'application': 3,
    'software': 3,
    'consulting': 1,
    'integration': 2,
    'support': 1,
  };
  score += typeWeights[selections.projectType] || 0;

  // Features add complexity
  score += selections.features.length * 0.5;

  // Timeline affects urgency
  if (selections.timeline === 'urgent') score += 2;
  if (selections.timeline === 'standard') score += 1;

  // Budget indicates scope
  const budgetWeights = {
    '10k-25k': 1,
    '25k-50k': 2,
    '50k-100k': 3,
    '100k-250k': 4,
    '250k+': 5,
  };
  score += budgetWeights[selections.budget] || 0;

  // Normalize to 0-100
  return Math.min(100, Math.round((score / 15) * 100));
}

// Get complexity label based on score
export function getComplexityLabel(score) {
  if (score < 25) return 'Light';
  if (score < 50) return 'Moderate';
  if (score < 75) return 'Substantial';
  return 'Enterprise';
}
