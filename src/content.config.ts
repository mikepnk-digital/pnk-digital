import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts stay in ./content/blog (no file move needed); the glob loader
// derives each entry `id` from the filename (== the existing slug/URL).
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Mike Pink'),
    slug: z.string(),
    published: z.boolean().default(false),
    /** Staged: built nowhere until set back to false (or removed). */
    draft: z.boolean().default(false),
  }),
});

// Case studies for /work. One real result per service; the id (filename) is
// the URL slug. `draft: true` entries never reach the build (see
// src/lib/case-studies.ts); in dev they render with a "Draft" badge.
const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/case-studies' }),
  schema: z.object({
    title: z.string(),
    /** Client name, or an anonymised sector, e.g. "Insurance broker, 20 staff". */
    client: z.string(),
    service: z.enum(['support', 'ai', 'build']),
    /** One line for cards and the OG image. */
    summary: z.string(),
    problem: z.string(),
    whatWeDid: z.string(),
    /** The result, with its number. */
    result: z.string(),
    /** The headline number on its own, e.g. "6 hours a week". */
    metric: z.string(),
    quote: z
      .object({
        text: z.string(),
        name: z.string(),
        role: z.string().optional(),
      })
      .optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
