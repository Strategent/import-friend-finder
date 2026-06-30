import { ReactNode, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Search, Sun, Moon, X } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SyraChatWidget } from "@/features/syra/components/syra-chat-widget";
import { useTheme } from "@/app/providers/theme-provider";
import { PageSurface } from "@/app/shell/layout/page-surface";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [now, setNow] = useState<Date | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);
  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    : "—";
  return (
    <div className="sticky top-0 z-20 border-b border-border/60 bg-chrome backdrop-blur-xl">
      {/* Fixed height so flush page surfaces can subtract it reliably via the
          --topbar-h token. Keep this height and --topbar-h in src/styles/tokens.css
          in sync (60px row + 1px border = 61px). */}
      <div className="h-[60px] px-6 flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-3 pr-1">
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-state-hover hover:text-foreground"
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
            <div
              className={`overflow-hidden transition-[width,margin,opacity] duration-300 ease-out ${
                searchOpen ? "ml-2 w-64 opacity-100" : "ml-0 w-0 opacity-0"
              }`}
            >
              <input
                ref={inputRef}
                aria-label="Search workflows, clients, and agents"
                placeholder="Search workflows, clients, agents…"
                onBlur={(e) => {
                  if (!e.currentTarget.value) setSearchOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                }}
                className="h-8 w-full rounded-md border border-border/60 bg-surface-raised px-3 text-[13px] placeholder:text-muted-foreground focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              />
            </div>
          </div>
          <div
            suppressHydrationWarning
            className="text-[13px] font-medium tracking-tight tabular-nums text-foreground/70 leading-none"
          >
            {time}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground leading-none">
            <Sun className="h-3 w-3 text-status-warning/80" />
            <span className="tabular-nums">64°</span>
            <span className="hidden md:inline">Sunny · Brentwood</span>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background"
        >
          {theme === "dark" ? (
            <Moon className="h-4 w-4" fill="currentColor" />
          ) : (
            <Sun className="h-4 w-4" fill="currentColor" />
          )}
        </button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open notifications"
          className="text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between flex-wrap gap-4", className)}>
      <div className="min-w-0">
        {eyebrow && (
          <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/15">
            {eyebrow}
          </Badge>
        )}
        <h1 className="mt-3 text-3xl md:text-[34px] font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <PageSurface variant="padded">{children}</PageSurface>
      <SyraChatWidget />
    </>
  );
}
