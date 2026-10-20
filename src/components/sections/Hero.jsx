import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { HeroOrbs } from '../decorative/GradientOrb';
import { ParticleBackground } from '../decorative/ParticleBackground';
import { DataTransformationViz } from '../decorative/DataTransformationViz';
import { createStaggerContainer, fadeInUpLarge } from '../../utils/animations';
import { useIsMobile } from '../../hooks';
import { CALL_LABEL, PHONE_DISPLAY, PHONE_HREF, YEARS_EXPERIENCE } from '../../config/site';

// Use shared animation utilities with hero-specific timing
const containerVariants = createStaggerContainer(0.15, 0.3);

export function Hero() {
  const isMobile = useIsMobile();

  return (
    // Content-height on phones so the first "door" below shows in the fold.
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern" id="home">
      {/* Animated particle background - disabled on mobile for performance */}
      {!isMobile && <ParticleBackground particleCount={50} connectionDistance={100} />}

      {/* Scroll-driven data transformation visualization - disabled on mobile */}
      {!isMobile && <DataTransformationViz opacity={0.5} />}

      {/* Floating gradient orbs - simplified on mobile */}
      {!isMobile && <HeroOrbs />}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 md:py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUpLarge}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm mb-6 md:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
            </span>
            Technology partner for small and growing businesses
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeInUpLarge}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8 max-w-5xl mx-auto"
          >
            <GradientText className="inline-block">
              One experienced partner for the technology your business runs on.
            </GradientText>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUpLarge}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed"
          >
            Support, AI and software, delivered by a senior engineer with {YEARS_EXPERIENCE} years in financial
            services — fixed prices, plain English, no agency layers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUpLarge}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="#book" data-book>
              <Button size="lg" className="group min-w-[200px]">
                {CALL_LABEL}
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* A plain link on phones (one button in the fold), a button from sm up. */}
            <a
              href={PHONE_HREF}
              className="
                inline-flex items-center justify-center gap-2 rounded-lg font-medium
                text-text-secondary hover:text-brand-pink transition-all duration-300
                sm:min-w-[200px] sm:px-8 sm:py-4 sm:text-lg sm:text-brand-pink
                sm:border sm:border-brand-pink/50 sm:hover:bg-brand-pink/10 sm:hover:border-brand-pink
              "
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              {PHONE_DISPLAY}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-abyss via-abyss/50 to-transparent pointer-events-none" />
    </section>
  );
}
