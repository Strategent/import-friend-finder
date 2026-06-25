import { ArrowUpDown, Star } from "lucide-react";
import { DataTable, type DataTableColumn, EmptyState, StatusBadge } from "@/components/app";
import type { Client } from "../types";
import { formatAum, stageVariant } from "../model";
import { ClientRowActions } from "./client-row-actions";

const columns: DataTableColumn<Client>[] = [
  {
    id: "starred",
    header: "",
    className: "w-6",
    headerClassName: "w-6",
    cell: (client) => (
      <Star
        className={`h-3.5 w-3.5 ${
          client.starred ? "fill-status-warning text-status-warning" : "text-muted-foreground/40"
        }`}
      />
    ),
  },
  {
    id: "client",
    header: (
      <span className="inline-flex items-center gap-1">
        Client <ArrowUpDown className="h-3 w-3 opacity-50" />
      </span>
    ),
    cell: (client) => (
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          {client.name
            .split(" ")
            .map((namePart) => namePart[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium text-foreground/95">{client.name}</div>
          <div className="truncate text-[11px] text-muted-foreground">{client.company}</div>
        </div>
      </div>
    ),
  },
  {
    id: "stage",
    header: "Stage",
    cell: (client) => (
      <StatusBadge variant={stageVariant[client.stage]}>{client.stage}</StatusBadge>
    ),
  },
  {
    id: "aum",
    header: (
      <span className="inline-flex items-center gap-1">
        AUM <ArrowUpDown className="h-3 w-3 opacity-50" />
      </span>
    ),
    align: "right",
    className: "font-semibold tabular-nums",
    cell: (client) => formatAum(client.aum),
  },
  {
    id: "owner",
    header: "Owner",
    cell: (client) => (
      <div className="flex items-center gap-2">
        <div className="grid h-6 w-6 place-items-center rounded-full border border-border bg-muted text-[10px] font-semibold text-foreground/80">
          {client.owner.initials}
        </div>
        <div className="truncate text-[12px] text-foreground/80">{client.owner.name}</div>
      </div>
    ),
  },
  {
    id: "lastContact",
    header: "Last contact",
    className: "whitespace-nowrap text-[12px] text-muted-foreground",
    cell: (client) => client.lastContact,
  },
  {
    id: "nextAction",
    header: "Next action",
    className: "max-w-[220px] truncate text-[12px] text-foreground/80",
    cell: (client) => client.nextAction,
  },
  {
    id: "actions",
    header: "Actions",
    align: "right",
    headerClassName: "w-24 pr-4",
    className: "pr-4",
    cell: () => <ClientRowActions />,
  },
];

export function CrmTable({
  clients,
  selected,
  onToggleClient,
  onToggleAll,
}: {
  clients: Client[];
  selected: Set<number>;
  onToggleClient: (id: number) => void;
  onToggleAll: () => void;
}) {
  return (
    <DataTable
      rows={clients}
      columns={columns}
      getRowKey={(client) => client.id}
      getRowLabel={(client) => client.name}
      selectedRows={selected}
      onSelectRow={(client) => onToggleClient(client.id)}
      onSelectAll={onToggleAll}
      empty={
        <EmptyState
          title="No clients match your filters"
          description="Adjust the search or stage filter to widen the list."
          className="min-h-0 py-0"
        />
      }
    />
  );
}
