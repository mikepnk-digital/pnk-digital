import { useState, useCallback, useMemo } from 'react';
import {
  projectTypes,
  featureCategories,
  timelineOptions,
  budgetRanges,
  calculateComplexity,
  getComplexityLabel,
} from '../data/projectBuilder';

/**
 * Initial state for project builder selections
 */
const initialSelections = {
  projectType: null,
  features: [],
  timeline: null,
  budget: null,
};

/**
 * Custom hook for managing ProjectBuilder state
 * Consolidates selection logic, validation, and derived data
 *
 * @returns {Object} State and handlers for ProjectBuilder
 */
export function useProjectBuilder() {
  const [selections, setSelections] = useState(initialSelections);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selection handlers
  const handleProjectTypeSelect = useCallback((typeId) => {
    setSelections((prev) => ({ ...prev, projectType: typeId }));
  }, []);

  const handleFeatureToggle = useCallback((featureId) => {
    setSelections((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId],
    }));
  }, []);

  const handleTimelineSelect = useCallback((timelineId) => {
    setSelections((prev) => ({ ...prev, timeline: timelineId }));
  }, []);

  const handleBudgetSelect = useCallback((budgetId) => {
    setSelections((prev) => ({ ...prev, budget: budgetId }));
  }, []);

  // Modal handlers
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Reset handler
  const reset = useCallback(() => {
    setSelections(initialSelections);
  }, []);

  // Derived data - computed from selections
  const selectedProjectType = useMemo(
    () => projectTypes.find((t) => t.id === selections.projectType),
    [selections.projectType]
  );

  const selectedTimeline = useMemo(
    () => timelineOptions.find((t) => t.id === selections.timeline),
    [selections.timeline]
  );

  const selectedBudget = useMemo(
    () => budgetRanges.find((b) => b.id === selections.budget),
    [selections.budget]
  );

  const selectedFeatures = useMemo(
    () => {
      const features = [];
      for (const category of featureCategories) {
        for (const feature of category.features) {
          if (selections.features.includes(feature.id)) {
            features.push(feature);
          }
        }
      }
      return features;
    },
    [selections.features]
  );

  // Complexity calculation
  const complexity = useMemo(
    () => calculateComplexity(selections),
    [selections]
  );

  const complexityLabel = useMemo(
    () => getComplexityLabel(complexity),
    [complexity]
  );

  // Validation flags
  const hasSelections = useMemo(
    () =>
      selections.projectType ||
      selections.features.length > 0 ||
      selections.timeline ||
      selections.budget,
    [selections]
  );

  const isComplete = useMemo(
    () =>
      selections.projectType &&
      selections.features.length > 0 &&
      selections.timeline &&
      selections.budget,
    [selections]
  );

  return {
    // Raw state
    selections,
    isModalOpen,

    // Selection handlers
    handleProjectTypeSelect,
    handleFeatureToggle,
    handleTimelineSelect,
    handleBudgetSelect,

    // Modal handlers
    openModal,
    closeModal,

    // Reset
    reset,

    // Derived data
    selectedProjectType,
    selectedTimeline,
    selectedBudget,
    selectedFeatures,

    // Complexity
    complexity,
    complexityLabel,

    // Validation
    hasSelections,
    isComplete,
  };
}

/**
 * Helper to get feature label by id
 * @param {string} featureId - The feature id to look up
 * @returns {string} The feature label or the id if not found
 */
export function getFeatureLabel(featureId) {
  for (const category of featureCategories) {
    const feature = category.features.find((f) => f.id === featureId);
    if (feature) return feature.label;
  }
  return featureId;
}
