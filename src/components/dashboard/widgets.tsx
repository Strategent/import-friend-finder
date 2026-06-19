import { Plus, Paperclip } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Panel } from "@/components/ui/panel";
import { planner, team, channels, docTemplates } from "@/components/dashboard/data";

/** PlannerCard — open task list with checkboxes. */
export function PlannerCard() {
  const open = planner.filter((p) => !p.done).length;
  return (
    <Panel
      label="Planner"
      action={
        <button className="grid h-7 w-7 place-items-center rounded-full border border-border bg-foreground/[0.06] text-foreground/80 transition-colors hover:bg-foreground/[0.12]">
          <Plus className="h-3.5 w-3.5" />
        </button>
      }
    >
      <div className="mb-3 shrink-0 text-[20px] font-semibold leading-none tracking-tight">
        {open} <span className="text-[13px] font-normal text-muted-foreground">open today</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {planner.slice(0, 5).map((t, i) => (
          <div
            key={i}
            className={`group flex items-center gap-3 px-1 py-2 transition-colors hover:bg-foreground/[0.03] ${
              i === 0 ? "" : "border-t border-border/40"
            }`}
          >
            <Checkbox
              checked={t.done}
              className="h-4 w-4 rounded-full border-border data-[state=checked]:border-foreground/60 data-[state=checked]:bg-foreground/80 data-[state=checked]:text-background"
            />
            <div
              className={`min-w-0 flex-1 truncate text-[13px] leading-snug ${
                t.done ? "text-muted-foreground line-through" : "font-medium text-foreground/95"
              }`}
            >
              {t.label}
            </div>
            <div className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{t.date}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** WorkloadCard — capacity as a graded ScoreBar (Origin credit-score pattern). */
export function WorkloadCard() {
  const value = 56;
  const labels = ["Light", "Healthy", "Busy", "Heavy", "Maxed"];
  return (
    <Panel label="Workload">
      <div className="flex items-end gap-3">
        <div className="text-[34px] font-semibold leading-none tracking-tight tabular-nums">
          {value}<span className="ml-0.5 text-base font-normal text-muted-foreground">%</span>
        </div>
        <span className="mb-1 inline-flex h-5 items-center rounded-full border border-border bg-foreground/[0.05] px-2 text-[10px] font-medium text-foreground/80">
          Healthy
        </span>
      </div>
      <div className="mt-4">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-foreground/[0.08]">
          <div
            className="h-full rounded-full bg-foreground/70"
            style={{ width: `${value}%` }}
          />
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          {labels.map((l) => (
            <span
              key={l}
              className="text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground/60"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Capacity used</span>
        <span className="tabular-nums">52 / 93 hrs</span>
      </div>
    </Panel>
  );
}

/** RecapCard — Origin "Daily market brief" recap widget. */
export function RecapCard() {
  return (
    <Panel label="Recap">
      <h3 className="font-serif-display text-[20px] leading-tight text-foreground">
        Daily market brief
      </h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
        Treasuries firmed and breadth improved. Syra flagged 3 items across your book that may move
        client conversations today.
      </p>
    </Panel>
  );
}

/** TeamCard — who's online and what they're on. */
export function TeamCard() {
  const online = team.filter((t) => t.status === "online").length;
  return (
    <Panel label="Team">
      <div className="mb-3 shrink-0 text-[15px] font-semibold leading-none tracking-tight">
        {online} <span className="text-[11px] font-normal text-muted-foreground">online</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {team.slice(0, 4).map((m) => (
          <div key={m.name} className="flex items-center gap-2.5 py-1">
            <div className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.07] text-[10.5px] font-semibold text-foreground/90">
              {m.initials}
              <span
                className={`ring-card absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full ring-2 ${
                  m.status === "online" ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[12px] font-semibold text-foreground/95">{m.name}</div>
              <div className="truncate text-[10.5px] text-muted-foreground">{m.task}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** ChannelsCard — team channels with unread counts. */
export function ChannelsCard() {
  const unread = channels.reduce((a, c) => a + c.unread, 0);
  return (
    <Panel label="Channels">
      <div className="mb-3 shrink-0 text-[15px] font-semibold leading-none tracking-tight">
        {unread} <span className="text-[11px] font-normal text-muted-foreground">unread</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {channels.slice(0, 4).map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 py-1">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-foreground/[0.06] text-[12px] font-semibold text-foreground/70">
              #
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[12px] font-semibold text-foreground/95">{c.name}</div>
              <div className="truncate text-[10.5px] text-muted-foreground">{c.preview}</div>
            </div>
            {c.unread > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold tabular-nums text-primary-foreground">
                {c.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}

/** DocumentsCard — autofill templates grid. */
export function DocumentsCard() {
  const totalUses = docTemplates.reduce((a, d) => a + d.uses, 0);
  return (
    <Panel label="Documents">
      <div className="mb-3 shrink-0 text-[15px] font-semibold leading-none tracking-tight">
        {docTemplates.length}{" "}
        <span className="text-[11px] font-normal text-muted-foreground">
          templates · {totalUses} uses
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
        {docTemplates.map((d) => (
          <div
            key={d.name}
            className="origin-raised flex flex-col justify-between overflow-hidden p-2.5"
          >
            <div className="min-w-0">
              <div className="mb-1.5 grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-primary">
                <Paperclip className="h-3 w-3" strokeWidth={2} />
              </div>
              <div className="line-clamp-2 text-[11.5px] font-semibold leading-tight tracking-tight">
                {d.name}
              </div>
              <div className="mt-0.5 text-[9.5px] text-muted-foreground">{d.uses} uses</div>
            </div>
            <button
              className="mt-2 h-6 self-stretch rounded-md text-[10px] font-semibold text-white"
              style={{ background: "var(--gradient-primary)" }}
            >
              Autofill
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}
