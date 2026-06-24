import { useState } from "react";
import {
  Hash,
  Lock,
  Send,
  Plus,
  ChevronDown,
  Smile,
  Paperclip,
  AtSign,
  Bookmark,
  Bell,
  Search,
  X,
} from "lucide-react";
import { avatarUrl } from "@/lib/avatar";
import { SyraMark } from "@/features/syra/components/syra-mark";
import { cn } from "@/lib/utils";

const channels = [
  { name: "general", private: false, unread: 0 },
  { name: "ops-alerts", private: false, unread: 3 },
  { name: "sales-pipeline", private: false, unread: 12 },
  { name: "syra-handoff", private: true, unread: 1 },
  { name: "exec", private: true, unread: 0 },
  { name: "client-hartley", private: false, unread: 0 },
  { name: "research", private: false, unread: 2 },
];

const dms = [
  { name: "Elena Smith", status: "active" },
  { name: "Adrian Engman", status: "away" },
  { name: "Claire Bennett", status: "active" },
  { name: "Syra", status: "ai" },
];

const messages = [
  {
    user: "Elena Smith",
    text: "Heads up — Hartley Trust just replied to the IPS draft. Want me to forward?",
    time: "10:42 AM",
  },
  {
    user: "Adrian Engman",
    text: "Looping in @Syra to pull the latest rebalance numbers before Thursday's call.",
    time: "10:44 AM",
    mentionsSyra: true,
  },
  {
    user: "Syra",
    text: "On it. Pulled YTD allocation drift (+2.4% equities, -1.8% fixed income) and drafted a one-page summary. Shared in #sales-pipeline canvas.",
    time: "10:44 AM",
    ai: true,
  },
  {
    user: "Claire Bennett",
    text: "Perfect. Let's review on the 2pm sync. I'll add it to the agenda.",
    time: "10:46 AM",
  },
  {
    user: "Daniel Brooks",
    text: "Quick note — Marlow Capital wants the alts sleeve memo by Friday EOD.",
    time: "10:51 AM",
  },
];

export function ChannelsScreen() {
  const [active, setActive] = useState("sales-pipeline");
  const [showSyraTip, setShowSyraTip] = useState(true);

  return (
    <div
      className="w-full overflow-hidden bg-background"
      style={{ height: "calc(100dvh - var(--topbar-h))" }}
    >
      <div className="grid grid-cols-12 h-full w-full">
        {/* Workspace sidebar */}
        <aside className="col-span-12 flex flex-col bg-sidebar text-sidebar-foreground md:col-span-3 lg:col-span-3">
          {/* Workspace header */}
          <div className="flex items-center justify-between px-4 py-3">
            <button className="flex min-w-0 items-center gap-1 truncate whitespace-nowrap text-[12.5px] font-semibold text-sidebar-foreground">
              <span className="truncate">Harwick &amp; Sterne</span>
              <ChevronDown className="h-3 w-3 shrink-0" />
            </button>
          </div>

          {/* Quick links */}
          <div className="px-2 pt-3 pb-1 text-[13px] space-y-0.5">
            {[
              { icon: AtSign, label: "Mentions" },
              { icon: Bookmark, label: "Saved" },
              { icon: Bell, label: "Activity" },
            ].map((l) => (
              <button
                key={l.label}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <l.icon className="h-3.5 w-3.5 opacity-80" />
                {l.label}
              </button>
            ))}
          </div>

          {/* Channels */}
          <div className="px-2 mt-3">
            <div className="flex items-center justify-between px-2 py-1 text-[12px] uppercase tracking-wider text-sidebar-foreground/45">
              <span>Channels</span>
              <button className="opacity-70 hover:opacity-100">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-0.5 mt-1">
              {channels.map((c) => {
                const isActive = active === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActive(c.name)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[13.5px] transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : c.unread
                          ? "font-bold text-sidebar-foreground hover:bg-sidebar-accent"
                          : "font-normal text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    {c.private ? (
                      <Lock className="h-3 w-3" />
                    ) : (
                      <Hash className="h-3.5 w-3.5 opacity-80" />
                    )}
                    <span className="flex-1 text-left truncate">{c.name}</span>
                    {c.unread > 0 && (
                      <span className="min-w-[18px] rounded-full bg-status-danger px-1.5 text-center text-[11px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DMs */}
          <div className="px-2 mt-4">
            <div className="flex items-center justify-between px-2 py-1 text-[12px] uppercase tracking-wider text-sidebar-foreground/45">
              <span>Direct messages</span>
              <button className="opacity-70 hover:opacity-100">
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-0.5 mt-1">
              {dms.map((d) => (
                <button
                  key={d.name}
                  className="w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[13.5px] text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                  <span className="relative">
                    {d.status === "ai" ? (
                      <SyraMark size={14} flat />
                    ) : (
                      <>
                        <span
                          className={cn(
                            "inline-block h-2 w-2 rounded-full border",
                            d.status === "active"
                              ? "border-status-success bg-status-success"
                              : "border-sidebar-foreground/50 bg-transparent",
                          )}
                        />
                      </>
                    )}
                  </span>
                  <span className="flex-1 text-left truncate">{d.name}</span>
                  {d.name === "Syra" && (
                    <span className="rounded bg-sidebar-accent px-1.5 py-px text-[9.5px] text-sidebar-foreground/80">
                      AI
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main pane */}
        <main className="col-span-12 flex min-w-0 flex-col bg-background text-foreground md:col-span-9 lg:col-span-9">
          {/* Channel header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div className="font-bold text-[15px] truncate">{active}</div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="hidden items-center gap-2 rounded-md border border-border px-2 py-1 text-[12px] text-muted-foreground md:flex">
              <Search className="h-3.5 w-3.5" />
              <span>Search {active}</span>
            </div>
          </div>

          {/* Syra mention tip card */}
          {showSyraTip && (
            <div className="mx-4 mt-3 flex items-start gap-3 rounded-lg border border-border bg-surface-raised p-3.5">
              <SyraMark size={36} className="shrink-0 rounded-md" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold">Talk to Syra in any channel</span>
                  <span className="rounded bg-state-hover px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    AI
                  </span>
                </div>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">
                  Mention{" "}
                  <span className="inline-flex items-center rounded bg-status-info/15 px-1 font-medium text-status-info">
                    @Syra
                  </span>{" "}
                  in a message to delegate tasks — draft replies, pull data, schedule meetings, or
                  summarize threads.
                </p>
              </div>
              <button
                onClick={() => setShowSyraTip(false)}
                className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-state-hover"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => {
              const isAi = m.ai;
              return (
                <div key={i} className="flex gap-3 group">
                  {isAi ? (
                    <SyraMark size={36} className="shrink-0 rounded-md" />
                  ) : (
                    <img
                      src={avatarUrl(m.user, 72)}
                      alt={m.user}
                      loading="lazy"
                      className="h-9 w-9 rounded-md object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <div className="text-[14px] font-bold">{m.user}</div>
                      {isAi && (
                        <span className="rounded bg-state-hover px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          APP
                        </span>
                      )}
                      <div className="text-[11.5px] text-muted-foreground">{m.time}</div>
                    </div>
                    <div className="mt-0.5 text-[14px] leading-relaxed">
                      {m.mentionsSyra ? (
                        <>
                          {m.text.split("@Syra")[0]}
                          <span className="inline-flex items-center rounded bg-status-info/15 px-1 font-medium text-status-info">
                            @Syra
                          </span>
                          {m.text.split("@Syra")[1]}
                        </>
                      ) : (
                        m.text
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <div className="px-4 pb-4">
            <div className="rounded-lg border border-border bg-surface-raised">
              <input
                placeholder={`Message #${active}`}
                className="w-full bg-transparent px-3.5 pt-3 pb-2 text-[14px] focus:outline-none"
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-0.5 text-muted-foreground">
                  {[Plus, Paperclip, AtSign, Smile].map((Ic, idx) => (
                    <button
                      key={idx}
                      className="grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-state-hover"
                    >
                      <Ic className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
                <button
                  className="grid h-7 w-7 place-items-center rounded-md bg-status-success text-primary-foreground"
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="mt-1.5 text-[11px] text-muted-foreground">
              Tip: type <span className="font-semibold">@Syra</span> to delegate a task.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
