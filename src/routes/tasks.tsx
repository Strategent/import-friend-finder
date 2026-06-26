import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageShell, PageHeader } from "@/components/page-shell";
import { team } from "@/components/dashboard/data";
import { Plus, Check, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
  head: () => ({ meta: [{ title: "Tasks — Harwick & Sterne" }] }),
});

type Priority = "High" | "Med" | "Low";
type TaskStatus = "open" | "pending" | "done";
type Assignee = { initials: string; name: string };
type Task = { id: number; title: string; assignees: Assignee[]; priority: Priority; status: TaskStatus };
type Group = { name: string; items: Task[] };

const initialsOf = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
const A = (name: string): Assignee => ({ initials: initialsOf(name), name });

// Assignable roster — the org's team plus the Syra agent.
const PEOPLE: { initials: string; name: string; role: string }[] = [
  ...team.map((m) => ({ initials: m.initials, name: m.name, role: m.role })),
  { initials: "SY", name: "Syra", role: "AI agent" },
];

// Functional teams that expand to their members on assignment.
const TEAMS: { name: string; members: string[] }[] = [
  { name: "Advisory", members: ["David Mensah", "Olivia Park"] },
  { name: "Research", members: ["Marcus Lee"] },
  { name: "Operations", members: ["Rina Cho"] },
];

const assigneeFor = (name: string): Assignee => {
  const p = PEOPLE.find((pp) => pp.name === name);
  return p ? { initials: p.initials, name: p.name } : A(name);
};

const seedGroups: Group[] = [
  {
    name: "Today",
    items: [
      { id: 1, title: "Review Q2 onboarding playbook", assignees: [A("Avery")], priority: "High", status: "open" },
      { id: 2, title: "Finalize Acme proposal v2", assignees: [assigneeFor("Syra")], priority: "High", status: "open" },
      { id: 3, title: "Approve Stripe payout", assignees: [A("Avery")], priority: "Med", status: "done" },
    ],
  },
  {
    name: "This week",
    items: [
      { id: 4, title: "Migrate CRM custom fields", assignees: [assigneeFor("Marcus Lee")], priority: "Med", status: "open" },
      { id: 5, title: "Record agent training data", assignees: [assigneeFor("Syra")], priority: "Low", status: "open" },
      { id: 6, title: "QA new voice prompt set", assignees: [A("Jenna")], priority: "Med", status: "open" },
    ],
  },
  {
    name: "This month",
    items: [
      { id: 7, title: "Plan Q3 advisor offsite", assignees: [assigneeFor("David Mensah")], priority: "Low", status: "open" },
      { id: 8, title: "Annual KYC refresh — top accounts", assignees: [assigneeFor("Rina Cho")], priority: "Med", status: "open" },
    ],
  },
];

const priorityClass = (p: Priority) =>
  p === "High"
    ? "bg-accent/15 text-accent border-accent/30"
    : p === "Med"
      ? "bg-primary/15 text-primary border-primary/30"
      : "bg-white/5 text-muted-foreground border-border/60";

function AssigneeStack({ assignees }: { assignees: Assignee[] }) {
  if (assignees.length === 0) {
    return <div className="text-[11px] text-muted-foreground">Unassigned</div>;
  }
  const shown = assignees.slice(0, 3);
  const extra = assignees.length - shown.length;
  return (
    <div className="flex items-center -space-x-1.5" title={assignees.map((a) => a.name).join(", ")}>
      {shown.map((a) => (
        <span
          key={a.name}
          className="grid h-6 w-6 place-items-center rounded-full border border-border bg-muted text-[9.5px] font-semibold text-foreground/80 ring-2 ring-background"
        >
          {a.initials}
        </span>
      ))}
      {extra > 0 && (
        <span className="grid h-6 w-6 place-items-center rounded-full border border-border bg-foreground/[0.08] text-[9.5px] font-semibold text-muted-foreground ring-2 ring-background">
          +{extra}
        </span>
      )}
    </div>
  );
}

function TaskRow({
  task,
  confirming,
  onRequestComplete,
  onConfirm,
  onCancel,
  onReopen,
}: {
  task: Task;
  confirming: boolean;
  onRequestComplete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onReopen: () => void;
}) {
  const pending = task.status === "pending";
  const done = task.status === "done";

  return (
    <div className="rounded-lg hover:bg-white/[0.04]">
      <div className="flex items-center gap-3 p-2.5">
        <Checkbox
          checked={task.status !== "open"}
          aria-label={task.status === "open" ? "Complete task" : "Reopen task"}
          onCheckedChange={() => {
            // Clicking an open task asks for confirmation rather than completing
            // outright; a pending/done task is reopened.
            if (task.status === "open") onRequestComplete();
            else onReopen();
          }}
        />
        <div
          className={`flex-1 text-[13px] ${
            done ? "line-through text-muted-foreground" : pending ? "text-muted-foreground" : ""
          }`}
        >
          {task.title}
        </div>
        {pending ? (
          <Badge className="border bg-amber-500/15 text-amber-500 border-amber-500/30 whitespace-nowrap">
            <Clock className="h-3 w-3 mr-1" /> Pending Confirmation
          </Badge>
        ) : (
          <Badge className={`border ${priorityClass(task.priority)}`}>{task.priority}</Badge>
        )}
        <AssigneeStack assignees={task.assignees} />
      </div>

      {confirming && (
        <div className="mx-2.5 mb-2 flex items-center justify-between gap-2 rounded-md border border-amber-500/30 bg-amber-500/[0.06] px-3 py-2">
          <span className="text-[12px] text-foreground/85">Mark this task complete?</span>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" className="h-7 px-2.5 text-[12px]" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              className="h-7 px-3 text-[12px] text-white border-0"
              style={{ background: "var(--gradient-primary)" }}
              onClick={onConfirm}
            >
              <Check className="h-3.5 w-3.5 mr-1" /> Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function TasksPage() {
  const [groups, setGroups] = useState<Group[]>(seedGroups);
  // Task awaiting completion confirmation after its checkbox was clicked.
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const addTask = (groupName: string, task: Task) => {
    setGroups((prev) =>
      prev.map((g) => (g.name === groupName ? { ...g, items: [task, ...g.items] } : g)),
    );
  };

  const setStatus = (id: number, status: TaskStatus) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        items: g.items.map((t) => (t.id === id ? { ...t, status } : t)),
      })),
    );
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Workflows"
        title="Tasks"
        description="Human + agent work, tracked together."
        actions={<NewTaskDialog groups={groups.map((g) => g.name)} onAdd={addTask} />}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <Card key={g.name} className="bento p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">{g.name}</div>
              <div className="text-[11px] text-muted-foreground">{g.items.length} items</div>
            </div>
            <div className="space-y-1">
              {g.items.map((t) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  confirming={confirmingId === t.id}
                  onRequestComplete={() => setConfirmingId(t.id)}
                  onCancel={() => setConfirmingId(null)}
                  onConfirm={() => {
                    setStatus(t.id, "pending");
                    setConfirmingId(null);
                  }}
                  onReopen={() => {
                    setStatus(t.id, "open");
                    setConfirmingId(null);
                  }}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

const PRIORITIES: Priority[] = ["High", "Med", "Low"];

/**
 * NewTaskDialog — the "New Task" action. Create a task in a chosen list with a
 * priority, and assign individual people from the org's team and/or whole teams.
 */
function NewTaskDialog({
  groups,
  onAdd,
}: {
  groups: string[];
  onAdd: (groupName: string, task: Task) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(groups[0] ?? "Today");
  const [priority, setPriority] = useState<Priority>("Med");
  const [mode, setMode] = useState<"people" | "teams">("people");
  const [people, setPeople] = useState<Set<string>>(new Set());
  const [teams, setTeams] = useState<Set<string>>(new Set());

  const reset = () => {
    setTitle("");
    setGroup(groups[0] ?? "Today");
    setPriority("Med");
    setMode("people");
    setPeople(new Set());
    setTeams(new Set());
  };

  const togglePerson = (name: string) =>
    setPeople((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  const toggleTeam = (name: string) =>
    setTeams((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  // Union of directly-picked people and the members of every selected team.
  const assignees = useMemo<Assignee[]>(() => {
    const byName = new Map<string, Assignee>();
    PEOPLE.filter((p) => people.has(p.name)).forEach((p) =>
      byName.set(p.name, { initials: p.initials, name: p.name }),
    );
    TEAMS.filter((t) => teams.has(t.name))
      .flatMap((t) => t.members)
      .forEach((name) => byName.set(name, assigneeFor(name)));
    return [...byName.values()];
  }, [people, teams]);

  const submit = () => {
    if (!title.trim()) {
      return;
    }
    onAdd(group, { id: Date.now(), title: title.trim(), assignees, priority, status: "open" });
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="text-white border-0" style={{ background: "var(--gradient-primary)" }}>
          <Plus className="h-4 w-4 mr-2" /> New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription>Create a task and assign people or whole teams.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="nt-title">
              Task <span className="text-muted-foreground">*</span>
            </Label>
            <Input
              id="nt-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Draft Q3 onboarding playbook"
              autoComplete="off"
            />
          </div>

          {/* List — full row so Today / This week / This month are all visible */}
          <div className="space-y-1.5">
            <Label>List</Label>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
              {groups.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGroup(g)}
                  className={`h-7 flex-1 rounded-full px-2 text-[11px] font-medium transition-colors ${
                    group === g ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`h-7 flex-1 rounded-full px-2 text-[11px] font-medium transition-colors ${
                    priority === p ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Assign to</Label>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-0.5">
                {(["people", "teams"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`h-6 rounded-full px-2.5 text-[11px] font-medium capitalize transition-colors ${
                      mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {mode === "people" ? (
              <div className="flex flex-wrap gap-1.5">
                {PEOPLE.map((p) => {
                  const on = people.has(p.name);
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => togglePerson(p.name)}
                      aria-pressed={on}
                      className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-2.5 transition-colors ${
                        on ? "border-foreground/40 bg-foreground/[0.06]" : "border-border hover:bg-foreground/[0.03]"
                      }`}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full border border-border bg-muted text-[9.5px] font-semibold text-foreground/80">
                        {p.initials}
                      </span>
                      <span className="text-[12px] font-medium leading-none">{p.name}</span>
                      {on && <Check className="h-3.5 w-3.5 text-foreground/70" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5">
                {TEAMS.map((t) => {
                  const on = teams.has(t.name);
                  return (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => toggleTeam(t.name)}
                      aria-pressed={on}
                      className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-left transition-colors ${
                        on ? "border-foreground/40 bg-foreground/[0.06]" : "border-border hover:bg-foreground/[0.03]"
                      }`}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foreground/[0.08] text-foreground/70">
                        <Users className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12.5px] font-medium leading-tight">{t.name}</span>
                        <span className="block text-[10.5px] text-muted-foreground">
                          {t.members.join(", ")}
                        </span>
                      </span>
                      {on && <Check className="h-4 w-4 shrink-0 text-foreground/70" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Live preview of everyone who'll be assigned */}
            <div className="flex min-h-6 items-center gap-2 pt-0.5">
              <span className="text-[11px] text-muted-foreground">Assignees</span>
              <AssigneeStack assignees={assignees} />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={!title.trim()}
            className="text-white border-0"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
