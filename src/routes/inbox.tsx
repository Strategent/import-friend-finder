import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Inbox as InboxIcon,
  Star,
  Flag,
  FileEdit,
  Send,
  Archive,
  Trash2,
  Reply,
  ReplyAll,
  Forward,
  Search,
  Filter,
  MoreHorizontal,
  Printer,
  CornerUpLeft,
} from "lucide-react";
import { SyraChatWidget } from "@/components/syra-chat-widget";

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
  head: () => ({ meta: [{ title: "Inbox — Harwick & Sterne" }] }),
});

const folders = [
  { name: "Inbox", icon: InboxIcon, count: 12 },
  { name: "VIPs", icon: Star, count: 3 },
  { name: "Flagged", icon: Flag, count: 2 },
  { name: "Drafts", icon: FileEdit, count: 4 },
  { name: "Sent", icon: Send },
  { name: "Archive", icon: Archive },
  { name: "Trash", icon: Trash2 },
];

const threads = [
  { id: 1, from: "Sarah Lin", company: "Acme Corp", subject: "Re: Proposal v2 — minor tweaks", preview: "Looks great overall. Two small notes on pricing tier 2 and timing for kickoff…", time: "2m", unread: true, tag: "Hot lead" },
  { id: 2, from: "Marcus Reed", company: "Northwind", subject: "Onboarding questions", preview: "Hey team, before we sign, can you confirm SOC2 status and data residency…", time: "23m", unread: true, tag: "Sales" },
  { id: 3, from: "Stripe", company: "Payouts", subject: "Payout $12,840 scheduled", preview: "Your payout of $12,840.00 will arrive on May 30…", time: "1h", unread: false, tag: "Billing" },
  { id: 4, from: "Jenna Park", company: "Helios", subject: "Renewal in 14 days", preview: "Quick heads up — annual renewal coming up. Happy with the value so far…", time: "3h", unread: false, tag: "Renewal" },
  { id: 5, from: "Linear", company: "Notifications", subject: "3 issues assigned to Syra", preview: "OPS-128, OPS-129, OPS-131 are now in Syra's queue…", time: "6h", unread: false, tag: "System" },
  { id: 6, from: "Olivia Chen", company: "Bridgewater", subject: "Quick intro to our ops lead", preview: "Wanted to connect you with Priya who runs revenue ops at Bridgewater…", time: "Yesterday", unread: false, tag: "Intro" },
  { id: 7, from: "DocuSign", company: "Agreements", subject: "Signed: MSA — Northwind", preview: "All parties have completed the document. View completed envelope…", time: "Yesterday", unread: false, tag: "Legal" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function InboxPage() {
  const [selected, setSelected] = useState(threads[0]);
  const [activeFolder, setActiveFolder] = useState("Inbox");

  return (
    <>
      <div className="flex w-full bg-background overflow-hidden" style={{ height: "calc(100dvh - 53px)" }}>
        {/* Folders sidebar */}
        <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-border/60 bg-muted/30">
          <div className="px-5 pt-5 pb-3">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">Mailbox</div>
          </div>
          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {folders.map((f) => {
              const Icon = f.icon;
              const active = f.name === activeFolder;
              return (
                <button
                  key={f.name}
                  onClick={() => setActiveFolder(f.name)}
                  className={`w-full flex items-center gap-2.5 px-3 h-8 rounded-md text-[13px] transition-colors ${
                    active
                      ? "bg-foreground/[0.06] text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  <span className="flex-1 text-left">{f.name}</span>
                  {f.count != null && (
                    <span className="text-[11px] text-muted-foreground tabular-nums">{f.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Thread list */}
        <section className="w-[360px] shrink-0 flex flex-col border-r border-border/60 min-w-0">
          <div className="h-12 px-4 flex items-center gap-2 border-b border-border/60">
            <div className="flex-1 flex items-center gap-2 h-8 px-2.5 rounded-md bg-muted/50 border border-border/60">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search mail"
                className="flex-1 bg-transparent text-[12.5px] placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              aria-label="Filter"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]"
            >
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="px-4 pt-3 pb-2 flex items-baseline justify-between">
            <div className="text-[15px] font-semibold tracking-tight">{activeFolder}</div>
            <div className="text-[11px] text-muted-foreground">{threads.length} messages</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map((t) => {
              const active = selected.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className={`w-full text-left px-4 py-3 border-b border-border/40 transition-colors relative ${
                    active
                      ? "bg-foreground/[0.05]"
                      : "hover:bg-foreground/[0.03]"
                  }`}
                >
                  {t.unread && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div className={`text-[13px] truncate ${t.unread ? "font-semibold text-foreground" : "font-medium text-foreground/90"}`}>
                      {t.from}
                    </div>
                    <div className="text-[11px] text-muted-foreground shrink-0 tabular-nums">{t.time}</div>
                  </div>
                  <div className={`text-[12.5px] truncate mt-0.5 ${t.unread ? "text-foreground" : "text-foreground/80"}`}>
                    {t.subject}
                  </div>
                  <div className="text-[12px] text-muted-foreground line-clamp-2 mt-0.5 leading-snug">
                    {t.preview}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-muted text-muted-foreground border border-border/60">
                      {t.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Reading pane */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="h-12 px-4 flex items-center justify-between border-b border-border/60">
            <div className="flex items-center gap-1">
              <ToolbarBtn icon={Archive} label="Archive" />
              <ToolbarBtn icon={Trash2} label="Delete" />
              <ToolbarBtn icon={Flag} label="Flag" />
              <span className="mx-1 h-5 w-px bg-border/60" />
              <ToolbarBtn icon={Reply} label="Reply" />
              <ToolbarBtn icon={ReplyAll} label="Reply All" />
              <ToolbarBtn icon={Forward} label="Forward" />
            </div>
            <div className="flex items-center gap-1">
              <ToolbarBtn icon={Printer} label="Print" />
              <ToolbarBtn icon={MoreHorizontal} label="More" />
            </div>
          </div>

          {/* Message header */}
          <div className="px-8 pt-7 pb-5 border-b border-border/60">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-muted text-muted-foreground grid place-items-center text-[12px] font-semibold shrink-0">
                {initials(selected.from)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold tracking-tight truncate">
                      {selected.from} <span className="text-muted-foreground font-normal">· {selected.company}</span>
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">
                      To: me · {selected.time} ago
                    </div>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Star className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-3 text-[22px] font-semibold tracking-tight leading-tight">
                  {selected.subject}
                </h2>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <div className="max-w-2xl text-[14px] leading-relaxed text-foreground/90 whitespace-pre-line">
              {`Hi team,\n\n${selected.preview}\n\nLooking forward to your thoughts. Let me know if a 30-minute sync this week works.\n\nBest,\n${selected.from.split(" ")[0]}`}
            </div>

            {/* Syra suggested reply — monotone */}
            <div className="mt-8 max-w-2xl border border-border/60 bg-muted/30 rounded-lg overflow-hidden">
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-border/60 bg-muted/40">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                  <CornerUpLeft className="h-3 w-3" />
                  Syra suggested reply
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="h-7 px-2.5 text-[11.5px] rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]">
                    Regenerate
                  </button>
                  <button className="h-7 px-2.5 text-[11.5px] rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05]">
                    Edit
                  </button>
                  <button className="h-7 px-3 text-[11.5px] rounded-md bg-foreground text-background font-medium hover:bg-foreground/90">
                    Send
                  </button>
                </div>
              </div>
              <div className="px-4 py-3.5 text-[13.5px] leading-relaxed text-foreground/90">
                Hi {selected.from.split(" ")[0]}, thanks for the notes — happy to adjust tier 2 pricing as proposed and lock kickoff for the week of June 10th. I'll send an updated SOW shortly and a calendar invite for a 30-min walkthrough.
              </div>
            </div>
          </div>
        </main>
      </div>
      <SyraChatWidget />
    </>
  );
}

function ToolbarBtn({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/[0.05] transition-colors"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}