import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScoreCard } from './ScoreCard';
import type { Prospect } from '../../pages/audit/prospects';
import { fadeInUp } from '../../utils/animations';

interface ProspectCardProps {
  prospect: Prospect;
}

export function ProspectCard({ prospect }: ProspectCardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        to={`/audit/${prospect.slug}`}
        className="group block bg-charcoal/50 border border-white/5 rounded-xl p-6 hover:border-neon-cyan/30 hover:bg-charcoal/80 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-text-primary font-semibold text-lg group-hover:text-neon-cyan transition-colors">
              {prospect.name}
            </h3>
            <p className="text-text-secondary text-sm mt-1">{prospect.type}</p>
            <div className="flex items-center gap-1 mt-2 text-text-muted text-xs">
              <MapPin className="w-3 h-3" />
              {prospect.location}
            </div>
            <div className="mt-4 flex items-center gap-2 text-neon-cyan text-sm font-medium group-hover:gap-3 transition-all">
              View Audit
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <ScoreCard score={prospect.overallScore} size="sm" />
        </div>
      </Link>
    </motion.div>
  );
}
