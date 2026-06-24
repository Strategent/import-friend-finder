import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * PageSurface — the canonical page frame every route renders into.
 *
 * Routes pick exactly one variant instead of hand-rolling their own
 * background, padding, or viewport math:
 *
 *  - "padded"  Comfortable, max-width-friendly scroll page. Owns horizontal
 *              page padding and vertical rhythm. Use for forms, settings,
 *              reading, dashboards, and most content pages.
 *
 *  - "flush"   Full-height, edge-to-edge workflow surface that fills exactly
 *              the area below the Topbar (via --topbar-h). Children own their
 *              own internal padding and dividers. Use for data-table pages and
 *              split/full-bleed workflows (CRM, Inbox, Calendar, Channels).
 *
 * The surface owns the app background so routes never set bg-* themselves.
 */
type PageSurfaceVariant = "padded" | "flush";

const variantClass: Record<PageSurfaceVariant, string> = {
  padded: "px-4 sm:px-6 md:px-8 py-5 md:py-6 space-y-4 md:space-y-5",
  flush: "flex flex-col",
};

export function PageSurface({
  variant = "padded",
  className,
  children,
}: {
  variant?: PageSurfaceVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("w-full bg-background", variantClass[variant], className)}
      // Both variants fill at least the viewport below the sticky Topbar.
      // min-height (not height) lets content grow and scroll past the fold.
      style={{ minHeight: "calc(100dvh - var(--topbar-h))" }}
    >
      {children}
    </div>
  );
}
