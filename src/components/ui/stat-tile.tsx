import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * StatTile — a small labeled metric tile (meeting counts, capacity, spend grid).
 * Mono caps label over a large tabular value.
 */
export function StatTile({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("origin-raised px-3.5 py-3", className)}>
      <div className="font-label text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1.5">
        <div className="text-[26px] font-semibold leading-none tracking-tight tabular-nums text-foreground">
          {value}
        </div>
        {sub && <div className="text-[11px] font-light text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}
