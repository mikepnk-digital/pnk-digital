import { motion } from 'framer-motion';
import { Target, Eye, Wrench, Zap } from 'lucide-react';
import { GradientText } from '../ui/GradientText';
import { GradientOrb } from '../decorative/GradientOrb';

const stats = [
  { value: '100+', label: 'Projects Deployed' },
  { value: '50+', label: 'Clients Served' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Technical Support' },
];

const values = [
  {
    icon: Target,
    title: 'Outcomes Over Output',
    description: "We're not here to bill hours. Every line of code exists to move a metric that matters to your business.",
  },
  {
    icon: Eye,
    title: 'Radical Transparency',
    description: "No black boxes, no vendor lock-in. You own your code, understand your models, and can walk away anytime. You won't want to.",
  },
  {
    icon: Wrench,
    title: 'Built to Last',
    description: 'We engineer for the long game: scalable architectures, documented systems, and knowledge transfer that makes your team smarter.',
  },
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    description: "Fast doesn't mean fragile. We move quickly because we've done this before, not because we're cutting corners.",
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
            >
              We Build What Others{' '}
              <GradientText>Only Pitch</GradientText>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg mb-6 leading-relaxed"
            >
              We started with a simple frustration: too many AI projects promising transformation
              and delivering PowerPoints. So we built an agency that ships.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-secondary text-lg mb-10 leading-relaxed"
            >
              Our team of engineers, researchers, and strategists has spent a decade in the
              trenches, building systems for startups racing to market and enterprises that
              can't afford downtime. We measure success in production deployments, not proof of concepts.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="
                    p-6 rounded-2xl
                    bg-void/50 backdrop-blur-sm
                    border border-white/5
                    hover:border-neon-purple/30
                    hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
                    transition-all duration-300
                    group
                  "
                >
                  <div className="
                    w-12 h-12 rounded-xl
                    bg-gradient-to-br from-neon-purple/20 to-neon-magenta/10
                    border border-neon-purple/20
                    flex items-center justify-center mb-4
                    group-hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]
                    group-hover:border-neon-purple/40
                    transition-all duration-300
                  ">
                    <value.icon className="w-6 h-6 text-neon-purple" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-semibold text-text-primary mb-2 group-hover:text-white transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
