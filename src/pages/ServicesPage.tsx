import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { ServiceCard } from '../components/ui/ServiceCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { services } from '../data/services';
import { fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services - PNK Digital</title>
        <meta name="description" content="Web application development, cloud infrastructure, AI-powered MVPs, and AI integration services. Senior-level expertise, delivered fast." />
        <meta property="og:title" content="Services - PNK Digital" />
        <meta property="og:description" content="Web application development, cloud infrastructure, AI-powered MVPs, and AI integration services. Senior-level expertise, delivered fast." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pnk-digital.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services - PNK Digital" />
        <meta name="twitter:description" content="Web application development, cloud infrastructure, AI-powered MVPs, and AI integration services. Senior-level expertise, delivered fast." />
      </Helmet>

      {/* Page header */}
      <Section padding="page-header">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUpLarge} className="mb-6">
            <span className="
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm
            ">
              Four focused services
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            What I <GradientText>Build</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            I don't try to be everything to everyone. I focus on four areas where my experience
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

      {/* What I don't do */}
      <Section padding="sm">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            What I don't do
          </h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            I believe in being upfront. I don't offer broad "AI strategy consulting."
            If your project needs something outside
            my focus areas, I'll tell you honestly and point you in the right direction.
          </p>
        </motion.div>
      </Section>

      <CtaBanner
        heading="Got a project in mind?"
        subtext="Tell me what you're building. I'll let you know if I'm the right fit - and if I'm not, I'll point you to someone who is."
        buttonText="Start a Conversation"
      />
    </>
  );
}
