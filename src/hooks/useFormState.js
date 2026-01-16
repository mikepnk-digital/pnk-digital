import { useState, useCallback } from 'react';

/**
 * Custom hook for managing form state with common operations
 * Reduces duplication in Contact and other form components
 *
 * @param {Object} initialState - Initial form values
 * @returns {Object} Form state and handlers
 */
export function useFormState(initialState = {}) {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  /**
   * Handle input change events
   * Works with input, textarea, and select elements
   */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  }, [errors]);

  /**
   * Set a specific field value programmatically
   */
  const setField = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Set multiple field values at once
   */
  const setFields = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setSubmitStatus(null);
  }, [initialState]);

  /**
   * Validate form using provided validation function
   * @param {Function} validateFn - Function that returns errors object
   * @returns {boolean} Whether form is valid
   */
  const validate = useCallback((validateFn) => {
    const validationErrors = validateFn(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData]);

  /**
   * Handle form submission with async support
   * @param {Function} submitFn - Async function to handle submission
   * @param {Object} options - Submission options
   */
  const handleSubmit = useCallback(async (submitFn, options = {}) => {
    const { validateFn, resetOnSuccess = false } = options;

    // Run validation if provided
    if (validateFn) {
      const isValid = validate(validateFn);
      if (!isValid) return false;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitFn(formData);
      setSubmitStatus('success');

      if (resetOnSuccess) {
        reset();
      }

      return true;
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate, reset]);

  /**
   * Create a submit handler for form onSubmit
   * @param {Function} submitFn - Async function to handle submission
   * @param {Object} options - Submission options
   */
  const createSubmitHandler = useCallback((submitFn, options = {}) => {
    return async (e) => {
      e.preventDefault();
      return handleSubmit(submitFn, options);
    };
  }, [handleSubmit]);

  return {
    // State
    formData,
    isSubmitting,
    errors,
    submitStatus,

    // Handlers
    handleChange,
    setField,
    setFields,
    reset,
    validate,
    handleSubmit,
    createSubmitHandler,

    // Computed properties
    isDirty: JSON.stringify(formData) !== JSON.stringify(initialState),
    hasErrors: Object.keys(errors).length > 0,
  };
}

/**
 * Hook for managing multi-step form state (like ProjectBuilder)
 * @param {Object} initialState - Initial selections
 * @returns {Object} Selection state and handlers
 */
export function useSelectionState(initialState = {}) {
  const [selections, setSelections] = useState(initialState);

  /**
   * Select a single option (radio-like behavior)
   */
  const select = useCallback((key, value) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }, []);

  /**
   * Toggle an item in an array (checkbox-like behavior)
   */
  const toggle = useCallback((key, value) => {
    setSelections((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  }, []);

  /**
   * Check if a value is selected
   */
  const isSelected = useCallback((key, value) => {
    const current = selections[key];
    if (Array.isArray(current)) {
      return current.includes(value);
    }
    return current === value;
  }, [selections]);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setSelections(initialState);
  }, [initialState]);

  /**
   * Get selection count for a key
   */
  const getCount = useCallback((key) => {
    const current = selections[key];
    if (Array.isArray(current)) {
      return current.length;
    }
    return current ? 1 : 0;
  }, [selections]);

  return {
    selections,
    select,
    toggle,
    isSelected,
    reset,
    getCount,
    setSelections,
  };
}
