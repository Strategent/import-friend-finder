import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { Download, CreditCard } from "lucide-react";

export const Route = createFileRoute("/billing")({
  component: BillingPage,
  head: () => ({ meta: [{ title: "Billing — Harwick & Sterne" }] }),
});

const invoices = [
  { id: "INV-1042", client: "Acme Corp", amount: "$12,000", status: "Paid", date: "May 12" },
  { id: "INV-1041", client: "Northwind", amount: "$4,800", status: "Paid", date: "May 09" },
  { id: "INV-1040", client: "Helios Solar", amount: "$3,200", status: "Pending", date: "May 04" },
  { id: "INV-1039", client: "Lumen Health", amount: "$6,400", status: "Overdue", date: "Apr 28" },
  { id: "INV-1038", client: "Pulse Media", amount: "$9,200", status: "Paid", date: "Apr 22" },
];

function BillingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Revenue"
        title="Billing"
        description="Subscriptions, invoices and payouts."
        actions={
          <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
            <CreditCard className="h-4 w-4 mr-2" /> New Invoice
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: "$128,400" },
          { label: "Outstanding", value: "$8,210", accent: true },
          { label: "Next payout", value: "May 30" },
          { label: "Churn (30d)", value: "0.9%" },
        ].map((s) => (
          <Card key={s.label} className="bento p-5">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className={`mt-2 text-2xl font-semibold tracking-tight ${s.accent ? "text-accent" : ""}`}>{s.value}</div>
          </Card>
        ))}
      </div>
      <Card className="bento p-0">
        <div className="px-5 py-3 border-b border-border/60 text-sm font-semibold">Recent invoices</div>
        <div className="divide-y divide-border/60">
          {invoices.map((inv) => (
            <div key={inv.id} className="grid grid-cols-12 items-center px-5 py-3 text-[13px] hover:bg-white/[0.03]">
              <div className="col-span-3 font-mono text-muted-foreground">{inv.id}</div>
              <div className="col-span-4 font-medium">{inv.client}</div>
              <div className="col-span-2">{inv.amount}</div>
              <div className="col-span-2">
                <Badge className={`border ${inv.status === "Paid" ? "bg-primary/15 text-primary border-primary/30" : inv.status === "Pending" ? "bg-accent/15 text-accent border-accent/30" : "bg-destructive/15 text-destructive border-destructive/30"}`}>
                  {inv.status}
                </Badge>
              </div>
              <div className="col-span-1 flex justify-end gap-1 text-muted-foreground">
                <span className="mr-2 text-xs">{inv.date}</span>
                <Button variant="ghost" size="icon"><Download className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}