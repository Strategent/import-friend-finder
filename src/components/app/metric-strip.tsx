import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const mdColsClass: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

export type MetricItem = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

export function MetricTile({
  label,
  value,
  detail,
  className,
}: MetricItem & { className?: string }) {
  return (
    <div className={cn("px-6 py-5 md:px-8", className)}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums">{value}</div>
      {detail && <div className="mt-1 text-[11px] text-muted-foreground">{detail}</div>}
    </div>
  );
}

export function MetricStrip({
  metrics,
  mdCols = 4,
  className,
}: {
  metrics: MetricItem[];
  mdCols?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px border-b border-border/60 bg-border/60",
        mdColsClass[mdCols],
        className,
      )}
    >
      {metrics.map((metric) => (
        <MetricTile key={metric.label} {...metric} className="bg-background" />
      ))}
    </div>
  );
}
