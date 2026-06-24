import type { ReactNode } from "react";
import { AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function StateView({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid min-h-48 place-items-center px-6 py-10 text-center", className)}>
      <div className="max-w-sm">
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-raised text-muted-foreground">
          {icon}
        </div>
        <div className="mt-3 text-sm font-semibold tracking-tight">{title}</div>
        {description && (
          <div className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}
        {action && <div className="mt-4 flex justify-center">{action}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  title = "No results",
  description,
  action,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <StateView
      icon={<Inbox className="h-4 w-4" />}
      title={title}
      description={description}
      action={action}
      className={className}
    />
  );
}

export function LoadingState({
  title = "Loading",
  description,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <StateView
      icon={<Loader2 className="h-4 w-4 animate-spin" />}
      title={title}
      description={description}
      className={className}
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  actionLabel = "Try again",
  onAction,
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <StateView
      icon={<AlertCircle className="h-4 w-4" />}
      title={title}
      description={description}
      action={
        onAction ? (
          <Button type="button" size="sm" variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : undefined
      }
      className={className}
    />
  );
}
