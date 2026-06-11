import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Plus, Filter, Search, ArrowUpDown, MoreHorizontal, Star, Phone, Mail } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/crm")({
  component: CrmPage,
  head: () => ({ meta: [{ title: "CRM — Harwick & Sterne" }] }),
});

type Stage = "Lead" | "Qualified" | "Proposal" | "Negotiation" | "Closed";

const stageStyle: Record<Stage, { dot: string; chip: string }> = {
  Lead:        { dot: "#8ab4ff", chip: "bg-[#8ab4ff]/10 text-[#cfdcff] border-[#8ab4ff]/25" },
  Qualified:   { dot: "#9b8cff", chip: "bg-[#9b8cff]/10 text-[#dcd4ff] border-[#9b8cff]/25" },
  Proposal:    { dot: "#f5a623", chip: "bg-[#f5a623]/10 text-[#fbd9a0] border-[#f5a623]/25" },
  Negotiation: { dot: "#5ac8fa", chip: "bg-[#5ac8fa]/10 text-[#bfe7fa] border-[#5ac8fa]/25" },
  Closed:      { dot: "#7ad0a8", chip: "bg-[#7ad0a8]/10 text-[#c2ebd6] border-[#7ad0a8]/25" },
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
  { id: 1, name: "Eleanor Hartley",   company: "Hartley Family Trust",     email: "eleanor@hartleytrust.com",  phone: "+1 (212) 555-0148", stage: "Negotiation", aum: 12_400_000, owner: { initials: "JH", name: "John Harwick" },  lastContact: "2h ago",   nextAction: "Send revised IPS",        starred: true },
  { id: 2, name: "Denis Marlow",      company: "Marlow Holdings LLC",      email: "denis@marlowhold.com",      phone: "+1 (415) 555-0192", stage: "Proposal",    aum: 8_750_000,  owner: { initials: "OP", name: "Olivia Park" },   lastContact: "Today",    nextAction: "Schedule rebalance call" },
  { id: 3, name: "Sarah Beaumont",    company: "Beaumont Capital",         email: "sarah@beaumontcap.com",     phone: "+1 (646) 555-0173", stage: "Qualified",   aum: 5_200_000,  owner: { initials: "ML", name: "Marcus Lee" },    lastContact: "Yesterday", nextAction: "KYC follow-up" },
  { id: 4, name: "Raphael Castellanos", company: "Castellanos Ventures",   email: "raph@castellanos.vc",       phone: "+1 (305) 555-0119", stage: "Proposal",    aum: 7_900_000,  owner: { initials: "JH", name: "John Harwick" },  lastContact: "3d ago",   nextAction: "Review allocation memo" },
  { id: 5, name: "Aurelia Whitfield", company: "Whitfield Estate",         email: "a.whitfield@wfield.com",    phone: "+1 (212) 555-0211", stage: "Lead",        aum: 3_100_000,  owner: { initials: "RC", name: "Rina Cho" },      lastContact: "5d ago",   nextAction: "Send discovery deck",      starred: true },
  { id: 6, name: "Marcus Caldwell",   company: "Caldwell Estate",          email: "marcus@caldwell.co",        phone: "+1 (617) 555-0162", stage: "Closed",      aum: 4_650_000,  owner: { initials: "OP", name: "Olivia Park" },   lastContact: "1w ago",   nextAction: "Annual review prep" },
  { id: 7, name: "Priya Iyer",        company: "Sterling Holdings",        email: "priya@sterlingco.com",      phone: "+1 (212) 555-0144", stage: "Negotiation", aum: 9_300_000,  owner: { initials: "DM", name: "David Mensah" },  lastContact: "4h ago",   nextAction: "Lock advisory terms" },
  { id: 8, name: "Theodore Beck",     company: "Beck & Sons",              email: "ted@becksons.com",          phone: "+1 (713) 555-0188", stage: "Lead",        aum: 1_800_000,  owner: { initials: "ML", name: "Marcus Lee" },    lastContact: "2w ago",   nextAction: "Re-engage via email" },
  { id: 9, name: "Isabelle Renault",  company: "Renault Trust",            email: "isabelle@renaulttrust.fr",  phone: "+33 1 55 55 0177",  stage: "Qualified",   aum: 6_400_000,  owner: { initials: "RC", name: "Rina Cho" },      lastContact: "Today",    nextAction: "Send proposal draft" },
  { id: 10, name: "Owen Fitzgerald",  company: "Fitzgerald Capital",       email: "owen@fitzcap.com",          phone: "+1 (415) 555-0136", stage: "Proposal",    aum: 11_200_000, owner: { initials: "JH", name: "John Harwick" },  lastContact: "1h ago",   nextAction: "Approve IPS revisions" },
];

const STAGES: ("All" | Stage)[] = ["All", "Lead", "Qualified", "Proposal", "Negotiation", "Closed"];

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
      next.has(id) ? next.delete(id) : next.add(id);
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

  return (
    <PageShell>
      <PageHeader
        eyebrow="Clients"
        title="CRM"
        description="Every relationship in one place — accounts, owners, AUM and the next move."
        actions={
          <>
            <Button variant="outline" className="border-border/60 bg-card/40">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
              <Plus className="h-4 w-4 mr-2" /> New client
            </Button>
          </>
        }
      />

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total clients", value: clients.length.toString() },
          { label: "Showing", value: totals.count.toString() },
          { label: "Open relationships", value: totals.open.toString() },
          { label: "AUM (filtered)", value: fmtAum(totals.aum) },
        ].map((s) => (
          <div key={s.label} className="bento p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">{s.label}</div>
            <div className="mt-1.5 text-[20px] font-semibold tracking-tight tabular-nums">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bento p-3 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients, companies, email…"
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.03] border border-white/10 text-[13px] placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40"
          />
        </div>
        <div className="flex items-center gap-1 p-0.5 rounded-full bg-white/[0.04] border border-white/10">
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={`h-7 px-3 rounded-full text-[11px] font-medium transition-colors ${
                stage === s ? "bg-white/[0.09] text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {selected.size > 0 && (
          <div className="text-[11px] text-muted-foreground">
            {selected.size} selected
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bento overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 border-b border-white/[0.06] bg-white/[0.015]">
              <tr>
                <th className="py-3 pl-4 pr-2 w-8">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 accent-[oklch(0.62_0.22_270)] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-2 w-6"></th>
                <th className="py-3 px-2">
                  <span className="inline-flex items-center gap-1">Client <ArrowUpDown className="h-3 w-3 opacity-50" /></span>
                </th>
                <th className="py-3 px-2">Stage</th>
                <th className="py-3 px-2 text-right">
                  <span className="inline-flex items-center gap-1">AUM <ArrowUpDown className="h-3 w-3 opacity-50" /></span>
                </th>
                <th className="py-3 px-2">Owner</th>
                <th className="py-3 px-2">Last contact</th>
                <th className="py-3 px-2">Next action</th>
                <th className="py-3 px-2 w-24 text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {filtered.map((c) => {
                const checked = selected.has(c.id);
                const sty = stageStyle[c.stage];
                return (
                  <tr
                    key={c.id}
                    className={`border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors ${checked ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="py-3 pl-4 pr-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(c.id)}
                        className="h-3.5 w-3.5 accent-[oklch(0.62_0.22_270)] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-2">
                      <Star
                        className={`h-3.5 w-3.5 ${c.starred ? "text-amber-400 fill-amber-400" : "text-muted-foreground/40"}`}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="h-8 w-8 shrink-0 rounded-full grid place-items-center text-[11px] font-semibold text-white"
                          style={{ background: "var(--gradient-primary)" }}
                        >
                          {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-foreground/95 truncate">{c.name}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{c.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1.5 h-6 px-2 rounded-full text-[10px] font-medium border ${sty.chip}`}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: sty.dot }} />
                        {c.stage}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold tabular-nums">{fmtAum(c.aum)}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full grid place-items-center text-[10px] font-semibold bg-white/[0.06] border border-white/10">
                          {c.owner.initials}
                        </div>
                        <div className="text-[12px] text-foreground/80 truncate">{c.owner.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-[12px] text-muted-foreground whitespace-nowrap">{c.lastContact}</td>
                    <td className="py-3 px-2 text-[12px] text-foreground/80 truncate max-w-[220px]">{c.nextAction}</td>
                    <td className="py-3 px-2 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.05]" aria-label="Call">
                          <Phone className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.05]" aria-label="Email">
                          <Mail className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.05]" aria-label="More">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[13px] text-muted-foreground">
                    No clients match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}