import { motion } from 'framer-motion';
import { Calendar, Phone } from 'lucide-react';
import { Hero } from '../components/sections/Hero';
import { ServicesOverview } from '../components/sections/ServicesOverview';
import { BlogHighlights } from '../components/sections/BlogHighlights';
import { CredibilitySection } from '../components/sections/CredibilitySection';
import { ProofStrip } from '../components/sections/ProofStrip';
import { Section } from '../components/ui/Section';
import { SectionHeading } from '../components/ui/SectionHeading';
import { testimonials } from '../data/tech-support-service';
import { CALL_LABEL, PHONE_DISPLAY, PHONE_HREF, RESPONSE_PROMISE } from '../config/site';
import { staggerContainer, fadeInUp, viewportWithMargin } from '../utils/animations';

// The three steps shared by /tech-support and /ai-consulting (copy from their
// "How it works" sections), with the support and AI routes side by side.
const steps = [
  {
    title: "Let's talk",
    when: 'Free, 30 minutes',
    body: "We'll talk about your business, what's currently working and what's causing problems.",
  },
  {
    title: 'We take over, or find the opportunity',
    routes: [
      { label: 'Support', body: 'We identify what needs attention and bring your website, email, domains and other technology under control.' },
      { label: 'AI', body: 'The two-week audit. We talk to your people, map the work, check the data risks and name the first pilot with a fixed price.' },
    ],
  },
  {
    title: 'We look after it, or build and hand over',
    routes: [
      { label: 'Support', body: "From then on, you've got someone you can call when something goes wrong." },
      { label: 'AI', body: "The pilot goes live in your tools with a human check. After 30 days you'll know the hours it saves, and you'll be able to run it without us." },
    ],
  },
];

/**
 * @param {{ children?: import('react').ReactNode, caseStudies?: import('../lib/case-studies').CaseStudy[] }} props
 *   children: the booking calendar (BookingEmbed, rendered by index.astro); caseStudies: for the proof strip.
 */
export function HomePage({ children, caseStudies = [] }) {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CredibilitySection />
      <ProofStrip items={testimonials} caseStudies={caseStudies} />

      {/* How it works */}
      <Section id="how-it-works" background="midnight">
        <SectionHeading title="How it works" gradient />
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => (
            <motion.li key={step.title} variants={fadeInUp}>
              <div className="relative p-6 rounded-2xl h-full bg-midnight/60 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-brand-pink text-white font-bold flex items-center justify-center" aria-hidden="true">
                    {index + 1}
                  </span>
                  {step.when && (
                    <span className="text-xs font-semibold text-text-muted px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {step.when}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  <span className="sr-only">Step {index + 1}: </span>{step.title}
                </h3>
                {step.body && <p className="text-text-secondary text-sm leading-relaxed">{step.body}</p>}
                {step.routes && (
                  <dl className="space-y-3">
                    {step.routes.map((route) => (
                      <div key={route.label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-neon-cyan mb-1">{route.label}</dt>
                        <dd className="text-text-secondary text-sm leading-relaxed">{route.body}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      <BlogHighlights />

      {/* Book */}
      <Section id="book" padding="sm" className="scroll-mt-20">
        <div className="bg-midnight/60 backdrop-blur-sm rounded-2xl border border-neon-cyan/20 p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 px-2 sm:px-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6 text-neon-cyan" />
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{CALL_LABEL}</h2>
              </div>
              <p className="text-text-secondary">
                Pick a time below, or call us. Messages get a reply {RESPONSE_PROMISE}.
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-text-primary font-medium hover:text-brand-pink transition-colors whitespace-nowrap"
            >
              <Phone className="w-5 h-5 text-brand-pink" />
              {PHONE_DISPLAY}
            </a>
          </div>
          {children}
        </div>
      </Section>
    </>
  );
}
