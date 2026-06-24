import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { X } from "lucide-react";
import { SectionLabel } from "./section-label";

/**
 * GradientFeatureCard — Origin's spotlight / onboarding card: a brand-gradient
 * surface with a serif headline, body copy, an optional progress bar, and a CTA.
 * Recolored from Origin's green to Strategent's blue (var(--spotlight-feature)).
 */
export function GradientFeatureCard({
  label,
  title,
  description,
  progress,
  progressLabel,
  cta,
  onDismiss,
  className,
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  /** 0–100; omit to hide the progress bar. */
  progress?: number;
  progressLabel?: string;
  cta?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <section
      className={cn("relative overflow-hidden p-5", className)}
      style={{
        background: "var(--spotlight-feature)",
        border: "1px solid var(--spotlight-border)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--spotlight-shadow)",
      }}
    >
      {/* Soft directional wash for depth without banding */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 80% at 100% 100%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-2">
          {label && (
            <SectionLabel
              label={label}
              className="bento-drag-handle text-primary-foreground/55 [&>.chev]:text-primary-foreground/40"
            />
          )}
          {onDismiss && (
            <button
              type="button"
              aria-label="Dismiss"
              onClick={onDismiss}
              className="-mr-1 -mt-1 grid h-6 w-6 place-items-center rounded-full text-primary-foreground/55 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground/90"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <h3 className="font-serif-display mt-2 text-[22px] leading-tight text-primary-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-primary-foreground/70">
            {description}
          </p>
        )}
        {typeof progress === "number" && (
          <div className="mt-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/15">
              <div
                className="h-full rounded-full bg-primary-foreground/85"
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </div>
            <div className="mt-1.5 text-[11px] font-medium text-primary-foreground/70">
              {progressLabel ?? `${Math.round(progress)}% complete`}
            </div>
          </div>
        )}
        {cta && <div className="mt-4 flex flex-wrap items-center gap-2">{cta}</div>}
      </div>
    </section>
  );
}
