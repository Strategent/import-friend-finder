import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { BentoGridStack, type BentoItem } from "@/components/layout/bento-grid-stack";
import { DailyBriefHero } from "@/components/dashboard/hero/daily-brief-hero";
import { InboxCard } from "@/components/dashboard/inbox/inbox-card";
import { CalendarCard } from "@/components/dashboard/calendar/calendar-card";
import { CallsCard } from "@/components/dashboard/calls/calls-card";
import { BulletinCard } from "@/components/dashboard/bulletin/bulletin-card";
import { GradientFeatureCard } from "@/components/ui/gradient-feature-card";
import { PillButton } from "@/components/ui/pill-button";
import {
  RecapCard,
  WorkloadCard,
  PlannerCard,
  TeamCard,
  ChannelsCard,
} from "@/components/dashboard/widgets";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Dashboard — Harwick & Sterne" },
      {
        name: "description",
        content: "Private wealth dashboard: workload, planner and upcoming client meetings.",
      },
    ],
  }),
});

function Home() {
  // Onboarding state — once "Finish setup" is clicked, the onboarding card
  // is removed from the rail and the hero in the main grid extends downward
  // to reclaim the visual weight.
  const [setupDone, setSetupDone] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("hs-setup-done") === "1") setSetupDone(true);
    } catch {
      /* ignore */
    }
  }, []);
  const finishSetup = () => {
    setSetupDone(true);
    try {
      localStorage.setItem("hs-setup-done", "1");
    } catch {
      /* ignore */
    }
  };

  // Stable item arrays — built once. The bento grids init gridstack against
  // these DOM nodes, so the lists must not change identity on re-render.
  // (Per-card timers live inside the cards themselves, e.g. CalendarCard.)
  // Row heights: visible card height ≈ h·76(cellHeight) − 2·10(margin).
  // hero h=4 → ~284px (target ~280) · inbox/bulletin h=6 → ~436px (target
  // ~420) · calls/calendar h=5 → ~360px (closest integer rows to ~390).
  const heroH = setupDone ? 6 : 4;
  const rowShift = heroH - 4;
  const mainItems = useMemo<BentoItem[]>(
    () => [
      {
        id: "daily-brief",
        x: 0,
        y: 0,
        w: 12,
        h: heroH,
        minW: 6,
        minH: 3,
        node: (
          // data-density scales the hero to banner height via wrapper-scoped
          // CSS (styles.css) — the card component itself stays untouched.
          <div data-density="compact" className="h-full w-full">
            <DailyBriefHero />
          </div>
        ),
      },
      { id: "inbox", x: 0, y: 4 + rowShift, w: 8, h: 6, minW: 6, minH: 5, node: <InboxCard /> },
      { id: "bulletin", x: 8, y: 4 + rowShift, w: 4, h: 6, minW: 4, minH: 4, node: <BulletinCard /> },
      { id: "calls", x: 0, y: 10 + rowShift, w: 4, h: 5, minW: 4, minH: 4, node: <CallsCard /> },
      { id: "calendar", x: 4, y: 10 + rowShift, w: 8, h: 5, minW: 4, minH: 4, node: <CalendarCard /> },
    ],
    [heroH, rowShift],
  );

  const railItems = useMemo<BentoItem[]>(
    () => {
      const onboarding: BentoItem = {
        id: "onboarding",
        x: 0,
        y: 0,
        w: 1,
        h: 4,
        minH: 3,
        node: (
          <div className="h-full w-full [&>section]:h-full">
            <GradientFeatureCard
              label="Get started"
              title="Make the most of Syra"
              description="Connect your inbox, calendar and phone line to unlock automated drafting and call handling."
              progress={99}
              cta={
                <PillButton variant="primary" onClick={finishSetup}>
                  Finish setup
                </PillButton>
              }
              onDismiss={finishSetup}
            />
          </div>
        ),
      };
      const offset = setupDone ? 0 : 4;
      const rest: BentoItem[] = [
        { id: "recap", x: 0, y: offset, w: 1, h: 3, minH: 2, node: <RecapCard /> },
        { id: "workload", x: 0, y: offset + 3, w: 1, h: 3, minH: 2, node: <WorkloadCard /> },
        { id: "planner", x: 0, y: offset + 6, w: 1, h: 5, minH: 3, node: <PlannerCard /> },
        { id: "team", x: 0, y: offset + 11, w: 1, h: 4, minH: 3, node: <TeamCard /> },
        { id: "channels", x: 0, y: offset + 15, w: 1, h: 4, minH: 3, node: <ChannelsCard /> },
      ];
      return setupDone ? rest : [onboarding, ...rest];
    },
    [setupDone],
  );

  return (
    <PageShell>
      <DashboardShell
        rail={
          <BentoGridStack
            key={setupDone ? "rail-v3-done" : "rail-v3-setup"}
            items={railItems}
            column={1}
            storageKey={setupDone ? "hs-rail-layout-v3-done" : "hs-rail-layout-v3"}
            resizeHandles="s"
            className="-mx-2.5"
          />
        }
      >
        <BentoGridStack
          key={setupDone ? "main-v4-done" : "main-v4-setup"}
          items={mainItems}
          column={12}
          storageKey={setupDone ? "hs-main-layout-v4-done" : "hs-main-layout-v4"}
          className="-mx-2.5"
        />
      </DashboardShell>
    </PageShell>
  );
}
