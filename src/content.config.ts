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
  }),
});

export const collections = { blog };
