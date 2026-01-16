import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable summary field component for displaying selected values
 * Used in BuilderSummary and similar display contexts
 */
export function SummaryField({ label, children, emptyText = 'Not selected' }) {
  return (
    <div>
      <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
        {label}
      </label>
      <AnimatePresence mode="wait">
        {children ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-1"
          >
            {children}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-text-muted text-sm mt-1"
          >
            {emptyText}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Display a selected item with an optional icon
 */
export function SelectedItem({ icon: Icon, label, sublabel }) {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-neon-cyan" />}
      <span className="text-text-primary font-medium">{label}</span>
      {sublabel && (
        <span className="text-text-muted text-sm">({sublabel})</span>
      )}
    </div>
  );
}

/**
 * Display a list of feature tags
 */
export function FeatureTagList({ features, maxDisplay = 4, getLabel }) {
  if (!features || features.length === 0) {
    return null;
  }

  const displayFeatures = features.slice(0, maxDisplay);
  const remainingCount = features.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-2">
      {displayFeatures.map((feature) => (
        <motion.span
          key={typeof feature === 'string' ? feature : feature.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-1 rounded-md bg-neon-purple/20 text-neon-purple text-xs"
        >
          {getLabel ? getLabel(feature) : feature.label || feature}
        </motion.span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 rounded-md bg-white/10 text-text-muted text-xs">
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}

/**
 * Complexity indicator bar
 */
export function ComplexityIndicator({ score, label }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Project Complexity
        </label>
        <span className="text-sm font-medium text-neon-cyan">{label}</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
