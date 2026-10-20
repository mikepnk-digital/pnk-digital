import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Section } from '../ui/Section';
import { orbPresets } from '../ui/orbPresets';
import { SectionHeading } from '../ui/SectionHeading';
import { GradientText } from '../ui/GradientText';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';
import mikePinkPhoto from '../../assets/mike-pink.jpg?url';
import { YEARS_EXPERIENCE } from '../../config/site';

// Condensed from "PNK Digital is one person. That's the point." on /about.
const points = [
  { label: 'Low overhead', detail: 'No office, no middle management, no bloated margins.' },
  { label: 'Direct communication', detail: 'You talk to the person doing the work. Questions answered in hours.' },
  { label: 'Senior expertise', detail: `${YEARS_EXPERIENCE} years of experience on every project. No juniors, no bait-and-switch.` },
  { label: 'Accountability', detail: "One person, full ownership. If something's wrong, we fix it fast." },
];

const stats = [`${YEARS_EXPERIENCE} years`, 'Financial services', 'One point of contact'];

export function CredibilitySection() {
  return (
    <Section id="credibility" background="midnight" orbs={orbPresets.aboutRight}>
      <SectionHeading title="Why PNK Digital" gradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.figure
          variants={fadeInUpLarge}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="w-full max-w-sm mx-auto lg:mx-0"
        >
          <div className="aspect-[4/5] rounded-2xl border border-white/10 overflow-hidden">
            <img
              src={mikePinkPhoto}
              alt="Mike Pink, founder of PNK Digital"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-4 text-sm text-text-muted text-center lg:text-left">
            Mike Pink, founder — the person who does the work.
          </figcaption>
        </motion.figure>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          <motion.h3 variants={fadeInUp} className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
            PNK Digital is <GradientText>one person.</GradientText> That's the point.
          </motion.h3>

          <motion.ul variants={fadeInUp} className="space-y-5 mb-10">
            {points.map((point) => (
              <li key={point.label} className="flex items-start gap-3">
                <Check className="w-5 h-5 mt-0.5 shrink-0 text-neon-cyan" strokeWidth={2} />
                <p className="text-text-secondary leading-relaxed">
                  <span className="font-semibold text-text-primary">{point.label}.</span> {point.detail}
                </p>
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat} className="flex items-center justify-center text-center p-3 sm:p-4 rounded-xl bg-void/50 border border-white/5">
                <span className="text-sm sm:text-base font-bold text-neon-cyan leading-snug">{stat}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
