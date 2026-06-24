import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageShell, PageHeader } from "@/app/shell/page-shell";
import { useTheme } from "@/app/providers/theme-provider";
import { Shield, Users, Palette, KeyRound, Bell } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "Settings — Harwick & Sterne" }] }),
});

function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageShell>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Authentication, users, appearance and notifications."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bento p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center bg-primary/15 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Authentication</div>
              <div className="text-xs text-muted-foreground">Powered by Clerk</div>
            </div>
            <Badge className="bg-primary/15 text-primary border border-primary/30 hover:bg-primary/15">
              Connected
            </Badge>
          </div>
          <div className="mt-5 space-y-3 text-[13px]">
            <Row label="Email + password" enabled />
            <Row label="Google SSO" enabled />
            <Row label="Apple SSO" />
            <Row label="Two-factor (TOTP)" enabled />
            <Row label="Magic links" />
          </div>
          <Button variant="outline" className="mt-5 border-border/60">
            <KeyRound className="h-4 w-4 mr-2" /> Manage in Clerk
          </Button>
        </Card>

        <Card className="bento p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center bg-accent/15 text-accent">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Users & Roles</div>
              <div className="text-xs text-muted-foreground">5 members · 2 admins</div>
            </div>
            <Button size="sm" variant="outline" className="border-border/60">
              Invite
            </Button>
          </div>
          <div className="mt-5 space-y-2">
            {[
              { name: "Avery Cole", role: "Owner" },
              { name: "Marcus Reed", role: "Admin" },
              { name: "Jenna Park", role: "Member" },
              { name: "Diego Alvarez", role: "Member" },
              { name: "Priya Shah", role: "Member" },
            ].map((u) => (
              <div
                key={u.name}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
              >
                <div
                  className="h-8 w-8 rounded-full grid place-items-center text-[11px] font-semibold"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {u.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="text-[13px] flex-1">{u.name}</div>
                <Badge className="bg-black/5 dark:bg-white/5 text-muted-foreground border border-border/60">
                  {u.role}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bento p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center bg-primary/15 text-primary">
              <Palette className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Appearance</div>
              <div className="text-xs text-muted-foreground">Theme & density</div>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-[13px]">
            <div className="flex items-center justify-between">
              <span>Dark mode</span>
              <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
            </div>
            <Row label="Compact density" />
            <Row label="Reduce motion" />
            <Row label="Show grid background" enabled />
          </div>
        </Card>

        <Card className="bento p-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg grid place-items-center bg-accent/15 text-accent">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Notifications</div>
              <div className="text-xs text-muted-foreground">
                When Syra and the team should ping you
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-[13px]">
            <Row label="Inbox — new lead replies" enabled />
            <Row label="Calls — escalations" enabled />
            <Row label="Tasks — overdue" />
            <Row label="Billing — failed payments" enabled />
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function Row({ label, enabled }: { label: string; enabled?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <Switch defaultChecked={enabled} />
    </div>
  );
}
