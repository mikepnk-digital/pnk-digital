import { Code2, Cloud, Zap, Cpu, Bot } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  targetClient: string;
  deliverables: string[];
  tags: string[];
  color: string;
  link?: string;
}

export const services: Service[] = [
  {
    icon: Code2,
    title: 'Web Application Development',
    slug: 'web-application-development',
    description:
      "Custom web applications that solve real business problems. Whether you need a customer portal, an internal dashboard, a booking system, or a tool to replace the spreadsheet your team has outgrown — I build fast, reliable software that people actually enjoy using. Every project gets proper architecture and the kind of attention to detail that only comes from senior-level expertise.",
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
    color: 'neon-cyan',
  },
  {
    icon: Cloud,
    title: 'AWS Integration & Infrastructure',
    slug: 'aws-infrastructure',
    description:
      "Scalable, secure cloud infrastructure that grows with your business. I design and build serverless architectures on AWS that are cost-effective at low traffic and scale seamlessly when you need them to. No over-engineering, no unnecessary complexity — just the right infrastructure for your stage and budget, with room to grow.",
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
    color: 'neon-purple',
  },
  {
    icon: Zap,
    title: 'AI-Powered MVPs & Rapid Prototyping',
    slug: 'ai-mvps',
    description:
      "Go from idea to working product fast. I use AI-accelerated development workflows to build functional MVPs that let you validate assumptions with real users in weeks, not months. This isn't about cutting corners — it's about eliminating the busy-work so I can focus on the decisions that actually matter for your product.",
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
    color: 'brand-pink',
  },
  {
    icon: Cpu,
    title: 'AI Integration for Existing Products',
    slug: 'ai-integration',
    description:
      "Embed practical AI capabilities into your existing software. Not chatbots for the sake of chatbots — targeted integrations that solve real problems: automating manual processes, generating content, extracting insights from data, or building intelligent search. I help you identify where AI delivers genuine value, then build and ship it.",
    targetClient:
      "Businesses with existing software products looking to add AI capabilities, or teams drowning in manual processes that could be automated.",
    deliverables: [
      'AI capability assessment and recommendation',
      'LLM integration (OpenAI, Claude, open-source models)',
      'RAG (Retrieval-Augmented Generation) systems',
      'Automated content generation pipelines',
      'Intelligent search and document processing',
      'Custom AI-powered workflow automation',
    ],
    tags: ['OpenAI API', 'Claude API', 'LangChain', 'RAG', 'Embeddings', 'Node.js'],
    color: 'neon-green',
  },
  {
    icon: Bot,
    title: 'AI Employees for Your Team',
    slug: 'ai-employees',
    description:
      "Give every employee a personal AI assistant that knows their workflow, manages their inbox, prepares their meetings, and handles the admin they hate. Not a generic chatbot — a personalised AI colleague connected to their actual tools. Setup from £5,000, with ongoing management and team training packages available.",
    targetClient:
      "Businesses with 5–200+ employees who want to reclaim the 40% of the working day lost to admin, email, and repetitive tasks.",
    deliverables: [
      'Discovery workshop to map team workflows',
      'Per-employee AI assistant deployment',
      'Integration with email, calendar, Slack/Teams, CRM, and more',
      'Custom skill development for your specific processes',
      'Team training workshops',
      'Ongoing management and monthly strategy calls',
    ],
    tags: ['OpenClaw', 'AI Assistants', 'WhatsApp', 'Slack', 'Teams', 'Automation'],
    color: 'brand-pink',
    link: '/services/ai-employees',
  },
];
