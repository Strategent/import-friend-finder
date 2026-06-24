import { createFileRoute } from "@tanstack/react-router";
import { CalendarScreen } from "@/features/calendar";

export const Route = createFileRoute("/calendar")({
  component: CalendarRoute,
  head: () => ({ meta: [{ title: "Calendar — Harwick & Sterne" }] }),
});

function CalendarRoute() {
  return <CalendarScreen />;
}
