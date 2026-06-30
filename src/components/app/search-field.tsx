import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SearchFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onClear?: () => void;
  containerClassName?: string;
};

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      containerClassName,
      onClear,
      value,
      placeholder,
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => {
    const hasValue = value != null && String(value).length > 0;

    return (
      <div className={cn("relative min-w-[220px] flex-1", containerClassName)}>
        <Search
          aria-hidden
          className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          placeholder={placeholder}
          aria-label={ariaLabel ?? placeholder ?? "Search"}
          className={cn(
            "h-9 w-full rounded-md border border-border bg-surface-raised pl-9 pr-3 text-[13px] placeholder:text-muted-foreground focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            onClear && hasValue && "pr-9",
            className,
          )}
          {...props}
        />
        {onClear && hasValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClear}
            className="absolute right-2 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-muted-foreground hover:bg-state-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background"
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
SearchField.displayName = "SearchField";
