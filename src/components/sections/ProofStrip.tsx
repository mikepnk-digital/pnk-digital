import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { CaseStudyCard } from '../ui/CaseStudyCard';
import type { CaseStudy } from '../../lib/case-studies';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

export interface ProofItem {
  quote: string;
  name: string;
  role?: string;
  company: string;
  /** Small label under the attribution, e.g. "Domain and email". */
  services?: string;
}

interface ProofStripProps {
  items: ProofItem[];
  /** Published case studies, shown above the quotes (up to three). */
  caseStudies?: CaseStudy[];
  title?: string;
}

/** Client proof: case study cards, then a row of quote cards. Adding either is content-only. */
export function ProofStrip({ items, caseStudies = [], title = 'What clients say' }: ProofStripProps) {
  const studies = caseStudies.slice(0, 3);
  if (items.length === 0 && studies.length === 0) return null;

  return (
    <Section id="proof">
      <SectionHeading title={title} gradient />

      {studies.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 lg:gap-8 mb-6 lg:mb-8"
        >
          {studies.map((study) => (
            <motion.div key={study.slug} variants={fadeInUpLarge}>
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6 lg:gap-8"
      >
        {items.map((item) => (
          <motion.figure
            key={`${item.name}-${item.company}`}
            variants={fadeInUpLarge}
            className="
              flex flex-col gap-6 p-6 md:p-8 rounded-2xl h-full
              bg-midnight/60 backdrop-blur-sm
              border border-white/10
            "
          >
            <blockquote className="flex-1 text-text-primary text-lg leading-relaxed">
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption className="pt-4 border-t border-white/10 text-sm">
              <div className="font-semibold text-text-primary">{item.name}</div>
              <div className="text-text-muted">
                {item.role && <>{item.role}, </>}
                <cite className="not-italic">{item.company}</cite>
              </div>
              {item.services && <div className="mt-2 text-brand-pink font-medium">{item.services}</div>}
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>

      {studies.length > 0 && (
        <div className="text-center mt-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
          >
            See all work
            <span>→</span>
          </Link>
        </div>
      )}
    </Section>
  );
}
