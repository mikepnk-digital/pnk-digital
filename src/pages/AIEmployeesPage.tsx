import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, Shield, Server, Code2, UserCheck } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CtaBanner } from '../components/sections/CtaBanner';
import {
  aiEmployeeServices,
  useCases,
  roiData,
  faqs,
} from '../data/ai-employee-services';
import {
  fadeInUp,
  fadeInUpLarge,
  staggerContainer,
  viewportWithMargin,
} from '../utils/animations';

const colorMap: Record<string, { iconBg: string; iconBorder: string; iconText: string; badgeBg: string; badgeText: string; badgeBorder: string }> = {
  'neon-cyan': {
    iconBg: 'from-neon-cyan/20 to-neon-cyan/5',
    iconBorder: 'border-neon-cyan/30',
    iconText: 'text-neon-cyan',
    badgeBg: 'bg-neon-cyan/10',
    badgeText: 'text-neon-cyan',
    badgeBorder: 'border-neon-cyan/20',
  },
  'neon-purple': {
    iconBg: 'from-neon-purple/20 to-neon-purple/5',
    iconBorder: 'border-neon-purple/30',
    iconText: 'text-neon-purple',
    badgeBg: 'bg-neon-purple/10',
    badgeText: 'text-neon-purple',
    badgeBorder: 'border-neon-purple/20',
  },
  'brand-pink': {
    iconBg: 'from-brand-pink/20 to-brand-pink/5',
    iconBorder: 'border-brand-pink/30',
    iconText: 'text-brand-pink',
    badgeBg: 'bg-brand-pink/10',
    badgeText: 'text-brand-pink',
    badgeBorder: 'border-brand-pink/20',
  },
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border border-white/5 rounded-xl overflow-hidden bg-midnight/30"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-white/5 transition-colors"
      >
        <span className="text-text-primary font-medium pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-6 pb-6 text-text-secondary leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AIEmployeesPage() {
  return (
    <>
      <Helmet>
        <title>AI Employee Assistants for Business - PNK Digital</title>
        <meta
          name="description"
          content="Deploy personalised AI assistants for your entire team. Email triage, meeting prep, admin automation. Setup from £5,000. UK-based, enterprise-grade security."
        />
        <meta property="og:title" content="AI Employee Assistants for Business - PNK Digital" />
        <meta
          property="og:description"
          content="Deploy personalised AI assistants for your entire team. Email triage, meeting prep, admin automation. Setup from £5,000."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pnk-digital.com/services/ai-employees" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Employee Assistants for Business - PNK Digital" />
        <meta
          name="twitter:description"
          content="Deploy personalised AI assistants for your entire team. Email triage, meeting prep, admin automation. Setup from £5,000."
        />
      </Helmet>

      {/* Hero */}
      <Section padding="page-header">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeInUpLarge} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-sm">
              New service offering
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUpLarge}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
          >
            Give Every Employee an{' '}
            <GradientText>AI Assistant</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10"
          >
            Personal AI that knows their workflow, manages their inbox, prepares their meetings,
            and handles the admin they hate - so they can focus on work that matters.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link to="/contact">
              <Button size="lg">
                Book a Discovery Call
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* Problem Section */}
      <Section padding="default" background="midnight">
        <SectionHeading
          title="Your Team Spends 40% of Their Day on Admin"
          subtitle="The average knowledge worker spends 2.5 hours a day just on email. Add meeting prep, expense reports, scheduling, and reporting - it all adds up."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {[
            { stat: '2.5hrs', label: 'Average time spent on email per day' },
            { stat: '40%', label: 'Of the working day lost to admin tasks' },
            { stat: '0', label: 'Generic chatbots that understand your business' },
            { stat: '∞', label: 'Potential when every employee has a real AI assistant' },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl bg-void/50 border border-white/5"
            >
              <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
                {item.stat}
              </div>
              <div className="text-text-secondary text-sm">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* How It Works */}
      <Section padding="default">
        <SectionHeading title="How It Works" gradient />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              step: '01',
              title: 'We learn your workflows',
              description:
                'Discovery workshop to map team processes, tools, and pain points. We understand how your people actually work.',
            },
            {
              step: '02',
              title: 'We deploy your AI workforce',
              description:
                'Each employee gets a personalised assistant connected to their tools - email, calendar, Slack, CRM, and more.',
            },
            {
              step: '03',
              title: 'Your team gets time back',
              description:
                'Morning briefings, email triage, meeting prep, admin automation - all handled. Your team focuses on what matters.',
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={fadeInUp}
              className="relative p-6 rounded-xl bg-midnight/40 border border-white/5"
            >
              <div className="text-5xl font-bold text-white/5 absolute top-4 right-6">
                {item.step}
              </div>
              <div className="relative">
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Service Cards / Pricing */}
      <Section padding="default" background="midnight">
        <SectionHeading
          title="Choose Your Package"
          subtitle="Whether you're starting with a small team or rolling out company-wide, there's a package that fits."
          gradient
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {aiEmployeeServices.map((service, index) => {
            const colors = colorMap[service.color] || colorMap['neon-cyan'];
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportWithMargin}
                transition={{ delay: index * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-void/50 border border-white/5 flex flex-col"
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br ${colors.iconBg} ${colors.iconBorder} border flex items-center justify-center`}
                  >
                    <service.icon className={`w-6 h-6 ${colors.iconText}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">{service.title}</h3>
                    <p className="text-text-muted text-sm">{service.subtitle}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className={`text-2xl font-bold ${colors.iconText}`}>{service.price}</span>
                  <span className="text-text-muted text-sm ml-2">{service.priceDetail}</span>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tiers */}
                <div className="space-y-4 mb-8 flex-1">
                  {service.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="p-4 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-text-primary text-sm">
                          {tier.name}
                        </span>
                        <span className={`text-sm font-medium ${colors.iconText}`}>
                          {tier.price}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-text-secondary text-xs"
                          >
                            <Check
                              className={`w-3 h-3 shrink-0 ${colors.iconText}`}
                              strokeWidth={2}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to="/contact" className="mt-auto">
                  <Button variant="secondary" size="sm" className="w-full group">
                    {service.cta}
                    <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* Use Cases */}
      <Section padding="default">
        <SectionHeading
          title="What Your Team's AI Assistant Can Do"
          subtitle="From email to onboarding - AI assistants that handle the work your team shouldn't be doing manually."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {useCases.map((useCase) => (
            <motion.div
              key={useCase.title}
              variants={fadeInUp}
              className="p-6 rounded-xl bg-midnight/40 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="text-3xl mb-4">{useCase.emoji}</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {useCase.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ROI Section */}
      <Section padding="default" background="midnight">
        <SectionHeading
          title="The Numbers"
          subtitle="Even a 10% productivity gain pays for the entire service in the first month."
          gradient
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-white/5 p-4">
              <span className="text-text-muted text-sm font-semibold uppercase tracking-wider">
                Team Size
              </span>
              <span className="text-text-muted text-sm font-semibold uppercase tracking-wider text-center">
                Time Saved/Week
              </span>
              <span className="text-text-muted text-sm font-semibold uppercase tracking-wider text-right">
                Annual Value
              </span>
            </div>
            {/* Rows */}
            {roiData.map((row, i) => (
              <div
                key={row.teamSize}
                className={`grid grid-cols-3 p-4 ${
                  i < roiData.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="text-text-primary font-medium">{row.teamSize}</span>
                <span className="text-text-secondary text-center">{row.timeSaved}</span>
                <span className="text-neon-cyan font-semibold text-right">
                  {row.annualValue}
                </span>
              </div>
            ))}
          </div>

          <p className="text-text-muted text-sm text-center mt-4 italic">
            Based on 4 hours saved per employee per week at average UK knowledge worker salary.
          </p>
        </motion.div>
      </Section>

      {/* Trust / Credibility */}
      <Section padding="default">
        <SectionHeading title="Built for Trust" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Code2,
              title: 'Open-source technology',
              description: 'No vendor lock-in. You own everything.',
            },
            {
              icon: Server,
              title: 'Your infrastructure',
              description: 'Your data stays on your servers - nothing sent to third parties.',
            },
            {
              icon: Shield,
              title: 'Enterprise-grade security',
              description: 'Audit logging, role-based access, and encryption at rest.',
            },
            {
              icon: UserCheck,
              title: 'Battle-tested',
              description: "I use this exact technology to run my own business. It's not theory - it works.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="flex items-start gap-4 p-6 rounded-xl bg-midnight/40 border border-white/5"
            >
              <div className="w-10 h-10 rounded-lg shrink-0 bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-neon-cyan" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-text-primary font-semibold mb-1">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section padding="default" background="midnight">
        <SectionHeading title="Frequently Asked Questions" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </Section>

      {/* CTA Banner */}
      <CtaBanner
        heading="Ready to Give Your Team Superpowers?"
        subtext="Book a free 30-minute discovery call. I'll show you exactly what an AI assistant could do for your specific team."
        buttonText="Book a Discovery Call"
      />
    </>
  );
}
