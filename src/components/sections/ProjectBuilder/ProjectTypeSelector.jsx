import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { projectTypes } from '../../../data/projectBuilder';

export function ProjectTypeSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projectTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selected === type.id;

        return (
          <motion.button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`
              relative p-5 rounded-xl text-left
              bg-midnight/60 backdrop-blur-sm
              border transition-all duration-300
              ${isSelected
                ? 'border-neon-cyan/60 shadow-[0_0_30px_rgba(0,245,255,0.15)]'
                : 'border-white/10 hover:border-white/20'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selected checkmark */}
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-neon-cyan flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-void" strokeWidth={3} />
              </motion.div>
            )}

            {/* Icon */}
            <div
              className={`
                w-12 h-12 rounded-xl mb-4
                flex items-center justify-center
                transition-all duration-300
                ${isSelected
                  ? 'bg-neon-cyan/20 shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                  : 'bg-white/5'
                }
              `}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${isSelected ? 'text-neon-cyan' : 'text-text-secondary'}`}
                strokeWidth={1.5}
              />
            </div>

            {/* Title */}
            <h4
              className={`font-semibold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-text-primary'}`}
            >
              {type.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-text-muted">{type.shortDesc}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
