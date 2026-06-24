import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { SectionLabel } from "./section-label";

/**
 * Panel — the core Origin surface card (the doc's `<Card>`; named Panel to avoid
 * colliding with the shadcn `Card`). Renders the calm near-black surface with a
 * hairline border and an optional header carrying a <SectionLabel> on the left
 * and any extra `action` on the right.
 *
 *   <Panel label="INBOX">…</Panel>
 *
 * Use `padding="none"` for modules that manage their own full-bleed layout
 * (e.g. the inbox ribbon), then place the header inside the body yourself.
 */
export function Panel({
  label,
  action,
  padding = "md",
  className,
  headerClassName,
  bodyClassName,
  children,
}: {
  label?: string;
  /** Extra header control rendered in the header's right group. */
  action?: ReactNode;
  padding?: "md" | "sm" | "none";
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  const pad = padding === "none" ? "" : padding === "sm" ? "p-4" : "p-5";
  const showHeader = Boolean(label || action);
  return (
    <section className={cn("origin-card flex h-full flex-col", pad, className)}>
      {showHeader && (
        <div
          className={cn(
            "flex shrink-0 items-center justify-between gap-2",
            padding === "none" ? "px-5 pt-4 pb-3" : "mb-3.5",
            headerClassName,
          )}
        >
          {/* The caps label row is the drag handle (gridstack: `.bento-drag-handle`).
              Action buttons + sparkle live in the right group, so they never
              start a drag. */}
          <div className="bento-drag-handle flex min-w-0 items-center gap-1.5">
            {label ? <SectionLabel label={label} /> : <span aria-hidden />}
            <GripVertical aria-hidden className="bento-drag-grip h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="flex items-center gap-1.5">{action}</div>
        </div>
      )}
      <div className={cn("relative flex min-h-0 flex-1 flex-col", bodyClassName)}>{children}</div>
    </section>
  );
}
