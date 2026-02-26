import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { submitContactForm, ApiError } from '../../utils/api';
import { staggerContainer, fadeInUp, viewportWithMargin } from '../../utils/animations';

const initialFormState = {
  name: '',
  email: '',
  company: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const response = await submitContactForm(formData);
      setSubmitStatus('success');
      setSubmitMessage(response.message || 'Thanks for reaching out. I\'ll get back to you within 24 hours.');
      setFormData(initialFormState);
    } catch (error) {
      setSubmitStatus('error');
      if (error instanceof ApiError && error.errors?.length > 0) {
        setSubmitMessage(error.errors.map((e: { message: string }) => e.message).join('. '));
      } else if (error instanceof Error) {
        setSubmitMessage(error.message || 'Something went wrong. Please try again.');
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportWithMargin}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
          <Input
            label="Your Name"
            name="name"
            placeholder="Jane Smith"
            value={formData.name}
            onChange={handleChange}
            required
            animate={false}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            animate={false}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Input
            label="Company (optional)"
            name="company"
            placeholder="Acme Inc."
            value={formData.company}
            onChange={handleChange}
            animate={false}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Textarea
            label="Tell me about your project"
            name="message"
            placeholder="What are you building? What problem are you trying to solve? Any timeline or budget in mind?"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
            animate={false}
          />
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-4">
          {submitStatus && (
            <div
              className={`flex items-start gap-3 p-4 rounded-lg ${
                submitStatus === 'success'
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}
            >
              {submitStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{submitMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Sending...</span>
            ) : (
              <>
                Send Message
                <Send className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
