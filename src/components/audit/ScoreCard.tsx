import { motion } from 'framer-motion';

interface ScoreCardProps {
  score: number;
  size?: 'sm' | 'lg';
}

function getScoreConfig(score: number) {
  if (score <= 20) {
    return { grade: 'F', color: '#ef4444', label: 'Critical Issues', trackColor: 'rgba(239,68,68,0.15)' };
  } else if (score <= 35) {
    return { grade: 'D', color: '#f97316', label: 'Major Issues', trackColor: 'rgba(249,115,22,0.15)' };
  } else if (score <= 50) {
    return { grade: 'C', color: '#eab308', label: 'Needs Work', trackColor: 'rgba(234,179,8,0.15)' };
  } else if (score <= 70) {
    return { grade: 'B', color: '#22c55e', label: 'Good', trackColor: 'rgba(34,197,94,0.15)' };
  }
  return { grade: 'A', color: '#10b981', label: 'Excellent', trackColor: 'rgba(16,185,129,0.15)' };
}

export function ScoreCard({ score, size = 'lg' }: ScoreCardProps) {
  const config = getScoreConfig(score);
  const isLarge = size === 'lg';
  const radius = isLarge ? 70 : 28;
  const strokeWidth = isLarge ? 8 : 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const svgSize = isLarge ? 180 : 72;
  const center = svgSize / 2;

  return (
    <div className={`flex flex-col items-center ${isLarge ? 'gap-3' : 'gap-1'}`}>
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize}
          className={isLarge ? '' : ''}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={config.trackColor}
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: 'none' }}>
          <span
            className={`font-bold leading-none ${isLarge ? 'text-4xl' : 'text-lg'}`}
            style={{ color: config.color }}
          >
            {score}
          </span>
          {isLarge && (
            <span className="text-text-muted text-sm mt-1">/100</span>
          )}
        </div>
      </div>
      {isLarge && (
        <div className="text-center">
          <span
            className="text-lg font-bold block"
            style={{ color: config.color }}
          >
            Grade: {config.grade}
          </span>
          <span className="text-text-muted text-sm">{config.label}</span>
        </div>
      )}
    </div>
  );
}
