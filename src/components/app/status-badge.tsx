import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusBadgeVariant =
  | "lead"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

const variantClass: Record<StatusBadgeVariant, string> = {
  lead: "border-status-lead-border bg-status-lead-bg text-status-lead-fg",
  qualified: "border-status-qualified-border bg-status-qualified-bg text-status-qualified-fg",
  proposal: "border-status-proposal-border bg-status-proposal-bg text-status-proposal-fg",
  negotiation:
    "border-status-negotiation-border bg-status-negotiation-bg text-status-negotiation-fg",
  closed: "border-status-closed-border bg-status-closed-bg text-status-closed-fg",
  success: "border-status-success-border bg-status-success-bg text-status-success-fg",
  warning: "border-status-warning-border bg-status-warning-bg text-status-warning-fg",
  danger: "border-status-danger-border bg-status-danger-bg text-status-danger-fg",
  info: "border-status-info-border bg-status-info-bg text-status-info-fg",
  neutral: "border-border bg-surface-raised text-muted-foreground",
};

const dotClass: Record<StatusBadgeVariant, string> = {
  lead: "bg-status-lead",
  qualified: "bg-status-qualified",
  proposal: "bg-status-proposal",
  negotiation: "bg-status-negotiation",
  closed: "bg-status-closed",
  success: "bg-status-success",
  warning: "bg-status-warning",
  danger: "bg-status-danger",
  info: "bg-status-info",
  neutral: "bg-muted-foreground",
};

export function StatusBadge({
  variant = "neutral",
  children,
  showDot = true,
  className,
}: {
  variant?: StatusBadgeVariant;
  children: ReactNode;
  showDot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[10px] font-medium",
        variantClass[variant],
        className,
      )}
    >
      {showDot && (
        <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dotClass[variant])} />
      )}
      {children}
    </span>
  );
}
