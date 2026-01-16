import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input, Textarea } from '../../ui/Input';
import {
  projectTypes,
  featureCategories,
  timelineOptions,
  budgetRanges,
} from '../../../data/projectBuilder';

// Helper to get feature label by id
function getFeatureLabel(featureId) {
  for (const category of featureCategories) {
    const feature = category.features.find((f) => f.id === featureId);
    if (feature) return feature.label;
  }
  return featureId;
}

export function SubmissionModal({ isOpen, onClose, selections }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedProjectType = projectTypes.find((t) => t.id === selections.projectType);
  const selectedTimeline = timelineOptions.find((t) => t.id === selections.timeline);
  const selectedBudget = budgetRanges.find((b) => b.id === selections.budget);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-midnight border border-white/10 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              // Success state
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-20 h-20 rounded-full bg-neon-cyan/20 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-neon-cyan" />
                </motion.div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  Request Submitted!
                </h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Thanks for your interest. Our team will review your project
                  requirements and get back to you within 24 hours.
                </p>
                <Button onClick={handleClose}>Close</Button>
              </div>
            ) : (
              // Form state
              <div className="p-8">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Get Your Custom Quote
                </h3>
                <p className="text-text-secondary mb-8">
                  Review your selections and provide your contact details.
                </p>

                {/* Project summary */}
                <div className="p-4 rounded-xl bg-void/50 border border-white/5 mb-8">
                  <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                    Project Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-muted">Type:</span>
                      <span className="ml-2 text-text-primary">
                        {selectedProjectType?.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-muted">Timeline:</span>
                      <span className="ml-2 text-text-primary">
                        {selectedTimeline?.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-muted">Budget:</span>
                      <span className="ml-2 text-text-primary">
                        {selectedBudget?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-text-muted">Features:</span>
                      <span className="ml-2 text-text-primary">
                        {selections.features.length} selected
                      </span>
                    </div>
                  </div>
                  {selections.features.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex flex-wrap gap-2">
                        {selections.features.map((featureId) => (
                          <span
                            key={featureId}
                            className="px-2 py-1 rounded-md bg-neon-purple/10 text-neon-purple text-xs"
                          >
                            {getFeatureLabel(featureId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                    <Input
                      label="Work Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>

                  <Input
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc (optional)"
                  />

                  <Textarea
                    label="Additional Context"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project goals, timeline constraints, or any specific requirements..."
                    rows={4}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email}
                    className="w-full"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="inline-block mr-2 w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="inline-block mr-2 w-5 h-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
