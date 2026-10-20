import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { services } from '../data/services';
import { fadeInUp, fadeInUpLarge } from '../utils/animations';

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
            What We <GradientText>Build</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            We don't try to be everything to everyone. We focus on the areas where our experience
            and AI-accelerated workflow deliver the most value: full-stack web applications, cloud
            infrastructure, rapid MVPs, and practical AI integration.
          </motion.p>
        </motion.div>
      </Section>

      {/* Service cards */}
      <Section padding="sm">
        <div className="space-y-8">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Section>

      <CtaBanner
        heading="Got a project in mind?"
        subtext="Tell us what you're building. We'll let you know if we're the right fit - and if we're not, we'll point you to someone who is."
      />
    </>
  );
}
