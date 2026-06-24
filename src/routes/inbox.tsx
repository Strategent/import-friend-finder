import { createFileRoute } from "@tanstack/react-router";
import { InboxScreen } from "@/features/inbox";

export const Route = createFileRoute("/inbox")({
  component: InboxRoute,
  head: () => ({ meta: [{ title: "Inbox — Harwick & Sterne" }] }),
});

function InboxRoute() {
  return <InboxScreen />;
}
