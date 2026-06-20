import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/components/page-shell";
import { UserPlus } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({ meta: [{ title: "Team — Harwick & Sterne" }] }),
});

const team = [
  { name: "Avery Cole", role: "Operations Lead", status: "Online", tasks: 12, score: 96 },
  { name: "Marcus Reed", role: "Account Manager", status: "Online", tasks: 9, score: 91 },
  { name: "Jenna Park", role: "CX Specialist", status: "Away", tasks: 7, score: 88 },
  { name: "Diego Alvarez", role: "Solutions Engineer", status: "Online", tasks: 5, score: 94 },
  { name: "Priya Shah", role: "AI Trainer", status: "Offline", tasks: 3, score: 90 },
];

function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="People"
        title="Team"
        description="Employees, workload and accountability at a glance."
        actions={
          <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
            <UserPlus className="h-4 w-4 mr-2" /> Invite
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {team.map((m) => (
          <Card key={m.name} className="bento p-5">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl(m.name, 128)}
                alt={m.name}
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover border border-border/60"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold truncate">{m.name}</div>
                <div className="text-xs text-muted-foreground truncate">{m.role}</div>
              </div>
              <Badge className={`border ${m.status === "Online" ? "bg-primary/15 text-primary border-primary/30" : m.status === "Away" ? "bg-accent/15 text-accent border-accent/30" : "bg-white/5 text-muted-foreground border-border/60"}`}>
                {m.status}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Open tasks</div>
                <div className="mt-1 text-xl font-semibold">{m.tasks}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accountability</div>
                <div className="mt-1 text-xl font-semibold text-primary">{m.score}%</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${m.score}%`, background: "var(--gradient-primary)" }} />
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}