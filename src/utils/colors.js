/**
 * Shared accent color system for consistent theming
 * Centralizes color patterns used across components
 */

// Accent color configurations with Tailwind classes
export const accentColors = {
  cyan: {
    text: 'text-neon-cyan',
    bg: 'bg-neon-cyan',
    bgSubtle: 'bg-neon-cyan/20',
    border: 'border-neon-cyan',
    borderSubtle: 'border-neon-cyan/30',
    borderActive: 'border-neon-cyan/60',
    glow: 'shadow-[0_0_25px_rgba(0,245,255,0.2)]',
    glowStrong: 'shadow-[0_0_30px_rgba(0,245,255,0.3)]',
    gradient: 'from-neon-cyan/20 to-neon-cyan/5',
    hoverBorder: 'hover:border-neon-cyan/40',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]',
    raw: '#00f5ff',
    rawRgb: '0, 245, 255',
  },
  purple: {
    text: 'text-neon-purple',
    bg: 'bg-neon-purple',
    bgSubtle: 'bg-neon-purple/20',
    border: 'border-neon-purple',
    borderSubtle: 'border-neon-purple/30',
    borderActive: 'border-neon-purple/60',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.2)]',
    glowStrong: 'shadow-[0_0_30px_rgba(139,92,246,0.3)]',
    gradient: 'from-neon-purple/20 to-neon-purple/5',
    hoverBorder: 'hover:border-neon-purple/40',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    raw: '#8b5cf6',
    rawRgb: '139, 92, 246',
  },
  magenta: {
    text: 'text-neon-magenta',
    bg: 'bg-neon-magenta',
    bgSubtle: 'bg-neon-magenta/20',
    border: 'border-neon-magenta',
    borderSubtle: 'border-neon-magenta/30',
    borderActive: 'border-neon-magenta/60',
    glow: 'shadow-[0_0_25px_rgba(255,0,110,0.2)]',
    glowStrong: 'shadow-[0_0_30px_rgba(255,0,110,0.3)]',
    gradient: 'from-neon-magenta/20 to-neon-magenta/5',
    hoverBorder: 'hover:border-neon-magenta/40',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(255,0,110,0.15)]',
    raw: '#ff006e',
    rawRgb: '255, 0, 110',
  },
  pink: {
    text: 'text-brand-pink',
    bg: 'bg-brand-pink',
    bgSubtle: 'bg-brand-pink/20',
    border: 'border-brand-pink',
    borderSubtle: 'border-brand-pink/30',
    borderActive: 'border-brand-pink/60',
    glow: 'shadow-[0_0_25px_rgba(244,23,140,0.2)]',
    glowStrong: 'shadow-[0_0_30px_rgba(244,23,140,0.3)]',
    gradient: 'from-brand-pink/20 to-brand-pink/5',
    hoverBorder: 'hover:border-brand-pink/40',
    hoverGlow: 'hover:shadow-[0_0_30px_rgba(244,23,140,0.15)]',
    raw: '#f4178c',
    rawRgb: '244, 23, 140',
  },
};

// Helper to get accent color by name
export function getAccentColor(colorName) {
  return accentColors[colorName] || accentColors.cyan;
}

// Common card styling configurations
export const cardStyles = {
  base: `
    relative rounded-2xl
    bg-midnight/60 backdrop-blur-sm
    border border-white/10
    transition-all duration-300
  `,
  hover: `
    hover:border-white/20
    hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]
  `,
  hoverCyan: `
    hover:border-neon-cyan/40
    hover:shadow-[0_0_40px_rgba(0,245,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]
  `,
  hoverPurple: `
    hover:border-neon-purple/30
    hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
  `,
};

// Selected state styling for selectable cards
export const selectedStyles = {
  cyan: 'border-neon-cyan/60 shadow-[0_0_30px_rgba(0,245,255,0.15)]',
  purple: 'border-neon-purple/60 shadow-[0_0_30px_rgba(139,92,246,0.15)]',
  magenta: 'border-neon-magenta/60 shadow-[0_0_30px_rgba(255,0,110,0.15)]',
};

// Unselected state styling
export const unselectedStyles = 'border-white/10 hover:border-white/20';
