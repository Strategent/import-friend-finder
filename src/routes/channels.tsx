import { createFileRoute } from "@tanstack/react-router";
import { ChannelsScreen } from "@/features/channels";

export const Route = createFileRoute("/channels")({
  component: ChannelsRoute,
  head: () => ({ meta: [{ title: "Channels — Harwick & Sterne" }] }),
});

function ChannelsRoute() {
  return <ChannelsScreen />;
}
