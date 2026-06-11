import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Sparkles, Reply, Forward, Archive, Star } from "lucide-react";

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
  head: () => ({ meta: [{ title: "Inbox — Harwick & Sterne" }] }),
});

const threads = [
  { id: 1, from: "Sarah Lin · Acme Corp", subject: "Re: Proposal v2 — minor tweaks", preview: "Looks great overall. Two small notes on pricing tier 2 and timing for kickoff…", time: "2m", unread: true, tag: "Hot lead" },
  { id: 2, from: "Marcus Reed · Northwind", subject: "Onboarding questions", preview: "Hey team, before we sign, can you confirm SOC2 status and data residency…", time: "23m", unread: true, tag: "Sales" },
  { id: 3, from: "Stripe", subject: "Payout $12,840 scheduled", preview: "Your payout of $12,840.00 will arrive on May 30…", time: "1h", unread: false, tag: "Billing" },
  { id: 4, from: "Jenna Park · Helios", subject: "Renewal in 14 days", preview: "Quick heads up — annual renewal coming up. Happy with the value so far…", time: "3h", unread: false, tag: "Renewal" },
  { id: 5, from: "Linear", subject: "3 issues assigned to Syra", preview: "OPS-128, OPS-129, OPS-131 are now in Syra's queue…", time: "6h", unread: false, tag: "System" },
];

function InboxPage() {
  const [selected, setSelected] = useState(threads[0]);
  return (
    <PageShell>
      <PageHeader
        eyebrow="Smart Mail"
        title="Inbox"
        description="AI parses every thread, surfaces intent, and drafts replies in your voice."
        actions={
          <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-4 w-4 mr-2" /> Draft with Syra
          </Button>
        }
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-5 bento p-2">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selected.id === t.id ? "bg-primary/10 border border-primary/25" : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-semibold truncate">{t.from}</div>
                <div className="text-[11px] text-muted-foreground shrink-0">{t.time}</div>
              </div>
              <div className="text-[13px] truncate">{t.subject}</div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">{t.preview}</div>
              <div className="mt-2 flex items-center gap-2">
                <Badge className="bg-accent/15 text-accent border border-accent/30 hover:bg-accent/15 text-[10px]">
                  {t.tag}
                </Badge>
                {t.unread && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              </div>
            </button>
          ))}
        </Card>
        <Card className="col-span-12 lg:col-span-7 bento p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{selected.tag}</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">{selected.subject}</h2>
              <div className="text-sm text-muted-foreground mt-1">{selected.from} · {selected.time} ago</div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><Star className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Archive className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="text-sm leading-relaxed text-foreground/90 border-t border-border/60 pt-4">
            {selected.preview} Looking forward to your thoughts. Let me know if a 30-minute sync this week works.
          </div>
          <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Syra drafted a reply
            </div>
            <p className="mt-2 text-sm leading-relaxed">
              Hi {selected.from.split(" ")[0]}, thanks for the notes — happy to adjust tier 2 pricing as proposed and lock kickoff for the week of June 10th. I'll send an updated SOW shortly and a calendar invite for a 30-min walkthrough.
            </p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
                <Reply className="h-3.5 w-3.5 mr-1.5" /> Send
              </Button>
              <Button size="sm" variant="outline" className="border-border/60">Edit</Button>
              <Button size="sm" variant="ghost"><Forward className="h-3.5 w-3.5 mr-1.5" /> Regenerate</Button>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}