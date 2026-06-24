import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageSurface, PageBandHeader, PageToolbar, PageBody } from "@/app/shell/layout";
import { SyraChatWidget } from "@/features/syra/components/syra-chat-widget";
import {
  ActionMenu,
  DataTable,
  type DataTableColumn,
  EmptyState,
  FilterBar,
  IconButton,
  MetricStrip,
  SearchField,
  StatusBadge,
  type StatusBadgeVariant,
} from "@/components/app";
import { Plus, Filter, ArrowUpDown, Star, Phone, Mail, FileText } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/crm")({
  component: CrmPage,
  head: () => ({ meta: [{ title: "CRM — Harwick & Sterne" }] }),
});

type Stage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed";

const stageVariant: Record<Stage, StatusBadgeVariant> = {
  Lead: "lead",
  Qualified: "qualified",
  Proposal: "proposal",
  Negotiation: "negotiation",
  Closed: "closed",
};

type Client = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: Stage;
  aum: number; // dollars
  owner: { initials: string; name: string };
  lastContact: string;
  nextAction: string;
  starred?: boolean;
};

const clients: Client[] = [
  {
    id: 1,
    name: "Eleanor Hartley",
    company: "Hartley Family Trust",
    email: "eleanor@hartleytrust.com",
    phone: "+1 (212) 555-0148",
    stage: "Negotiation",
    aum: 12_400_000,
    owner: { initials: "JH", name: "John Harwick" },
    lastContact: "2h ago",
    nextAction: "Send revised IPS",
    starred: true,
  },
  {
    id: 2,
    name: "Denis Marlow",
    company: "Marlow Holdings LLC",
    email: "denis@marlowhold.com",
    phone: "+1 (415) 555-0192",
    stage: "Proposal",
    aum: 8_750_000,
    owner: { initials: "OP", name: "Olivia Park" },
    lastContact: "Today",
    nextAction: "Schedule rebalance call",
  },
  {
    id: 3,
    name: "Sarah Beaumont",
    company: "Beaumont Capital",
    email: "sarah@beaumontcap.com",
    phone: "+1 (646) 555-0173",
    stage: "Qualified",
    aum: 5_200_000,
    owner: { initials: "ML", name: "Marcus Lee" },
    lastContact: "Yesterday",
    nextAction: "KYC follow-up",
  },
  {
    id: 4,
    name: "Raphael Castellanos",
    company: "Castellanos Ventures",
    email: "raph@castellanos.vc",
    phone: "+1 (305) 555-0119",
    stage: "Proposal",
    aum: 7_900_000,
    owner: { initials: "JH", name: "John Harwick" },
    lastContact: "3d ago",
    nextAction: "Review allocation memo",
  },
  {
    id: 5,
    name: "Aurelia Whitfield",
    company: "Whitfield Estate",
    email: "a.whitfield@wfield.com",
    phone: "+1 (212) 555-0211",
    stage: "Lead",
    aum: 3_100_000,
    owner: { initials: "RC", name: "Rina Cho" },
    lastContact: "5d ago",
    nextAction: "Send discovery deck",
    starred: true,
  },
  {
    id: 6,
    name: "Marcus Caldwell",
    company: "Caldwell Estate",
    email: "marcus@caldwell.co",
    phone: "+1 (617) 555-0162",
    stage: "Closed",
    aum: 4_650_000,
    owner: { initials: "OP", name: "Olivia Park" },
    lastContact: "1w ago",
    nextAction: "Annual review prep",
  },
  {
    id: 7,
    name: "Priya Iyer",
    company: "Sterling Holdings",
    email: "priya@sterlingco.com",
    phone: "+1 (212) 555-0144",
    stage: "Negotiation",
    aum: 9_300_000,
    owner: { initials: "DM", name: "David Mensah" },
    lastContact: "4h ago",
    nextAction: "Lock advisory terms",
  },
  {
    id: 8,
    name: "Theodore Beck",
    company: "Beck & Sons",
    email: "ted@becksons.com",
    phone: "+1 (713) 555-0188",
    stage: "Lead",
    aum: 1_800_000,
    owner: { initials: "ML", name: "Marcus Lee" },
    lastContact: "2w ago",
    nextAction: "Re-engage via email",
  },
  {
    id: 9,
    name: "Isabelle Renault",
    company: "Renault Trust",
    email: "isabelle@renaulttrust.fr",
    phone: "+33 1 55 55 0177",
    stage: "Qualified",
    aum: 6_400_000,
    owner: { initials: "RC", name: "Rina Cho" },
    lastContact: "Today",
    nextAction: "Send proposal draft",
  },
  {
    id: 10,
    name: "Owen Fitzgerald",
    company: "Fitzgerald Capital",
    email: "owen@fitzcap.com",
    phone: "+1 (415) 555-0136",
    stage: "Proposal",
    aum: 11_200_000,
    owner: { initials: "JH", name: "John Harwick" },
    lastContact: "1h ago",
    nextAction: "Approve IPS revisions",
  },
];

const STAGES: ("All" | Stage)[] = ["All", "Lead", "Qualified", "Proposal", "Negotiation", "Closed"];
const stageOptions = STAGES.map((s) => ({ value: s, label: s }));

function fmtAum(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}k`;
  return `$${v}`;
}

function CrmPage() {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<(typeof STAGES)[number]>("All");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const matchesStage = stage === "All" || c.stage === stage;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      return matchesStage && matchesQuery;
    });
  }, [query, stage]);

  const totals = useMemo(() => {
    const aum = filtered.reduce((s, c) => s + c.aum, 0);
    const open = filtered.filter((c) => c.stage !== "Closed").length;
    return { aum, open, count: filtered.length };
  }, [filtered]);

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const allChecked = filtered.length > 0 && filtered.every((c) => selected.has(c.id));
  const toggleAll = () => {
    setSelected((prev) => {
      if (allChecked) {
        const next = new Set(prev);
        filtered.forEach((c) => next.delete(c.id));
        return next;
      }
      const next = new Set(prev);
      filtered.forEach((c) => next.add(c.id));
      return next;
    });
  };

  const columns: DataTableColumn<Client>[] = [
    {
      id: "starred",
      header: "",
      className: "w-6",
      headerClassName: "w-6",
      cell: (c) => (
        <Star
          className={`h-3.5 w-3.5 ${c.starred ? "fill-status-warning text-status-warning" : "text-muted-foreground/40"}`}
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
      cell: (c) => (
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            {c.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground/95">{c.name}</div>
            <div className="truncate text-[11px] text-muted-foreground">{c.company}</div>
          </div>
        </div>
      ),
    },
    {
      id: "stage",
      header: "Stage",
      cell: (c) => <StatusBadge variant={stageVariant[c.stage]}>{c.stage}</StatusBadge>,
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
      cell: (c) => fmtAum(c.aum),
    },
    {
      id: "owner",
      header: "Owner",
      cell: (c) => (
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-full border border-border bg-muted text-[10px] font-semibold text-foreground/80">
            {c.owner.initials}
          </div>
          <div className="truncate text-[12px] text-foreground/80">{c.owner.name}</div>
        </div>
      ),
    },
    {
      id: "lastContact",
      header: "Last contact",
      className: "whitespace-nowrap text-[12px] text-muted-foreground",
      cell: (c) => c.lastContact,
    },
    {
      id: "nextAction",
      header: "Next action",
      className: "max-w-[220px] truncate text-[12px] text-foreground/80",
      cell: (c) => c.nextAction,
    },
    {
      id: "actions",
      header: "Actions",
      align: "right",
      headerClassName: "w-24 pr-4",
      className: "pr-4",
      cell: () => (
        <div className="flex items-center justify-end gap-1">
          <IconButton label="Call" icon={Phone} />
          <IconButton label="Email" icon={Mail} />
          <ActionMenu
            actions={[
              { label: "Open profile", icon: FileText },
              { label: "Call", icon: Phone },
              { label: "Email", icon: Mail },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageSurface variant="flush">
        <PageBandHeader
          eyebrow="Clients"
          title="CRM"
          description="Every relationship in one place — accounts, owners, AUM and the next move."
          actions={
            <>
              <Button variant="outline" className="border-border bg-transparent">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
              <Button
                className="text-primary-foreground border-0"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Plus className="h-4 w-4 mr-2" /> New client
              </Button>
            </>
          }
        />

        <MetricStrip
          metrics={[
            { label: "Total clients", value: clients.length.toString() },
            { label: "Showing", value: totals.count.toString() },
            { label: "Open relationships", value: totals.open.toString() },
            { label: "AUM (filtered)", value: fmtAum(totals.aum) },
          ]}
        />

        <PageToolbar>
          <SearchField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search clients, companies, email..."
            containerClassName="max-w-md"
          />
          <FilterBar
            ariaLabel="Client stage"
            value={stage}
            options={stageOptions}
            onValueChange={setStage}
          />
          {selected.size > 0 && (
            <div className="text-[11px] text-muted-foreground">{selected.size} selected</div>
          )}
        </PageToolbar>

        {/* Table — full width, no card */}
        <PageBody>
          <DataTable
            rows={filtered}
            columns={columns}
            getRowKey={(c) => c.id}
            selectedRows={selected}
            onSelectRow={(c) => toggle(c.id)}
            onSelectAll={toggleAll}
            empty={
              <EmptyState
                title="No clients match your filters"
                description="Adjust the search or stage filter to widen the list."
                className="min-h-0 py-0"
              />
            }
          />
        </PageBody>
      </PageSurface>
      <SyraChatWidget />
    </>
  );
}
