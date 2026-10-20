import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { services } from '../data/services';
import { fadeInUp, fadeInUpLarge } from '../utils/animations';

const groups = [
  { id: 'run', title: 'Run your business', intro: 'Support and AI for the business you already have.' },
  { id: 'build', title: 'Build something', intro: 'New software, built properly and handed over.' },
] as const;

export function ServicesPage() {
  return (
    <>

      {/* Page header */}
      <Section padding="page-header">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Two ways we <GradientText>work with you.</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            Run your business: support and AI for the business you already have. Build something: new
            software, built properly and handed over.
          </motion.p>
        </motion.div>
      </Section>

      {/* Service groups */}
      {groups.map((group) => (
        <Section key={group.id} id={group.id} padding="sm" className="scroll-mt-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <GradientText>{group.title}</GradientText>
            </h2>
            <p className="text-text-secondary text-lg">{group.intro}</p>
          </motion.div>
          <div className="space-y-8">
            {services
              .filter((service) => service.group === group.id)
              .map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))}
          </div>
        </Section>
      ))}

      <CtaBanner
        heading="Got a project in mind?"
        subtext="Tell us what you're building. We'll let you know if we're the right fit - and if we're not, we'll point you to someone who is."
      />
    </>
  );
}
