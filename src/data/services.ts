import { Code2, Cloud, Zap, Cpu, Bot, LifeBuoy, Sparkles } from 'lucide-react';
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
  // Copy from the /tech-support landing page (src/data/tech-support-service.ts).
  {
    icon: LifeBuoy,
    title: 'Tech Support Plans',
    slug: 'tech-support',
    description:
      "Website, email, Microsoft 365, security, automation and technical support – managed by one experienced technology partner. Instead of managing a collection of suppliers, accounts and technical problems, you get one experienced partner who understands how everything fits together. Simple monthly plans from £125, with no surprise bills.",
    targetClient:
      "Small and growing businesses with around 5–50 people that need reliable technology support but aren't ready – or don't want – to employ a full-time IT team.",
    deliverables: [
      'Website hosting, updates and maintenance',
      'Domain, DNS and SSL management',
      'Microsoft 365 or Google Workspace administration',
      'New starters set up and leavers removed, properly',
      'Technical problems investigated and resolved',
      'Advice on where automation could save your team time',
    ],
    tags: ['Websites', 'Email', 'Microsoft 365', 'Google Workspace', 'Domains & DNS', 'Security'],
    color: 'neon-cyan',
    link: '/tech-support',
  },
  // Copy from the /ai-consulting landing page (src/data/ai-consulting.ts).
  {
    icon: Sparkles,
    title: 'AI Consulting',
    slug: 'ai-consulting',
    description:
      "AI that actually does the work, built into your business. We find the processes AI can take off your team, build the first one into the tools you already use, and leave you able to run it. Fixed prices from £1,950, decided one step at a time. You own everything.",
    targetClient:
      "Owner-led businesses of roughly 10–100 people in professional and financial services: insurance brokers, IFAs, accountants, solicitors, recruiters, property firms, and SaaS companies with a small dev team.",
    deliverables: [
      'Ranked list of AI opportunities with estimated hours saved',
      'Data protection and risk check',
      'One workflow built into the tools you already use',
      'Human approval step on anything that touches a customer',
      'Written runbook so you can run it without us',
      '30 days of measurement: hours saved, errors, adoption',
    ],
    tags: ['Workflow automation', 'AI agents', 'Financial services', 'Data protection', 'Cloud infrastructure'],
    color: 'brand-pink',
    link: '/ai-consulting',
  },
  {
    icon: Code2,
    title: 'Web Application Development',
    slug: 'web-application-development',
    description:
      "Custom web applications that solve real business problems. Whether you need a customer portal, an internal dashboard, a booking system, or a tool to replace the spreadsheet your team has outgrown - I build fast, reliable software that people actually enjoy using. Every project gets proper architecture and the attention to detail you'd expect from someone who's been doing this for 25 years.",
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
      "Scalable, secure cloud infrastructure that grows with your business. I design and build serverless architectures on AWS that are cost-effective at low traffic and scale seamlessly when you need them to. No over-engineering, no unnecessary complexity - just the right infrastructure for your stage and budget, with room to grow.",
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
      "Go from idea to working product fast. I use AI-accelerated development workflows to build functional MVPs that let you validate assumptions with real users in weeks, not months. It's not about cutting corners - it's about skipping the busy-work so I can focus on the decisions that count for your product.",
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
      "Embed practical AI capabilities into your existing software. Not chatbots for the sake of chatbots - targeted integrations that solve real problems: automating manual processes, generating content, extracting insights from data, or building intelligent search. I help you figure out where AI actually makes a difference, then build and ship it.",
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
      "Give every employee a personal AI assistant that knows their workflow, manages their inbox, prepares their meetings, and handles the admin they hate. Not a generic chatbot - a personalised AI colleague connected to their actual tools. Setup from £5,000, with ongoing management and team training packages available.",
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
