export interface CaseStudy {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  placeholder: boolean;
  // Full case study fields (populated for real projects)
  problem?: string;
  approach?: string;
  technicalDecisions?: string[];
  outcome?: string;
  timeline?: string;
  liveUrl?: string;
  screenshots?: string[];
}

export const portfolio: CaseStudy[] = [
  {
    title: 'PNK Digital Website',
    slug: 'pnk-digital-website',
    description: 'This very site — a React SPA with serverless AWS backend, built with AI-accelerated development workflows as a proof of concept for the PNK Digital approach.',
    category: 'React Application',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'AWS CDK', 'Lambda', 'DynamoDB'],
    placeholder: false,
    problem: 'I needed a professional website for PNK Digital that demonstrated the speed and quality of AI-accelerated development. It also needed a working contact form backed by real infrastructure — not just a static page.',
    approach: 'Built the entire site as a Vite + React SPA with Framer Motion animations and Tailwind CSS. The backend uses AWS CDK to deploy a serverless stack: API Gateway, Lambda functions, DynamoDB for enquiry storage, and SES for email notifications. The site is served via CloudFront with proper security headers.',
    technicalDecisions: [
      'Vite + React SPA over Next.js — no SSR needed, simpler deployment to S3/CloudFront',
      'AWS CDK for infrastructure as code — repeatable, version-controlled deployments',
      'DynamoDB over RDS — cost-effective for low-volume enquiry storage with TTL',
      'Framer Motion for animations — polished feel without heavy dependencies',
      'Tailwind CSS v4 — utility-first styling with custom design tokens',
    ],
    outcome: 'Full site designed, built, and deployed in under a week. Working contact form with email notifications. Lighthouse scores of 90+ across all categories.',
    timeline: '~1 week',
    liveUrl: 'https://pnk-digital.com',
  },
  {
    title: 'SaaS Analytics Dashboard',
    slug: 'saas-analytics-dashboard',
    description: 'A real-time analytics dashboard for a B2B SaaS platform, featuring interactive charts, data filtering, and role-based access control.',
    category: 'React Application',
    tags: ['React', 'TypeScript', 'AWS', 'D3.js', 'Cognito'],
    placeholder: true,
  },
  {
    title: 'AI Content Generation Platform',
    slug: 'ai-content-platform',
    description: 'An AI-powered content creation tool that helps marketing teams generate, edit, and publish content across multiple channels.',
    category: 'AI-Powered MVP',
    tags: ['React', 'OpenAI API', 'Node.js', 'PostgreSQL'],
    placeholder: true,
  },
  {
    title: 'E-Commerce Order Pipeline',
    slug: 'ecommerce-order-pipeline',
    description: 'A serverless order processing system integrating Stripe payments, inventory management, and automated fulfilment notifications.',
    category: 'AWS Infrastructure',
    tags: ['AWS Lambda', 'Step Functions', 'DynamoDB', 'Stripe', 'SES'],
    placeholder: true,
  },
];

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return portfolio.find((p) => p.slug === slug);
}
