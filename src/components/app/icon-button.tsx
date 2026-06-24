import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = Omit<ButtonProps, "children" | "size"> & {
  label: string;
  icon: LucideIcon;
  size?: "sm" | "default";
  tooltip?: string;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, tooltip, icon: Icon, className, size = "sm", variant = "ghost", ...props }, ref) => {
    const dimension = size === "sm" ? "h-7 w-7" : "h-9 w-9";

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        aria-label={label}
        title={tooltip ?? label}
        className={cn(
          dimension,
          "rounded-md p-0 text-muted-foreground hover:bg-state-hover hover:text-foreground",
          className,
        )}
        {...props}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";
