import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import {
  projectTypes,
  featureCategories,
  timelineOptions,
  budgetRanges,
  calculateComplexity,
  getComplexityLabel,
} from '../../../data/projectBuilder';

// Helper to get feature label by id
function getFeatureLabel(featureId) {
  for (const category of featureCategories) {
    const feature = category.features.find((f) => f.id === featureId);
    if (feature) return feature.label;
  }
  return featureId;
}

export function BuilderSummary({ selections, onGetQuote, onReset }) {
  const selectedProjectType = projectTypes.find((t) => t.id === selections.projectType);
  const selectedTimeline = timelineOptions.find((t) => t.id === selections.timeline);
  const selectedBudget = budgetRanges.find((b) => b.id === selections.budget);

  const complexity = calculateComplexity(selections);
  const complexityLabel = getComplexityLabel(complexity);

  const hasSelections =
    selections.projectType ||
    selections.features.length > 0 ||
    selections.timeline ||
    selections.budget;

  const isComplete =
    selections.projectType &&
    selections.features.length > 0 &&
    selections.timeline &&
    selections.budget;

  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-midnight/80 backdrop-blur-xl border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-neon-cyan" />
          Your Project
        </h3>
        {hasSelections && (
          <motion.button
            onClick={onReset}
            className="text-sm text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        )}
      </div>

      {/* Summary content */}
      <div className="space-y-5">
        {/* Project Type */}
        <div>
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Project Type
          </label>
          <AnimatePresence mode="wait">
            {selectedProjectType ? (
              <motion.div
                key={selectedProjectType.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-2 mt-1"
              >
                <selectedProjectType.icon className="w-4 h-4 text-neon-cyan" />
                <span className="text-text-primary font-medium">
                  {selectedProjectType.title}
                </span>
              </motion.div>
            ) : (
              <motion.p
                key="empty-type"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-muted text-sm mt-1"
              >
                Not selected
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div>
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Features ({selections.features.length})
          </label>
          <AnimatePresence mode="wait">
            {selections.features.length > 0 ? (
              <motion.div
                key="features-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2 mt-2"
              >
                {selections.features.slice(0, 4).map((featureId) => (
                  <motion.span
                    key={featureId}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-1 rounded-md bg-neon-purple/20 text-neon-purple text-xs"
                  >
                    {getFeatureLabel(featureId)}
                  </motion.span>
                ))}
                {selections.features.length > 4 && (
                  <span className="px-2 py-1 rounded-md bg-white/10 text-text-muted text-xs">
                    +{selections.features.length - 4} more
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="empty-features"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-muted text-sm mt-1"
              >
                None selected
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline */}
        <div>
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Timeline
          </label>
          <AnimatePresence mode="wait">
            {selectedTimeline ? (
              <motion.div
                key={selectedTimeline.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="flex items-center gap-2 mt-1"
              >
                <selectedTimeline.icon className="w-4 h-4 text-neon-cyan" />
                <span className="text-text-primary font-medium">
                  {selectedTimeline.label}
                </span>
                <span className="text-text-muted text-sm">
                  ({selectedTimeline.duration})
                </span>
              </motion.div>
            ) : (
              <motion.p
                key="empty-timeline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-muted text-sm mt-1"
              >
                Not selected
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Budget */}
        <div>
          <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Investment
          </label>
          <AnimatePresence mode="wait">
            {selectedBudget ? (
              <motion.p
                key={selectedBudget.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-text-primary font-medium mt-1"
              >
                {selectedBudget.label}
              </motion.p>
            ) : (
              <motion.p
                key="empty-budget"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-text-muted text-sm mt-1"
              >
                Not selected
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-5">
          {/* Complexity indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Project Complexity
              </label>
              <span className="text-sm font-medium text-neon-cyan">{complexityLabel}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta"
                initial={{ width: 0 }}
                animate={{ width: `${complexity}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onGetQuote}
            disabled={!isComplete}
            className="w-full group"
            size="lg"
          >
            {isComplete ? (
              <>
                Get Custom Quote
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <CheckCircle2 className="inline-block mr-2 w-5 h-5" />
                Complete all steps
              </>
            )}
          </Button>

          {!isComplete && (
            <p className="text-xs text-text-muted text-center mt-3">
              Select options in all 4 categories to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
