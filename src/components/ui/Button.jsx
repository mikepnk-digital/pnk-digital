import { motion } from 'framer-motion';

const variants = {
  primary: `
    bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta
    text-void font-semibold
    shadow-[0_0_20px_rgba(0,245,255,0.3),0_0_40px_rgba(0,245,255,0.15)]
    hover:shadow-[0_0_30px_rgba(0,245,255,0.5),0_0_60px_rgba(0,245,255,0.25)]
    hover:scale-[1.02]
    active:scale-[0.98]
  `,
  secondary: `
    border border-neon-cyan/50
    text-neon-cyan
    bg-transparent
    hover:bg-neon-cyan/10
    hover:border-neon-cyan
    hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]
  `,
  ghost: `
    text-text-secondary
    hover:text-neon-cyan
    hover:bg-white/5
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        rounded-lg font-medium
        transition-all duration-300 ease-out
        cursor-pointer
        inline-flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
