import type { StatusBadgeVariant } from "@/components/app";
import { formatCompactCurrency } from "@/lib/formatters";
import type { Client, Stage, StageFilter } from "./types";

export const STAGES: StageFilter[] = [
  "All",
  "Lead",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed",
];

export const stageOptions = STAGES.map((stage) => ({ value: stage, label: stage }));
export const CRM_DEFAULT_SEARCH = {
  q: "",
  stage: "All" as StageFilter,
};

export const stageVariant: Record<Stage, StatusBadgeVariant> = {
  Lead: "lead",
  Qualified: "qualified",
  Proposal: "proposal",
  Negotiation: "negotiation",
  Closed: "closed",
};

export function formatAum(value: number) {
  return formatCompactCurrency(value);
}

export function filterClients(clients: Client[], query: string, stage: StageFilter) {
  const normalizedQuery = query.trim().toLowerCase();

  return clients.filter((client) => {
    const matchesStage = stage === "All" || client.stage === stage;
    const matchesQuery =
      !normalizedQuery ||
      client.name.toLowerCase().includes(normalizedQuery) ||
      client.company.toLowerCase().includes(normalizedQuery) ||
      client.email.toLowerCase().includes(normalizedQuery);

    return matchesStage && matchesQuery;
  });
}

export function getCrmTotals(allClients: Client[], visibleClients: Client[]) {
  return {
    total: allClients.length,
    showing: visibleClients.length,
    open: visibleClients.filter((client) => client.stage !== "Closed").length,
    aum: visibleClients.reduce((sum, client) => sum + client.aum, 0),
  };
}
