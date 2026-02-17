import { motion } from 'framer-motion';
import { Section, orbPresets } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

const technologies = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'AWS',
  'Tailwind CSS', 'PostgreSQL', 'DynamoDB', 'OpenAI', 'Claude API',
];

export function CredibilitySection() {
  return (
    <Section id="credibility" background="midnight" orbs={orbPresets.aboutRight}>
      <SectionHeading title="Why Work With Me" gradient />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Bio & photo */}
        <motion.div
          variants={fadeInUpLarge}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          {/* Photo placeholder */}
          <div className="
            w-full max-w-sm mx-auto lg:mx-0 aspect-[4/5] rounded-2xl mb-8
            bg-charcoal/50
            border border-white/10
            flex items-center justify-center
            overflow-hidden
          ">
            <span className="text-text-muted text-sm">Photo</span>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-6">
            I'm Mike — a senior React and AWS developer with over a decade of experience building
            production software for startups, scale-ups, and enterprise clients. I combine deep
            technical expertise with AI-accelerated workflows to deliver better software, faster,
            at a fraction of traditional agency cost.
          </motion.p>

          <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed mb-8">
            When you work with me, you get a single senior developer who owns your project end-to-end.
            No account managers. No handoffs. No juniors learning on your budget. Just direct
            communication with the person writing your code — and results that speak for themselves.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-10">
            {[
              { value: '10+', label: 'Years Experience' },
              { value: 'Senior', label: 'Level Expertise' },
              { value: 'Direct', label: 'Communication' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-void/50 border border-white/5">
                <div className="text-2xl font-bold text-neon-cyan mb-1">{stat.value}</div>
                <div className="text-text-muted text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Tech stack */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-3 py-1.5 text-sm rounded-lg
                    bg-white/5 text-text-secondary
                    border border-white/10
                    hover:border-white/20
                    transition-colors duration-200
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Social proof - replace with real testimonials as they come in */}
      <motion.div
        variants={fadeInUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="mt-16 max-w-3xl mx-auto text-center"
      >
        <p className="text-text-secondary text-lg leading-relaxed">
          I've built production software for startups, agencies, and enterprise clients for over 10 years.
          Want to see if we're a good fit? <a href="/contact" className="text-neon-cyan hover:underline">Let's have a conversation</a>.
        </p>
      </motion.div>
    </Section>
  );
}
