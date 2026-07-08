import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Lightbulb, MessageCircle, Code, Clock, MapPin } from 'lucide-react';
import { Section } from '../../components/ui/Section';
import { GradientText } from '../../components/ui/GradientText';
import { Button } from '../../components/ui/Button';
import { ContactForm } from '../../components/sections/ContactForm';
import { AuditHeader } from '../../components/audit/AuditHeader';
import { AuditFooter } from '../../components/audit/AuditFooter';
import { ProspectCard } from '../../components/audit/ProspectCard';
import { prospects } from './prospects';
import { staggerContainer, fadeInUp, viewportWithMargin } from '../../utils/animations';

export function AuditLandingPage() {
  useEffect(() => {
    // noindex for outreach pages
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'Free Website Audit — PNK Digital';
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const steps = [
    {
      icon: Search,
      title: 'We Audit Your Site',
      description: 'We analyse your current website across design, content, SEO, performance, accessibility, and security — identifying what\'s holding you back.',
    },
    {
      icon: Lightbulb,
      title: 'We Show What\'s Possible',
      description: 'We design a custom homepage concept showing what your website could look like with a modern, professional rebuild.',
    },
    {
      icon: MessageCircle,
      title: 'No Obligation Chat',
      description: 'If you like what you see, we\'ll have a relaxed conversation about how to make it happen. No pressure, no hard sell.',
    },
  ];

  const credentials = [
    { icon: Code, label: '25+ Years Experience' },
    { icon: Clock, label: 'Fast Delivery with AI-Powered Workflows' },
    { icon: MapPin, label: 'Local Surrey Developer' },
  ];

  return (
    <div className="min-h-screen bg-void text-text-primary">
      <AuditHeader />

      {/* Hero */}
      <Section padding="hero" background="gradient">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center pt-16"
        >
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Your Website Could Be{' '}
            <GradientText>Costing You Customers</GradientText>
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            We've audited 10 local business websites and found critical issues that are driving customers away. Is yours one of them?
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Button
              size="lg"
              onClick={() => document.getElementById('audits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the Audits
            </Button>
          </motion.div>
        </motion.div>
      </Section>

      {/* How It Works */}
      <Section padding="default" background="midnight">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-4">
            How It <GradientText>Works</GradientText>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-text-secondary mb-12 max-w-xl mx-auto">
            A completely free, no-obligation website health check for your business.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeInUp}
                className="bg-charcoal/50 border border-white/5 rounded-xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-neon-cyan" />
                </div>
                <div className="text-neon-cyan text-sm font-bold mb-2">Step {i + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Prospect Grid */}
      <Section id="audits" padding="default">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <GradientText>10 Local Businesses</GradientText> Audited
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              We've reviewed the websites of 10 businesses across Surrey and designed custom mockups showing what their online presence could look like.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prospects.map((prospect) => (
              <ProspectCard key={prospect.slug} prospect={prospect} />
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Credentials */}
      <Section padding="sm" background="midnight">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {credentials.map((cred) => (
            <div key={cred.label} className="flex items-center gap-3 text-text-secondary">
              <cred.icon className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm font-medium">{cred.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA + Contact */}
      <Section padding="default">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Not on the List? <GradientText>Get Your Free Audit</GradientText>
            </h2>
            <p className="text-text-secondary">
              If your business isn't listed above but you'd like a free website audit and mockup, get in touch. We'd love to help.
            </p>
          </motion.div>
          <ContactForm />
          <motion.p variants={fadeInUp} className="text-center text-text-muted text-sm mt-8">
            No obligation • Free consultation • Local Surrey developer
          </motion.p>
        </motion.div>
      </Section>

      <AuditFooter />
    </div>
  );
}
