import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { BlogPostCard } from '../ui/BlogPostCard';
import { getAllPosts } from '../../lib/blog';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

/** Hide the section once the newest post is older than this. */
const MAX_AGE_DAYS = 90;

export function BlogHighlights() {
  const recentPosts = getAllPosts().slice(0, 3);

  if (recentPosts.length === 0) return null;
  const newestAgeDays = (Date.now() - new Date(recentPosts[0].date).getTime()) / 86_400_000;
  if (newestAgeDays > MAX_AGE_DAYS) return null;

  return (
    <Section id="blog-highlights">
      <SectionHeading title="Latest Thinking" gradient />
      <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12 -mt-4">
        Thoughts on AI-accelerated development, building products, and the future of software.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {recentPosts.map((post) => (
          <motion.div key={post.slug} variants={fadeInUpLarge}>
            <BlogPostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="text-center mt-10"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
        >
          Read all articles
          <span>→</span>
        </Link>
      </motion.div>
    </Section>
  );
}
