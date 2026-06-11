import { useState } from "react";
import { Reply, ReplyAll, Forward, Star, Paperclip, Archive } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { PillButton } from "@/components/ui/pill-button";
import { SyraMark } from "@/components/syra-mark";
import { emails } from "@/components/dashboard/data";

/**
 * InboxCard — focused/other inbox with reading pane and the "Drafted by Syra"
 * suggestion block. Wrapped in the Origin <Panel> (INBOX ›) with the Outlook-style
 * action ribbon kept as the panel header action.
 */
export function InboxCard() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"focused" | "other">("focused");
  const e = emails[selected];
  const initials = (n: string) =>
    n
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("");

  return (
    <Panel
      label="Inbox"
      padding="none"
      action={
        <div className="flex items-center gap-1">
          <IconBtn icon={Reply} label="Reply" />
          <IconBtn icon={ReplyAll} label="Reply all" />
          <IconBtn icon={Forward} label="Forward" />
          <span className="mx-1 h-4 w-px bg-border" />
          <IconBtn icon={Archive} label="Archive" />
          <IconBtn icon={Star} label="Flag" />
        </div>
      }
      bodyClassName="overflow-hidden"
    >
      {/* Focused / Other tabs */}
      <div className="flex shrink-0 items-center gap-0 border-b border-border/50 px-5 pb-2">
        {(["focused", "other"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative h-6 px-2.5 text-[12px] font-medium capitalize transition-colors ${
              tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
            {tab === t && (
              <span className="absolute -bottom-[8px] left-2.5 right-2.5 h-[2px] rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-12">
        {/* Thread list */}
        <div className="col-span-12 flex min-h-0 flex-col overflow-hidden py-1 md:col-span-4 md:border-r md:border-border/50">
          {emails.slice(0, 4).map((m, i) => {
            const unread = m.chips.includes("Draft ready");
            const active = i === selected;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`relative flex items-start gap-2.5 px-3 py-1.5 text-left transition-colors ${
                  active ? "bg-primary/[0.08]" : "hover:bg-foreground/[0.035]"
                }`}
              >
                {active && (
                  <span className="absolute bottom-1.5 left-0 top-1.5 w-[2.5px] rounded-r-full bg-primary" />
                )}
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.06] text-[10px] font-semibold text-foreground/85">
                  {initials(m.sender)}
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`truncate text-[12.5px] ${
                        unread
                          ? "font-semibold text-foreground"
                          : "font-semibold text-foreground/90"
                      }`}
                    >
                      {m.sender}
                    </div>
                    <div
                      className={`shrink-0 text-[10.5px] tabular-nums ${
                        unread ? "font-medium text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                  <div
                    className={`mt-px truncate text-[11.5px] ${
                      unread ? "font-medium text-foreground/85" : "font-medium text-foreground/70"
                    }`}
                  >
                    {m.subject}
                  </div>
                  <div className="truncate text-[10.5px] font-normal text-muted-foreground/80">
                    {m.preview}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reading pane */}
        <div className="col-span-12 flex min-w-0 flex-col gap-2.5 overflow-hidden p-3.5 md:col-span-8">
          <div className="flex items-start justify-between gap-3 border-b border-border/40 pb-2">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-semibold tracking-tight">{e.subject}</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border bg-foreground/[0.06] text-[9.5px] font-semibold text-foreground/85">
                  {initials(e.sender)}
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="truncate text-[11.5px] text-foreground/90">
                    <span className="font-semibold">{e.sender}</span>
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      &lt;{e.sender.toLowerCase().split(" ").join(".")}@harwicksterne.com&gt;
                    </span>
                  </div>
                  <div className="mt-px text-[10px] text-muted-foreground">
                    To: John Harwick · {e.time}
                  </div>
                </div>
              </div>
            </div>
            {e.chips.length > 0 && (
              <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-primary/15 px-2 text-[10px] font-medium text-primary">
                {e.chips[0]}
              </span>
            )}
          </div>

          <p className="line-clamp-2 flex-1 overflow-hidden text-[12px] leading-snug text-foreground/85">
            {e.preview}
          </p>

          {/* Drafted reply — elevated suggestion card */}
          <div className="origin-raised flex shrink-0 flex-col px-3 py-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                <SyraMark size={12} flat /> Drafted by Syra
              </div>
              <div className="text-[9.5px] text-muted-foreground">to {e.sender}</div>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-snug text-foreground/85">
              Hi {e.sender.split(" ")[0]} — confirming the revised allocation. Updated IPS attached
              for sign-off; happy to take 15 min Thursday 2:00pm ET.
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              <PillButton variant="brand" size="xs">
                Send draft
              </PillButton>
              <PillButton variant="secondary" size="xs">
                Edit
              </PillButton>
              <button className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-muted-foreground transition-colors hover:text-foreground">
                <Paperclip className="h-3 w-3" /> IPS_v3.pdf
              </button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function IconBtn({ icon: Icon, label }: { icon: typeof Reply; label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
    </button>
  );
}
