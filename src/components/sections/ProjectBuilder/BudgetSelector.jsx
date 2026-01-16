import { budgetRanges } from '../../../data/projectBuilder';
import { SelectableCard, SelectionIndicator } from '../../ui/SelectableCard';

export function BudgetSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {budgetRanges.map((range) => {
        const isSelected = selected === range.id;

        return (
          <SelectableCard
            key={range.id}
            isSelected={isSelected}
            onClick={() => onSelect(range.id)}
            color="cyan"
            showCheckmark={false}
            hoverScale={1.03}
            className="p-4 text-center"
          >
            {/* Tier label */}
            <span
              className={`
                text-xs font-medium uppercase tracking-wider mb-2 block
                ${isSelected ? 'text-neon-cyan' : 'text-text-muted'}
              `}
            >
              {range.tier}
            </span>

            {/* Price range */}
            <span
              className={`
                text-sm font-semibold block
                ${isSelected ? 'text-white' : 'text-text-primary'}
              `}
            >
              {range.label}
            </span>

            {/* Selection indicator */}
            <SelectionIndicator isSelected={isSelected} color="cyan" />
          </SelectableCard>
        );
      })}
    </div>
  );
}
