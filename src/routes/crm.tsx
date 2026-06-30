import { createFileRoute } from "@tanstack/react-router";
import { CrmScreen } from "@/features/crm";
import { CRM_DEFAULT_SEARCH, STAGES } from "@/features/crm/model";
import type { CrmSearch } from "@/features/crm/types";
import { readEnumParam, readStringParam } from "@/lib/url-search-params";

export const Route = createFileRoute("/crm")({
  component: CrmRoute,
  validateSearch: (search): CrmSearch => ({
    q: readStringParam(search.q, CRM_DEFAULT_SEARCH.q),
    stage: readEnumParam(search.stage, STAGES, CRM_DEFAULT_SEARCH.stage),
  }),
  head: () => ({ meta: [{ title: "CRM — Harwick & Sterne" }] }),
});

function CrmRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (next: Partial<CrmSearch>) => {
    void navigate({ search: (previous) => ({ ...previous, ...next }) });
  };

  return <CrmScreen search={search} onSearchChange={updateSearch} />;
}
