import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SplitPane — the canonical fixed-rail list/detail workspace split.
 *
 * Renders a fixed-width rail (the list) beside a fluid content pane (the
 * detail), with a hairline divider between them. Each pane scrolls
 * independently; the rail never resizes and the detail absorbs all extra width.
 *
 * This is a *fixed-frame* primitive: it owns a definite height (the viewport
 * minus the Topbar) so the panes' internal `overflow-y-auto` regions scroll on
 * their own instead of growing the page. Use it directly as the route's top
 * surface — do NOT wrap it in `PageSurface variant="flush"`, whose min-height
 * (grow-and-scroll) sizing would leave the panes without a definite height.
 * Override `height` when the split isn't the viewport-filling top surface.
 *
 * Use this for list/detail workflows (Inbox, conversation/reading views). For
 * proportional multi-column layouts where panes scale together (e.g. a
 * workspace sidebar + channel list + thread, like Channels), use a CSS grid
 * directly — this primitive is deliberately only the fixed-rail case.
 *
 * `railSide` controls which side the fixed rail sits on (default "start").
 */
export function SplitPane({
  rail,
  children,
  railWidth = "380px",
  railSide = "start",
  height = "calc(100dvh - var(--topbar-h))",
  className,
}: {
  rail: ReactNode;
  children: ReactNode;
  railWidth?: string;
  railSide?: "start" | "end";
  height?: string;
  className?: string;
}) {
  const railEl = (
    <aside
      className={cn(
        "shrink-0 flex flex-col min-h-0 overflow-hidden bg-background",
        railSide === "start" ? "border-r border-border/60" : "border-l border-border/60",
      )}
      style={{ width: railWidth }}
    >
      {rail}
    </aside>
  );

  const contentEl = (
    <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden bg-background">
      {children}
    </main>
  );

  return (
    <div className={cn("flex w-full overflow-hidden", className)} style={{ height }}>
      {railSide === "start" ? (
        <>
          {railEl}
          {contentEl}
        </>
      ) : (
        <>
          {contentEl}
          {railEl}
        </>
      )}
    </div>
  );
}
