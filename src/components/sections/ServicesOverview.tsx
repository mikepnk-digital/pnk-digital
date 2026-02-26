import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Cloud, Zap, Cpu } from 'lucide-react';
import { Section, orbPresets } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

const services = [
  {
    icon: Code2,
    title: 'Web Application Development',
    description: 'Custom web apps that solve real business problems - dashboards, portals, booking systems, and more. Production-ready in weeks, not months.',
    color: 'neon-cyan',
  },
  {
    icon: Cloud,
    title: 'AWS Integration & Infrastructure',
    description: 'Scalable, secure cloud infrastructure on AWS. Serverless APIs, databases, authentication, and CI/CD - architected for reliability from day one.',
    color: 'neon-purple',
  },
  {
    icon: Zap,
    title: 'AI-Powered MVPs',
    description: 'Go from idea to working product fast. I use AI-accelerated workflows to prototype, build, and ship MVPs that let you validate with real users quickly.',
    color: 'brand-pink',
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Embed intelligent capabilities into your existing products. From chatbots to content generation to workflow automation - AI that actually solves problems.',
    color: 'neon-green',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  'neon-cyan': {
    bg: 'from-neon-cyan/20 to-neon-cyan/5',
    border: 'border-neon-cyan/20 group-hover:border-neon-cyan/40',
    text: 'text-neon-cyan',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]',
  },
  'neon-purple': {
    bg: 'from-neon-purple/20 to-neon-purple/5',
    border: 'border-neon-purple/20 group-hover:border-neon-purple/40',
    text: 'text-neon-purple',
    glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]',
  },
  'brand-pink': {
    bg: 'from-brand-pink/20 to-brand-pink/5',
    border: 'border-brand-pink/20 group-hover:border-brand-pink/40',
    text: 'text-brand-pink',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,23,140,0.3)]',
  },
  'neon-green': {
    bg: 'from-neon-green/20 to-neon-green/5',
    border: 'border-neon-green/20 group-hover:border-neon-green/40',
    text: 'text-neon-green',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]',
  },
};

export function ServicesOverview() {
  return (
    <Section id="services-overview" orbs={orbPresets.servicesLeft}>
      <SectionHeading title="What I Build" gradient />
      <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12 -mt-4">
        Four things I do really well.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {services.map((service) => {
          const colors = colorMap[service.color];
          return (
            <motion.div key={service.title} variants={fadeInUpLarge}>
              <div className="
                relative p-6 rounded-2xl
                bg-midnight/60 backdrop-blur-sm
                border border-white/10
                hover:border-white/20
                hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                transition-all duration-300
                group h-full
              ">
                <div className="relative z-10">
                  <div className={`
                    w-12 h-12 rounded-xl mb-5
                    bg-gradient-to-br ${colors.bg}
                    ${colors.border} border
                    flex items-center justify-center
                    ${colors.glow}
                    transition-all duration-300
                  `}>
                    <service.icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-text-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={fadeInUpLarge}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="text-center mt-10"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors duration-300"
        >
          View all services in detail
          <span>→</span>
        </Link>
      </motion.div>
    </Section>
  );
}
