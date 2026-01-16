import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Section, orbPresets } from '../ui/Section';
import { Button } from '../ui/Button';
import { Input, Textarea, Select } from '../ui/Input';
import { IconBox } from '../ui/IconBox';
import { useFormState } from '../../hooks';
import { staggerContainer, fadeInUp, fadeInRight, viewportWithMargin } from '../../utils/animations';
import { submitContactForm, ApiError } from '../../utils/api';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@pnk-digital.com',
    href: 'mailto:hello@pnk-digital.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Surrey, UK',
    href: '#',
  },
];

const projectTypes = [
  { value: 'website', label: 'Website Development' },
  { value: 'application', label: 'Application Development' },
  { value: 'software', label: 'Software Tools' },
  { value: 'consulting', label: 'AI Consulting' },
  { value: 'integration', label: 'AI Integration' },
  { value: 'support', label: 'Ongoing Support' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '10k-25k', label: '£10k - £25k' },
  { value: '25k-50k', label: '£25k - £50k' },
  { value: '50k-100k', label: '£50k - £100k' },
  { value: '100k-250k', label: '£100k - £250k' },
  { value: '250k+', label: '£250k+' },
];

// Initial form state
const initialFormState = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: '',
};

export function Contact() {
  // Use the custom form state hook
  const {
    formData,
    isSubmitting,
    handleChange,
    createSubmitHandler,
  } = useFormState(initialFormState);

  // Submission feedback state
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');

  // Create the submit handler
  const handleSubmit = createSubmitHandler(
    async (data) => {
      setSubmitStatus(null);
      setSubmitMessage('');

      try {
        const response = await submitContactForm(data);
        setSubmitStatus('success');
        setSubmitMessage(response.message || 'Thank you for your enquiry. We will be in touch shortly.');
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitStatus('error');
        if (error instanceof ApiError && error.errors?.length > 0) {
          setSubmitMessage(error.errors.map(e => e.message).join('. '));
        } else {
          setSubmitMessage(error.message || 'Something went wrong. Please try again.');
        }
        throw error; // Re-throw to prevent form reset
      }
    },
    { resetOnSuccess: true }
  );

  return (
    <Section id="contact" orbs={orbPresets.contactDual}>
      <SectionHeading
        title="Ready to Move Faster?"
        subtitle="While your competitors are getting quotes from agencies and interviewing dev teams, you could already be building. Tell us what you need—we'll tell you how fast we can deliver it and what it'll actually cost. No fluff, no surprises."
        gradient
      />

      <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Contact Form */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportWithMargin}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Your Name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Work Email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Input
                  label="Company Name"
                  name="company"
                  placeholder="Acme Corporation"
                  value={formData.company}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                <Select
                  label="What Are You Building?"
                  name="projectType"
                  options={projectTypes}
                  placeholder="Select a project type..."
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="Investment Range"
                  name="budget"
                  options={budgetRanges}
                  placeholder="Select your budget range..."
                  value={formData.budget}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Textarea
                  label="Tell Us About Your Project"
                  name="message"
                  placeholder="Describe your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
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
                    <>
                      <span className="animate-pulse">Sending...</span>
                    </>
                  ) : (
                    <>
                      Let's Talk
                      <Send className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Panel */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="
              bg-midnight/60 backdrop-blur-sm
              rounded-2xl border border-white/5
              p-8
              hover:border-white/10
              transition-colors duration-300
            ">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Have a question or want to learn more about how we can help?
                Reach out through any of these channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <IconBox icon={item.icon} color="cyan" size="md" className="w-12 h-12" />
                    <div>
                      <div className="text-sm text-text-muted mb-1">{item.label}</div>
                      <div className="text-text-primary group-hover:text-neon-cyan transition-colors font-medium">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
    </Section>
  );
}
