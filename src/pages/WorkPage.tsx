import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { GradientText } from '../components/ui/GradientText';
import { CaseStudyCard } from '../components/ui/CaseStudyCard';
import { CtaBanner } from '../components/sections/CtaBanner';
import { portfolio } from '../data/portfolio';
import { staggerContainer, fadeInUp, fadeInUpLarge, viewportWithMargin } from '../utils/animations';

export function WorkPage() {
  return (
    <>
      <Helmet>
        <title>Work - PNK Digital</title>
        <meta name="description" content="Case studies and portfolio work from PNK Digital. React apps, AWS infrastructure, and AI-powered solutions." />
        <meta property="og:title" content="Work - PNK Digital" />
        <meta property="og:description" content="Case studies and portfolio work from PNK Digital. React apps, AWS infrastructure, and AI-powered solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pnk-digital.com/work" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work - PNK Digital" />
        <meta name="twitter:description" content="Case studies and portfolio work from PNK Digital. React apps, AWS infrastructure, and AI-powered solutions." />
      </Helmet>

      {/* Page header */}
      <Section padding="page-header">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 variants={fadeInUpLarge} className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            My <GradientText>Work</GradientText>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-text-secondary leading-relaxed mb-4">
            PNK Digital is new, and my portfolio here is growing. But the experience behind it
            isn't - I've spent 25 years building production software as a contract developer
            for startups, scale-ups, and enterprise clients across the UK.
          </motion.p>

          <motion.p variants={fadeInUp} className="text-text-secondary leading-relaxed">
            Below you'll find completed PNK Digital projects alongside placeholders for work
            that's in the pipeline. Every project showcases the same approach: senior expertise,
            AI-accelerated workflows, and software that ships fast.
          </motion.p>
        </motion.div>
      </Section>

      {/* Project grid */}
      <Section padding="sm">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {portfolio.map((project) => (
            <motion.div key={project.slug} variants={fadeInUp}>
              <CaseStudyCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <CtaBanner
        heading="Want to be featured here?"
        subtext="Let's build something worth showing off. Every project starts with a conversation."
        buttonText="Start a Project"
      />
    </>
  );
}
