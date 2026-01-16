import { motion } from 'framer-motion';

export function GradientText({ children, className = '', animate = false }) {
  const baseClasses = `
    bg-gradient-to-r from-neon-cyan via-neon-purple to-brand-pink
    bg-clip-text text-transparent
    bg-[length:200%_auto]
  `;

  if (animate) {
    return (
      <motion.span
        className={`${baseClasses} ${className}`}
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`${baseClasses} ${className}`}>
      {children}
    </span>
  );
}
