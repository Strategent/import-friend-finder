import { Fragment, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils";

export type ActionMenuItem = {
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  separatorBefore?: boolean;
};

export function ActionMenu({
  label = "More actions",
  actions,
  align = "end",
  trigger,
}: {
  label?: string;
  actions: ActionMenuItem[];
  align?: "start" | "center" | "end";
  trigger?: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? <IconButton label={label} icon={MoreHorizontal} />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-40">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Fragment key={action.label}>
              {action.separatorBefore && <DropdownMenuSeparator />}
              <DropdownMenuItem
                disabled={action.disabled}
                onSelect={action.onSelect}
                className={cn(action.destructive && "text-status-danger focus:text-status-danger")}
              >
                {Icon && <Icon aria-hidden className="h-4 w-4" />}
                {action.label}
              </DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
