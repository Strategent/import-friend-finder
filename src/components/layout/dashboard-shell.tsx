import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * DashboardShell — Origin's content layout: a fluid main column with a fixed
 * ~370px right rail that stacks widget cards. Combined with the global app
 * sidebar this yields the three-column dashboard. The rail drops below the main
 * column under the `xl` breakpoint so it stays usable down to ~1280px.
 */
export function DashboardShell({
  rail,
  children,
  className,
}: {
  rail: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_var(--rail-w)]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-5">{children}</div>
      <aside className="flex min-w-0 flex-col gap-5">{rail}</aside>
    </div>
  );
}
