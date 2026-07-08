import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { BlogPostCard } from '../components/ui/BlogPostCard';
import { getAllPosts, categories } from '../lib/blog';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allPosts = getAllPosts();

  const filteredPosts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  return (
    <>

      {/* Header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            <GradientText>Blog</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            Thoughts on AI-accelerated development, building products, and the
            reality of running a one-person software business.
          </motion.p>
        </motion.div>
      </Section>

      {/* Category filters */}
      <Section padding="none">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`
              px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer
              ${!activeCategory
                ? 'bg-brand-pink/20 text-brand-pink border-brand-pink/40'
                : 'bg-transparent text-text-secondary border-white/10 hover:border-white/20'
              }
            `}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 text-sm rounded-full border transition-all duration-200 cursor-pointer
                ${activeCategory === cat
                  ? 'bg-brand-pink/20 text-brand-pink border-brand-pink/40'
                  : 'bg-transparent text-text-secondary border-white/10 hover:border-white/20'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* Post grid */}
      <Section padding="sm">
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-muted">No articles in this category yet. Check back soon.</p>
          </div>
        )}
      </Section>
    </>
  );
}
