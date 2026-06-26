import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import { UserPlus, Mail, MessageSquare, MessageCircle, Copy, Send } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({ meta: [{ title: "Team — Harwick & Sterne" }] }),
});

type Member = {
  name: string;
  role: string;
  status: string;
  tasks: number;
  score: number;
  pending?: boolean;
};

const seedTeam: Member[] = [
  { name: "Elena Smith", role: "Associate, Harwick & Sterne", status: "Online", tasks: 12, score: 96 },
  { name: "Emma Reeves", role: "Trustee, Hartley Family Trust", status: "Online", tasks: 9, score: 91 },
  { name: "Adrian Engman", role: "CFO, Sterling Holdings LLC", status: "Away", tasks: 7, score: 88 },
  { name: "Claire Bennett", role: "Principal, Caldwell Estate", status: "Online", tasks: 5, score: 94 },
  { name: "Daniel Brooks", role: "Managing Partner, Marlow Capital", status: "Offline", tasks: 3, score: 90 },
  { name: "Lena Foster", role: "Family Office Director, Beaumont Group", status: "Online", tasks: 4, score: 92 },
];

function statusDotColor(status: string) {
  switch (status) {
    case "Online":
      return "#2BAC76";
    case "Away":
      return "#EBB02C";
    case "Offline":
      return "#CB2431";
    case "Pending":
      return "#9CA3AF";
    default:
      return "#888";
  }
}

function TeamPage() {
  const [team, setTeam] = useState<Member[]>(seedTeam);

  const addInvite = (name: string, via: string) =>
    setTeam((prev) => [
      { name, role: `Invited via ${via}`, status: "Pending", tasks: 0, score: 0, pending: true },
      ...prev,
    ]);

  return (
    <PageShell>
      <PageHeader
        eyebrow="People"
        title="Team"
        description="Employees, workload and accountability at a glance."
        actions={<InviteDialog onInvite={addInvite} />}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {team.map((m) => (
          <Card key={m.name} className="bento p-5">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl(m.name, 128)}
                alt={m.name}
                loading="lazy"
                className={`h-11 w-11 rounded-full object-cover border border-border/60 ${m.pending ? "grayscale opacity-80" : ""}`}
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
            {m.pending ? (
              <div className="mt-4 rounded-lg border border-dashed border-border/70 bg-foreground/[0.02] px-3 py-3 text-[12px] text-muted-foreground">
                Invitation sent — awaiting sign-up to the dashboard.
              </div>
            ) : (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Open tasks</div>
                    <div className="mt-1 text-xl font-semibold">{m.tasks}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Accountability</div>
                    <div className="mt-1 text-xl font-semibold">{m.score}%</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-border/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-foreground"
                    style={{ width: `${m.score}%`, opacity: 0.85 }}
                  />
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

type Channel = "email" | "imessage" | "whatsapp";

const CHANNELS: { id: Channel; label: string; Icon: typeof Mail; dot: string }[] = [
  { id: "email", label: "Email", Icon: Mail, dot: "bg-blue-500" },
  { id: "imessage", label: "iMessage", Icon: MessageSquare, dot: "bg-sky-500" },
  { id: "whatsapp", label: "WhatsApp", Icon: MessageCircle, dot: "bg-emerald-500" },
];

const INVITE_LINK = "https://app.harwicksterne.com/join";

/**
 * InviteDialog — invite a teammate to the dashboard via Email, iMessage, or
 * WhatsApp. Each channel passes a prefilled invite + join link through to the
 * native app so the recipient can create their account.
 */
function InviteDialog({ onInvite }: { onInvite: (name: string, via: string) => void }) {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState<Channel>("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const digits = phone.replace(/\D/g, "");
  const isEmail = channel === "email";
  const valid = isEmail ? /\S+@\S+\.\S+/.test(email.trim()) : digits.length >= 7;
  const channelLabel = CHANNELS.find((c) => c.id === channel)!.label;

  const reset = () => {
    setChannel("email");
    setName("");
    setEmail("");
    setPhone("");
  };

  const message = () =>
    `${name.trim() ? `Hi ${name.trim()}, ` : ""}you're invited to join the Harwick & Sterne dashboard on Syra. Create your account here: ${INVITE_LINK}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(INVITE_LINK);
      toast.success("Invite link copied");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const send = () => {
    if (!valid) {
      toast.error(isEmail ? "Enter a valid email" : "Enter a valid phone number");
      return;
    }
    const text = message();
    if (channel === "email") {
      window.location.href = `mailto:${email.trim()}?subject=${encodeURIComponent(
        "You're invited to Harwick & Sterne",
      )}&body=${encodeURIComponent(text)}`;
    } else if (channel === "whatsapp") {
      window.open(`https://wa.me/${digits}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `sms:${phone.trim()}?&body=${encodeURIComponent(text)}`;
    }
    onInvite(name.trim() || (isEmail ? email.trim() : phone.trim()), channelLabel);
    toast.success("Invitation sent", {
      description: `${name.trim() || "New member"} · via ${channelLabel}`,
    });
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
        <Button className="h-9 px-4 text-[13px] gap-2">
          <UserPlus className="h-3.5 w-3.5" /> Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to the team</DialogTitle>
          <DialogDescription>
            Send an invite to join the dashboard and create an account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-1">
          {/* Channel */}
          <div className="grid grid-cols-3 gap-2">
            {CHANNELS.map((c) => {
              const active = channel === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChannel(c.id)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors ${
                    active ? "border-foreground/40 bg-foreground/[0.06]" : "border-border hover:bg-foreground/[0.03]"
                  }`}
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white ${c.dot}`}>
                    <c.Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-medium">{c.label}</span>
                </button>
              );
            })}
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="inv-name">
              Name <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="inv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jordan Avery"
              autoComplete="off"
            />
          </div>

          {/* Contact — email or phone by channel */}
          {isEmail ? (
            <div className="space-y-1.5">
              <Label htmlFor="inv-email">
                Email <span className="text-muted-foreground">*</span>
              </Label>
              <Input
                id="inv-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="jordan@firm.com"
                autoComplete="off"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <Label htmlFor="inv-phone">
                Phone number <span className="text-muted-foreground">*</span>
              </Label>
              <Input
                id="inv-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="+1 (415) 555-0148"
                autoComplete="off"
              />
            </div>
          )}

          {/* Shareable invite link */}
          <div className="space-y-1.5">
            <Label>Invite link</Label>
            <div className="flex items-center gap-2">
              <Input value={INVITE_LINK} readOnly className="text-muted-foreground" />
              <Button variant="outline" onClick={copyLink} className="shrink-0">
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
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
            onClick={send}
            disabled={!valid}
            className="text-white border-0"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Send className="h-4 w-4 mr-2" /> Send invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
