import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import { HeroOrbs } from '../decorative/GradientOrb';
import { ParticleBackground } from '../decorative/ParticleBackground';
import { DataTransformationViz } from '../decorative/DataTransformationViz';
import { createStaggerContainer, fadeInUpLarge } from '../../utils/animations';
import { useIsMobile } from '../../hooks';
import { CALL_LABEL, YEARS_EXPERIENCE } from '../../config/site';

// Use shared animation utilities with hero-specific timing
const containerVariants = createStaggerContainer(0.15, 0.3);

export function Hero() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern" id="home">
      {/* Animated particle background - disabled on mobile for performance */}
      {!isMobile && <ParticleBackground particleCount={50} connectionDistance={100} />}

      {/* Scroll-driven data transformation visualization - disabled on mobile */}
      {!isMobile && <DataTransformationViz opacity={0.5} />}

      {/* Floating gradient orbs - simplified on mobile */}
      {!isMobile && <HeroOrbs />}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUpLarge}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
            </span>
            Senior Developer, AI-Accelerated
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeInUpLarge}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          >
            <GradientText className="inline-block">
              Ship Faster. Spend Less. Build Better.
            </GradientText>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeInUpLarge}
            className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            PNK Digital is run by Mike Pink, a senior full-stack developer with {YEARS_EXPERIENCE} years building web
            applications and cloud architecture. We use AI-accelerated workflows to deliver production-quality
            software in weeks, not months. You work directly with Mike. No agency layers, no juniors, no surprises.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUpLarge}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="group min-w-[200px]">
                {CALL_LABEL}
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                View Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
