import { useState } from "react";
import { cn } from "@/lib/utils";
import { DailyBriefStack } from "./daily-brief-stack";

export interface BriefPriority {
  status: "urgent" | "this-week" | "closed";
  title: string;
  description: string;
  meta?: string;
}

export interface DailyBriefData {
  date: string;
  workspace: string;
  greeting: string;
  summary: string;
  stats: { value: number; label: string }[];
  priorities: BriefPriority[];
}

export const MOCK_DAILY_BRIEF: DailyBriefData = {
  date: "MONDAY · JUNE 9, 2026",
  workspace: "HARWICK & STERNE",
  greeting: "Good morning, John.",
  summary:
    "4 meetings today. Hartley Trust is your first priority — IPS ready for sign-off. Markets opened steady, breadth improved.",
  stats: [
    { value: 4, label: "meetings today" },
    { value: 3, label: "need attention" },
    { value: 2, label: "drafts ready" },
  ],
  priorities: [
    {
      status: "urgent",
      title: "Hartley Family Trust — IPS sign-off",
      description:
        "Olivia's draft is ready. Review and approve before the 9:00 meeting. Q4 statements attached by Eleanor.",
      meta: "Today · 9:00 – 10:00 AM · Confirmed",
    },
    {
      status: "urgent",
      title: "Denis Marlow — rebalance at 11:30",
      description:
        "Allocation shift memo attached. Marcus Sterling confirmed we're good to proceed.",
      meta: "Today · 11:30 AM",
    },
    {
      status: "this-week",
      title: "Office B123 onboarding prep",
      description: "Prep required before Friday. No owner assigned yet.",
      meta: "Due Friday",
    },
    {
      status: "closed",
      title: "Rebecca Caldwell — engagement letter",
      description: "Countersigned and vaulted. No action needed.",
    },
  ],
};

const STATUS_STYLES: Record<
  BriefPriority["status"],
  { label: string; badge: string; dot: string }
> = {
  urgent: {
    label: "Urgent",
    badge: "bg-status-info-bg text-status-info-fg",
    dot: "bg-status-info",
  },
  "this-week": {
    label: "This week",
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  closed: {
    label: "Closed",
    badge: "bg-status-success-bg text-status-success-fg",
    dot: "bg-status-success",
  },
};

export function DailyBriefHero({
  summary = "Markets opened steady. Hartley Trust review is your priority, followed by the Marrow rebalance at 11:30.",
  brief = MOCK_DAILY_BRIEF,
  onReadBrief,
}: {
  summary?: string;
  brief?: DailyBriefData;
  onReadBrief?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    onReadBrief?.();
  };
  return (
    <>
      <section
        className="daily-brief-hero-bg relative h-full w-full"
        style={{ borderRadius: "var(--radius)" }}
      >
        {/* Left zone — eyebrow, headline, summary (no button) */}
        <div className="relative z-10 flex h-full flex-col justify-center px-7 py-8 lg:max-w-[52%] lg:px-12 lg:py-12">
          <span className="font-serif-display text-[12px] uppercase tracking-[0.18em] text-primary-foreground/85 lg:text-[13px]">
            Syra <span className="mx-1.5">→</span> Daily Brief
          </span>

          <h1
            className="font-serif-display mt-10 font-normal leading-[1.05] text-primary-foreground lg:mt-12"
            style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
          >
            Welcome back, John.
          </h1>

          <p className="mt-5 max-w-[28rem] text-[14px] leading-relaxed text-primary-foreground/85 lg:text-[15px]">
            {summary}
          </p>

          <button
            type="button"
            onClick={handleClick}
            className="mt-24 w-fit rounded-md px-7 py-3 text-[14px] text-primary-foreground shadow-popover backdrop-blur-sm transition-colors [background:var(--hero-brief-cta-bg)] hover:[background:var(--hero-brief-cta-bg-hover)]"
          >
            Read daily brief
          </button>
        </div>

        {/* Right zone — white brief document, always light regardless of theme */}
        <div className="daily-brief-document theme-light absolute z-10 hidden overflow-hidden rounded-[6px] bg-surface shadow-popover lg:block">
          <p className="font-sans text-[5px] uppercase tracking-[0.1em] text-muted-foreground whitespace-nowrap">
            {brief.date} · {brief.workspace}
          </p>
          <h2 className="font-serif-display mt-3 text-[18px] font-normal leading-tight text-surface-foreground">
            daily brief
          </h2>
          <p className="mt-2 text-[8.5px] leading-relaxed text-muted-foreground">{brief.summary}</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {brief.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[14px] font-semibold text-surface-foreground">{s.value}</div>
                <div className="mt-0.5 text-[7px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="font-label mt-5 text-[7px] uppercase tracking-[0.14em] text-muted-foreground">
            Priorities
          </p>
          <div className="mt-2 flex flex-col gap-2.5">
            {brief.priorities.slice(0, 2).map((p) => {
              const s = STATUS_STYLES[p.status];
              return (
                <div key={p.title}>
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-[3px] w-[3px] shrink-0 rounded-full", s.dot)} />
                    <span
                      className={cn("rounded-sm px-1 py-0.5 text-[6.5px] font-medium", s.badge)}
                    >
                      {s.label}
                    </span>
                    <span className="truncate text-[8.5px] font-semibold text-surface-foreground">
                      {p.title}
                    </span>
                  </div>
                  <p className="mt-0.5 pl-[9px] text-[7.5px] leading-snug text-muted-foreground">
                    {p.description}
                  </p>
                  {p.meta && (
                    <p className="mt-0.5 pl-[9px] text-[7px] text-muted-foreground">{p.meta}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div aria-hidden className="daily-brief-grain pointer-events-none absolute inset-0" />
      </section>
      <DailyBriefStack open={open} onOpenChange={setOpen} />
    </>
  );
}
