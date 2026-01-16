import { motion } from 'framer-motion';
import { Zap, Users, Award, Trophy } from 'lucide-react';
import { GradientText } from '../ui/GradientText';
import { GradientOrb } from '../decorative/GradientOrb';

const stats = [
  { value: '3x', label: 'Faster Than Traditional Development' },
  { value: '50%+', label: 'Cost Reduction vs. Agencies' },
  { value: '24hr', label: 'Response Time Guarantee' },
  { value: '30-Day', label: 'Money-Back Guarantee' },
];

const values = [
  {
    icon: Zap,
    title: 'Speed Is Strategy',
    description: "In business, time is everything. We leverage AI to compress timelines without compromising quality—because getting to market first is a competitive advantage you can't buy back.",
  },
  {
    icon: Users,
    title: 'Lean By Design',
    description: "No bloated teams. No unnecessary overhead. We keep our operation tight so you get premium results without the premium markup that comes with traditional agencies.",
  },
  {
    icon: Award,
    title: 'Quality Without Compromise',
    description: "Fast doesn't mean sloppy. We ship production-ready code that scales with your business—built right the first time, documented for the long haul.",
  },
  {
    icon: Trophy,
    title: 'Your Success, Our Mission',
    description: "We're not here to bill hours or pad timelines. Every project is measured by one metric: did we help you beat your competition to market?",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-midnight/30" />
      <GradientOrb
        color="magenta"
        size={400}
        top="10%"
        right="-100px"
        opacity={0.06}
        blur={100}
        animate={false}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left Column - Story */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl text-center lg:text-left md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
            >
              Big Agency Results.{' '}
              <GradientText>Fraction of the Cost.</GradientText>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg mb-6 leading-relaxed"
            >
              We built PNK Digital on a simple premise: you shouldn't need to hire a massive dev
              team or pay agency rates to get quality software built. AI has fundamentally changed
              what's possible.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg mb-10 leading-relaxed"
            >
              We've mastered these tools so you don't have to. The result? We deliver what large
              agencies deliver—but faster, leaner, and at a price that actually makes sense. While
              others are still assembling teams and scheduling kickoffs, we're already shipping.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="
                    p-5 rounded-xl
                    bg-void/50 backdrop-blur-sm
                    border border-white/5
                    hover:border-neon-cyan/30
                    hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]
                    transition-all duration-300
                    group
                  "
                >
                  <div className="text-3xl font-bold text-neon-cyan group-hover:text-white transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold mb-8 text-center lg:text-left"
            >
              Our Core Values
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="
                    flex gap-4 sm:block
                    p-4 sm:p-6 rounded-2xl
                    bg-void/50 backdrop-blur-sm
                    border border-white/5
                    hover:border-neon-purple/30
                    hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
                    transition-all duration-300
                    group
                  "
                >
                  <div className="
                    w-10 h-10 sm:w-12 sm:h-12 rounded-xl shrink-0
                    bg-gradient-to-br from-neon-purple/20 to-neon-magenta/10
                    border border-neon-purple/20
                    flex items-center justify-center sm:mb-4
                    group-hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]
                    group-hover:border-neon-purple/40
                    transition-all duration-300
                  ">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-purple" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1 sm:mb-2 group-hover:text-white transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
