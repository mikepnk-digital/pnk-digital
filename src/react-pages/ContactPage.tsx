import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Calendar, Phone } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { ContactForm } from '../components/sections/ContactForm';
import { fadeInUp, fadeInUpLarge, fadeInRight } from '../utils/animations';
import { EMAIL, EMAIL_HREF, LOCATION, PHONE_DISPLAY, PHONE_HREF, RESPONSE_PROMISE } from '../config/site';

const responsePromise = RESPONSE_PROMISE.charAt(0).toUpperCase() + RESPONSE_PROMISE.slice(1);

interface ContactPageProps {
  /** The booking calendar (BookingEmbed, rendered by contact.astro). */
  children?: ReactNode;
}

export function ContactPage({ children }: ContactPageProps) {
  return (
    <>

      {/* Header */}
      <Section padding="page-header">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto text-center">
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            <GradientText>Let's Talk</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed">
            Book a free 30-minute call below, or send us a message. No obligation, no hard sell.
          </motion.p>
        </motion.div>
      </Section>

      {/* Booking calendar */}
      {children && (
        <Section padding="sm">
          <div className="
            bg-midnight/60 backdrop-blur-sm
            rounded-2xl border border-neon-cyan/20
            p-4 sm:p-8
          ">
            <div className="flex items-center gap-3 mb-6 px-2 sm:px-0">
              <Calendar className="w-6 h-6 text-neon-cyan" />
              <h2 className="text-2xl font-bold text-text-primary">Book a Free 30-Minute Call</h2>
            </div>
            {children}
          </div>
        </Section>
      )}

      {/* Contact Form + details */}
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
              Tell us what you're working on and we'll get back to you {RESPONSE_PROMISE}.
            </motion.p>

            <ContactForm withTopics />
          </div>

          {/* Right: Contact Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
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
                  href={PHONE_HREF}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Phone</div>
                    <div className="text-text-primary group-hover:text-neon-cyan transition-colors font-medium">
                      {PHONE_DISPLAY}
                    </div>
                  </div>
                </a>

                <a
                  href={EMAIL_HREF}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Email</div>
                    <div className="text-text-primary group-hover:text-neon-cyan transition-colors font-medium">
                      {EMAIL}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-neon-purple" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Location</div>
                    <div className="text-text-primary font-medium">{LOCATION}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-pink/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-pink" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-0.5">Response Time</div>
                    <div className="text-text-primary font-medium">{responsePromise}</div>
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
