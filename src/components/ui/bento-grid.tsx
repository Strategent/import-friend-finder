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
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200/60 bg-white p-4 shadow-[0_2px_3px_-1px_rgba(0,0,0,0.05),0_1px_0_0_rgba(25,28,33,0.02),0_0_0_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-xl dark:border-white/[0.12] dark:bg-neutral-950 dark:shadow-none",
        className,
      )}
    >
      {header}
      {children}
      {(title || description || icon) && (
        <div className="transition duration-200 group-hover/bento:translate-x-1">
          {icon}
          {title && (
            <div className="mt-2 mb-2 font-sans font-semibold text-neutral-700 dark:text-neutral-200">
              {title}
            </div>
          )}
          {description && (
            <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};