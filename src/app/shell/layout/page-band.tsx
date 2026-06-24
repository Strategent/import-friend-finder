import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Horizontal bands for the "flush" page surface.
 *
 * A flush page is a vertical stack of full-width bands separated by hairline
 * dividers: a header band, an optional stat strip, an optional toolbar, then
 * the content region. These primitives standardize the padding, dividers, and
 * type so every flush route reads the same instead of hand-rolling the markup.
 */

/** Shared horizontal padding for flush bands. */
const BAND_X = "px-6 md:px-8";

/**
 * PageBandHeader — the title band at the top of a flush page.
 *
 * Mirrors PageHeader's content model (eyebrow / title / description / actions)
 * but as an edge-to-edge band with a bottom divider, for flush surfaces.
 */
export function PageBandHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        BAND_X,
        "pt-8 pb-6 border-b border-border/60 flex items-end justify-between flex-wrap gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 text-[32px] font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/**
 * StatStrip — a divided row of metric columns (no cards), with a bottom
 * divider. Two columns on small screens; `mdCols` columns from md up (default
 * 4). Static classes are listed so Tailwind's JIT keeps them.
 */
const mdColsClass: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
};

export function StatStrip({
  stats,
  mdCols = 4,
  className,
}: {
  stats: { label: string; value: ReactNode }[];
  mdCols?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 border-b border-border/60 divide-x divide-border/60",
        mdColsClass[mdCols],
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className={cn(BAND_X, "py-5")}>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {s.label}
          </div>
          <div className="mt-1.5 text-[22px] font-semibold tracking-tight tabular-nums">
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * PageToolbar — the search/filter/action band beneath the header or stats.
 * A flex row with a bottom divider; children supply the controls.
 */
export function PageToolbar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        BAND_X,
        "py-3 border-b border-border/60 flex flex-wrap items-center gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * PageBody — the scrollable content region that fills the remaining height of
 * a flush page. Use for the data table / main workflow content.
 */
export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex-1 min-w-0", className)}>{children}</div>;
}
