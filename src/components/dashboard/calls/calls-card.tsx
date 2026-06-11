import { Mic, Pause, PhoneForwarded, PhoneOff, Headphones } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { callQueue } from "@/components/dashboard/data";

/**
 * CallsCard — live-call handling with recording state and the waiting queue.
 * Wrapped in the Origin <Panel> (CALL HANDLING ›).
 */
export function CallsCard() {
  const live = callQueue[0];
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

      {/* Live call — Apple Phone style */}
      <div className="origin-raised flex shrink-0 flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.08] text-[14px] font-semibold text-foreground/90">
            MV
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="relative grid h-2 w-2 shrink-0 place-items-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/40" />
                <span className="relative h-2 w-2 rounded-full bg-rose-500" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-400">
                Live · Recording
              </span>
              <span className="ml-auto text-[13px] font-semibold tabular-nums text-foreground">
                {live.dur}
              </span>
            </div>
            <div className="mt-1 truncate text-[15px] font-semibold tracking-tight">
              {live.name}
            </div>
            <div className="truncate text-[11.5px] text-muted-foreground">{live.org}</div>
          </div>
        </div>
        {/* Controls */}
        <div className="grid grid-cols-5 gap-2">
          <CallAction icon={Mic} label="Mute" />
          <CallAction icon={Pause} label="Hold" />
          <CallAction icon={PhoneForwarded} label="Transfer" />
          <CallAction icon={Headphones} label="Join" />
          <button
            aria-label="End call"
            className="grid h-10 place-items-center rounded-full bg-rose-500 text-white shadow-[0_6px_14px_-4px_rgba(244,63,94,0.55)] transition-colors hover:bg-rose-600"
          >
            <PhoneOff className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Queue */}
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            In queue
          </div>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {callQueue.length - 1} waiting
          </span>
        </div>
        <div className="scroll-slim flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
          {callQueue.slice(1, 3).map((c, i) => (
            <div key={i} className="origin-raised flex shrink-0 items-center gap-3 px-3 py-2">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.06] text-[10.5px] font-semibold text-foreground/85">
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
      </div>
    </Panel>
  );
}

function CallAction({ icon: Icon, label }: { icon: typeof Mic; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-10 place-items-center rounded-full border border-border bg-foreground/[0.06] text-foreground/90 transition-colors hover:bg-foreground/[0.12]"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}
