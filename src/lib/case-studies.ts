// Case study types and labels, safe to import from client scripts. The loader
// (astro:content, server-only) is in case-studies-collection.ts.

export type Service = 'support' | 'ai' | 'build';

/** Plain, serialisable shape passed to the card and page components. */
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
