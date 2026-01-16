import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Input, Textarea, Select } from '../ui/Input';
import { GradientOrb } from '../decorative/GradientOrb';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@neuralforge.dev',
    href: 'mailto:hello@neuralforge.dev',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (415) 555-0192',
    href: 'tel:+14155550192',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
  },
];

const projectTypes = [
  { value: 'custom-ai', label: 'Custom AI Development' },
  { value: 'ml', label: 'Machine Learning Systems' },
  { value: 'integration', label: 'AI Integration' },
  { value: 'consulting', label: 'AI Consulting' },
  { value: 'data', label: 'Data Engineering' },
  { value: 'support', label: 'AI Maintenance & Support' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '10k-25k', label: '$10k - $25k' },
  { value: '25k-50k', label: '$25k - $50k' },
  { value: '50k-100k', label: '$50k - $100k' },
  { value: '100k-250k', label: '$100k - $250k' },
  { value: '250k+', label: '$250k+' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Reset form or show success message
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <GradientOrb
        color="cyan"
        size={500}
        top="-100px"
        left="-200px"
        opacity={0.06}
        blur={120}
        animate={false}
      />
      <GradientOrb
        color="purple"
        size={400}
        bottom="-100px"
        right="-150px"
        opacity={0.05}
        blur={100}
        animate={false}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Let's Build Something Intelligent"
          subtitle="Every breakthrough starts with a conversation. Tell us what you're trying to solve—we'll tell you exactly how we can help, what it takes, and whether we're the right fit. No pitch decks, no pressure."
          gradient
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
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

              <motion.div variants={itemVariants}>
                <Input
                  label="Company Name"
                  name="company"
                  placeholder="Acme Corporation"
                  value={formData.company}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
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

              <motion.div variants={itemVariants}>
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

              <motion.div variants={itemVariants}>
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
                      Send Message
                      <Send className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="
              bg-midnight/60 backdrop-blur-sm
              rounded-2xl border border-white/5
              p-8 h-full
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
                    <div className="
                      w-12 h-12 rounded-xl
                      bg-gradient-to-br from-neon-cyan/20 to-neon-purple/10
                      border border-neon-cyan/20
                      flex items-center justify-center shrink-0
                      group-hover:shadow-[0_0_25px_rgba(0,245,255,0.3)]
                      group-hover:border-neon-cyan/40
                      transition-all duration-300
                    ">
                      <item.icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted mb-1">{item.label}</div>
                      <div className="text-text-primary group-hover:text-neon-cyan transition-colors font-medium">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-sm text-text-muted mb-4">
                  Prefer to schedule a call?
                </p>
                <a
                  href="#"
                  className="
                    inline-flex items-center text-sm text-neon-cyan
                    hover:text-neon-purple
                    transition-colors duration-300
                    group
                  "
                >
                  Book a 30-min discovery call
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
