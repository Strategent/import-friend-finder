import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Sparkles, Send, Bot, Zap } from "lucide-react";

export const Route = createFileRoute("/syra")({
  component: SyraPage,
  head: () => ({ meta: [{ title: "Syra — Harwick & Sterne" }] }),
});

const conversation = [
  { role: "syra", text: "Good morning, Avery. Three things need attention: Acme proposal reply, Helios renewal nudge, and the Q2 forecast refresh." },
  { role: "user", text: "Draft the Helios renewal note and pull the latest forecast numbers." },
  { role: "syra", text: "Drafted. Tone: warm, specific value recap. Forecast updated — MRR projection $138.2k by July. Want me to send the renewal note?" },
];

function SyraPage() {
  const [input, setInput] = useState("");
  return (
    <PageShell>
      <PageHeader
        eyebrow={<><Bot className="h-3.5 w-3.5 text-accent" /> AI Agent</>}
        title="Syra"
        description="Your operations co-pilot. Asks, drafts, executes."
      />
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-8 bento p-0 flex flex-col h-[600px]">
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {conversation.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "syra" && (
                  <div className="h-9 w-9 rounded-xl grid place-items-center shrink-0" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary/15 border border-primary/25" : "bg-white/[0.04] border border-border/60"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/60 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Syra anything — draft, analyze, automate…"
              className="flex-1 h-11 px-4 rounded-lg bg-background/60 border border-border/60 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <Button className="text-white border-0 h-11" style={{ background: "var(--gradient-primary)" }}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Card className="bento p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Active · monitoring 12 workflows</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Tasks today</div>
                <div className="text-xl font-semibold">87</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</div>
                <div className="text-xl font-semibold text-primary">98.4%</div>
              </div>
            </div>
          </Card>
          <Card className="bento p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Capabilities</div>
            <div className="space-y-2">
              {["Inbox triage & drafting", "Voice calls (inbound)", "CRM enrichment", "Document Q&A", "Slack triage"].map((c) => (
                <div key={c} className="flex items-center gap-2 text-[13px]">
                  <Zap className="h-3.5 w-3.5 text-accent" /> {c}
                </div>
              ))}
            </div>
          </Card>
          <Card className="bento p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Suggested</div>
            <div className="mt-2 space-y-2">
              {["Summarize this week's deals", "Audit overdue invoices", "Draft Q2 board update"].map((s) => (
                <Badge key={s} className="block w-full text-left bg-white/[0.04] text-foreground border border-border/60 hover:bg-white/[0.08] cursor-pointer py-1.5 px-3">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}