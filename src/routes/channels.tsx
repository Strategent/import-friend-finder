import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Hash, Lock, Send, Slack } from "lucide-react";

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
];

const messages = [
  { user: "Avery", text: "Heads up — Acme just replied, Syra drafted a response.", time: "10:42" },
  { user: "Syra", text: "Draft attached. Tone: confident, concise. Awaiting approval.", time: "10:42", ai: true },
  { user: "Marcus", text: "Looks great, send it. Also pinging legal on the SOW addendum.", time: "10:45" },
  { user: "Jenna", text: "I'll add the new pricing tier to the proposal template.", time: "10:48" },
];

function ChannelsPage() {
  const [active, setActive] = useState("sales-pipeline");
  return (
    <PageShell>
      <PageHeader
        eyebrow={<><Slack className="h-3.5 w-3.5" /> Slack integrated</>}
        title="Channels"
        description="Team chat, synced with your Slack workspace."
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 md:col-span-3 bento p-2">
          {channels.map((c) => (
            <button
              key={c.name}
              onClick={() => setActive(c.name)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-colors ${
                active === c.name ? "bg-primary/15 text-foreground border border-primary/25" : "text-muted-foreground hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {c.private ? <Lock className="h-3.5 w-3.5" /> : <Hash className="h-3.5 w-3.5" />}
              <span className="flex-1 text-left truncate">{c.name}</span>
              {c.unread > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">{c.unread}</span>
              )}
            </button>
          ))}
        </Card>
        <Card className="col-span-12 md:col-span-9 bento p-0 flex flex-col h-[560px]">
          <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm font-semibold">{active}</div>
            <Badge className="ml-2 bg-accent/15 text-accent border border-accent/30 hover:bg-accent/15"><Slack className="h-3 w-3 mr-1" /> Synced</Badge>
          </div>
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className="flex gap-3">
                <div className={`h-9 w-9 rounded-lg grid place-items-center text-[11px] font-semibold shrink-0 ${m.ai ? "bg-accent/20 text-accent" : ""}`} style={!m.ai ? { background: "var(--gradient-primary)" } : {}}>
                  {m.user.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <div className="text-[13px] font-semibold">{m.user}</div>
                    {m.ai && <Badge className="bg-accent/15 text-accent border border-accent/30 hover:bg-accent/15 text-[10px]">AI</Badge>}
                    <div className="text-[11px] text-muted-foreground">{m.time}</div>
                  </div>
                  <div className="text-sm mt-0.5">{m.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/60 flex items-center gap-2">
            <input
              placeholder={`Message #${active}`}
              className="flex-1 h-10 px-3 rounded-lg bg-background/60 border border-border/60 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}