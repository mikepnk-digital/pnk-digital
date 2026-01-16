import { forwardRef } from 'react';
import { GradientOrb } from '../decorative/GradientOrb';

/**
 * Reusable section wrapper with consistent padding, background, and optional decorative orbs
 * Reduces duplication across Hero, Services, About, Contact, Process, and ProjectBuilder sections
 */
export const Section = forwardRef(function Section(
  {
    id,
    children,
    className = '',
    padding = 'default',
    background = 'transparent',
    orbs = [],
    overflow = true,
  },
  ref
) {
  const paddingClasses = {
    none: '',
    sm: 'py-16 md:py-20',
    default: 'py-24 md:py-32',
    lg: 'py-32 md:py-40',
    hero: 'min-h-screen py-32',
  };

  const backgroundClasses = {
    transparent: '',
    midnight: 'bg-midnight/30',
    void: 'bg-void',
    gradient: 'bg-gradient-to-b from-void via-midnight/30 to-void',
    gradientMidnight: 'bg-gradient-to-b from-midnight/50 via-void to-midnight/50',
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`
        relative
        ${paddingClasses[padding] || paddingClasses.default}
        ${overflow ? 'overflow-hidden' : ''}
        ${className}
      `}
    >
      {/* Background layer */}
      {background !== 'transparent' && (
        <div className={`absolute inset-0 ${backgroundClasses[background]}`} />
      )}

      {/* Decorative gradient orbs */}
      {orbs.map((orb, index) => (
        <GradientOrb
          key={`${id}-orb-${index}`}
          color={orb.color}
          size={orb.size}
          top={orb.top}
          left={orb.left}
          right={orb.right}
          bottom={orb.bottom}
          opacity={orb.opacity || 0.06}
          blur={orb.blur || 100}
          animate={orb.animate ?? false}
        />
      ))}

      {/* Content with proper z-index */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
});

// Preset orb configurations for common layouts
export const orbPresets = {
  servicesLeft: [
    { color: 'purple', size: 500, top: '20%', left: '-200px', opacity: 0.08, blur: 120 },
    { color: 'cyan', size: 400, bottom: '10%', right: '-150px', opacity: 0.06, blur: 100 },
  ],
  contactDual: [
    { color: 'cyan', size: 500, top: '-100px', left: '-200px', opacity: 0.06, blur: 120 },
    { color: 'purple', size: 400, bottom: '-100px', right: '-150px', opacity: 0.05, blur: 100 },
  ],
  aboutRight: [
    { color: 'magenta', size: 400, top: '10%', right: '-100px', opacity: 0.06, blur: 100 },
  ],
};
