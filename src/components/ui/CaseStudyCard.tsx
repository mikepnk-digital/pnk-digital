import { Link } from '@/lib/router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '../../data/portfolio';

interface CaseStudyCardProps {
  project: CaseStudy;
}

export function CaseStudyCard({ project }: CaseStudyCardProps) {
  const isPlaceholder = project.placeholder;

  const card = (
    <div className={`
      relative p-6 rounded-2xl h-full
      transition-all duration-300
      group
      ${isPlaceholder
        ? 'bg-midnight/30 border-2 border-dashed border-white/10'
        : 'bg-midnight/60 backdrop-blur-sm border border-white/10 hover:border-neon-cyan/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
      }
    `}>
      {/* Hover overlay for real projects */}
      {!isPlaceholder && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />
      )}

      <div className="relative z-10">
        {/* Thumbnail area */}
        <div className={`
          w-full aspect-video rounded-lg mb-5
          flex items-center justify-center
          ${isPlaceholder
            ? 'bg-charcoal/30 border border-dashed border-white/5'
            : 'bg-charcoal/50 border border-white/5'
          }
        `}>
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-text-muted text-sm uppercase tracking-wider">
              {isPlaceholder ? 'Coming Soon' : 'Screenshot'}
            </span>
          )}
        </div>

        {/* Category */}
        <span className={`
          inline-block px-3 py-1 text-xs rounded-full mb-3 border
          ${isPlaceholder
            ? 'bg-white/5 text-text-muted border-white/10'
            : 'bg-neon-purple/10 text-neon-purple border-neon-purple/20'
          }
        `}>
          {project.category}
        </span>

        {/* Title */}
        <h3 className={`
          text-lg font-semibold mb-3
          ${isPlaceholder
            ? 'text-text-muted'
            : 'text-text-primary group-hover:text-white transition-colors'
          }
        `}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`
          text-sm leading-relaxed mb-4
          ${isPlaceholder ? 'text-text-muted' : 'text-text-secondary'}
        `}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`
                px-2 py-0.5 text-xs rounded
                ${isPlaceholder
                  ? 'text-text-muted bg-white/3'
                  : 'text-text-secondary bg-white/5'
                }
              `}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link indicator for real projects */}
        {!isPlaceholder && (
          <span className="inline-flex items-center gap-1 text-sm text-neon-cyan group-hover:text-neon-purple transition-colors">
            Read case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </div>
    </div>
  );

  if (isPlaceholder) {
    return card;
  }

  return (
    <Link to={`/work/${project.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
