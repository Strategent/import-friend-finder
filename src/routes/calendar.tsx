import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageShell, PageHeader } from "@/components/page-shell";
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  head: () => ({ meta: [{ title: "Calendar — Harwick & Sterne" }] }),
});

const events = [
  { day: 7, title: "Hartley Family Review", time: "10:00 – 11:30", location: "Mayfair Office", type: "client" },
  { day: 16, title: "Denis Marlow — Portfolio Rebalance", time: "14:00 – 15:00", location: "Video Call", type: "client" },
  { day: 20, title: "CIO Roundtable — Valdai Fund", time: "09:00 – 11:00", location: "Boardroom A", type: "internal" },
  { day: 22, title: "Sterling Holdings Estate Review", time: "13:30 – 15:00", location: "Mayfair Office", type: "client" },
  { day: 28, title: "All-Hands — Q1 Planning", time: "16:00 – 17:00", location: "Town Hall", type: "internal" },
];

function CalendarPage() {
  const days = [
    [29, 30, 31, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, 1],
  ];
  const highlighted = new Set(events.map((e) => e.day));
  const muted = new Set([29, 30, 31, 1]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Schedule"
        title="Calendar"
        description="Client meetings, internal reviews and deadlines."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 rounded-2xl bento p-6">
          <div className="flex items-center justify-between mb-5">
            <button className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 border border-border/60">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <div className="text-sm font-semibold tracking-tight">January, 2025</div>
            </div>
            <button className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 border border-border/60">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">
            {days.flat().map((d, i) => {
              const isMuted = (i < 7 && d > 20) || (i >= 28 && d < 10);
              const isHi = highlighted.has(d) && !isMuted;
              return (
                <div key={i} className="py-2">
                  <span
                    className={`inline-grid place-items-center h-8 w-8 rounded-lg transition-colors ${
                      isHi
                        ? "bg-primary/25 text-foreground border border-primary/40"
                        : isMuted
                        ? "text-muted-foreground/40"
                        : "text-foreground/90 hover:bg-white/5"
                    }`}
                  >
                    {d}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-2xl bento p-5">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 mb-4">
            Upcoming Events
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="bento-raised p-4 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <Badge className={`text-[10px] border ${e.type === "client" ? "bg-primary/15 text-primary border-primary/30" : "bg-accent/15 text-accent border-accent/30"}`}>
                    {e.type === "client" ? "Client" : "Internal"}
                  </Badge>
                  <div className="text-[11px] text-muted-foreground">Jan {e.day}</div>
                </div>
                <div className="text-[13px] font-medium mt-1">{e.title}</div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {e.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
