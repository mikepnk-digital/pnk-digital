import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { CaseStudyCard } from '../components/ui/CaseStudyCard';
import type { CaseStudy } from '../lib/case-studies';
import { CALL_LABEL } from '../config/site';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';

export function WorkPage({ studies }: { studies: CaseStudy[] }) {
  return (
    <>

      {/* Header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            <GradientText>Work</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            Results from businesses we support, build for and bring AI into: what wasn't working, what we did, and what
            changed.
          </motion.p>
        </motion.div>
      </Section>

      {/* Case study grid */}
      <Section padding="sm">
        {studies.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {studies.map((study) => (
              <motion.div key={study.slug} variants={fadeInUp}>
                <CaseStudyCard study={study} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-muted mb-6">
              Case studies are being written up. In the meantime, ask us about current clients on a free 30-minute call.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-brand-pink text-white font-semibold hover:bg-brand-pink/90 transition-colors"
            >
              {CALL_LABEL}
            </Link>
          </div>
        )}
      </Section>
    </>
  );
}
