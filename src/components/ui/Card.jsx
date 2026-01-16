import { motion } from 'framer-motion';

export function Card({ icon: Icon, title, description, tags = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="
        relative p-6 rounded-2xl
        bg-midnight/60 backdrop-blur-sm
        border border-white/10
        hover:border-neon-cyan/40
        hover:shadow-[0_0_40px_rgba(0,245,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-300
        group
        h-full
      "
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />

      {/* Glow effect */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/20 blur-sm pointer-events-none" />

      <div className="relative z-10">
        {/* Icon and title - horizontal on mobile, vertical on sm+ */}
        <div className="flex gap-4 sm:block items-center mb-3 sm:mb-0">
          {/* Icon container with neon glow */}
          <div className="
            w-10 h-10 sm:w-14 sm:h-14 rounded-xl shrink-0
            bg-gradient-to-br from-neon-cyan/20 to-neon-purple/10
            border border-neon-cyan/20
            flex items-center justify-center sm:mb-5
            group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]
            group-hover:border-neon-cyan/40
            transition-all duration-300
          ">
            {Icon && <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-neon-cyan" strokeWidth={1.5} />}
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-text-primary sm:mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-text-secondary mb-5 leading-relaxed text-sm">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 text-xs rounded-full
                  bg-neon-purple/10 text-neon-purple
                  border border-neon-purple/20
                  group-hover:border-neon-purple/40
                  group-hover:bg-neon-purple/15
                  transition-all duration-300
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
