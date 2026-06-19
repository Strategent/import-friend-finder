import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Mic, Pause, PhoneForwarded, PhoneOff, Headphones } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { callQueue } from "@/components/dashboard/data";

/**
 * CallsCard — live-call handling with recording state and the waiting queue.
 * Wrapped in the Origin <Panel> (CALL HANDLING ›).
 */
function parseDur(d: string): number {
  const [m, s] = d.split(":").map((n) => parseInt(n, 10) || 0);
  return m * 60 + s;
}
function fmtDur(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const transcript: { who: "client" | "agent"; text: string }[] = [
  { who: "client", text: "Hi, calling about the form I filled out on your site this morning." },
  { who: "agent", text: "Of course — happy to help. Are you looking at a rollover or a new account?" },
  { who: "client", text: "Rollover. Two old 401(k)s, around $480K combined." },
  { who: "agent", text: "Got it. I can get you scheduled with John this week to walk through the IPS." },
  { who: "client", text: "Thursday afternoon would work best for me." },
];

export function CallsCard() {
  const live = callQueue[0];
  const [seconds, setSeconds] = useState(() => parseDur(live.dur));
  const [showTranscript, setShowTranscript] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const duration = useMemo(() => fmtDur(seconds), [seconds]);
  return (
    <Panel
      label="Call handling"
      bodyClassName="gap-4"
      action={
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> On call
        </span>
      }
    >
      <div className="shrink-0 text-[20px] font-semibold leading-none tracking-tight">
        1 <span className="text-[13px] font-normal text-muted-foreground">live · 2 queued</span>
      </div>

      {/* Live call — single circle, no inner card */}
      <div className="flex shrink-0 flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="grid h-14 w-14 place-items-center rounded-full border border-border bg-foreground/[0.06] text-[15px] font-semibold tracking-tight text-foreground/90">
              MV
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-background">
              <span className="relative grid h-2.5 w-2.5 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-rose-500" />
              </span>
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold tracking-tight text-foreground">
              {live.name}
            </div>
            <div className="truncate text-[11.5px] text-muted-foreground">{live.org}</div>
          </div>
          <div className="text-right leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-400">
              Recording
            </div>
            <div
              className="mt-1 text-[15px] font-semibold tabular-nums text-foreground"
              suppressHydrationWarning
            >
              {duration}
            </div>
          </div>
        </div>
        {/* Controls — Apple-native row of circles */}
        <div className="flex items-center justify-between px-1">
          <CallAction icon={Mic} label="Mute" />
          <CallAction icon={Pause} label="Hold" />
          <CallAction icon={PhoneForwarded} label="Transfer" />
          <CallAction icon={Headphones} label="Join" />
          <button
            aria-label="End call"
            className="grid h-11 w-11 place-items-center rounded-full bg-rose-500 text-white shadow-[0_8px_18px_-6px_rgba(244,63,94,0.6)] transition-colors hover:bg-rose-600"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Transcript toggle */}
      <button
        onClick={() => setShowTranscript((v) => !v)}
        className="flex shrink-0 items-center justify-between border-t border-border/50 pt-3 text-left"
      >
        <span className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
          {showTranscript ? "Live transcript" : "Show transcript"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${showTranscript ? "rotate-180" : ""}`}
        />
      </button>

      <div className="scroll-slim flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {showTranscript
          ? transcript.map((line, i) => (
              <div
                key={i}
                className={`flex ${line.who === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-1.5 text-[12px] leading-snug ${
                    line.who === "agent"
                      ? "bg-foreground/[0.10] text-foreground/95"
                      : "bg-foreground/[0.04] text-foreground/85"
                  }`}
                >
                  {line.text}
                </div>
              </div>
            ))
          : callQueue.slice(1, 3).map((c, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 py-1.5 ${
                  i === 0 ? "" : "border-t border-border/40"
                }`}
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.05] text-[10.5px] font-semibold text-foreground/85">
                  {c.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12.5px] font-semibold leading-tight text-foreground/95">
                    {c.name}
                  </div>
                  <div className="truncate text-[10.5px] leading-tight text-muted-foreground">
                    {c.intent}
                  </div>
                </div>
                <span className="shrink-0 text-[10.5px] font-medium tabular-nums text-amber-400">
                  {c.dur}
                </span>
              </div>
            ))}
      </div>
    </Panel>
  );
}

function CallAction({ icon: Icon, label }: { icon: typeof Mic; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-foreground/[0.06] text-foreground/90 transition-colors hover:bg-foreground/[0.12]"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}
