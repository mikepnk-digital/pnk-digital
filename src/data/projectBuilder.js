import {
  Brain,
  Layers,
  Plug,
  Lightbulb,
  Database,
  Shield,
  Cpu,
  Link,
  Zap,
  Clock,
  Calendar,
} from 'lucide-react';

export const projectTypes = [
  {
    id: 'custom-ai',
    icon: Brain,
    title: 'Custom AI Development',
    shortDesc: 'Bespoke intelligent systems',
  },
  {
    id: 'ml-systems',
    icon: Layers,
    title: 'Machine Learning Systems',
    shortDesc: 'Predictive models & analytics',
  },
  {
    id: 'integration',
    icon: Plug,
    title: 'AI Integration',
    shortDesc: 'Embed AI into existing systems',
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'AI Consulting',
    shortDesc: 'Strategy & roadmap planning',
  },
  {
    id: 'data-engineering',
    icon: Database,
    title: 'Data Engineering',
    shortDesc: 'Pipelines & infrastructure',
  },
  {
    id: 'support',
    icon: Shield,
    title: 'Maintenance & Support',
    shortDesc: 'Ongoing optimization',
  },
];

export const featureCategories = [
  {
    id: 'core',
    category: 'Core Capabilities',
    icon: Cpu,
    features: [
      { id: 'nlp', label: 'Natural Language Processing' },
      { id: 'computer-vision', label: 'Computer Vision' },
      { id: 'predictive', label: 'Predictive Analytics' },
      { id: 'generative', label: 'Generative AI / LLMs' },
      { id: 'recommendation', label: 'Recommendation Engine' },
    ],
  },
  {
    id: 'integrations',
    category: 'Integrations',
    icon: Link,
    features: [
      { id: 'api', label: 'REST / GraphQL APIs' },
      { id: 'crm', label: 'CRM Integration' },
      { id: 'database', label: 'Database Connectors' },
      { id: 'cloud', label: 'Cloud Services (AWS/GCP/Azure)' },
      { id: 'realtime', label: 'Real-time Streaming' },
    ],
  },
  {
    id: 'scale',
    category: 'Scale & Security',
    icon: Shield,
    features: [
      { id: 'enterprise', label: 'Enterprise Scale' },
      { id: 'compliance', label: 'Compliance (HIPAA/SOC2)' },
      { id: 'mlops', label: 'ML Ops & Monitoring' },
      { id: 'edge', label: 'Edge Deployment' },
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
  { id: '10k-25k', label: '$10k - $25k', tier: 'Starter' },
  { id: '25k-50k', label: '$25k - $50k', tier: 'Growth' },
  { id: '50k-100k', label: '$50k - $100k', tier: 'Scale' },
  { id: '100k-250k', label: '$100k - $250k', tier: 'Enterprise' },
  { id: '250k+', label: '$250k+', tier: 'Custom' },
];

// Complexity calculation based on selections
export function calculateComplexity(selections) {
  let score = 0;

  // Project type weights
  const typeWeights = {
    'custom-ai': 3,
    'ml-systems': 3,
    'integration': 2,
    'consulting': 1,
    'data-engineering': 2,
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
