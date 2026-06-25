import { cn } from "@/lib/utils";
import { useRovingRadioGroup } from "./use-roving-radio-group";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  ariaLabel,
  className,
}: {
  options: SegmentedOption<T>[];
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
        "inline-flex items-center rounded-lg border border-border bg-surface-raised p-0.5",
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
              "h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
              selected
                ? "bg-surface text-surface-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
