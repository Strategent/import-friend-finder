import { useMemo, useState } from "react";
import { PageBandHeader, PageBody, PageSurface, PageToolbar } from "@/app/shell/layout";
import { SyraChatWidget } from "@/features/syra/components/syra-chat-widget";
import { clients } from "../fixtures";
import { filterClients, getCrmTotals } from "../model";
import type { CrmSearch } from "../types";
import { CrmHeaderActions } from "./crm-header-actions";
import { CrmStats } from "./crm-stats";
import { CrmTable } from "./crm-table";
import { CrmToolbar } from "./crm-toolbar";

export function CrmScreen({
  search,
  onSearchChange,
}: {
  search: CrmSearch;
  onSearchChange: (search: Partial<CrmSearch>) => void;
}) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(
    () => filterClients(clients, search.q, search.stage),
    [search.q, search.stage],
  );
  const totals = useMemo(() => getCrmTotals(clients, filtered), [filtered]);

  const allChecked = filtered.length > 0 && filtered.every((client) => selected.has(client.id));
  const toggleClient = (id: number) => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const toggleAll = () => {
    setSelected((previous) => {
      if (allChecked) {
        const next = new Set(previous);
        filtered.forEach((client) => next.delete(client.id));
        return next;
      }

      const next = new Set(previous);
      filtered.forEach((client) => next.add(client.id));
      return next;
    });
  };

  return (
    <>
      <PageSurface variant="flush">
        <PageBandHeader
          eyebrow="Clients"
          title="CRM"
          description="Every relationship in one place — accounts, owners, AUM and the next move."
          actions={<CrmHeaderActions />}
        />
        <CrmStats {...totals} />
        <PageToolbar>
          <CrmToolbar
            query={search.q}
            stage={search.stage}
            selectedCount={selected.size}
            onQueryChange={(q) => onSearchChange({ q })}
            onStageChange={(stage) => onSearchChange({ stage })}
          />
        </PageToolbar>
        <PageBody>
          <CrmTable
            clients={filtered}
            selected={selected}
            onToggleClient={toggleClient}
            onToggleAll={toggleAll}
          />
        </PageBody>
      </PageSurface>
      <SyraChatWidget />
    </>
  );
}
