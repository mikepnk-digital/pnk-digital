import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { services } from '../../data/services';
import { GradientOrb } from '../decorative/GradientOrb';

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <GradientOrb
        color="purple"
        size={500}
        top="20%"
        left="-200px"
        opacity={0.08}
        blur={120}
        animate={false}
      />
      <GradientOrb
        color="cyan"
        size={400}
        bottom="10%"
        right="-150px"
        opacity={0.06}
        blur={100}
        animate={false}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What We Build"
          gradient
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
            >
              <Card
                icon={service.icon}
                title={service.title}
                description={service.description}
                tags={service.tags}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
