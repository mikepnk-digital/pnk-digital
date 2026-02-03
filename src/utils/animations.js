/**
 * Shared animation variants for Framer Motion
 * Centralizes animation patterns used across multiple components
 */

// Standard stagger container for lists and grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Variant with customizable stagger timing
export const createStaggerContainer = (staggerChildren = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Standard fade-up animation for child elements
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Larger fade-up for headers/hero elements
export const fadeInUpLarge = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Fade in from side (useful for panels)
export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Scale animations for interactive elements
export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
};

export const scaleOnHoverLarge = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
};

// Card hover animation
export const cardHover = {
  whileHover: { y: -8, scale: 1.01 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// Spring transition preset
export const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
};

// Smooth ease transition preset
export const smoothEase = [0.16, 1, 0.3, 1];

// Viewport options for scroll-triggered animations
// Using amount property for more reliable mobile detection
export const viewportOnce = { once: true, amount: 0.15 };
export const viewportWithMargin = { once: true, amount: 0.1 };
export const viewportSmallMargin = { once: true, amount: 0.05 };
