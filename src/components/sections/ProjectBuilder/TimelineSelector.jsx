import { motion } from 'framer-motion';
import { timelineOptions } from '../../../data/projectBuilder';

const accentStyles = {
  magenta: {
    border: 'border-neon-magenta/60',
    bg: 'bg-neon-magenta/20',
    text: 'text-neon-magenta',
    glow: 'shadow-[0_0_25px_rgba(255,0,110,0.2)]',
    dot: 'bg-neon-magenta',
  },
  cyan: {
    border: 'border-neon-cyan/60',
    bg: 'bg-neon-cyan/20',
    text: 'text-neon-cyan',
    glow: 'shadow-[0_0_25px_rgba(0,245,255,0.2)]',
    dot: 'bg-neon-cyan',
  },
  purple: {
    border: 'border-neon-purple/60',
    bg: 'bg-neon-purple/20',
    text: 'text-neon-purple',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.2)]',
    dot: 'bg-neon-purple',
  },
};

export function TimelineSelector({ selected, onSelect }) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-neon-magenta/30 via-neon-cyan/30 to-neon-purple/30 -translate-y-1/2 hidden sm:block" />

      {/* Timeline cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
        {timelineOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;
          const styles = accentStyles[option.accentColor];

          return (
            <motion.button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`
                relative p-4 sm:p-6 rounded-xl text-left sm:text-center
                bg-midnight/60 backdrop-blur-sm
                border transition-all duration-300
                ${isSelected
                  ? `${styles.border} ${styles.glow}`
                  : 'border-white/10 hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Dot indicator on line */}
              <div
                className={`
                  absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full
                  border-2 border-midnight transition-all duration-300 hidden sm:block
                  ${isSelected ? styles.dot : 'bg-white/20'}
                `}
              />

              {/* Icon and content - horizontal on mobile */}
              <div className="flex gap-4 sm:block">
                {/* Icon */}
                <div
                  className={`
                    w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:mx-auto sm:mb-4 shrink-0
                    flex items-center justify-center
                    transition-all duration-300
                    ${isSelected ? styles.bg : 'bg-white/5'}
                  `}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-7 sm:h-7 transition-colors ${isSelected ? styles.text : 'text-text-secondary'}`}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  {/* Label */}
                  <h4
                    className={`font-semibold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-text-primary'}`}
                  >
                    {option.label}
                  </h4>

                  {/* Duration */}
                  <p className={`text-base sm:text-lg font-bold mb-1 ${isSelected ? styles.text : 'text-text-secondary'}`}>
                    {option.duration}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-text-muted">{option.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
