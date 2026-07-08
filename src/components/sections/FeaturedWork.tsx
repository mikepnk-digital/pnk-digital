import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

const placeholderProjects = [
  {
    title: 'SaaS Dashboard',
    category: 'React Application',
    tags: ['React', 'TypeScript', 'AWS'],
  },
  {
    title: 'AI Content Platform',
    category: 'AI-Powered MVP',
    tags: ['React', 'OpenAI', 'Node.js'],
  },
  {
    title: 'E-Commerce Integration',
    category: 'AWS Infrastructure',
    tags: ['AWS Lambda', 'DynamoDB', 'Stripe'],
  },
];

export function FeaturedWork() {
  return (
    <Section id="featured-work" background="midnight">
      <SectionHeading title="Recent Work" gradient />
      <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12 -mt-4">
        PNK Digital is new, but my portfolio is growing. Here's a taste of what's coming.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {placeholderProjects.map((project) => (
          <motion.div key={project.title} variants={fadeInUpLarge}>
            <div className="
              relative p-6 rounded-2xl h-full
              bg-midnight/40 backdrop-blur-sm
              border-2 border-dashed border-white/10
              transition-all duration-300
              group
            ">
              {/* Placeholder thumbnail area */}
              <div className="
                w-full aspect-video rounded-lg mb-5
                bg-charcoal/50
                border border-white/5
                flex items-center justify-center
              ">
                <span className="text-text-muted text-sm uppercase tracking-wider">Coming Soon</span>
              </div>

              {/* Category label */}
              <span className="
                inline-block px-3 py-1 text-xs rounded-full mb-3
                bg-neon-purple/10 text-neon-purple
                border border-neon-purple/20
              ">
                {project.category}
              </span>

              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {project.title}
              </h3>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded text-text-muted bg-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="text-center mt-10"
      >
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
        >
          View all work
          <span>→</span>
        </Link>
      </motion.div>
    </Section>
  );
}
