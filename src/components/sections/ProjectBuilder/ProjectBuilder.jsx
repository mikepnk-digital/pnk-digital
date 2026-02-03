import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GradientText } from '../../ui/GradientText';
import { StepIndicator } from '../../ui/IconBox';
import { ProjectTypeSelector } from './ProjectTypeSelector';
import { FeatureSelector } from './FeatureSelector';
import { TimelineSelector } from './TimelineSelector';
import { BudgetSelector } from './BudgetSelector';
import { BuilderSummary } from './BuilderSummary';
import { SubmissionModal } from './SubmissionModal';
import { useProjectBuilder } from '../../../hooks';
import { createStaggerContainer, fadeInUp, smoothEase } from '../../../utils/animations';

const containerVariants = createStaggerContainer(0.15, 0.2);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

export function ProjectBuilder() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  // Use the custom hook for all state management
  const {
    selections,
    isModalOpen,
    handleProjectTypeSelect,
    handleFeatureToggle,
    handleTimelineSelect,
    handleBudgetSelect,
    openModal,
    closeModal,
    reset,
  } = useProjectBuilder();

  return (
    <section
      id="project-builder"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-void to-midnight/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center lg:text-left text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Build Your <GradientText>AI Project</GradientText>
          </h2>
          <p className="text-center md:text-left text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto md:mx-0">
            Configure your project requirements in minutes. Select features, set your
            timeline, and get an instant complexity assessment with a custom quote.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Selection area - left side */}
          <motion.div
            className="lg:col-span-3 space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Project Type */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <StepIndicator number={1} color="cyan" />
                What type of project?
              </h3>
              <ProjectTypeSelector
                selected={selections.projectType}
                onSelect={handleProjectTypeSelect}
              />
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <StepIndicator number={2} color="purple" />
                What capabilities do you need?
              </h3>
              <FeatureSelector
                selected={selections.features}
                onToggle={handleFeatureToggle}
              />
            </motion.div>

            {/* Timeline */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <StepIndicator number={3} color="magenta" />
                What's your timeline?
              </h3>
              <TimelineSelector
                selected={selections.timeline}
                onSelect={handleTimelineSelect}
              />
            </motion.div>

            {/* Budget */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <StepIndicator number={4} color="cyan" />
                What's your budget range?
              </h3>
              <BudgetSelector
                selected={selections.budget}
                onSelect={handleBudgetSelect}
              />
            </motion.div>
          </motion.div>

          {/* Summary panel - right side */}
          <div className="lg:col-span-2">
            <motion.div
              className="lg:sticky lg:top-24"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <BuilderSummary
                selections={selections}
                onGetQuote={openModal}
                onReset={reset}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selections={selections}
      />
    </section>
  );
}

export default ProjectBuilder;
