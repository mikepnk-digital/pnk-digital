export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  slug: string;
  published: boolean;
  content: string;
  readingTime: string;
}

/**
 * Lightweight frontmatter parser (browser-safe, no Node.js dependencies).
 * Handles simple YAML: strings, booleans, and JSON-style arrays.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: string | boolean | string[] = line.slice(colonIndex + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Parse booleans
    else if (value === 'true') {
      data[key] = true;
      continue;
    } else if (value === 'false') {
      data[key] = false;
      continue;
    }
    // Parse JSON-style arrays: ["a", "b", "c"]
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        data[key] = JSON.parse(value);
        continue;
      } catch {
        // Fall through to string
      }
    }

    data[key] = value;
  }

  return { data, content };
}

// Import all markdown files at build time
const markdownFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parsePost(raw: string): BlogPost | null {
  const { data, content } = parseFrontmatter(raw);

  if (!data.published) return null;

  return {
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    category: data.category as string,
    tags: (data.tags as string[]) || [],
    author: (data.author as string) || 'Mike Pink',
    slug: data.slug as string,
    published: data.published as boolean,
    content,
    readingTime: calculateReadingTime(content),
  };
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const raw of Object.values(markdownFiles)) {
    const post = parsePost(raw);
    if (post) posts.push(post);
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(currentPost: BlogPost, count: number = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== currentPost.slug);

  // Score by shared category and tags
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 3;
    for (const tag of post.tags) {
      if (currentPost.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.post);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const categories = [
  'AI & Development',
  'Technical Insights',
  'Business & Strategy',
  'Project Spotlights',
] as const;
