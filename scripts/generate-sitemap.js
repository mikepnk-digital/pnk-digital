import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = 'https://pnk-digital.com';

// Static routes with priorities
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/work', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
];

// Get blog post slugs from content directory
function getBlogSlugs() {
  const blogDir = path.resolve('content/blog');
  if (!fs.existsSync(blogDir)) return [];

  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const { data } = matter(content);
      if (data.published === false) return null;
      return {
        path: `/blog/${file.replace('.md', '')}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: data.date || undefined,
      };
    })
    .filter(Boolean);
}

function generateSitemap() {
  const blogRoutes = getBlogSlugs();
  const allRoutes = [...staticRoutes, ...blogRoutes];
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
  console.log(`Sitemap generated with ${allRoutes.length} URLs`);
}

generateSitemap();
