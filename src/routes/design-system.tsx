import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, PageShell } from "@/app/shell/layout";
import {
  DataTable,
  type DataTableColumn,
  EmptyState,
  FilterBar,
  SearchField,
  SegmentedControl,
  StatusBadge,
} from "@/components/app";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/design-system")({
  component: DesignSystemPage,
  head: () => ({
    meta: [
      { title: "Design System - Harwick & Sterne" },
      {
        name: "description",
        content: "Local catalog for shared Strategent frontend primitives.",
      },
    ],
  }),
});

const stageOptions = [
  { value: "All", label: "All" },
  { value: "Lead", label: "Lead" },
  { value: "Proposal", label: "Proposal" },
] as const;

const densityOptions = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
] as const;

type SampleRow = {
  id: number;
  client: string;
  stage: "Lead" | "Proposal" | "Closed";
  owner: string;
};

const rows: SampleRow[] = [
  { id: 1, client: "Hartley Family Trust", stage: "Proposal", owner: "John Harwick" },
  { id: 2, client: "Whitfield Estate", stage: "Lead", owner: "Rina Cho" },
  { id: 3, client: "Caldwell Estate", stage: "Closed", owner: "Olivia Park" },
];

const columns: DataTableColumn<SampleRow>[] = [
  {
    id: "client",
    header: "Client",
    cell: (row) => <span className="font-medium text-foreground">{row.client}</span>,
  },
  {
    id: "stage",
    header: "Stage",
    cell: (row) => (
      <StatusBadge
        variant={row.stage === "Lead" ? "lead" : row.stage === "Proposal" ? "proposal" : "closed"}
      >
        {row.stage}
      </StatusBadge>
    ),
  },
  {
    id: "owner",
    header: "Owner",
    className: "text-muted-foreground",
    cell: (row) => row.owner,
  },
];

function DesignSystemPage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<(typeof stageOptions)[number]["value"]>("All");
  const [density, setDensity] = useState<(typeof densityOptions)[number]["value"]>("comfortable");

  return (
    <PageShell>
      <PageHeader
        eyebrow="Frontend"
        title="Design System"
        description="A local catalog for the shared primitives routes should compose before inventing new UI."
        actions={<Button>Primary action</Button>}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="bento p-5">
          <h2 className="text-[15px] font-semibold tracking-tight">SearchField</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Compact search control with clear affordance and shared focus styling.
          </p>
          <SearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search catalog..."
            containerClassName="mt-4 max-w-sm"
          />
        </div>

        <div className="bento p-5">
          <h2 className="text-[15px] font-semibold tracking-tight">FilterBar</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Roving keyboard filters for compact route toolbars.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <FilterBar
              ariaLabel="Catalog stage"
              value={stage}
              options={[...stageOptions]}
              onValueChange={setStage}
            />
            <SegmentedControl
              ariaLabel="Catalog density"
              value={density}
              options={[...densityOptions]}
              onValueChange={setDensity}
            />
          </div>
        </div>
      </section>

      <section className="bento p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold tracking-tight">StatusBadge</h2>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Semantic status colors with one badge shape.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge variant="lead">Lead</StatusBadge>
            <StatusBadge variant="qualified">Qualified</StatusBadge>
            <StatusBadge variant="proposal">Proposal</StatusBadge>
            <StatusBadge variant="closed">Closed</StatusBadge>
            <StatusBadge variant="danger">Danger</StatusBadge>
          </div>
        </div>
      </section>

      <section className="bento overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight">DataTable</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Shared row density, border, hover, and selected-state treatment.
          </p>
        </div>
        <DataTable
          rows={rows}
          columns={columns}
          getRowKey={(row) => row.id}
          empty={<EmptyState title="No rows" description="Add a fixture to preview table rows." />}
        />
      </section>
    </PageShell>
  );
}
