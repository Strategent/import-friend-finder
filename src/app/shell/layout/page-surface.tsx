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
 *  - "flush"   Full-height, edge-to-edge workflow surface that grows with its
 *              content and scrolls the whole page past the fold. Children own
 *              their own internal padding and dividers. Use for data-table and
 *              calendar pages (CRM, Calendar).
 *
 *  - "fill"    Full-height surface locked to exactly the area below the Topbar
 *              (fixed height + overflow-hidden), so an inner pane scrolls
 *              instead of the page. `relative` is set so absolutely-positioned
 *              children (e.g. background layers) anchor to the surface. Use for
 *              split/full-bleed workflows whose panels scroll internally
 *              (Inbox, Channels, Syra).
 *
 * The surface owns the app background so routes never set bg-* themselves.
 */
type PageSurfaceVariant = "padded" | "flush" | "fill";

const variantClass: Record<PageSurfaceVariant, string> = {
  padded: "px-4 sm:px-6 md:px-8 py-5 md:py-6 space-y-4 md:space-y-5",
  flush: "flex flex-col",
  fill: "relative overflow-hidden",
};

// "padded"/"flush" grow with content (min-height); "fill" is locked to the
// viewport below the Topbar so its children scroll internally (fixed height).
const VIEWPORT_BELOW_TOPBAR = "calc(100dvh - var(--topbar-h))";

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
      style={
        variant === "fill"
          ? { height: VIEWPORT_BELOW_TOPBAR }
          : { minHeight: VIEWPORT_BELOW_TOPBAR }
      }
    >
      {children}
    </div>
  );
}
