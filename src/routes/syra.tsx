import { createFileRoute } from "@tanstack/react-router";
import { SyraScreen } from "@/features/syra";

export const Route = createFileRoute("/syra")({
  component: SyraRoute,
  head: () => ({ meta: [{ title: "Syra — Harwick & Sterne" }] }),
});

function SyraRoute() {
  return <SyraScreen />;
}
