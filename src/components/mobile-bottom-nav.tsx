import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home as HomeIcon,
  Inbox,
  Users,
  Phone,
  CheckSquare,
  UserCog,
  Hash,
  CreditCard,
  FileText,
  Settings,
  CalendarDays,
  Plug,
  LifeBuoy,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const syraSIcon = { url: "/syra-s.png" };

const SyraIcon = () => (
  <span className="relative inline-grid h-[18px] w-[18px] place-items-center overflow-hidden">
    <img
      src={syraSIcon.url}
      alt=""
      className="absolute h-full w-full scale-[3.4] object-contain [filter:brightness(0)_invert(1)]"
    />
  </span>
);

const primaryNav = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "CRM", url: "/crm", icon: Users },
  { title: "Syra", url: "/syra", icon: SyraIcon },
  { title: "Team", url: "/team", icon: UserCog },
];

const moreNav = [
  { title: "Calls", url: "/calls", icon: Phone },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Calendar", url: "/calendar", icon: CalendarDays },
  { title: "Connectors", url: "/connectors", icon: Plug },
  { title: "Channels", url: "/channels", icon: Hash },
  { title: "Billing", url: "/billing", icon: CreditCard },
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function MobileBottomNav() {
  const isMobile = useIsMobile();
  const [moreOpen, setMoreOpen] = useState(false);
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) =>
    path === "/" ? currentPath === "/" : currentPath.startsWith(path);
  const anyMoreActive = moreNav.some((item) => isActive(item.url));

  if (!isMobile) return null;

  return (
    <>
      {/* Backdrop — below nav pill so pill stays visible */}
      <div
        className={`fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          moreOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMoreOpen(false)}
      />

      {/* More drawer — z-[48] so nav pill (z-50) stays on top */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[48] transition-transform duration-300 ease-out ${
          moreOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          background: "rgba(10,10,10,0.97)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px 24px 0 0",
        }}
      >
        <div className="px-5 pb-1 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
            More
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 px-3 pt-2" style={{ paddingBottom: "calc(88px + env(safe-area-inset-bottom, 0px))" }}>
          {moreNav.map((item) => {
            const active = isActive(item.url);
            return (
              <Link
                key={item.title}
                to={item.url}
                onClick={() => setMoreOpen(false)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 transition-colors ${
                  active
                    ? "bg-white/[0.09] text-white/90"
                    : "text-white/40 hover:bg-white/[0.05] hover:text-white/70"
                }`}
              >
                <item.icon strokeWidth={1.5} className="h-5 w-5 shrink-0" />
                <span className="text-[11px] font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom nav pill */}
      <nav
        className="fixed bottom-3.5 left-1/2 z-50 -translate-x-1/2"
        style={{
          width: "min(calc(100% - 28px), 402px)",
          padding: "8px 10px",
          borderRadius: "24px",
          background: "rgba(10,10,10,0.94)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(28px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {primaryNav.map((item) => {
          const active = isActive(item.url);
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              to={item.url}
              aria-label={item.title}
              style={{
                display: "grid",
                placeItems: "center",
                width: 44,
                height: 44,
                borderRadius: 14,
                flexShrink: 0,
                color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.38)",
                background: active ? "rgba(255,255,255,0.09)" : "transparent",
                border: active ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              <Icon strokeWidth={1.5} className="h-[18px] w-[18px]" />
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setMoreOpen((v) => !v)}
          aria-label="More navigation"
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 14,
            flexShrink: 0,
            color:
              moreOpen || anyMoreActive
                ? "rgba(255,255,255,0.92)"
                : "rgba(255,255,255,0.38)",
            background:
              moreOpen || anyMoreActive
                ? "rgba(255,255,255,0.09)"
                : "transparent",
            border:
              moreOpen || anyMoreActive
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid transparent",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <MoreHorizontal className="h-[18px] w-[18px]" />
        </button>
      </nav>
    </>
  );
}
