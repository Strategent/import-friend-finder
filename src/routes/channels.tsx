import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
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
  Sparkles,
  X,
} from "lucide-react";
import { avatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/channels")({
  component: ChannelsPage,
  head: () => ({ meta: [{ title: "Channels — Harwick & Sterne" }] }),
});

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
    text:
      "On it. Pulled YTD allocation drift (+2.4% equities, -1.8% fixed income) and drafted a one-page summary. Shared in #sales-pipeline canvas.",
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

function ChannelsPage() {
  const [active, setActive] = useState("sales-pipeline");
  const { theme } = useTheme();
  const [showSyraTip, setShowSyraTip] = useState(true);

  const dark = theme === "dark";

  const palette = dark
    ? {
        sidebar: "#1E1525",
        sidebarHover: "rgba(255,255,255,0.08)",
        sidebarText: "rgba(255,255,255,0.72)",
        sidebarHeader: "#1A1D21",
        chatBg: "#1A1D21",
        chatBorder: "rgba(255,255,255,0.08)",
        textPrimary: "#E8E8E8",
        textMuted: "rgba(232,232,232,0.55)",
        inputBg: "#222529",
        hover: "rgba(255,255,255,0.04)",
      }
    : {
        sidebar: "#3F0E40",
        sidebarHover: "rgba(255,255,255,0.12)",
        sidebarText: "rgba(255,255,255,0.85)",
        sidebarHeader: "#FFFFFF",
        chatBg: "#FFFFFF",
        chatBorder: "rgba(0,0,0,0.08)",
        textPrimary: "#1D1C1D",
        textMuted: "rgba(29,28,29,0.6)",
        inputBg: "#FFFFFF",
        hover: "rgba(0,0,0,0.04)",
      };

  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: "calc(100dvh - 53px)", background: palette.chatBg }}
    >
      <div className="grid grid-cols-12 h-full w-full">
        {/* Workspace sidebar */}
        <aside
          className="col-span-12 md:col-span-3 lg:col-span-3 flex flex-col"
          style={{ background: palette.sidebar, color: palette.sidebarText }}
        >
          {/* Workspace header */}
          <div className="flex items-center justify-between px-4 py-3">
            <button className="flex items-center gap-1 text-white font-semibold text-[12.5px] whitespace-nowrap truncate min-w-0">
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
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md transition-colors"
                style={{ color: palette.sidebarText }}
                onMouseEnter={(e) => (e.currentTarget.style.background = palette.sidebarHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <l.icon className="h-3.5 w-3.5 opacity-80" />
                {l.label}
              </button>
            ))}
          </div>

          {/* Channels */}
          <div className="px-2 mt-3">
            <div className="flex items-center justify-between px-2 py-1 text-[12px] uppercase tracking-wider text-white/45">
              <span>Channels</span>
              <button className="opacity-70 hover:opacity-100"><Plus className="h-3 w-3" /></button>
            </div>
            <div className="space-y-0.5 mt-1">
              {channels.map((c) => {
                const isActive = active === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => setActive(c.name)}
                    className="w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[13.5px] transition-colors"
                    style={{
                      background: isActive ? "#1164A3" : "transparent",
                      color: isActive
                        ? "#FFFFFF"
                        : c.unread
                          ? "#FFFFFF"
                          : palette.sidebarText,
                      fontWeight: c.unread && !isActive ? 700 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = palette.sidebarHover;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {c.private ? <Lock className="h-3 w-3" /> : <Hash className="h-3.5 w-3.5 opacity-80" />}
                    <span className="flex-1 text-left truncate">{c.name}</span>
                    {c.unread > 0 && (
                      <span className="text-[11px] font-semibold rounded-full bg-[#CB2431] text-white px-1.5 min-w-[18px] text-center">
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
            <div className="flex items-center justify-between px-2 py-1 text-[12px] uppercase tracking-wider text-white/45">
              <span>Direct messages</span>
              <button className="opacity-70 hover:opacity-100"><Plus className="h-3 w-3" /></button>
            </div>
            <div className="space-y-0.5 mt-1">
              {dms.map((d) => (
                <button
                  key={d.name}
                  className="w-full flex items-center gap-2 px-2.5 py-1 rounded-md text-[13.5px]"
                  style={{ color: palette.sidebarText }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = palette.sidebarHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span className="relative">
                    {d.status === "ai" ? (
                      <span className="grid h-4 w-4 place-items-center rounded-sm bg-white/15">
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </span>
                    ) : (
                      <>
                        <span className="h-2 w-2 rounded-full inline-block" style={{
                          background: d.status === "active" ? "#2BAC76" : "transparent",
                          border: d.status === "active" ? "none" : "1.5px solid rgba(255,255,255,0.5)",
                        }} />
                      </>
                    )}
                  </span>
                  <span className="flex-1 text-left truncate">{d.name}</span>
                  {d.name === "Syra" && (
                    <span className="text-[9.5px] px-1.5 py-px rounded bg-white/10 text-white/80">AI</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main pane */}
        <main
          className="col-span-12 md:col-span-9 lg:col-span-9 flex flex-col min-w-0"
          style={{ background: palette.chatBg, color: palette.textPrimary }}
        >
          {/* Channel header */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: palette.chatBorder }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <Hash className="h-4 w-4" style={{ color: palette.textMuted }} />
              <div className="font-bold text-[15px] truncate">{active}</div>
              <ChevronDown className="h-3.5 w-3.5" style={{ color: palette.textMuted }} />
            </div>
            <div
              className="hidden md:flex items-center gap-2 rounded-md border px-2 py-1 text-[12px]"
              style={{ borderColor: palette.chatBorder, color: palette.textMuted }}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search {active}</span>
            </div>
          </div>

          {/* Syra mention tip card */}
          {showSyraTip && (
            <div
              className="mx-4 mt-3 rounded-lg border p-3.5 flex items-start gap-3"
              style={{
                borderColor: palette.chatBorder,
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              }}
            >
              <div
                className="h-9 w-9 rounded-md grid place-items-center shrink-0"
                style={{
                  background: dark ? "rgba(255,255,255,0.08)" : "#1D1C1D",
                  color: "#FFF",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13.5px] font-semibold">Talk to Syra in any channel</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: palette.textMuted }}
                  >
                    AI
                  </span>
                </div>
                <p className="text-[12.5px] mt-0.5" style={{ color: palette.textMuted }}>
                  Mention{" "}
                  <span
                    className="inline-flex items-center rounded px-1 font-medium"
                    style={{
                      background: dark ? "rgba(29,155,209,0.18)" : "rgba(29,155,209,0.12)",
                      color: dark ? "#79C0FF" : "#1264A3",
                    }}
                  >
                    @Syra
                  </span>{" "}
                  in a message to delegate tasks — draft replies, pull data, schedule meetings, or summarize threads.
                </p>
              </div>
              <button
                onClick={() => setShowSyraTip(false)}
                className="shrink-0 grid h-6 w-6 place-items-center rounded-md hover:bg-black/5"
                style={{ color: palette.textMuted }}
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
                    <div
                      className="h-9 w-9 rounded-md grid place-items-center shrink-0"
                      style={{
                        background: "#1D1C1D",
                        color: "#FFF",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </div>
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
                      <div className="font-bold text-[14px]" style={{ color: palette.textPrimary }}>
                        {m.user}
                      </div>
                      {isAi && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded"
                          style={{
                            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                            color: palette.textMuted,
                          }}
                        >
                          APP
                        </span>
                      )}
                      <div className="text-[11.5px]" style={{ color: palette.textMuted }}>
                        {m.time}
                      </div>
                    </div>
                    <div
                      className="text-[14px] mt-0.5 leading-relaxed"
                      style={{ color: palette.textPrimary }}
                    >
                      {m.mentionsSyra ? (
                        <>
                          {m.text.split("@Syra")[0]}
                          <span
                            className="inline-flex items-center rounded px-1 font-medium"
                            style={{
                              background: dark ? "rgba(29,155,209,0.18)" : "rgba(29,155,209,0.12)",
                              color: dark ? "#79C0FF" : "#1264A3",
                            }}
                          >
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
            <div
              className="rounded-lg border"
              style={{ borderColor: palette.chatBorder, background: palette.inputBg }}
            >
              <input
                placeholder={`Message #${active}`}
                className="w-full bg-transparent px-3.5 pt-3 pb-2 text-[14px] focus:outline-none"
                style={{ color: palette.textPrimary }}
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <div className="flex items-center gap-0.5" style={{ color: palette.textMuted }}>
                  {[Plus, Paperclip, AtSign, Smile].map((Ic, idx) => (
                    <button
                      key={idx}
                      className="grid h-7 w-7 place-items-center rounded-md hover:bg-black/10 transition-colors"
                    >
                      <Ic className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
                <button
                  className="grid h-7 w-7 place-items-center rounded-md text-white"
                  style={{ background: "#007A5A" }}
                  aria-label="Send"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="mt-1.5 text-[11px]" style={{ color: palette.textMuted }}>
              Tip: type <span className="font-semibold">@Syra</span> to delegate a task.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
