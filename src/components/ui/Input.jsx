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
 * Reduces duplication across Input, Textarea, and Select components
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

export function Select({ label, options = [], placeholder, className = '', animate = true, ...props }) {
  return (
    <FormFieldWrapper label={label} className={className} animate={animate}>
      <select
        className={`
          ${baseInputStyles}
          cursor-pointer
          appearance-none
          bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a1a1aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]
          bg-[length:1.25rem]
          bg-[right_0.75rem_center]
          bg-no-repeat
          pr-10
        `}
        {...props}
      >
        {placeholder && (
          <option value="" disabled className="bg-midnight text-text-muted">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-midnight text-text-primary">
            {option.label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
}

// Export for custom form field usage
export { FormFieldWrapper, baseInputStyles };
