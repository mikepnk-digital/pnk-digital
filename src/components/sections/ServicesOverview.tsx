import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { Check, Code2, LifeBuoy } from 'lucide-react';
import { Section } from '../ui/Section';
import { staggerContainer, fadeInUpLarge, viewportWithMargin } from '../../utils/animations';

// The homepage's "two doors": the recurring offers first, then build work.
// Facts and prices are from the /tech-support, /ai-consulting and /services copy.
const doors = [
  {
    icon: LifeBuoy,
    title: 'Run your business',
    intro: 'Support and AI for the business you already have.',
    bullets: [
      { label: 'Tech Support Plans', href: '/tech-support', text: 'website, email, Microsoft 365 and security, looked after from £125/month.' },
      { label: 'AI Consulting', href: '/ai-consulting', text: 'we find the processes AI can take off your team and build the first one. Fixed prices from £1,950.' },
      { text: 'One experienced technology partner instead of a collection of suppliers. No surprise bills.' },
    ],
    href: '/services#run',
    color: 'neon-cyan',
  },
  {
    icon: Code2,
    title: 'Build something',
    intro: 'New software, built properly and handed over.',
    bullets: [
      { label: 'Web applications', text: 'customer portals, internal dashboards, booking systems and more.' },
      { label: 'AWS integration', text: 'scalable, secure cloud infrastructure, architected for reliability from day one.' },
      { label: 'AI-powered MVPs', text: 'a working product to validate with real users in weeks, not months.' },
    ],
    href: '/services#build',
    color: 'brand-pink',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  'neon-cyan': {
    bg: 'from-neon-cyan/20 to-neon-cyan/5',
    border: 'border-neon-cyan/20',
    text: 'text-neon-cyan',
  },
  'brand-pink': {
    bg: 'from-brand-pink/20 to-brand-pink/5',
    border: 'border-brand-pink/20',
    text: 'text-brand-pink',
  },
};

export function ServicesOverview() {
  return (
    <Section id="services-overview" padding="none" className="pb-20 md:pb-28">
      <h2 className="sr-only">How we can help</h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportWithMargin}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {doors.map((door) => {
          const colors = colorMap[door.color];
          return (
            <motion.div key={door.title} variants={fadeInUpLarge}>
              <div className="
                relative p-6 md:p-8 rounded-2xl h-full
                bg-midnight/60 backdrop-blur-sm
                border border-white/10
                hover:border-white/20
                transition-all duration-300
                flex flex-col
              ">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`
                    w-12 h-12 rounded-xl shrink-0
                    bg-gradient-to-br ${colors.bg}
                    ${colors.border} border
                    flex items-center justify-center
                  `}>
                    <door.icon className={`w-6 h-6 ${colors.text}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {door.title}
                  </h3>
                </div>

                <p className="text-text-secondary mb-6">{door.intro}</p>

                <ul className="space-y-4 mb-8 flex-1">
                  {door.bullets.map((b) => (
                    <li key={b.text} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${colors.text}`} strokeWidth={2} />
                      <span className="text-text-secondary leading-relaxed">
                        {b.label && (
                          b.href ? (
                            <Link to={b.href} className="font-semibold text-text-primary hover:text-neon-cyan transition-colors">
                              {b.label}
                            </Link>
                          ) : (
                            <span className="font-semibold text-text-primary">{b.label}</span>
                          )
                        )}
                        {b.label && ': '}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={door.href}
                  className={`inline-flex items-center gap-2 font-medium ${colors.text} hover:text-neon-purple transition-colors duration-300`}
                >
                  See how it works <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
