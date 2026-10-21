import type { IconName } from '../components/landing/icons';
import { YEARS_EXPERIENCE } from '../config/site';

export interface Service {
  icon: IconName;
  title: string;
  slug: string;
  description: string;
  targetClient: string;
  deliverables: string[];
  tags: string[];
  link?: string;
  /** Which /services group it sits in: #run (recurring) or #build (projects). */
  group: 'run' | 'build';
}

export const services: Service[] = [
  // Copy from the /tech-support landing page (src/data/tech-support-service.ts).
  {
    icon: 'wrench',
    title: 'Tech Support Plans',
    slug: 'tech-support',
    description:
      "Website, email, Microsoft 365, security, automation and technical support – managed by one experienced technology partner. Instead of managing a collection of suppliers, accounts and technical problems, you get one experienced partner who understands how everything fits together. Simple monthly plans from £125, with no surprise bills.",
    targetClient:
      "Small and growing businesses with around 5–50 people that need reliable technology support but aren't ready – or don't want – to employ a full-time IT team.",
    deliverables: [
      'Website hosting, updates and maintenance',
      'Microsoft 365 or Google Workspace administration',
      'Technical problems investigated and resolved',
    ],
    tags: ['Websites', 'Email', 'Microsoft 365', 'Google Workspace', 'Domains & DNS', 'Security'],
    link: '/tech-support',
    group: 'run',
  },
  // Copy from the /ai-consulting landing page (src/data/ai-consulting.ts).
  {
    icon: 'sparkles',
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description:
      "AI that actually does the work, built into your business. We find the processes AI can take off your team, build the first one into the tools you already use, and leave you able to run it. Fixed prices from £1,950, decided one step at a time. You own everything. If it needs building, we build it: LLM integration (OpenAI, Claude, open-source models), RAG (Retrieval-Augmented Generation) systems, and intelligent search and document processing.",
    targetClient:
      "Owner-led businesses of roughly 10–100 people in professional and financial services: insurance brokers, IFAs, accountants, solicitors, recruiters, property firms, and SaaS companies with a small dev team.",
    deliverables: [
      'Ranked list of AI opportunities with estimated hours saved',
      'One workflow built into the tools you already use',
      'Written runbook so you can run it without us',
    ],
    tags: ['Workflow automation', 'AI agents', 'Financial services', 'Data protection', 'Cloud infrastructure'],
    link: '/ai-consulting',
    group: 'run',
  },
  {
    icon: 'code',
    title: 'Web Application Development',
    slug: 'web-application-development',
    description:
      `Custom web applications that solve real business problems. Whether you need a customer portal, an internal dashboard, a booking system, or a tool to replace the spreadsheet your team has outgrown - we build fast, reliable software that people actually enjoy using. Every project gets proper architecture and the attention to detail you'd expect from someone who's been doing this for ${YEARS_EXPERIENCE} years.`,
    targetClient:
      "Startups launching a new product, growing businesses replacing manual processes with real software, or established companies modernising outdated systems.",
    deliverables: [
      'Production-ready web applications',
      'Responsive design that works on any device',
      'User login and access control',
      'Integration with your existing tools and APIs',
      'Performance optimisation for fast load times',
      'Documentation and handover',
    ],
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'],
    group: 'build',
  },
  {
    icon: 'cloud',
    title: 'AWS Integration & Infrastructure',
    slug: 'aws-infrastructure',
    description:
      "Scalable, secure cloud infrastructure that grows with your business. We design and build serverless architectures on AWS that are cost-effective at low traffic and scale seamlessly when you need them to. No over-engineering, no unnecessary complexity - just the right infrastructure for your stage and budget, with room to grow.",
    targetClient:
      "Teams that need reliable cloud infrastructure without hiring a full-time DevOps engineer, or businesses moving from shared hosting to a proper cloud setup.",
    deliverables: [
      'Serverless API design and implementation (Lambda, API Gateway)',
      'Database architecture (DynamoDB, RDS, Aurora)',
      'Authentication with Cognito or custom solutions',
      'CI/CD pipelines and automated deployments',
      'Infrastructure as Code with AWS CDK',
      'Cost monitoring and optimisation',
    ],
    tags: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFront', 'CDK', 'Cognito'],
    group: 'build',
  },
  {
    icon: 'zap',
    title: 'AI-Powered MVPs & Rapid Prototyping',
    slug: 'ai-mvps',
    description:
      "Go from idea to working product fast. We use AI-accelerated development workflows to build functional MVPs that let you validate assumptions with real users in weeks, not months. It's not about cutting corners - it's about skipping the busy-work so we can focus on the decisions that count for your product.",
    targetClient:
      "Founders validating a new idea, product teams testing a feature concept, or businesses exploring a new market before committing significant budget.",
    deliverables: [
      'Functional MVP with core features',
      'User-facing front-end with polished UI',
      'Backend API and data storage',
      'User authentication and basic admin tools',
      'Deployment to production environment',
      'Roadmap for iteration based on user feedback',
    ],
    tags: ['React', 'AWS', 'Rapid Prototyping', 'MVP', 'Full-Stack', 'AI Tooling'],
    group: 'build',
  },
];
