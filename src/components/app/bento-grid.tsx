import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Aceternity UI — BentoGrid
// https://ui.aceternity.com/components/bento-grid
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border bg-card p-4 shadow-panel transition duration-200 hover:shadow-popover",
        className,
      )}
    >
      {header}
      {children}
      {(title || description || icon) && (
        <div className="transition duration-200 group-hover/bento:translate-x-1">
          {icon}
          {title && (
            <div className="mt-2 mb-2 font-sans font-semibold text-foreground">{title}</div>
          )}
          {description && (
            <div className="font-sans text-xs font-normal text-muted-foreground">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};
