import { cn } from "@/lib/utils";
import { useRovingRadioGroup } from "./use-roving-radio-group";

export type FilterOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
  disabled?: boolean;
};

export function FilterBar<T extends string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
}: {
  options: FilterOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  const { getOptionRef, getTabIndex, onKeyDown } = useRovingRadioGroup({
    options,
    value,
    onValueChange,
  });

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "flex items-center gap-1 rounded-full border border-border bg-surface-raised p-0.5",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={getOptionRef(option.value)}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={getTabIndex(option.value)}
            disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
              selected
                ? "bg-surface text-surface-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span>{option.label}</span>
            {typeof option.count === "number" && (
              <span className="tabular-nums text-muted-foreground">{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
