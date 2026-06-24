import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Panel } from "@/components/app/panel";
import { todaysMeetings } from "@/features/dashboard/components/data";

/**
 * CalendarCard — Monday-start week strip + today's meetings with Join buttons.
 * Wrapped in the Origin <Panel> (CALENDAR ›).
 *
 * Owns its own clock so the dashboard route stays static — the bento grid
 * parent must not re-render on a timer or gridstack/React fight over the DOM.
 */
export function CalendarCard() {
  const [today, setToday] = useState<Date>(() => new Date(2026, 0, 16));
  useEffect(() => {
    setToday(new Date());
    const id = setInterval(() => setToday(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const startOfWeek = new Date(today);
  const jsDow = today.getDay(); // 0=Sun
  const offset = (jsDow + 6) % 7; // Monday-start offset
  startOfWeek.setDate(today.getDate() - offset);
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
  const todayKey = today.toDateString();
  const weekRangeLabel = (() => {
    const end = week[6];
    const sameMonth = startOfWeek.getMonth() === end.getMonth();
    const fmtMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });
    return sameMonth
      ? `${fmtMonth(startOfWeek)} ${startOfWeek.getDate()} – ${end.getDate()}, ${end.getFullYear()}`
      : `${fmtMonth(startOfWeek)} ${startOfWeek.getDate()} – ${fmtMonth(end)} ${end.getDate()}, ${end.getFullYear()}`;
  })();
  const dayLetter = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Panel
      label="Calendar"
      bodyClassName="gap-4"
      action={
        <div className="flex items-center gap-1">
          <button className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface-raised text-foreground/80 hover:bg-surface-hover">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-full border border-border bg-surface-raised text-foreground/80 hover:bg-surface-hover">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      }
    >
      <div className="shrink-0">
        <div className="mb-3 text-[14px] font-semibold leading-none tracking-tight">
          {weekRangeLabel}
        </div>
        {/* Apple-native week strip — bare cells, single circle on today */}
        <div className="grid grid-cols-7 gap-1">
          {week.map((d, i) => {
            const weekend = i === 0 || i === 6;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 py-1">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    weekend ? "text-muted-foreground/50" : "text-muted-foreground/80"
                  }`}
                >
                  {dayLetter[d.getDay()]}
                </span>
              </div>
            );
          })}
          {week.map((d, i) => {
            const isToday = d.toDateString() === todayKey;
            return (
              <button
                key={i}
                className="group flex items-center justify-center py-1"
                aria-label={d.toDateString()}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[14px] leading-none tabular-nums transition-colors ${
                    isToday
                      ? "bg-surface text-surface-foreground font-semibold"
                      : "text-foreground/85 font-normal hover:bg-state-hover"
                  }`}
                >
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's meetings beneath calendar */}
      <div className="relative flex min-h-0 flex-1 flex-col gap-2">
        <div className="flex shrink-0 items-center justify-between">
          <div className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            Today's meetings
          </div>
          <span className="text-[10.5px] tabular-nums text-muted-foreground">
            {todaysMeetings.length} scheduled
          </span>
        </div>
        {/* Hairline-divided rows — no card-in-card */}
        <div className="flex min-h-0 flex-col overflow-hidden">
          {todaysMeetings.slice(0, 3).map((m, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2.5 ${
                i === 0 ? "" : "border-t border-border/50"
              }`}
            >
              <div className="w-12 shrink-0 text-right text-[11px] font-medium tabular-nums text-muted-foreground/70">
                {m.time.split(" ")[0]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold leading-tight text-foreground/95">
                  {m.client}
                </div>
                <div className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">
                  {m.status}
                </div>
              </div>
              <a
                href={m.zoom}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border bg-surface-raised px-3 text-[11px] font-semibold text-foreground/90 transition-colors hover:bg-surface-hover"
              >
                <Video className="h-3 w-3" /> Join
              </a>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
