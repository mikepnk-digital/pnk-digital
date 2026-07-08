import { motion } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Eye,
  Palette,
  Gauge,
  Search,
  FileText,
  Shield,
} from 'lucide-react';
import type { WebsiteIssue } from '../../data/prospects';
import { fadeInUp } from '../../utils/animations';

const severityConfig = {
  critical: {
    label: 'Critical',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    icon: AlertTriangle,
  },
  major: {
    label: 'Major',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    icon: AlertCircle,
  },
  moderate: {
    label: 'Moderate',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    icon: Info,
  },
};

const categoryConfig = {
  accessibility: { label: 'Accessibility', icon: Eye },
  design: { label: 'Design', icon: Palette },
  performance: { label: 'Performance', icon: Gauge },
  seo: { label: 'SEO', icon: Search },
  content: { label: 'Content', icon: FileText },
  security: { label: 'Security', icon: Shield },
};

interface IssueCardProps {
  issue: WebsiteIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const severity = severityConfig[issue.severity];
  const category = categoryConfig[issue.category];
  const SeverityIcon = severity.icon;
  const CategoryIcon = category.icon;

  return (
    <motion.div
      variants={fadeInUp}
      className={`rounded-xl border ${severity.border} ${severity.bg} p-5 sm:p-6`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 p-2 rounded-lg ${severity.bg}`}>
          <SeverityIcon className={`w-5 h-5 ${severity.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-text-primary font-semibold text-base">{issue.title}</h3>
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${severity.bg} ${severity.text} border ${severity.border}`}
            >
              {severity.label}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-text-muted">
              <CategoryIcon className="w-3 h-3" />
              {category.label}
            </span>
          </div>
          <p className="text-text-secondary text-sm mb-3">{issue.description}</p>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-text-secondary text-sm">
              <span className="text-text-primary font-medium">Business Impact: </span>
              {issue.impact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
