import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer';
import { CtaBanner } from '../components/sections/CtaBanner';
import { formatDate } from '../lib/blog';
import { SERVICE_LABELS, type CaseStudy } from '../lib/case-studies';
import { fadeInUp, fadeInUpLarge } from '../utils/animations';

// Same layout as BlogPostPage: page header, a 3xl reading column, CTA banner.
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const sections = [
    { title: 'The problem', body: study.problem },
    { title: 'What we did', body: study.whatWeDid },
    { title: 'The result', body: study.result },
  ];

  return (
    <>

      {/* Header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
          <motion.div variants={fadeInUp}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Work
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-brand-pink/10 text-brand-pink border border-brand-pink/20">
              {SERVICE_LABELS[study.service]}
            </span>
            {study.draft && (
              <span className="inline-block px-3 py-1 text-xs rounded-full border border-dashed border-white/30 text-text-muted uppercase tracking-wider">
                Draft
              </span>
            )}
          </motion.div>

          <motion.h1 variants={fadeInUpLarge} className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            {study.title}
          </motion.h1>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
            <span className="text-text-secondary">{study.client}</span>
            <span className="flex items-center gap-2 text-text-muted text-sm">
              <Calendar size={16} />
              {formatDate(study.date)}
            </span>
          </motion.div>
        </motion.div>
      </Section>

      {/* Body */}
      <Section padding="sm">
        <article className="max-w-3xl mx-auto space-y-10">
          <div className="p-6 md:p-8 rounded-2xl bg-midnight/60 border border-neon-cyan/20">
            <p className="text-sm font-semibold uppercase tracking-wider text-neon-cyan mb-2">Result</p>
            <p className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">{study.metric}</p>
          </div>

          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-2xl font-bold text-text-primary mb-3">{s.title}</h2>
              <p className="text-text-secondary text-lg leading-relaxed">{s.body}</p>
            </section>
          ))}

          {study.quote && (
            <figure className="pl-6 border-l-4 border-brand-pink">
              <blockquote className="text-text-primary text-xl leading-relaxed">
                <p>“{study.quote.text}”</p>
              </blockquote>
              <figcaption className="mt-3 text-sm text-text-muted">
                <span className="font-semibold text-text-primary">{study.quote.name}</span>
                {study.quote.role && <>, {study.quote.role}</>}
              </figcaption>
            </figure>
          )}

          {study.body && <MarkdownRenderer content={study.body} />}
        </article>
      </Section>

      <CtaBanner
        heading="Working on something similar?"
        subtext="Book a free 30-minute call. No obligation, no hard sell."
      />
    </>
  );
}
