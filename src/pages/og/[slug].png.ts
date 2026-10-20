// Per-page OG images, generated at build time: /og/<slug>.png. Pages point at
// them through the ogImage / twitterImage props on their layout.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgImage, type OgCard } from '@/lib/og-image';
import { getCaseStudies } from '@/lib/case-studies-collection';
import { SERVICE_LABELS } from '@/lib/case-studies';
import { LOCATION } from '@/config/site';
import { hero as aiHero, plans as aiPlans } from '@/data/ai-consulting';
import { plans as supportPlans } from '@/data/tech-support-service';

const fromPrice = (plans: { price: number }[]) => `£${Math.min(...plans.map((p) => p.price)).toLocaleString('en-GB')}`;

export const getStaticPaths = (async () => {
  const cards: Record<string, OgCard> = {
    home: {
      title: 'One experienced partner for the technology your business runs on.',
      line: 'Support, AI and software for small and growing businesses.',
    },
    'tech-support': {
      eyebrow: 'Tech support plans',
      title: 'Your business technology, taken care of.',
      line: `From ${fromPrice(supportPlans)}/month · based in ${LOCATION}`,
    },
    'ai-consulting': {
      eyebrow: 'AI consulting',
      title: aiHero.title,
      line: `Fixed prices from ${fromPrice(aiPlans)} · you own everything`,
    },
    work: {
      eyebrow: 'Work',
      title: 'Case studies',
      line: "What wasn't working, what we did, and what changed.",
    },
  };
  for (const study of await getCaseStudies()) {
    cards[`work-${study.slug}`] = {
      eyebrow: `${SERVICE_LABELS[study.service]} case study`,
      title: study.title,
      line: `${study.metric} · ${study.client}`,
    };
  }
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
