import { motion } from 'framer-motion';

/**
 * Shared input styles for consistent form field appearance
 */
const baseInputStyles = `
  w-full px-4 py-3 rounded-xl
  bg-midnight/70 backdrop-blur-sm
  border border-white/10
  text-text-primary placeholder:text-text-muted
  focus:outline-none focus:border-neon-cyan/50
  focus:shadow-[0_0_20px_rgba(0,245,255,0.15),0_0_40px_rgba(0,245,255,0.05)]
  hover:border-white/20
  transition-all duration-300
`;

/**
 * Shared animated wrapper for form fields
 */
function FormFieldWrapper({ label, className = '', children, animate = true }) {
  const content = (
    <>
      {label && (
        <label className="block text-text-secondary text-sm font-medium mb-2">
          {label}
        </label>
      )}
      {children}
    </>
  );

  if (!animate) {
    return <div className={className}>{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {content}
    </motion.div>
  );
}

export function Input({ label, className = '', animate = true, ...props }) {
  return (
    <FormFieldWrapper label={label} className={className} animate={animate}>
      <input className={baseInputStyles} {...props} />
    </FormFieldWrapper>
  );
}

export function Textarea({ label, className = '', rows = 5, animate = true, ...props }) {
  return (
    <FormFieldWrapper label={label} className={className} animate={animate}>
      <textarea
        className={`${baseInputStyles} resize-none`}
        rows={rows}
        {...props}
      />
    </FormFieldWrapper>
  );
}
