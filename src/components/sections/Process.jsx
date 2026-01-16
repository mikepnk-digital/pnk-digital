import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Code2, RefreshCw, Clock, ArrowRight } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

const steps = [
  {
    number: '01',
    title: 'Spec It Right',
    description:
      "We don't do six weeks of discovery theater. We do focused sessions where we extract exactly what you need: your goals, constraints, and definition of done.",
    deliverable: 'A precise technical specification and project scope you can actually understand.',
    timeline: 'Days, not weeks',
    traditional: '6 weeks',
    neuralforge: '6 days',
    icon: Target,
    accentColor: 'cyan',
  },
  {
    number: '02',
    title: 'Build It Real',
    description:
      "While traditional agencies are presenting mood boards, we're shipping functional builds. You'll interact with real software, not static mockups.",
    deliverable: 'A working build you can test, break, and validate with real users.',
    timeline: 'First build in 2 weeks',
    traditional: '3 months',
    neuralforge: '2 weeks',
    icon: Code2,
    accentColor: 'magenta',
  },
  {
    number: '03',
    title: 'Refine It Fast',
    description:
      'Short iteration cycles mean you see progress constantly, give feedback immediately, and course-correct before small misalignments become expensive rewrites.',
    deliverable: 'Rapid refinements until it\'s exactly what you need.',
    timeline: 'Cycles in days',
    traditional: 'Quarterly reviews',
    neuralforge: 'Daily iterations',
    icon: RefreshCw,
    accentColor: 'purple',
  },
];

const accentColors = {
  cyan: {
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan',
    border: 'border-neon-cyan',
    glow: 'shadow-[0_0_30px_rgba(0,245,255,0.3)]',
    gradient: 'from-neon-cyan/20 to-neon-cyan/5',
  },
  magenta: {
    text: 'text-neon-magenta',
    bg: 'bg-neon-magenta',
    border: 'border-neon-magenta',
    glow: 'shadow-[0_0_30px_rgba(255,0,110,0.3)]',
    gradient: 'from-neon-magenta/20 to-neon-magenta/5',
  },
  purple: {
    text: 'text-neon-purple',
    bg: 'bg-neon-purple',
    border: 'border-neon-purple',
    glow: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    gradient: 'from-neon-purple/20 to-neon-purple/5',
  },
};

// Timeline path component
function ProcessPath({ isInView }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff006e" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M 200 180 Q 400 180 500 280 Q 600 380 800 380 Q 1000 380 1000 520"
        stroke="url(#pathGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#pathGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
          opacity: { duration: 0.3, delay: 0.5 },
        }}
      />
    </svg>
  );
}

// Step card component
function StepCard({ step, index, isInView }) {
  const colors = accentColors[step.accentColor];
  const Icon = step.icon;

  // Diagonal offset for desktop
  const offsets = [
    'lg:ml-0',
    'lg:ml-[15%] lg:-mt-8',
    'lg:ml-[30%] lg:-mt-8',
  ];

  return (
    <motion.div
      className={`relative ${offsets[index]} max-w-xl`}
      initial={{ opacity: 0, x: -60, y: 40 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -60, y: 40 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4 + index * 0.2,
      }}
    >
      {/* Oversized background number */}
      <motion.span
        className={`absolute -top-8 -left-4 text-[120px] lg:text-[180px] font-extrabold ${colors.text} opacity-0 select-none pointer-events-none`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 0.08, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
      >
        {step.number}
      </motion.span>

      {/* Card */}
      <motion.div
        className="relative p-8 lg:p-10 rounded-2xl bg-midnight/60 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
        whileHover={{ y: -4, boxShadow: '0 8px 40px rgba(0, 245, 255, 0.1)' }}
      >
        {/* Step label */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} border ${colors.border}/30 flex items-center justify-center group-hover:${colors.glow} transition-shadow duration-300`}
          >
            <Icon className={`w-5 h-5 ${colors.text}`} strokeWidth={1.5} />
          </div>
          <span className={`font-mono text-sm font-medium ${colors.text} tracking-wider uppercase`}>
            {step.number} — {step.title}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-semibold text-text-primary mb-4 group-hover:text-white transition-colors">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-6">{step.description}</p>

        {/* Deliverable block */}
        <div className={`p-4 rounded-r-lg border-l-[3px] ${colors.border} bg-gradient-to-r ${colors.gradient} mb-6`}>
          <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
            Deliverable
          </span>
          <p className="text-text-primary text-sm mt-1">{step.deliverable}</p>
        </div>

        {/* Timeline badge and comparison */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Timeline badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors.gradient} border ${colors.border}/30`}
          >
            <Clock className={`w-4 h-4 ${colors.text}`} />
            <span className={`text-sm font-semibold ${colors.text}`}>{step.timeline}</span>
          </div>

          {/* Comparison callout */}
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-md bg-neon-magenta/10 border border-neon-magenta/20 text-neon-magenta/70 line-through">
              {step.traditional}
            </span>
            <ArrowRight className="w-4 h-4 text-text-muted" />
            <span className={`px-3 py-1 rounded-md bg-neon-cyan/10 border border-neon-cyan/30 ${colors.text} font-medium`}>
              {step.neuralforge}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Process() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-midnight/30 to-void" />

      {/* Connecting path line */}
      <ProcessPath isInView={isInView} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-4xl mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-center lg:text-left text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            From Idea to Working Product
            <span className="block">
              <GradientText>Fast.</GradientText>
            </span>
          </h2>
          <motion.p
            className="text-center md:text-left text-lg lg:text-xl text-text-secondary leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Most agencies deliver decks. We deliver deployable code. Here's how we turn your
            vision into reality while others are still "aligning stakeholders."
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 lg:space-y-0">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
