import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Section, orbPresets } from '../ui/Section';
import { Card } from '../ui/Card';
import { services } from '../../data/services';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

export function Services() {
  return (
    <Section id="services" orbs={orbPresets.servicesLeft}>
      <SectionHeading title="What We Build" gradient />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={fadeInUpLarge}>
            <Card
              icon={service.icon}
              title={service.title}
              description={service.description}
              tags={service.tags}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
