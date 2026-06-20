import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import {
  Paperclip,
  ArrowUp,
  Sparkles,
  FileText,
  Inbox,
  Calendar,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/syra")({
  component: SyraPage,
  head: () => ({ meta: [{ title: "Syra — Harwick & Sterne" }] }),
});

const quickActions = [
  { icon: FileText, label: "Draft Email" },
  { icon: Inbox, label: "Triage Inbox" },
  { icon: Calendar, label: "Schedule Meeting" },
  { icon: Workflow, label: "Run Workflow" },
];

function SyraPage() {
  const [input, setInput] = useState("");
  return (
    <PageShell>
      <style>{`
        @keyframes syra-drift-1 { 0%,100% { transform: translate(-8%, 4%) scale(1); } 50% { transform: translate(6%, -4%) scale(1.15); } }
        @keyframes syra-drift-2 { 0%,100% { transform: translate(10%, -6%) scale(1.1); } 50% { transform: translate(-6%, 8%) scale(0.95); } }
        @keyframes syra-drift-3 { 0%,100% { transform: translate(0%, 8%) scale(1.05); } 50% { transform: translate(4%, -2%) scale(1.2); } }
        .syra-blob { position: absolute; border-radius: 9999px; filter: blur(80px); mix-blend-mode: screen; opacity: 0.55; }
      `}</style>

      <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-[#0a0a0c] min-h-[78vh] flex flex-col">
        {/* Animated monochrome fluid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="syra-blob"
            style={{
              top: "-15%", left: "10%", width: "55%", height: "55%",
              background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 70%)",
              animation: "syra-drift-1 18s ease-in-out infinite",
            }}
          />
          <div
            className="syra-blob"
            style={{
              bottom: "-20%", right: "5%", width: "65%", height: "65%",
              background: "radial-gradient(circle, rgba(220,220,230,0.28) 0%, rgba(255,255,255,0) 70%)",
              animation: "syra-drift-2 24s ease-in-out infinite",
            }}
          />
          <div
            className="syra-blob"
            style={{
              top: "30%", left: "40%", width: "45%", height: "45%",
              background: "radial-gradient(circle, rgba(180,180,190,0.22) 0%, rgba(255,255,255,0) 70%)",
              animation: "syra-drift-3 20s ease-in-out infinite",
            }}
          />
          {/* Subtle grain / vignette */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(120% 80% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%), radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 55%)",
          }} />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50 mb-6">
            <Sparkles className="h-3.5 w-3.5" /> AI Operations Agent
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white text-center">
            Ask Syra
          </h1>
          <p className="mt-4 text-white/55 text-center max-w-xl text-[15px]">
            Draft, analyze, automate. Syra moves work forward across your inbox,
            calendar, CRM, and channels.
          </p>

          {/* Input bar */}
          <div className="mt-10 w-full max-w-3xl">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Syra anything…"
                className="w-full bg-transparent px-5 pt-5 pb-14 text-[15px] text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                aria-label="Attach"
                className="absolute left-3 bottom-3 grid h-9 w-9 place-items-center rounded-lg text-white/55 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                aria-label="Send"
                className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-white/75 hover:bg-white/[0.07] hover:text-white transition-colors"
                >
                  <a.icon className="h-3.5 w-3.5" /> {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}