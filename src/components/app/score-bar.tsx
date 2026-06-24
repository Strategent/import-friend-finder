import { cn } from "@/lib/utils";

/**
 * ScoreBar — Origin's graded gradient bar (Very Poor → Excellent), reused for
 * any graded health/score metric. A white marker sits at the current value.
 */
export function ScoreBar({
  value,
  max = 100,
  labels,
  showMarker = true,
  className,
}: {
  value: number;
  max?: number;
  labels?: string[];
  showMarker?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      <div
        className="relative h-2 w-full overflow-hidden rounded-full"
        style={{ background: "var(--score-gradient)" }}
      >
        {showMarker && (
          <span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-background ring-1 ring-foreground/20"
            style={{
              left: `calc(${pct}% - 6px)`,
              boxShadow: "0 1px 3px color-mix(in oklab, var(--foreground) 30%, transparent)",
            }}
          />
        )}
      </div>
      {labels && labels.length > 0 && (
        <div className="mt-1.5 flex items-center justify-between">
          {labels.map((l, i) => (
            <span
              key={i}
              className="text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground/70"
            >
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
