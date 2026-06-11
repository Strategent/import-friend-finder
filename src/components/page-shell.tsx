import { ReactNode, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Search, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SyraChatWidget } from "@/components/syra-chat-widget";

export function Topbar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    : "—";
  return (
    <div className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="px-6 py-3 flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search workflows, clients, agents…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-card/60 border border-border/60 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="hidden sm:flex items-center gap-3 pr-1">
          <div
            suppressHydrationWarning
            className="text-[13px] font-medium tracking-tight tabular-nums text-foreground/70 leading-none"
          >
            {time}
          </div>
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground leading-none">
            <Sun className="h-3 w-3 text-amber-400/80" />
            <span className="tabular-nums">64°</span>
            <span className="hidden md:inline">Sunny · Brentwood</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
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
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between flex-wrap gap-4">
      <div>
        {eyebrow && (
          <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/15">
            {eyebrow}
          </Badge>
        )}
        <h1 className="mt-3 text-3xl md:text-[34px] font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 px-4 sm:px-6 md:px-8 py-5 md:py-6 space-y-4 md:space-y-5">
        {children}
      </div>
      <SyraChatWidget />
    </>
  );
}