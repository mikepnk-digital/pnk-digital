// Case study types and labels, safe to import from React islands. The loader
// (astro:content, server-only) is in case-studies-collection.ts.

export type Service = 'support' | 'ai' | 'build';

/** Plain, serialisable shape passed to React islands and landing components. */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  service: Service;
  summary: string;
  problem: string;
  whatWeDid: string;
  result: string;
  metric: string;
  quote?: { text: string; name: string; role?: string };
  /** ISO date. */
  date: string;
  draft: boolean;
  /** Optional longer write-up (markdown body). */
  body: string;
}

export const SERVICE_LABELS: Record<Service, string> = {
  support: 'Tech support',
  ai: 'AI consulting',
  build: 'Build',
};
