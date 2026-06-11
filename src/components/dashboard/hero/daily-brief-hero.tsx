import { cn } from "@/lib/utils";

export interface BriefPriority {
  status: "urgent" | "this-week" | "closed";
  title: string;
  description: string;
  meta?: string;
}

export interface DailyBriefData {
  date: string; // "MONDAY · JUNE 9, 2026"
  workspace: string; // "HARWICK & STERNE"
  greeting: string; // "Good morning, John."
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
  urgent: { label: "Urgent", badge: "bg-[#e7e7fb] text-[#5a5bd6]", dot: "bg-[#7b7cf0]" },
  "this-week": { label: "This week", badge: "bg-[#f0f0f0] text-[#6b6b6b]", dot: "bg-[#c4c4c4]" },
  closed: { label: "Closed", badge: "bg-[#e3f3e3] text-[#3f8a4a]", dot: "bg-[#9ed4a3]" },
};

/**
 * DailyBriefHero — full-width hero card: dark gradient with a soft studio-light
 * bloom on the left, and a floating white "brief document" panel that bleeds
 * off the card's right and bottom edges (clipped by the card; hidden < lg).
 * Lives in the main column outside the bento grids, so no drag-handle scoping.
 */
export function DailyBriefHero({
  summary = "Markets opened steady. Hartley Trust review is your priority, followed by the Marrow rebalance at 11:30.",
  brief = MOCK_DAILY_BRIEF,
  onReadBrief,
}: {
  summary?: string;
  brief?: DailyBriefData;
  onReadBrief?: () => void;
}) {
  return (
    <section className="daily-brief-hero-bg relative min-h-[380px] w-full overflow-hidden rounded-[32px] lg:min-h-[420px]">
      {/* Left zone */}
      <div className="relative z-10 flex flex-col px-7 py-8 lg:max-w-[54%] lg:px-12 lg:py-12">
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="font-serif-display text-[12px] uppercase tracking-[0.18em] text-white/90 lg:text-[13px]">
            Syra <span className="mx-1.5">→</span> Daily Brief
          </span>
          <span className="ml-6 text-[12px] normal-case tracking-normal text-white/70 lg:text-[13px]">
            Updated just now
          </span>
        </div>

        <h1
          className="font-serif-display mt-7 font-normal leading-[1.05] text-white lg:mt-8"
          style={{ fontSize: "clamp(34px, 4vw, 56px)" }}
        >
          Welcome back, John.
        </h1>

        <p className="mt-5 max-w-[32rem] text-[15px] leading-relaxed text-white/85 lg:text-[16px]">{summary}</p>

        <button
          type="button"
          onClick={onReadBrief}
          className="mt-9 w-fit rounded-full bg-[#6e6fae] px-7 py-3 text-[15px] text-white transition-colors hover:bg-[#7b7cbd] lg:text-[16px]"
        >
          Read daily brief
        </button>
      </div>

      {/* Right zone — white brief document, bottom-aligned like a paper preview */}
      <div
        className="absolute z-10 hidden overflow-hidden rounded-none bg-white p-8 shadow-[0_-12px_40px_rgba(0,0,0,0.25)] lg:block"
        style={{ bottom: 0, right: "5.5%", top: "auto", height: "77%", width: "33%" }}
      >
        <p className="font-label text-[6px] uppercase tracking-[0.12em] text-neutral-500">
          {brief.date} · {brief.workspace}
        </p>
        <h2 className="font-serif-display mt-2 text-[15px] leading-tight text-neutral-900">{brief.greeting}</h2>
        <p className="mt-1 text-[8px] leading-relaxed text-neutral-600">{brief.summary}</p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {brief.stats.map((s) => (
            <div key={s.label}>
              <div className="text-[14px] font-semibold text-neutral-900">{s.value}</div>
              <div className="mt-0.5 text-[6.5px] text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="font-label mt-5 text-[6px] uppercase tracking-[0.12em] text-neutral-500">
          Priorities
        </p>
        <div className="mt-2 flex flex-col gap-2.5">
          {brief.priorities.map((p) => {
            const s = STATUS_STYLES[p.status];
            return (
              <div key={p.title}>
                <div className="flex items-center gap-1.5">
                  <span className={cn("h-[3px] w-[3px] shrink-0 rounded-full", s.dot)} />
                  <span
                    className={cn("rounded-sm px-1 py-0.5 text-[6px] font-medium", s.badge)}
                  >
                    {s.label}
                  </span>
                  <span className="truncate text-[8px] font-semibold text-neutral-900">
                    {p.title}
                  </span>
                </div>
                <p className="mt-0.5 pl-[9px] text-[7px] leading-snug text-neutral-600">
                  {p.description}
                </p>
                {p.meta && <p className="mt-0.5 pl-[9px] text-[6.5px] text-neutral-500">{p.meta}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Film-grain dither — breaks residual gradient banding; invisible as
          texture at normal viewing (styles.css). Must stay the LAST child:
          the compact-density CSS addresses the zones by div:nth-child(1)/(2). */}
      <div aria-hidden className="daily-brief-grain pointer-events-none absolute inset-0" />
    </section>
  );
}
