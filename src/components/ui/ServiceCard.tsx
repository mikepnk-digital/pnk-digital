import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './Button';
import { fadeInUp } from '../../utils/animations';
import type { Service } from '../../data/services';

const colorMap: Record<string, { iconBg: string; iconBorder: string; iconText: string; tagBg: string; tagText: string; tagBorder: string }> = {
  'neon-cyan': {
    iconBg: 'from-neon-cyan/20 to-neon-cyan/5',
    iconBorder: 'border-neon-cyan/30',
    iconText: 'text-neon-cyan',
    tagBg: 'bg-neon-cyan/10',
    tagText: 'text-neon-cyan',
    tagBorder: 'border-neon-cyan/20',
  },
  'neon-purple': {
    iconBg: 'from-neon-purple/20 to-neon-purple/5',
    iconBorder: 'border-neon-purple/30',
    iconText: 'text-neon-purple',
    tagBg: 'bg-neon-purple/10',
    tagText: 'text-neon-purple',
    tagBorder: 'border-neon-purple/20',
  },
  'brand-pink': {
    iconBg: 'from-brand-pink/20 to-brand-pink/5',
    iconBorder: 'border-brand-pink/30',
    iconText: 'text-brand-pink',
    tagBg: 'bg-brand-pink/10',
    tagText: 'text-brand-pink',
    tagBorder: 'border-brand-pink/20',
  },
  'neon-green': {
    iconBg: 'from-neon-green/20 to-neon-green/5',
    iconBorder: 'border-neon-green/30',
    iconText: 'text-neon-green',
    tagBg: 'bg-neon-green/10',
    tagText: 'text-neon-green',
    tagBorder: 'border-neon-green/20',
  },
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const colors = colorMap[service.color] || colorMap['neon-cyan'];
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`
        grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start
        p-6 md:p-8 rounded-2xl
        bg-midnight/40 backdrop-blur-sm
        border border-white/5
      `}
    >
      {/* Content side */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        {/* Icon + Title */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`
            w-14 h-14 rounded-xl shrink-0
            bg-gradient-to-br ${colors.iconBg}
            ${colors.iconBorder} border
            flex items-center justify-center
          `}>
            <service.icon className={`w-7 h-7 ${colors.iconText}`} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">
            {service.title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-text-secondary leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Target client */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">
            Who this is for
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {service.targetClient}
          </p>
        </div>

        {/* CTA */}
        <Link to="/contact">
          <Button variant="secondary" size="sm" className="group">
            Discuss a {service.title.split(' ')[0]} project
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Deliverables + Tags side */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        {/* Deliverables */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">
            Example deliverables
          </h3>
          <ul className="space-y-3">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className={`w-4 h-4 mt-0.5 shrink-0 ${colors.iconText}`} strokeWidth={2} />
                <span className="text-text-secondary text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology tags */}
        <div>
          <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className={`
                  px-3 py-1 text-xs rounded-full
                  ${colors.tagBg} ${colors.tagText}
                  ${colors.tagBorder} border
                `}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
