import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/app/shell/page-shell";
import { Phone, PhoneIncoming, PhoneOutgoing, Play, Bot } from "lucide-react";

export const Route = createFileRoute("/calls")({
  component: CallsPage,
  head: () => ({ meta: [{ title: "Calls — Harwick & Sterne" }] }),
});

const calls = [
  {
    dir: "in",
    contact: "Sarah Lin",
    company: "Acme Corp",
    duration: "4m 12s",
    time: "10:42",
    outcome: "Booked demo",
    ai: true,
  },
  {
    dir: "out",
    contact: "Marcus Reed",
    company: "Northwind",
    duration: "8m 03s",
    time: "10:18",
    outcome: "Follow-up sent",
    ai: false,
  },
  {
    dir: "in",
    contact: "Jenna Park",
    company: "Helios",
    duration: "2m 41s",
    time: "09:55",
    outcome: "AI handled · Resolved",
    ai: true,
  },
  {
    dir: "in",
    contact: "Diego Alvarez",
    company: "Vertex",
    duration: "12m 09s",
    time: "09:21",
    outcome: "Escalated to Avery",
    ai: false,
  },
  {
    dir: "out",
    contact: "Priya Shah",
    company: "Lumen",
    duration: "5m 47s",
    time: "08:50",
    outcome: "Quote requested",
    ai: false,
  },
];

function CallsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Voice Operations"
        title="Calls"
        description="Inbound and outbound calls handled by your team and the Syra voice agent."
        actions={
          <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
            <Phone className="h-4 w-4 mr-2" /> Place Call
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Handled today", value: "42" },
          { label: "AI deflected", value: "68%", accent: true },
          { label: "Avg duration", value: "3m 12s" },
          { label: "Escalations", value: "5" },
        ].map((s) => (
          <Card key={s.label} className="bento p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
            <div
              className={`mt-2 text-2xl font-semibold tracking-tight ${s.accent ? "text-accent" : ""}`}
            >
              {s.value}
            </div>
          </Card>
        ))}
      </div>
      <Card className="bento p-2">
        {calls.map((c, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04]">
            <div className="h-9 w-9 rounded-lg grid place-items-center border border-border/60 bg-primary/10">
              {c.dir === "in" ? (
                <PhoneIncoming className="h-4 w-4 text-primary" />
              ) : (
                <PhoneOutgoing className="h-4 w-4 text-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium">
                {c.contact} <span className="text-muted-foreground font-normal">· {c.company}</span>
              </div>
              <div className="text-xs text-muted-foreground">{c.outcome}</div>
            </div>
            {c.ai && (
              <Badge className="bg-accent/15 text-accent border border-accent/30 hover:bg-accent/15">
                <Bot className="h-3 w-3 mr-1" /> Syra
              </Badge>
            )}
            <div className="text-xs text-muted-foreground w-16 text-right">{c.duration}</div>
            <div className="text-xs text-muted-foreground w-14 text-right">{c.time}</div>
            <Button variant="ghost" size="icon">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </Card>
    </PageShell>
  );
}
