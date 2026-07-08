import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.published);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.id === slug);
}

/** Related posts scored by shared category (+3) and tags (+1 each). */
export async function getRelatedPosts(current: Post, count = 3): Promise<Post[]> {
  const others = (await getPublishedPosts()).filter((p) => p.id !== current.id);
  const scored = others.map((post) => {
    let score = post.data.category === current.data.category ? 3 : 0;
    for (const tag of post.data.tags) {
      if (current.data.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.post);
}

export function calculateReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const categories = [
  'AI & Development',
  'Technical Insights',
  'Business & Strategy',
  'Project Spotlights',
] as const;
