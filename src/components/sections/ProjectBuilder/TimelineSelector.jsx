import { timelineOptions } from '../../../data/projectBuilder';
import { SelectableCard, SelectableIcon, TimelineDot } from '../../ui/SelectableCard';
import { getAccentColor } from '../../../utils/colors';

export function TimelineSelector({ selected, onSelect }) {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-neon-magenta/30 via-neon-cyan/30 to-neon-purple/30 -translate-y-1/2 hidden sm:block" />

      {/* Timeline cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
        {timelineOptions.map((option) => {
          const isSelected = selected === option.id;
          const colors = getAccentColor(option.accentColor);

          return (
            <SelectableCard
              key={option.id}
              isSelected={isSelected}
              onClick={() => onSelect(option.id)}
              color={option.accentColor}
              showCheckmark={false}
              className="p-4 sm:p-6 text-left sm:text-center"
              hoverScale={1.02}
            >
              {/* Dot indicator on line */}
              <TimelineDot isSelected={isSelected} color={option.accentColor} />

              {/* Icon and content - horizontal on mobile */}
              <div className="flex gap-4 sm:block">
                <SelectableIcon
                  icon={option.icon}
                  isSelected={isSelected}
                  color={option.accentColor}
                  size="lg"
                  className="sm:mx-auto sm:mb-4"
                />

                <div>
                  <h4
                    className={`font-semibold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-text-primary'}`}
                  >
                    {option.label}
                  </h4>

                  <p className={`text-base sm:text-lg font-bold mb-1 ${isSelected ? colors.text : 'text-text-secondary'}`}>
                    {option.duration}
                  </p>

                  <p className="text-sm text-text-muted">{option.description}</p>
                </div>
              </div>
            </SelectableCard>
          );
        })}
      </div>
    </div>
  );
}
