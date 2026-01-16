import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { featureCategories } from '../../../data/projectBuilder';

export function FeatureSelector({ selected, onToggle }) {
  return (
    <div className="space-y-8">
      {featureCategories.map((category) => {
        const CategoryIcon = category.icon;

        return (
          <div key={category.id}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <CategoryIcon className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
              <span className="text-sm font-medium text-text-muted uppercase tracking-wider">
                {category.category}
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3">
              {category.features.map((feature) => {
                const isSelected = selected.includes(feature.id);

                return (
                  <motion.button
                    key={feature.id}
                    onClick={() => onToggle(feature.id)}
                    className={`
                      inline-flex items-center gap-2 px-4 py-2 rounded-full
                      text-sm font-medium
                      border transition-all duration-300
                      ${isSelected
                        ? 'bg-neon-purple/20 border-neon-purple/50 text-neon-purple'
                        : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20 hover:text-text-primary'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                      </motion.span>
                    )}
                    {feature.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
