import { useState } from "react";
import { Send, X, Bot } from "lucide-react";
import { SyraMark } from "@/features/syra/components/syra-mark";
import { seedMessages, type SyraMessage } from "../fixtures";

export function SyraChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<SyraMessage[]>(seedMessages);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text: t },
      { role: "syra", text: "On it — I'll draft that and surface it for your sign-off." },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[360px] max-w-[calc(100vw-2.5rem)] h-[480px] rounded-xl bg-card/95 backdrop-blur-2xl border border-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{
            boxShadow: "var(--elevation-syra-chat)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <SyraMark size={32} />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold tracking-tight">Syra</div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-success animate-pulse" />
                  Active
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="h-7 w-7 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-state-hover transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "syra" && <SyraMark size={28} className="shrink-0" />}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-[13px] leading-snug ${
                    m.role === "user"
                      ? "text-primary-foreground rounded-br-md"
                      : "bg-surface-raised text-foreground rounded-bl-md border border-border/60"
                  }`}
                  style={m.role === "user" ? { background: "var(--brand-syra)" } : undefined}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
            {["Summarize inbox", "Today's brief", "Draft Hartley reply"].map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="h-6 rounded-md border border-border bg-surface-raised px-2.5 text-[10.5px] font-medium text-muted-foreground transition-colors hover:bg-state-hover hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Composer */}
          <div className="px-3 pb-3 pt-1">
            <div className="flex items-center gap-2 h-11 rounded-lg border border-border bg-surface-raised px-3">
              <Bot className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={input}
                aria-label="Ask Syra"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask Syra anything…"
                className="flex-1 bg-transparent text-[13px] placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              />
              <button
                onClick={send}
                aria-label="Send"
                className="h-7 w-7 grid place-items-center rounded-md text-primary-foreground"
                style={{ background: "var(--brand-syra)" }}
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Syra"
        className="group transition-transform hover:scale-105 active:scale-95"
      >
        <SyraMark size={56} />
      </button>
    </div>
  );
}
