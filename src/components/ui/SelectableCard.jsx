import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { getAccentColor, selectedStyles, unselectedStyles } from '../../utils/colors';
import { scaleOnHover } from '../../utils/animations';

/**
 * Reusable selectable card component for ProjectBuilder selectors
 * Consolidates patterns from ProjectTypeSelector, TimelineSelector, and BudgetSelector
 */
export function SelectableCard({
  children,
  isSelected,
  onClick,
  color = 'cyan',
  showCheckmark = true,
  className = '',
  hoverScale = 1.02,
}) {
  const colors = getAccentColor(color);

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative rounded-xl text-left
        bg-midnight/60 backdrop-blur-sm
        border transition-all duration-300
        ${isSelected ? selectedStyles[color] || selectedStyles.cyan : unselectedStyles}
        ${className}
      `}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selected checkmark indicator */}
      {showCheckmark && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute top-3 right-3 w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center`}
        >
          <Check className="w-4 h-4 text-void" strokeWidth={3} />
        </motion.div>
      )}

      {children}
    </motion.button>
  );
}

/**
 * Icon container for selectable cards
 * Handles active/inactive states with appropriate styling
 */
export function SelectableIcon({
  icon: Icon,
  isSelected,
  color = 'cyan',
  size = 'md',
  className = '',
}) {
  const colors = getAccentColor(color);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-5 h-5 sm:w-7 sm:h-7',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center shrink-0
        transition-all duration-300
        ${isSelected
          ? `${colors.bgSubtle} ${colors.glowStrong}`
          : 'bg-white/5'
        }
        ${className}
      `}
    >
      <Icon
        className={`${iconSizeClasses[size]} transition-colors ${isSelected ? colors.text : 'text-text-secondary'}`}
        strokeWidth={1.5}
      />
    </div>
  );
}

/**
 * Selection indicator bar (used at bottom of cards like BudgetSelector)
 */
export function SelectionIndicator({ isSelected, color = 'cyan' }) {
  if (!isSelected) return null;

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
    />
  );
}

/**
 * Timeline dot indicator for TimelineSelector
 */
export function TimelineDot({ isSelected, color = 'cyan' }) {
  const colors = getAccentColor(color);

  return (
    <div
      className={`
        absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
        border-2 border-midnight transition-all duration-300 hidden sm:block
        ${isSelected ? colors.bg : 'bg-white/20'}
      `}
    />
  );
}
