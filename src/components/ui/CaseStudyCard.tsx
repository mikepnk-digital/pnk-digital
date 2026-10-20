import { Link } from '@/lib/router';
import { ArrowRight } from 'lucide-react';
import { SERVICE_LABELS, type CaseStudy } from '../../lib/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
}

/** One case study: service, headline number, title and client, linking to /work/<slug>. */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link to={`/work/${study.slug}`} className="block h-full">
      <article className="
        relative p-6 md:p-8 rounded-2xl h-full
        bg-midnight/60 backdrop-blur-sm
        border border-white/10
        hover:border-neon-cyan/30
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-300
        group
        flex flex-col
      ">
        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-block px-3 py-1 text-xs rounded-full border bg-brand-pink/10 text-brand-pink border-brand-pink/20">
              {SERVICE_LABELS[study.service]}
            </span>
            {study.draft && (
              <span className="inline-block px-3 py-1 text-xs rounded-full border border-dashed border-white/30 text-text-muted uppercase tracking-wider">
                Draft
              </span>
            )}
          </div>

          <p className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-2">{study.metric}</p>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors leading-snug mb-1">
            {study.title}
          </h3>
          <p className="text-text-muted text-sm mb-4">{study.client}</p>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">{study.summary}</p>

          <span className="inline-flex items-center gap-1 text-sm text-neon-cyan group-hover:text-neon-purple transition-colors">
            Read case study
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  );
}
