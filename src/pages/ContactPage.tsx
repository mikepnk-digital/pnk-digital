import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { ContactForm } from '../components/sections/ContactForm';
import { staggerContainer, fadeInUp, fadeInUpLarge, fadeInRight, viewportWithMargin } from '../utils/animations';

export function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - PNK Digital</title>
        <meta name="description" content="Get in touch to discuss your project. Book a discovery call or send a message. No obligation, no hard sell." />
        <meta property="og:title" content="Contact - PNK Digital" />
        <meta property="og:description" content="Get in touch to discuss your project. Book a discovery call or send a message. No obligation, no hard sell." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pnk-digital.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - PNK Digital" />
        <meta name="twitter:description" content="Get in touch to discuss your project. Book a discovery call or send a message." />
      </Helmet>

      {/* Header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            <GradientText>Let's Talk</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            Whether you have a specific project in mind or just want to explore what's possible,
            I'd love to hear from you. No obligation, no hard sell.
          </motion.p>
        </motion.div>
      </Section>

      {/* Discovery Call + Contact Form */}
      <Section padding="sm">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: Form */}
          <div className="lg:col-span-3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-text-primary mb-2"
            >
              Send a Message
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              Tell me what you're working on and I'll get back to you within 24 hours.
            </motion.p>

            <ContactForm />
          </div>

          {/* Right: Discovery Call + Contact Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Discovery Call Card */}
            <div className="
              bg-midnight/60 backdrop-blur-sm
              rounded-2xl border border-neon-cyan/20
              p-8
              hover:border-neon-cyan/40
              transition-colors duration-300
            ">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-neon-cyan" />
                <h3 className="text-xl font-semibold text-text-primary">Book a Discovery Call</h3>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                A 30-minute conversation to understand your project, explore options,
                and see if we're a good fit. No obligation, no hard sell - just a
                straightforward chat about what you're building.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  'Understand your goals and timeline',
                  'Discuss the right technical approach',
                  'Get a realistic scope and estimate',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-neon-cyan mt-0.5">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="
              bg-midnight/60 backdrop-blur-sm
              rounded-2xl border border-white/5
              p-8
              hover:border-white/10
              transition-colors duration-300
            ">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Contact Details</h3>

              <div className="space-y-5">
                <a
                  href="mailto:hello@pnk-digital.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Email</div>
                    <div className="text-text-primary group-hover:text-neon-cyan transition-colors font-medium">
                      hello@pnk-digital.com
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Location</div>
                    <div className="text-text-primary font-medium">Surrey, UK</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Response Time</div>
                    <div className="text-text-primary font-medium">Within 24 hours</div>
                    <div className="text-text-muted text-xs mt-0.5">Usually much faster</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
