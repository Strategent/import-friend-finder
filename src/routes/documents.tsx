import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/app/shell/page-shell";
import { FileText, FileSpreadsheet, FileImage, Upload, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
  head: () => ({ meta: [{ title: "Documents — Harwick & Sterne" }] }),
});

const docs = [
  {
    name: "Acme — Master Service Agreement.pdf",
    type: "pdf",
    size: "1.4 MB",
    updated: "2m ago",
    by: "Avery",
  },
  {
    name: "Q2 Pipeline Forecast.xlsx",
    type: "sheet",
    size: "248 KB",
    updated: "1h ago",
    by: "Syra",
  },
  {
    name: "Brand Guidelines v3.pdf",
    type: "pdf",
    size: "8.2 MB",
    updated: "yesterday",
    by: "Jenna",
  },
  { name: "Onboarding flow.png", type: "img", size: "612 KB", updated: "2d ago", by: "Marcus" },
  {
    name: "Northwind — Discovery Notes.pdf",
    type: "pdf",
    size: "320 KB",
    updated: "3d ago",
    by: "Syra",
  },
];

const icon = (t: string) => (t === "sheet" ? FileSpreadsheet : t === "img" ? FileImage : FileText);

function DocumentsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Knowledge"
        title="Documents"
        description="Contracts, briefs and assets — all searchable by Syra."
        actions={
          <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
            <Upload className="h-4 w-4 mr-2" /> Upload
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((d) => {
          const Icon = icon(d.type);
          return (
            <Card key={d.name} className="bento p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-lg grid place-items-center bg-primary/10 text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold truncate">{d.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.size} · updated {d.updated}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">by {d.by}</div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
