import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import { Section } from '../../components/ui/Section';
import { GradientText } from '../../components/ui/GradientText';
import { Button } from '../../components/ui/Button';
import { ContactForm } from '../../components/sections/ContactForm';
import { AuditHeader } from '../../components/audit/AuditHeader';
import { AuditFooter } from '../../components/audit/AuditFooter';
import { IssueCard } from '../../components/audit/IssueCard';
import { ScoreCard } from '../../components/audit/ScoreCard';
import { MockupFrame } from '../../components/audit/MockupFrame';
import { MockupRenderer } from '../../components/audit/mockups';
import { getProspectBySlug } from '../../data/prospects';
import { staggerContainer, fadeInUp, viewportWithMargin } from '../../utils/animations';
import { YEARS_EXPERIENCE } from '../../config/site';

export function AuditReportPage({ slug }: { slug: string }) {
  const prospect = slug ? getProspectBySlug(slug) : undefined;

  if (!prospect) {
    return (
      <div className="min-h-screen bg-void text-text-primary">
        <AuditHeader />
        <Section padding="hero">
          <div className="text-center pt-16">
            <h1 className="text-4xl font-bold mb-4">Audit Not Found</h1>
            <p className="text-text-secondary mb-8">We couldn't find an audit for that business.</p>
            <Link to="/audit">
              <Button variant="secondary">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Audits
              </Button>
            </Link>
          </div>
        </Section>
        <AuditFooter />
      </div>
    );
  }

  const criticalCount = prospect.issues.filter((i) => i.severity === 'critical').length;
  const majorCount = prospect.issues.filter((i) => i.severity === 'major').length;
  const moderateCount = prospect.issues.filter((i) => i.severity === 'moderate').length;

  return (
    <div className="min-h-screen bg-void text-text-primary">
      <AuditHeader />

      {/* Header */}
      <Section padding="page-header" background="gradient">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="pt-16"
        >
          <motion.div variants={fadeInUp}>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 text-text-muted hover:text-neon-cyan transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Audits
            </Link>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <motion.div variants={fadeInUp} className="flex-1">
              <div className="text-neon-cyan text-sm font-medium mb-2">
                {prospect.type} • {prospect.location}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Website Audit: <GradientText>{prospect.name}</GradientText>
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={prospect.currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-secondary hover:text-neon-cyan transition-colors text-sm"
                >
                  {prospect.currentUrl} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <ScoreCard score={prospect.overallScore} size="lg" />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center mt-12"
          >
            <span className="text-text-muted text-sm mb-2">Scroll down to view results</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-6 h-6 text-neon-cyan/60" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Summary Stats */}
      <Section padding="sm" background="midnight">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
            <div className="text-xs text-text-muted uppercase tracking-wide">Critical Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{majorCount}</div>
            <div className="text-xs text-text-muted uppercase tracking-wide">Major Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{moderateCount}</div>
            <div className="text-xs text-text-muted uppercase tracking-wide">Moderate Issues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{prospect.issues.length}</div>
            <div className="text-xs text-text-muted uppercase tracking-wide">Total Issues</div>
          </div>
        </div>
      </Section>

      {/* Issues */}
      <Section padding="default">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Issues <GradientText>Found</GradientText>
            </h2>
            <p className="text-text-secondary">
              We identified {prospect.issues.length} issues across your website that are affecting your online presence and potential customer acquisition.
            </p>
          </motion.div>

          <div className="space-y-4">
            {prospect.issues.map((issue, i) => (
              <IssueCard key={i} issue={issue} />
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 p-6 bg-charcoal/50 border border-white/10 rounded-xl"
          >
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              What This Means for {prospect.name}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              With a score of {prospect.overallScore}/100, your current website is significantly underperforming.
              The {criticalCount} critical issue{criticalCount !== 1 ? 's' : ''} identified mean{criticalCount === 1 ? 's' : ''} potential
              customers are likely leaving your website immediately and choosing competitors instead.
              A modern, well-built website would transform your online presence and help you attract
              the customers you're currently missing.
            </p>
          </motion.div>
        </motion.div>
      </Section>

      {/* Mockup Section */}
      <Section padding="default" background="midnight">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              What <GradientText>{prospect.name}</GradientText> Could Look Like
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We've designed a concept homepage to show what's possible with a modern, professionally built website.
              {' '}{prospect.mockupDescription}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <MockupFrame url={prospect.currentUrl}>
              <MockupRenderer slug={prospect.slug} name={prospect.name} />
            </MockupFrame>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-center text-text-muted text-xs mt-4">
            This is a design concept only. The final website would be fully customised with your real content, photography, and branding.
          </motion.p>
        </motion.div>
      </Section>

      {/* CTA */}
      <Section padding="default">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Discuss Your <GradientText>New Website</GradientText>?
            </h2>
            <p className="text-text-secondary mb-2">
              PNK Digital is run by Mike Pink, a freelance web developer based in Surrey with over {YEARS_EXPERIENCE} years
              of experience building websites and web applications with React, Node.js, and AWS. We'd love to chat about
              how we can transform your online presence.
            </p>
          </motion.div>

          <ContactForm />

          <motion.p variants={fadeInUp} className="text-center text-text-muted text-sm mt-8">
            No obligation • Free consultation • Local Surrey developer
          </motion.p>
        </motion.div>
      </Section>

      <AuditFooter />
    </div>
  );
}
