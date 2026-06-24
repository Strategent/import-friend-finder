import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Bold,
  Italic,
  Underline,
  Link2,
  List,
  ListOrdered,
  AlignLeft,
  Image as ImageIcon,
  Paperclip,
  Smile,
  Type,
  ChevronDown,
  Minus,
  X,
} from "lucide-react";
import { SyraChatWidget } from "@/features/syra/components/syra-chat-widget";

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
  {
    id: 1,
    from: "Sarah Lin",
    company: "Acme Corp",
    subject: "Re: Proposal v2 — minor tweaks",
    preview: "Looks great overall. Two small notes on pricing tier 2 and timing for kickoff…",
    time: "2m",
    unread: true,
    tag: "Hot lead",
  },
  {
    id: 2,
    from: "Marcus Reed",
    company: "Northwind",
    subject: "Onboarding questions",
    preview: "Hey team, before we sign, can you confirm SOC2 status and data residency…",
    time: "23m",
    unread: true,
    tag: "Sales",
  },
  {
    id: 3,
    from: "Stripe",
    company: "Payouts",
    subject: "Payout $12,840 scheduled",
    preview: "Your payout of $12,840.00 will arrive on May 30…",
    time: "1h",
    unread: false,
    tag: "Billing",
  },
  {
    id: 4,
    from: "Jenna Park",
    company: "Helios",
    subject: "Renewal in 14 days",
    preview: "Quick heads up — annual renewal coming up. Happy with the value so far…",
    time: "3h",
    unread: false,
    tag: "Renewal",
  },
  {
    id: 5,
    from: "Linear",
    company: "Notifications",
    subject: "3 issues assigned to Syra",
    preview: "OPS-128, OPS-129, OPS-131 are now in Syra's queue…",
    time: "6h",
    unread: false,
    tag: "System",
  },
  {
    id: 6,
    from: "Olivia Chen",
    company: "Bridgewater",
    subject: "Quick intro to our ops lead",
    preview: "Wanted to connect you with Priya who runs revenue ops at Bridgewater…",
    time: "Yesterday",
    unread: false,
    tag: "Intro",
  },
  {
    id: 7,
    from: "DocuSign",
    company: "Agreements",
    subject: "Signed: MSA — Northwind",
    preview: "All parties have completed the document. View completed envelope…",
    time: "Yesterday",
    unread: false,
    tag: "Legal",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function InboxPage() {
  const [selected, setSelected] = useState(threads[0]);
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [foldersOpen, setFoldersOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!foldersOpen) return;
    const onClick = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setFoldersOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFoldersOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [foldersOpen]);

  const activeIcon = folders.find((f) => f.name === activeFolder)?.icon ?? InboxIcon;
  const ActiveIcon = activeIcon;

  return (
    <>
      <div
        className="flex w-full bg-muted/20 overflow-hidden"
        style={{ height: "calc(100dvh - 53px)" }}
      >
        {/* Thread list */}
        <section className="w-[380px] shrink-0 flex flex-col border-r border-border/60 min-w-0 bg-background">
          <div className="h-12 px-4 flex items-center gap-2 border-b border-border/60">
            {/* Mailbox glass pill — opens folder picker */}
            <div className="relative" ref={popoverRef}>
              <button
                onClick={() => setFoldersOpen((v) => !v)}
                aria-label="Mailboxes"
                aria-expanded={foldersOpen}
                className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full border border-border/70 bg-chrome backdrop-blur-md text-[12px] font-medium text-foreground/90 hover:bg-state-hover transition-colors shadow-sm"
              >
                <ActiveIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                <span>{activeFolder}</span>
              </button>
              {foldersOpen && (
                <div
                  className="absolute left-0 top-10 z-30 w-56 p-1.5 rounded-2xl border border-border/70 bg-popover/85 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{
                    boxShadow: "var(--elevation-popover)",
                  }}
                >
                  {folders.map((f) => {
                    const Icon = f.icon;
                    const active = f.name === activeFolder;
                    return (
                      <button
                        key={f.name}
                        onClick={() => {
                          setActiveFolder(f.name);
                          setFoldersOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 h-8 rounded-lg text-[13px] transition-colors ${
                          active
                            ? "bg-state-selected text-foreground font-medium"
                            : "text-foreground/80 hover:bg-state-hover"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                        <span className="flex-1 text-left">{f.name}</span>
                        {f.count != null && (
                          <span className="text-[11px] text-muted-foreground tabular-nums">
                            {f.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center gap-2 h-8 px-2.5 rounded-md bg-muted/50 border border-border/60">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search mail"
                className="flex-1 bg-transparent text-[12.5px] placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <button
              aria-label="Filter"
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-state-hover"
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
                    active ? "bg-state-selected" : "hover:bg-state-hover"
                  }`}
                >
                  {t.unread && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`text-[13px] truncate ${t.unread ? "font-semibold text-foreground" : "font-medium text-foreground/90"}`}
                    >
                      {t.from}
                    </div>
                    <div className="text-[11px] text-muted-foreground shrink-0 tabular-nums">
                      {t.time}
                    </div>
                  </div>
                  <div
                    className={`text-[12.5px] truncate mt-0.5 ${t.unread ? "text-foreground" : "text-foreground/80"}`}
                  >
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
        <main className="flex-1 flex flex-col min-w-0 bg-background">
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
                      {selected.from}{" "}
                      <span className="text-muted-foreground font-normal">
                        · {selected.company}
                      </span>
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

            {/* Gmail-style compose window */}
            <ComposeWindow selectedFrom={selected.from} selectedSubject={selected.subject} />
          </div>
        </main>
      </div>
      <SyraChatWidget />
    </>
  );
}

function ToolbarBtn({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-state-hover transition-colors"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}

function FmtBtn({
  icon: Icon,
  label,
  withCaret = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  withCaret?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-state-hover transition-colors"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.85} />
      {withCaret && <ChevronDown className="h-3 w-3 opacity-60" />}
    </button>
  );
}

function FmtDivider() {
  return <span className="mx-0.5 h-4 w-px bg-border/70" />;
}

function ComposeWindow({
  selectedFrom,
  selectedSubject,
}: {
  selectedFrom: string;
  selectedSubject: string;
}) {
  const firstName = selectedFrom.split(" ")[0];
  return (
    <div
      className="mt-8 max-w-2xl bg-card border border-border/70 rounded-xl overflow-hidden"
      style={{
        boxShadow: "var(--elevation-popover)",
      }}
    >
      {/* Title bar — Gmail style */}
      <div className="flex items-center justify-between px-3.5 h-9 bg-surface-raised border-b border-border/60">
        <div className="flex items-center gap-2 text-[12px] font-medium text-foreground/85">
          <CornerUpLeft className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.85} />
          New message
        </div>
        <div className="flex items-center gap-0.5 text-muted-foreground">
          <button
            className="grid h-6 w-6 place-items-center rounded hover:text-foreground hover:bg-state-hover"
            aria-label="Minimize"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            className="grid h-6 w-6 place-items-center rounded hover:text-foreground hover:bg-state-hover"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Recipient + subject fields */}
      <div className="text-[13px]">
        <div className="flex items-center gap-3 px-4 h-9 border-b border-border/50">
          <span className="text-muted-foreground w-12 shrink-0">To</span>
          <span className="inline-flex items-center gap-1.5 h-6 pl-1 pr-2 rounded-full bg-surface-raised text-[12px]">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-surface-hover text-[9px] font-semibold">
              {firstName[0]}
            </span>
            {firstName.toLowerCase()}@acme.com
          </span>
          <div className="ml-auto flex items-center gap-3 text-[12px] text-muted-foreground">
            <button className="hover:text-foreground">Cc</button>
            <button className="hover:text-foreground">Bcc</button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 h-9 border-b border-border/50">
          <span className="text-muted-foreground w-12 shrink-0">Subject</span>
          <span className="truncate">Re: {selectedSubject}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4 min-h-[180px] text-[13.5px] leading-relaxed text-foreground/90">
        <p>Hi {firstName},</p>
        <p className="mt-3">
          Thanks for the notes — happy to adjust tier 2 pricing as proposed and lock kickoff for the
          week of June 10th. I'll send an updated SOW shortly and a calendar invite for a 30-min
          walkthrough.
        </p>
        <p className="mt-3 text-muted-foreground/80">
          Best,
          <br />
          Syra
        </p>
      </div>

      {/* Formatting toolbar */}
      <div className="px-3 py-1.5 border-t border-border/60 bg-surface-raised flex items-center gap-0.5 overflow-x-auto">
        <FmtBtn icon={Type} label="Font" withCaret />
        <FmtDivider />
        <FmtBtn icon={Bold} label="Bold" />
        <FmtBtn icon={Italic} label="Italic" />
        <FmtBtn icon={Underline} label="Underline" />
        <FmtDivider />
        <FmtBtn icon={AlignLeft} label="Align" withCaret />
        <FmtBtn icon={List} label="Bulleted list" />
        <FmtBtn icon={ListOrdered} label="Numbered list" />
        <FmtDivider />
        <FmtBtn icon={Link2} label="Insert link" />
        <FmtBtn icon={ImageIcon} label="Insert image" />
        <FmtBtn icon={Smile} label="Emoji" />
      </div>

      {/* Action bar */}
      <div className="px-3 py-2 border-t border-border/60 bg-card flex items-center justify-between">
        <div className="flex items-center">
          <button className="inline-flex items-center h-8 pl-3 pr-3 rounded-l-md bg-primary text-primary-foreground text-[12.5px] font-medium hover:bg-primary/90">
            <Send className="h-3.5 w-3.5 mr-2" strokeWidth={2} />
            Send
          </button>
          <button
            aria-label="Send options"
            className="grid place-items-center h-8 w-7 rounded-r-md bg-primary text-primary-foreground hover:bg-primary/90 border-l border-primary-foreground/20"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <div className="ml-2 flex items-center gap-0.5 text-muted-foreground">
            <FmtBtn icon={Paperclip} label="Attach files" />
            <FmtBtn icon={Link2} label="Insert link" />
            <FmtBtn icon={Smile} label="Insert emoji" />
            <FmtBtn icon={ImageIcon} label="Insert photo" />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="h-7 px-2.5 text-[11.5px] rounded-md text-muted-foreground hover:text-foreground hover:bg-state-hover">
            Syra: Regenerate
          </button>
          <button
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-state-hover"
            aria-label="More"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <button
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-state-hover"
            aria-label="Discard"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
