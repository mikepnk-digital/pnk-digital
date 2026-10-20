import { getCollection, type CollectionEntry } from 'astro:content';
import type { CaseStudy, Service } from './case-studies';

/**
 * Case studies, newest first. Drafts are left out of the build; in dev they
 * are included (and badged) so the layouts can be checked before content lands.
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  type Entry = CollectionEntry<'case-studies'>;
  const entries: Entry[] = await getCollection('case-studies', ({ data }: Entry) => import.meta.env.DEV || !data.draft);
  return entries
    .sort((a: Entry, b: Entry) => b.data.date.getTime() - a.data.date.getTime())
    .map(({ id, data, body }: Entry) => ({ ...data, slug: id, date: data.date.toISOString(), body: body?.trim() ?? '' }));
}

/** The newest case study for one service (one per landing page). */
export async function getCaseStudyFor(service: Service): Promise<CaseStudy | undefined> {
  return (await getCaseStudies()).find((c) => c.service === service);
}
