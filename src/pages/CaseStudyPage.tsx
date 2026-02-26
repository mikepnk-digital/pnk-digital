import { Helmet } from '@dr.pogodin/react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Clock, Check } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { CtaBanner } from '../components/sections/CtaBanner';
import { getProjectBySlug } from '../data/portfolio';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Redirect placeholders back to /work
  if (!project || project.placeholder) {
    return <Navigate to="/work" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - PNK Digital</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Header */}
      <Section padding="hero">
        <motion.div initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-neon-cyan transition-colors mb-8"
            >
              <ArrowLeft size={18} />
              Back to Work
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 text-xs rounded-full mb-4 bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
            >
              {project.category}
            </motion.span>

            <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              <GradientText>{project.title}</GradientText>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-6">
              {project.description}
            </motion.p>

            {/* Meta row */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              {project.timeline && (
                <span className="flex items-center gap-2 text-text-muted text-sm">
                  <Clock size={16} />
                  {project.timeline}
                </span>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neon-cyan text-sm hover:text-neon-purple transition-colors"
                >
                  <ExternalLink size={16} />
                  View live site
                </a>
              )}
            </motion.div>

            {/* Tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 text-text-secondary border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Section>

      {/* Case study content */}
      <Section padding="sm">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-3xl space-y-12"
        >
          {/* Problem */}
          {project.problem && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-text-primary mb-4">The Problem</h2>
              <p className="text-text-secondary leading-relaxed">{project.problem}</p>
            </motion.div>
          )}

          {/* Approach */}
          {project.approach && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-text-primary mb-4">My Approach</h2>
              <p className="text-text-secondary leading-relaxed">{project.approach}</p>
            </motion.div>
          )}

          {/* Technical Decisions */}
          {project.technicalDecisions && project.technicalDecisions.length > 0 && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Key Technical Decisions</h2>
              <ul className="space-y-3">
                {project.technicalDecisions.map((decision) => (
                  <li key={decision} className="flex items-start gap-3">
                    <Check className="w-4 h-4 mt-1 shrink-0 text-neon-cyan" strokeWidth={2} />
                    <span className="text-text-secondary leading-relaxed">{decision}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Outcome */}
          {project.outcome && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-text-primary mb-4">The Outcome</h2>
              <p className="text-text-secondary leading-relaxed">{project.outcome}</p>
            </motion.div>
          )}

          {/* Screenshots placeholder */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-text-primary mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((src, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                    <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Section>

      <CtaBanner
        heading="Working on something similar?"
        subtext="I'd love to hear about your project. Let's talk about how I can help."
        buttonText="Get in Touch"
      />
    </>
  );
}
