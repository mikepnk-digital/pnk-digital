import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import {
  SummaryField,
  SelectedItem,
  FeatureTagList,
  ComplexityIndicator,
} from '../../ui/SummaryField';
import {
  projectTypes,
  timelineOptions,
  budgetRanges,
  calculateComplexity,
  getComplexityLabel,
} from '../../../data/projectBuilder';
import { getFeatureLabel } from '../../../hooks';

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
        <SummaryField label="Project Type">
          {selectedProjectType && (
            <SelectedItem
              icon={selectedProjectType.icon}
              label={selectedProjectType.title}
            />
          )}
        </SummaryField>

        {/* Features */}
        <SummaryField
          label={`Features (${selections.features.length})`}
          emptyText="None selected"
        >
          {selections.features.length > 0 && (
            <FeatureTagList
              features={selections.features}
              maxDisplay={4}
              getLabel={getFeatureLabel}
            />
          )}
        </SummaryField>

        {/* Timeline */}
        <SummaryField label="Timeline">
          {selectedTimeline && (
            <SelectedItem
              icon={selectedTimeline.icon}
              label={selectedTimeline.label}
              sublabel={selectedTimeline.duration}
            />
          )}
        </SummaryField>

        {/* Budget */}
        <SummaryField label="Investment">
          {selectedBudget && (
            <span className="text-text-primary font-medium">
              {selectedBudget.label}
            </span>
          )}
        </SummaryField>

        {/* Divider */}
        <div className="border-t border-white/10 pt-5">
          {/* Complexity indicator */}
          <div className="mb-6">
            <ComplexityIndicator score={complexity} label={complexityLabel} />
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
