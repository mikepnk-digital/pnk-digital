import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { fadeInUp } from '../../utils/animations';

interface CtaBannerProps {
  heading?: string;
  subtext?: string;
  buttonText?: string;
  buttonTo?: string;
}

export function CtaBanner({
  heading = "Got a project in mind?",
  subtext = "Book a free discovery call. No obligation, no hard sell — just a conversation about what you're building and how I can help.",
  buttonText = "Let's Talk",
  buttonTo = "/contact",
}: CtaBannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 via-neon-purple/10 to-neon-cyan/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void" />

      {/* Decorative border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-pink/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
        >
          {heading}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {subtext}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <Link to={buttonTo}>
            <Button size="lg">{buttonText}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
