import { useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, Globe, Check } from "lucide-react";
import { PageSurface } from "@/app/shell/layout";
import { SegmentedControl } from "@/components/app";
import { formatMonthYear, formatWeekdayMonthDay } from "@/lib/formatters";
import { toDateParam } from "@/lib/url-search-params";
import { SyraChatWidget } from "@/features/syra/components/syra-chat-widget";
import { bookings, CALENDAR_MODES, TIME_SLOTS } from "../fixtures";
import type { CalendarMode, CalendarSearch } from "../types";

const modeOptions = CALENDAR_MODES.map((mode) => ({
  value: mode,
  label: mode === "month" ? "Month" : "Agenda",
}));

function parseCalendarDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function clampDay(year: number, month: number, day: number) {
  return Math.min(day, daysInMonth(new Date(year, month, 1)));
}

export function CalendarScreen({
  search,
  onSearchChange,
}: {
  search: CalendarSearch;
  onSearchChange: (search: Partial<CalendarSearch>) => void;
}) {
  const today = new Date(2026, 0, 16);
  const selectedDate = useMemo(() => parseCalendarDate(search.date), [search.date]);
  const viewMonth = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
    [selectedDate],
  );
  const selectedDay = selectedDate.getDate();
  const monthLabel = formatMonthYear(viewMonth);

  const grid = useMemo(() => {
    const first = new Date(viewMonth);
    const lastDay = daysInMonth(viewMonth);
    const startOffset = (first.getDay() + 6) % 7;
    const cells: { d: number | null; inMonth: boolean }[] = [];

    for (let i = 0; i < startOffset; i++) cells.push({ d: null, inMonth: false });
    for (let d = 1; d <= lastDay; d++) cells.push({ d, inMonth: true });
    while (cells.length % 7 !== 0) cells.push({ d: null, inMonth: false });

    return cells;
  }, [viewMonth]);

  const dayMeetings = bookings[selectedDay] ?? [];
  const bookedSet = new Set(dayMeetings.map((meeting) => meeting.time));
  const selectedLabel = formatWeekdayMonthDay(selectedDate);
  const visibleSlots =
    search.mode === "agenda" ? TIME_SLOTS.filter((slot) => bookedSet.has(slot)) : TIME_SLOTS;

  const setSelectedDate = (date: Date) => onSearchChange({ date: toDateParam(date) });
  const setMode = (mode: CalendarMode) => onSearchChange({ mode });
  const navMonth = (delta: number) => {
    const nextMonth = viewMonth.getMonth() + delta;
    const nextYear = viewMonth.getFullYear();
    const nextDate = new Date(nextYear, nextMonth, clampDay(nextYear, nextMonth, selectedDay));
    setSelectedDate(nextDate);
  };

  return (
    <>
      <PageSurface variant="flush">
        <div className="px-8 pt-7 pb-5 border-b border-border/60 flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
              Harwick & Sterne - Scheduling
            </div>
            <h1 className="mt-2 text-[28px] font-semibold tracking-tight">Book a meeting</h1>
          </div>
          <div className="flex items-center gap-4">
            <SegmentedControl
              ariaLabel="Calendar mode"
              options={modeOptions}
              value={search.mode}
              onValueChange={setMode}
            />
            <div className="hidden items-center gap-2 text-[12px] text-muted-foreground sm:flex">
              <Globe className="h-3.5 w-3.5" />
              America / New York (GMT-5)
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12">
          <aside className="col-span-12 md:col-span-3 border-r border-border/60 px-8 py-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full grid place-items-center bg-primary text-[12px] font-semibold text-primary-foreground">
                HS
              </div>
              <div>
                <div className="text-[12px] text-muted-foreground">Harwick & Sterne</div>
                <div className="text-[14px] font-semibold tracking-tight">John Harwick</div>
              </div>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight">Client consultation</h2>
              <ul className="mt-4 space-y-2.5 text-[13px] text-foreground/85">
                <li className="flex items-center gap-2.5">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  30 minutes
                </li>
                <li className="flex items-center gap-2.5">
                  <Video className="h-3.5 w-3.5 text-muted-foreground" />
                  Zoom - details shared on booking
                </li>
                <li className="flex items-center gap-2.5">
                  <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                  Mayfair office - also remote
                </li>
              </ul>
            </div>
            <p className="text-[12.5px] leading-relaxed text-muted-foreground border-t border-border/60 pt-4">
              Schedule a confidential review of your portfolio, estate, or onboarding with our team.
              Syra will prepare a brief and share it with you the morning of the meeting.
            </p>
          </aside>

          <section className="col-span-12 md:col-span-6 border-r border-border/60 px-8 py-7">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[16px] font-semibold tracking-tight">{monthLabel}</div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => navMonth(-1)}
                  aria-label="Previous month"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface-raised text-foreground/80 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navMonth(1)}
                  aria-label="Next month"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface-raised text-foreground/80 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80 mb-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1.5 text-center">
              {grid.map((cell, index) => {
                if (!cell.d) return <div key={index} />;

                const day = cell.d;
                const isToday =
                  day === today.getDate() && viewMonth.getMonth() === today.getMonth();
                const isSelected = day === selectedDay;
                const hasMeeting = Boolean(bookings[day]);

                return (
                  <div key={index} className="flex flex-col items-center justify-center py-1">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDate(
                          new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
                        )
                      }
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full text-[14px] tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
                        isSelected
                          ? "bg-primary text-primary-foreground font-semibold"
                          : isToday
                            ? "border border-primary/60 text-foreground font-semibold hover:bg-state-hover"
                            : "text-foreground/85 hover:bg-state-hover"
                      }`}
                    >
                      {day}
                      {hasMeeting && !isSelected && (
                        <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="col-span-12 md:col-span-3 px-6 py-7 flex flex-col min-h-0">
            <div className="px-2 mb-4">
              <div className="text-[13px] font-semibold tracking-tight">{selectedLabel}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {dayMeetings.length} booked - {TIME_SLOTS.length - bookedSet.size} open
              </div>
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2">
              {visibleSlots.map((slot) => {
                const meeting = dayMeetings.find((item) => item.time === slot);
                if (meeting) {
                  return (
                    <div
                      key={slot}
                      className="px-3 py-2.5 border border-border rounded-lg bg-surface-raised"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-semibold tabular-nums leading-tight">
                            {slot}
                          </div>
                          <div className="mt-0.5 text-[11.5px] text-foreground/80 truncate">
                            {meeting.client}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-muted-foreground">
                            {meeting.status === "Confirmed" ? (
                              <>
                                <Check className="h-3 w-3" /> Confirmed
                              </>
                            ) : (
                              "Pending"
                            )}
                          </div>
                        </div>
                        <a
                          href={meeting.zoom}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 text-[11.5px] font-semibold hover:bg-primary/90 transition-colors"
                        >
                          <Video className="h-3 w-3" /> Join
                        </a>
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={slot}
                    type="button"
                    className="w-full h-10 px-3 rounded-lg border border-border text-[12.5px] font-medium tabular-nums text-foreground/85 hover:border-primary/40 hover:bg-state-hover transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </PageSurface>
      <SyraChatWidget />
    </>
  );
}
