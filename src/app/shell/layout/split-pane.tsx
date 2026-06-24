import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SplitPane — the canonical fixed-rail list/detail workflow split.
 *
 * Renders a fixed-width rail (the list) beside a fluid content pane (the
 * detail), with a hairline divider between them. Both panes fill the height of
 * the parent, so place this inside a `PageSurface variant="flush"`. Each pane
 * scrolls independently; the rail never resizes and the detail absorbs all
 * extra width.
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
  className,
}: {
  rail: ReactNode;
  children: ReactNode;
  railWidth?: string;
  railSide?: "start" | "end";
  className?: string;
}) {
  const railEl = (
    <aside
      className={cn(
        "shrink-0 flex flex-col min-w-0 overflow-hidden bg-background",
        railSide === "start" ? "border-r border-border/60" : "border-l border-border/60",
      )}
      style={{ width: railWidth }}
    >
      {rail}
    </aside>
  );

  const contentEl = (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">{children}</main>
  );

  return (
    <div className={cn("flex h-full w-full overflow-hidden", className)}>
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
