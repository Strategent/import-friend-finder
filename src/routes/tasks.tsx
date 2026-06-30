import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageShell, PageHeader } from "@/app/shell/layout";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({ meta: [{ title: "Tasks — Harwick & Sterne" }] }),
});

const groups = [
  {
    name: "Today",
    items: [
      { title: "Review Q2 onboarding playbook", assignee: "Avery", priority: "High", done: false },
      { title: "Finalize Acme proposal v2", assignee: "Syra", priority: "High", done: false },
      { title: "Approve Stripe payout", assignee: "Avery", priority: "Med", done: true },
    ],
  },
  {
    name: "This week",
    items: [
      { title: "Migrate CRM custom fields", assignee: "Marcus", priority: "Med", done: false },
      { title: "Record agent training data", assignee: "Syra", priority: "Low", done: false },
      { title: "QA new voice prompt set", assignee: "Jenna", priority: "Med", done: false },
    ],
  },
];

function TasksPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Workflows"
        title="Tasks"
        description="Human + agent work, tracked together."
        actions={
          <Button className="border-0 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" /> New Task
          </Button>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {groups.map((g) => (
          <Card key={g.name} className="bento p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">{g.name}</div>
              <div className="text-[11px] text-muted-foreground">{g.items.length} items</div>
            </div>
            <div className="space-y-1">
              {g.items.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-state-hover"
                >
                  <Checkbox defaultChecked={t.done} />
                  <div
                    className={`flex-1 text-[13px] ${t.done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {t.title}
                  </div>
                  <Badge
                    className={`border ${t.priority === "High" ? "bg-status-danger-bg text-status-danger-fg border-status-danger-border" : t.priority === "Med" ? "bg-status-warning-bg text-status-warning-fg border-status-warning-border" : "bg-surface-raised text-muted-foreground border-border/60"}`}
                  >
                    {t.priority}
                  </Badge>
                  <div className="text-[11px] text-muted-foreground w-16 text-right">
                    {t.assignee}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
