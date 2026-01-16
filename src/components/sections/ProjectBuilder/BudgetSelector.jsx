import { motion } from 'framer-motion';
import { budgetRanges } from '../../../data/projectBuilder';

export function BudgetSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {budgetRanges.map((range) => {
        const isSelected = selected === range.id;

        return (
          <motion.button
            key={range.id}
            onClick={() => onSelect(range.id)}
            className={`
              relative p-4 rounded-xl text-center
              bg-midnight/60 backdrop-blur-sm
              border transition-all duration-300
              ${isSelected
                ? 'border-neon-cyan/60 shadow-[0_0_25px_rgba(0,245,255,0.15)]'
                : 'border-white/10 hover:border-white/20'
              }
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Tier label */}
            <span
              className={`
                text-xs font-medium uppercase tracking-wider mb-2 block
                ${isSelected ? 'text-neon-cyan' : 'text-text-muted'}
              `}
            >
              {range.tier}
            </span>

            {/* Price range */}
            <span
              className={`
                text-sm font-semibold block
                ${isSelected ? 'text-white' : 'text-text-primary'}
              `}
            >
              {range.label}
            </span>

            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
