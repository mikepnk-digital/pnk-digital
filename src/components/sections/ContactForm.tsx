import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { submitContactForm, ApiError } from '../../utils/api';
import { RESPONSE_PROMISE } from '../../config/site';
import { staggerContainer, fadeInUp, viewportWithMargin } from '../../utils/animations';

const COOLDOWN_SECONDS = 60;
const COOLDOWN_STORAGE_KEY = 'contactForm_lastSubmit';

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
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Layer 1: Honeypot — hidden field that bots auto-fill
  const [honeypot, setHoneypot] = useState('');

  // Layer 2: Time-based — track when the form mounted
  const mountTimeRef = useRef(Date.now());

  // Layer 3: Client-side cooldown — restore from sessionStorage
  const getCooldownRemaining = useCallback(() => {
    const lastSubmit = sessionStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (!lastSubmit) return 0;
    const elapsed = Math.floor((Date.now() - Number(lastSubmit)) / 1000);
    return Math.max(0, COOLDOWN_SECONDS - elapsed);
  }, []);

  useEffect(() => {
    const remaining = getCooldownRemaining();
    if (remaining <= 0) return;

    setCooldownRemaining(remaining);
    const interval = setInterval(() => {
      const r = getCooldownRemaining();
      setCooldownRemaining(r);
      if (r <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [getCooldownRemaining]);

  const startCooldown = () => {
    sessionStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
    setCooldownRemaining(COOLDOWN_SECONDS);
    const interval = setInterval(() => {
      const r = getCooldownRemaining();
      setCooldownRemaining(r);
      if (r <= 0) clearInterval(interval);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    // Layer 1: Honeypot — if filled, fake success without calling API
    if (honeypot) {
      setSubmitStatus('success');
      setSubmitMessage(`Thanks for reaching out. We'll get back to you ${RESPONSE_PROMISE}.`);
      setFormData(initialFormState);
      setIsSubmitting(false);
      return;
    }

    // Layer 2: Time-based — if submitted too fast, fake success
    const elapsed = Date.now() - mountTimeRef.current;
    if (elapsed < 3000) {
      setSubmitStatus('success');
      setSubmitMessage(`Thanks for reaching out. We'll get back to you ${RESPONSE_PROMISE}.`);
      setFormData(initialFormState);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitContactForm({
        ...formData,
        _t: elapsed,
      });
      setSubmitStatus('success');
      setSubmitMessage(response.message || `Thanks for reaching out. We'll get back to you ${RESPONSE_PROMISE}.`);
      setFormData(initialFormState);
      startCooldown();

      // Google Ads conversion tracking
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-17989609549/hzhOCO2094EcEM3QjoJD' });
      }
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

  const isCoolingDown = cooldownRemaining > 0;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportWithMargin}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Layer 1: Honeypot field — hidden from real users, auto-filled by bots */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        >
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

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
            disabled={isSubmitting || isCoolingDown}
          >
            {isSubmitting ? (
              <span className="animate-pulse">Sending...</span>
            ) : isCoolingDown ? (
              <span>Message sent. You can send another in {cooldownRemaining}s</span>
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
