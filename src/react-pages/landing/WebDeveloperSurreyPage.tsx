import { motion } from 'framer-motion';
import { Phone, MapPin, Code, Zap, Shield, Server, Headphones, CheckCircle } from 'lucide-react';
import { Link } from '@/lib/router';
import { Section } from '../../components/ui/Section';
import { GradientText } from '../../components/ui/GradientText';
import { Button } from '../../components/ui/Button';
import { ContactForm } from '../../components/sections/ContactForm';
import { Footer } from '../../components/layout/Footer';
import { staggerContainer, fadeInUp, fadeInUpLarge, fadeInRight, viewportWithMargin } from '../../utils/animations';
import logo from '../../assets/pnk-digital-logo.svg?url';

const usps = [
  {
    icon: Shield,
    title: 'No Agency Markup',
    description: 'You hire the developer directly. No account managers, no overhead - just senior expertise at a fair price.',
  },
  {
    icon: Zap,
    title: 'AI-Accelerated Delivery',
    description: 'Modern AI-powered workflows mean faster turnaround without cutting corners on quality.',
  },
  {
    icon: Code,
    title: '25+ Years Experience',
    description: 'Senior developer from day one. Your project won\'t be handed to a junior learning on the job.',
  },
  {
    icon: Server,
    title: 'Full Stack, One Person',
    description: 'Front-end, back-end, infrastructure - React, Node.js, and AWS. One developer handles everything.',
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Hosting and maintenance retainers from £75/month. Your site stays fast, secure, and up to date.',
  },
];

const pricingTiers = [
  {
    name: 'Quick Build',
    price: '£2–5k',
    description: 'Landing pages, brochure sites, and simple web apps',
    features: ['Custom design', 'Mobile responsive', 'Fast turnaround', 'CMS if needed'],
  },
  {
    name: 'Web Application',
    price: '£5–15k',
    description: 'Complex web apps, dashboards, and SaaS MVPs',
    features: ['React + Node.js', 'User authentication', 'Database design', 'API integrations'],
    highlighted: true,
  },
  {
    name: 'Complex Project',
    price: '£15k+',
    description: 'Enterprise systems, multi-service architectures, and large-scale platforms',
    features: ['AWS infrastructure', 'Scalable architecture', 'Ongoing development', 'Technical consulting'],
  },
];

export function WebDeveloperSurreyPage() {
  return (
    <>

      <div className="min-h-screen bg-abyss">
        {/* Header - logo matches site, no nav links (ad landing page) */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="PNK Digital" className="h-10 w-auto" />
              <span className="text-white font-semibold text-xl tracking-tight">PNK Digital</span>
            </Link>
            <a
              href="tel:01252279059"
              className="inline-flex items-center gap-2 text-brand-pink hover:text-neon-cyan transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">01252 279059</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </div>

        {/* Hero */}
        <Section padding="hero">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-sm text-text-secondary mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <MapPin className="w-4 h-4 text-brand-pink" />
              Based in Farnham, Surrey
            </motion.div>

            <motion.h1
              variants={fadeInUpLarge}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              <GradientText>Senior Web Developer</GradientText>
              <br />
              in Farnham, Surrey
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Custom websites and web apps - direct from the developer, no agency markup.
              React, Node.js &amp; AWS. 25+ years experience.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Book a Free 15-Minute Call
              </Button>
              <Button variant="secondary" size="lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
                View Pricing
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
              {['React', 'Node.js', 'AWS', 'TypeScript', 'Next.js'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Section>

        {/* USPs */}
        <Section padding="default" background="midnight">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Work With Me <GradientText>Directly?</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-secondary max-w-2xl mx-auto">
              Skip the agency. Get senior expertise from day one, faster delivery, and transparent pricing.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {usps.map((usp) => (
              <motion.div
                key={usp.title}
                variants={fadeInUp}
                className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:border-brand-pink/30 transition-colors"
              >
                <usp.icon className="w-8 h-8 text-brand-pink mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">{usp.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{usp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Pricing */}
        <Section id="pricing" padding="default">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              <GradientText>Transparent Pricing</GradientText>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-text-secondary max-w-2xl mx-auto">
              No hidden fees, no surprise invoices. Clear pricing bands so you know what to expect.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeInUp}
                className={`p-8 rounded-xl border transition-colors ${
                  tier.highlighted
                    ? 'border-brand-pink/50 bg-brand-pink/5 shadow-[0_0_30px_rgba(244,23,140,0.1)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                }`}
              >
                <h3 className="text-lg font-semibold text-text-primary mb-1">{tier.name}</h3>
                <p className="text-3xl font-bold text-text-primary mb-3">
                  <GradientText>{tier.price}</GradientText>
                </p>
                <p className="text-text-secondary text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Social Proof / Trust */}
        <Section padding="sm" background="gradient">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportWithMargin}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
              Built for <GradientText>Businesses Like Yours</GradientText>
            </motion.h2>
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-3 gap-8 mb-8">
              {[
                { stat: '25+', label: 'Years Experience' },
                { stat: '100%', label: 'UK-Based' },
                { stat: '24hr', label: 'Response Time' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl font-bold text-text-primary mb-1">
                    <GradientText>{item.stat}</GradientText>
                  </div>
                  <div className="text-sm text-text-secondary">{item.label}</div>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed">
              From local businesses in Surrey to startups across the UK - I build web applications
              that are fast, scalable, and maintainable. Every project gets my direct attention.
            </motion.p>
          </motion.div>
        </Section>

        {/* Contact Form */}
        <Section id="contact" padding="default">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportWithMargin}
              className="text-center mb-12"
            >
              <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                <GradientText>Get in Touch</GradientText>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-text-secondary max-w-xl mx-auto">
                Tell me about your project and I'll get back to you within 24 hours. No obligation, no hard sell.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportWithMargin}
                className="lg:col-span-2 space-y-8"
              >
                <motion.div variants={fadeInRight}>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Prefer to Talk?</h3>
                  <a
                    href="tel:01252279059"
                    className="inline-flex items-center gap-3 text-brand-pink hover:text-neon-cyan transition-colors text-lg font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    01252 279059
                  </a>
                  <p className="text-sm text-text-secondary mt-2">
                    Free 15-minute discovery call - no obligation.
                  </p>
                </motion.div>

                <motion.div variants={fadeInRight}>
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Location</h3>
                  <div className="flex items-start gap-3 text-text-secondary">
                    <MapPin className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5" />
                    <div>
                      <p>Farnham, Surrey</p>
                      <p className="text-sm mt-1">Serving Surrey, Hampshire, and the wider UK remotely</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInRight}>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-text-secondary">
                    {[
                      'I\'ll reply within 24 hours',
                      'We\'ll have a quick call to discuss your project',
                      'You\'ll get a clear proposal with fixed pricing',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Section>

        <Footer />
      </div>
    </>
  );
}

export default WebDeveloperSurreyPage;
