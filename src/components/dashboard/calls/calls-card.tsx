import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Mic, Pause, PhoneForwarded, Headphones, UserPlus } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { callQueue } from "@/components/dashboard/data";

/**
 * CallsCard — single live AI-handled call. Syra captures caller contact
 * details and logs them to the CRM as a new lead. Apple-native dev style:
 * one circle avatar, sleek status pill, no destructive controls.
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
  { who: "agent", text: "Thanks for calling Harwick & Sterne — may I grab your name and best email?" },
  { who: "client", text: "Marcus Vahlen. marcus.vahlen@vahlencap.com — best number is this one." },
  { who: "agent", text: "Got it. What's prompting the call today?" },
  { who: "client", text: "Rollover — two old 401(k)s, around $480K combined." },
  { who: "agent", text: "Perfect. I'll log you as a new lead and have an advisor reach out this week." },
];

const capturedFields = [
  { label: "Name", value: "Marcus Vahlen", done: true },
  { label: "Email", value: "marcus.vahlen@vahlencap.com", done: true },
  { label: "Phone", value: "+1 (415) 555‑0148", done: true },
  { label: "Intent", value: "401(k) rollover · ~$480K", done: true },
  { label: "CRM", value: "Logging as new lead…", done: false },
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
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border/60 bg-foreground/[0.04] px-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          On call
        </span>
      }
    >
      {/* Live call header — single avatar, no inner card */}
      <div className="flex shrink-0 flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.06] text-[15px] font-semibold tracking-tight text-foreground/90">
            MV
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold tracking-tight text-foreground">
              {live.name}
            </div>
            <div className="truncate text-[11.5px] text-muted-foreground">
              Handled by Syra · AI agent
            </div>
          </div>
          <div className="text-right leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
              Duration
            </div>
            <div
              className="mt-1 text-[15px] font-semibold tabular-nums text-foreground"
              suppressHydrationWarning
            >
              {duration}
            </div>
          </div>
        </div>

        {/* Controls — Apple-native row, no destructive end-call */}
        <div className="flex items-center justify-between px-1">
          <CallAction icon={Mic} label="Mute" />
          <CallAction icon={Pause} label="Hold" />
          <CallAction icon={PhoneForwarded} label="Transfer" />
          <CallAction icon={Headphones} label="Listen in" />
        </div>
      </div>

      {/* Section toggle */}
      <button
        onClick={() => setShowTranscript((v) => !v)}
        className="flex shrink-0 items-center justify-between border-t border-border/50 pt-3 text-left"
      >
        <span className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
          {showTranscript ? "Live transcript" : "Captured for CRM"}
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
          : capturedFields.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-center gap-3 py-1.5 ${
                  i === 0 ? "" : "border-t border-border/40"
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                    f.done
                      ? "bg-foreground/[0.08] text-foreground/80"
                      : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {f.done ? (
                    <svg
                      viewBox="0 0 12 12"
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M2.5 6.5l2.5 2.5 4.5-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <UserPlus className="h-3 w-3" />
                  )}
                </span>
                <div className="w-[64px] shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                  {f.label}
                </div>
                <div
                  className={`min-w-0 flex-1 truncate text-[12px] ${
                    f.done ? "text-foreground/90" : "text-emerald-400"
                  }`}
                >
                  {f.value}
                </div>
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
