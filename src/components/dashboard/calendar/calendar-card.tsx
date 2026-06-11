import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { todaysMeetings } from "@/components/dashboard/data";

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
          <button className="grid h-7 w-7 place-items-center rounded-full border border-border bg-foreground/[0.05] text-foreground/80 hover:bg-foreground/[0.1]">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button className="grid h-7 w-7 place-items-center rounded-full border border-border bg-foreground/[0.05] text-foreground/80 hover:bg-foreground/[0.1]">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      }
    >
      <div className="shrink-0">
        <div className="mb-3 text-[14px] font-semibold leading-none tracking-tight">
          {weekRangeLabel}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {week.map((d, i) => {
            const isToday = d.toDateString() === todayKey;
            const weekend = i === 0 || i === 6;
            return (
              <button
                key={i}
                className={`group flex flex-col items-center gap-1 rounded-2xl border py-2.5 transition-all ${
                  isToday
                    ? "border-transparent text-white shadow-md"
                    : "border-border/60 bg-foreground/[0.02] hover:bg-foreground/[0.04]"
                }`}
                style={
                  isToday
                    ? {
                        background: "var(--gradient-primary)",
                        boxShadow:
                          "0 1px 0 0 rgba(255,255,255,0.2) inset, 0 8px 20px -8px color-mix(in oklab, var(--primary) 55%, transparent)",
                      }
                    : undefined
                }
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${
                    isToday
                      ? "text-white/80"
                      : weekend
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground"
                  }`}
                >
                  {dayLetter[d.getDay()]}
                </span>
                <span
                  className={`text-[17px] font-semibold leading-none tracking-tight tabular-nums ${
                    isToday ? "text-white" : "text-foreground/90"
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
        <div className="flex min-h-0 flex-col gap-1.5 overflow-hidden">
          {todaysMeetings.slice(0, 3).map((m, i) => (
            <div key={i} className="origin-raised flex items-center gap-3 px-3 py-2">
              <div
                className="h-9 w-1 rounded-full"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-semibold leading-tight text-foreground/95">
                  {m.client}
                </div>
                <div className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">
                  {m.time} · {m.status}
                </div>
              </div>
              <a
                href={m.zoom}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-[11px] font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--gradient-primary)" }}
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
