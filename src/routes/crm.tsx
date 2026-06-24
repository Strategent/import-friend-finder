import { createFileRoute } from "@tanstack/react-router";
import { CrmScreen } from "@/features/crm";

export const Route = createFileRoute("/crm")({
  component: CrmRoute,
  head: () => ({ meta: [{ title: "CRM — Harwick & Sterne" }] }),
});

function CrmRoute() {
  return <CrmScreen />;
}
