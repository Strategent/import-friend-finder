import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageShell, PageHeader } from "@/components/page-shell";
import {
  Plug,
  Plus,
  FileSignature,
  CreditCard,
  Mail,
  Cloud,
  MessageSquare,
  Calendar,
  Database,
  FileText,
  Briefcase,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/connectors")({
  component: ConnectorsPage,
  head: () => ({ meta: [{ title: "Connectors — Harwick & Sterne" }] }),
});

const connectors = [
  { name: "DocuSign", desc: "E-signature & agreements", icon: FileSignature, connected: true },
  { name: "Stripe", desc: "Payments & invoicing", icon: CreditCard, connected: true },
  { name: "Gmail", desc: "Email sync & drafts", icon: Mail, connected: true },
  { name: "Google Drive", desc: "Document storage", icon: Cloud, connected: false },
  { name: "Slack", desc: "Team messaging", icon: MessageSquare, connected: true },
  { name: "Google Calendar", desc: "Meetings & scheduling", icon: Calendar, connected: false },
  { name: "HubSpot", desc: "CRM & pipeline", icon: Database, connected: false },
  { name: "Notion", desc: "Notes & wikis", icon: FileText, connected: false },
  { name: "QuickBooks", desc: "Accounting & books", icon: Briefcase, connected: false },
];

function ConnectorsPage() {
  const [requesting, setRequesting] = useState(false);
  const [requestName, setRequestName] = useState("");

  return (
    <PageShell>
      <PageHeader
        eyebrow={<><Plug className="h-3.5 w-3.5" /> Connectors</>}
        title="Connectors"
        description="All of your connected business apps in one place."
        actions={
          <Button
            onClick={() => setRequesting((v) => !v)}
            className="h-9 px-4 text-[13px] gap-2"
          >
            <Plus className="h-3.5 w-3.5" /> Request connector
          </Button>
        }
      />

      {requesting && (
        <div className="bento p-5 flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <div className="text-[13px] font-medium tracking-tight">Request a new connector</div>
            <div className="text-[12px] text-muted-foreground">Tell us which app you need and we'll add it.</div>
          </div>
          <input
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            placeholder="e.g. Salesforce, Xero, Calendly…"
            className="h-10 px-3 rounded-lg bg-white/[0.03] border border-white/10 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 md:w-72"
          />
          <Button className="h-10 px-4 text-[13px]">Submit request</Button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {connectors.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.name} className="col-span-12 sm:col-span-6 lg:col-span-4">
              <div className="bento p-5 h-full flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-white/[0.05] border border-white/10">
                    <Icon className="h-[18px] w-[18px] text-foreground/85" strokeWidth={1.5} />
                  </div>
                  {c.connected ? (
                    <Badge className="bg-white/[0.06] text-foreground/80 border border-white/10 hover:bg-white/[0.06] gap-1">
                      <Check className="h-3 w-3" /> Connected
                    </Badge>
                  ) : (
                    <Badge className="bg-transparent text-muted-foreground border border-white/10 hover:bg-transparent">
                      Not connected
                    </Badge>
                  )}
                </div>
                <div>
                  <div className="text-[14px] font-medium tracking-tight">{c.name}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{c.desc}</div>
                </div>
                <Button
                  variant="ghost"
                  className="h-8 px-3 text-[12px] justify-start -ml-3 text-foreground/80 hover:text-foreground hover:bg-white/[0.04] w-fit"
                >
                  {c.connected ? "Manage" : "Connect"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}