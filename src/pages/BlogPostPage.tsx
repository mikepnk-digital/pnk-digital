import { Helmet } from '@dr.pogodin/react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Twitter, LinkIcon } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { BlogPostCard } from '../components/ui/BlogPostCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { getPostBySlug, getRelatedPosts, formatDate } from '../lib/blog';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';
import { useState } from 'react';

function ShareLinks({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://pnk-digital.com/blog/${slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-text-muted text-sm">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-neon-cyan transition-colors"
        aria-label="Share on X"
      >
        <Twitter size={18} />
      </a>
      <button
        onClick={handleCopyLink}
        className="text-text-muted hover:text-neon-cyan transition-colors cursor-pointer"
        aria-label="Copy link"
      >
        <LinkIcon size={18} />
      </button>
      {copied && <span className="text-neon-cyan text-xs">Copied!</span>}
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = getRelatedPosts(post, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} - PNK Digital</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://pnk-digital.com/blog/${post.slug}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": post.author,
            "url": "https://pnk-digital.com/about"
          },
          "publisher": {
            "@type": "Organization",
            "name": "PNK Digital",
            "url": "https://pnk-digital.com"
          },
          "url": `https://pnk-digital.com/blog/${post.slug}`,
          "keywords": post.tags.join(", ")
        })}</script>
      </Helmet>

      {/* Article header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.div variants={fadeInUp}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </Link>
          </motion.div>

          <motion.span
            variants={fadeInUp}
            className="inline-block px-3 py-1 text-xs rounded-full mb-4 bg-brand-pink/10 text-brand-pink border border-brand-pink/20"
          >
            {post.category}
          </motion.span>

          <motion.h1 variants={fadeInUpLarge} className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {post.title}
          </motion.h1>

          {/* Meta row */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 mb-6">
            <span className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2 text-text-muted text-sm">
              <Clock size={16} />
              {post.readingTime}
            </span>
            <span className="text-text-muted text-sm">
              By {post.author}
            </span>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-text-secondary border border-white/10"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ShareLinks title={post.title} slug={post.slug} />
          </motion.div>
        </motion.div>
      </Section>

      {/* Article content */}
      <Section padding="sm">
        <article className="max-w-3xl mx-auto">
          <MarkdownRenderer content={post.content} />
        </article>
      </Section>

      {/* Post-article share */}
      <Section padding="sm">
        <div className="max-w-3xl mx-auto pt-8 border-t border-white/10">
          <ShareLinks title={post.title} slug={post.slug} />
        </div>
      </Section>

      {/* CTA after article */}
      <CtaBanner
        heading="Working on something similar?"
        subtext="I'd love to hear about your project. Book a discovery call - no obligation, no hard sell."
        buttonText="Let's Talk"
      />

      {/* Related articles */}
      {related.length > 0 && (
        <Section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUpLarge} className="text-2xl md:text-3xl font-bold text-text-primary">
              Related Articles
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {related.map((relatedPost) => (
              <motion.div key={relatedPost.slug} variants={fadeInUp}>
                <BlogPostCard post={relatedPost} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}
    </>
  );
}
