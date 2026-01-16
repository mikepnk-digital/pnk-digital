import { getAccentColor } from '../../utils/colors';

/**
 * Reusable icon container with consistent styling
 * Consolidates the repeated icon box pattern from Card, About, Contact, Process components
 */
export function IconBox({
  icon: Icon,
  color = 'cyan',
  size = 'md',
  className = '',
  hoverGlow = true,
  isActive = false,
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

  // Dynamic gradient based on color
  const gradientClasses = {
    cyan: 'bg-gradient-to-br from-neon-cyan/20 to-neon-purple/10',
    purple: 'bg-gradient-to-br from-neon-purple/20 to-neon-magenta/10',
    magenta: 'bg-gradient-to-br from-neon-magenta/20 to-neon-purple/10',
    pink: 'bg-gradient-to-br from-brand-pink/20 to-neon-purple/10',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${isActive ? colors.bgSubtle : gradientClasses[color] || gradientClasses.cyan}
        ${colors.borderSubtle}
        border
        flex items-center justify-center shrink-0
        transition-all duration-300
        ${hoverGlow ? `group-hover:${colors.glowStrong} ${colors.hoverBorder}` : ''}
        ${isActive ? colors.glowStrong : ''}
        ${className}
      `}
    >
      {Icon && (
        <Icon
          className={`${iconSizeClasses[size]} ${colors.text}`}
          strokeWidth={1.5}
        />
      )}
    </div>
  );
}

/**
 * Step number indicator used in ProjectBuilder
 */
export function StepIndicator({ number, color = 'cyan', className = '' }) {
  const colorClasses = {
    cyan: 'bg-neon-cyan/20 text-neon-cyan',
    purple: 'bg-neon-purple/20 text-neon-purple',
    magenta: 'bg-neon-magenta/20 text-neon-magenta',
  };

  return (
    <span
      className={`
        w-8 h-8 rounded-lg
        flex items-center justify-center
        text-sm font-bold
        ${colorClasses[color] || colorClasses.cyan}
        ${className}
      `}
    >
      {number}
    </span>
  );
}
