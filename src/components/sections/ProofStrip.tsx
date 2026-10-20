import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
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
  /** Testimonials now; case studies (Phase 3) join the same list. */
  items: ProofItem[];
  title?: string;
}

/** Client proof as a row of quote cards. Adding an item is content-only. */
export function ProofStrip({ items, title = 'What clients say' }: ProofStripProps) {
  if (items.length === 0) return null;

  return (
    <Section id="proof">
      <SectionHeading title={title} gradient />

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
    </Section>
  );
}
