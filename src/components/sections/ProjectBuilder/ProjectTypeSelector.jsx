import { projectTypes } from '../../../data/projectBuilder';
import { SelectableCard, SelectableIcon } from '../../ui/SelectableCard';

export function ProjectTypeSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projectTypes.map((type) => {
        const isSelected = selected === type.id;

        return (
          <SelectableCard
            key={type.id}
            isSelected={isSelected}
            onClick={() => onSelect(type.id)}
            color="cyan"
            className="p-5 flex flex-col justify-start h-full"
          >
            {/* Icon and content - horizontal on mobile */}
            <div className="flex gap-4 sm:block items-start">
              <SelectableIcon
                icon={type.icon}
                isSelected={isSelected}
                color="cyan"
                className="sm:mb-4"
              />

              <div>
                <h4
                  className={`font-semibold mb-1 transition-colors ${isSelected ? 'text-white' : 'text-text-primary'}`}
                >
                  {type.title}
                </h4>
                <p className="text-sm text-text-muted">{type.shortDesc}</p>
              </div>
            </div>
          </SelectableCard>
        );
      })}
    </div>
  );
}
