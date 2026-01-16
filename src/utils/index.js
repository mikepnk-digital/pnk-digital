/**
 * Central export for utility functions and constants
 */

// Animation utilities
export {
  staggerContainer,
  createStaggerContainer,
  fadeInUp,
  fadeInUpLarge,
  fadeInLeft,
  fadeInRight,
  scaleOnHover,
  scaleOnHoverLarge,
  cardHover,
  springTransition,
  smoothEase,
  viewportOnce,
  viewportWithMargin,
  viewportSmallMargin,
} from './animations';

// Color system utilities
export {
  accentColors,
  getAccentColor,
  cardStyles,
  selectedStyles,
  unselectedStyles,
} from './colors';

// API utilities
export {
  submitContactForm,
  submitQuoteRequest,
  ApiError,
} from './api';
