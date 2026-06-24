import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageShell, PageHeader } from "@/app/shell/layout";
import { UserPlus } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({ meta: [{ title: "Team — Harwick & Sterne" }] }),
});

const team = [
  {
    name: "Elena Smith",
    role: "Associate, Harwick & Sterne",
    status: "Online",
    tasks: 12,
    score: 96,
  },
  {
    name: "Emma Reeves",
    role: "Trustee, Hartley Family Trust",
    status: "Online",
    tasks: 9,
    score: 91,
  },
  {
    name: "Adrian Engman",
    role: "CFO, Sterling Holdings LLC",
    status: "Away",
    tasks: 7,
    score: 88,
  },
  {
    name: "Claire Bennett",
    role: "Principal, Caldwell Estate",
    status: "Online",
    tasks: 5,
    score: 94,
  },
  {
    name: "Daniel Brooks",
    role: "Managing Partner, Marlow Capital",
    status: "Offline",
    tasks: 3,
    score: 90,
  },
  {
    name: "Lena Foster",
    role: "Family Office Director, Beaumont Group",
    status: "Online",
    tasks: 4,
    score: 92,
  },
];

function statusDotColor(status: string) {
  switch (status) {
    case "Online":
      return "var(--status-success)";
    case "Away":
      return "var(--status-warning)";
    case "Offline":
      return "var(--status-danger)";
    default:
      return "var(--muted-foreground)";
  }
}

function TeamPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="People"
        title="Team"
        description="Employees, workload and accountability at a glance."
        actions={
          <Button variant="outline" className="border-border/60">
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
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 border-border/60 text-muted-foreground"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: statusDotColor(m.status) }}
                />
                {m.status}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Open tasks
                </div>
                <div className="mt-1 text-xl font-semibold">{m.tasks}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Accountability
                </div>
                <div className="mt-1 text-xl font-semibold">{m.score}%</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-foreground"
                style={{ width: `${m.score}%`, opacity: 0.85 }}
              />
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
