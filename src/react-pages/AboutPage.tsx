import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Shield, Target, Bot, GitBranch, Users, Lightbulb } from 'lucide-react';
import mikePinkPhoto from '../assets/mike-pink.jpg?url';
import { Section, orbPresets } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { CtaBanner } from '../components/sections/CtaBanner';
import { staggerContainer, fadeInUp, fadeInUpLarge, fadeInLeft, fadeInRight, viewportWithMargin } from '../utils/animations';

const processSteps = [
  {
    icon: MessageSquare,
    title: 'Discovery Call',
    description: "A 30-minute conversation to understand your project, goals, and constraints. I'll ask the right questions to scope things properly - no sales pitch.",
  },
  {
    icon: Target,
    title: 'Proposal & Scope',
    description: "You get a clear proposal with defined deliverables, timeline, and fixed pricing. No surprises, no scope creep without your say-so.",
  },
  {
    icon: Bot,
    title: 'AI-Accelerated Build',
    description: "I use AI tooling to handle repetitive work while I focus on architecture, quality, and the decisions that count. You get faster delivery without cutting corners.",
  },
  {
    icon: GitBranch,
    title: 'Iterative Delivery',
    description: "You see working software early and often. Regular check-ins, deployed previews, and the ability to course-correct before it's too late.",
  },
];

const values = [
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    benefit: "You get production-quality software in weeks because I use better tools, not because I skip testing or cut corners.",
  },
  {
    icon: Shield,
    title: 'Radical Transparency',
    benefit: "You always know where your project stands. No status meetings to schedule - you can see the work as it happens.",
  },
  {
    icon: Users,
    title: 'Direct Access',
    benefit: "You talk to the person writing your code. Questions get answered in hours, not days. Decisions don't get lost in translation.",
  },
  {
    icon: Lightbulb,
    title: 'Honest Advice',
    benefit: "I'll tell you if something is a bad idea, suggest simpler alternatives, or recommend you don't need what you think you need. My job is to solve your problem, not maximise my invoice.",
  },
];

export function AboutPage() {
  return (
    <>

      {/* Intro / Story Section */}
      <Section padding="page-header" orbs={orbPresets.aboutRight}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="
              w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-2xl
              border border-white/10
              overflow-hidden
            ">
              <img
                src={mikePinkPhoto}
                alt="Mike Pink - Senior Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="
                inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-sm
              ">
                The Person Behind PNK Digital
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              I'm Mike. I build software <GradientText>that ships.</GradientText>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-6">
              For 25 years, I've been building production web applications for startups, scale-ups,
              and enterprise clients across the UK. I've seen
              how software gets built inside agencies and consultancies: layers of management,
              junior developers learning on client budgets, and timelines that balloon because
              nobody wants to make a decision.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-6">
              I started PNK Digital because I believed there was a better way. AI tooling has
              changed what a single experienced developer can ship. The productivity gains
              are real - not because AI writes perfect code, but because it handles the tedious
              parts and frees me up for the things that actually matter: architecture, user
              experience, and getting your product to market.
            </motion.p>

            <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed">
              You get senior-level expertise on every line of code, at a speed and price
              that traditional agencies can't touch.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Founder-Led Positioning */}
      <Section background="midnight">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            PNK Digital is <GradientText>one person.</GradientText> That's the point.
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-8">
            Most agencies sell you a team. What you actually get is a project manager relaying
            messages to a junior developer who's Googling how to do what you need. I cut all of
            that out.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left"
          >
            {[
              { label: 'Low overhead', detail: 'No office, no middle management, no bloated margins. You pay for development, not infrastructure.' },
              { label: 'Direct communication', detail: 'You talk to the developer. Questions answered in hours, not routed through three people over three days.' },
              { label: 'Senior expertise on every project', detail: 'Every line of code is written by someone with 25 years of experience. No juniors, no interns, no bait-and-switch.' },
              { label: 'Accountability', detail: 'One person, one project, full ownership. If something\'s wrong, there\'s nobody to blame but me - and I fix it fast.' },
            ].map((point) => (
              <div
                key={point.label}
                className="p-5 rounded-xl bg-void/50 border border-white/5"
              >
                <h3 className="text-text-primary font-semibold mb-2">{point.label}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* How I Work */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            <GradientText>How I Work</GradientText>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            From first conversation to working software, with as little friction as possible.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {processSteps.map((step, index) => (
            <motion.div key={step.title} variants={fadeInUp}>
              <div className="
                relative p-6 rounded-2xl h-full
                bg-midnight/60 backdrop-blur-sm
                border border-white/10
                group
              ">
                {/* Step number */}
                <div className="
                  absolute -top-3 -left-1 w-8 h-8 rounded-full
                  bg-brand-pink text-white text-sm font-bold
                  flex items-center justify-center
                ">
                  {index + 1}
                </div>

                <div className="
                  w-12 h-12 rounded-xl mb-4 mt-2
                  bg-gradient-to-br from-neon-cyan/20 to-neon-purple/5
                  border border-neon-cyan/20
                  flex items-center justify-center
                ">
                  <step.icon className="w-6 h-6 text-neon-cyan" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Values / Principles */}
      <Section background="midnight" orbs={orbPresets.servicesLeft}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUpLarge} className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            <GradientText>What I Stand For</GradientText>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Not platitudes on a wall - principles that directly affect how your project gets built.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={fadeInUp}>
              <div className="
                p-6 rounded-2xl h-full
                bg-void/50 backdrop-blur-sm
                border border-white/5
                hover:border-white/10
                transition-colors duration-300
              ">
                <div className="
                  w-10 h-10 rounded-lg mb-4
                  bg-gradient-to-br from-brand-pink/20 to-brand-pink/5
                  border border-brand-pink/20
                  flex items-center justify-center
                ">
                  <value.icon className="w-5 h-5 text-brand-pink" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {value.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CTA */}
      <CtaBanner
        heading="Want to know more?"
        subtext="Book a discovery call and let's talk about your project. No obligation, no hard sell."
        buttonText="Get in Touch"
      />
    </>
  );
}
