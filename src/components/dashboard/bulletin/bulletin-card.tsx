import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/panel";
import { bulletin } from "@/components/dashboard/data";

/**
 * BulletinCard — Apple-News-style market bulletin with category chips, a hero
 * story and thumbnail rows. Wrapped in the Origin <Panel> (BULLETIN ›).
 */
export function BulletinCard() {
  const tabs = Object.keys(bulletin);
  const [tab, setTab] = useState(tabs[0]);
  const items = bulletin[tab];
  const hero = items[0];
  const rest = items.slice(1, 3);
  const [dateLabel, setDateLabel] = useState<string>("");
  useEffect(() => {
    setDateLabel(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <Panel
      label="Bulletin"
      bodyClassName="gap-3"
      action={
        <span
          className="text-[10.5px] text-muted-foreground/70 tabular-nums"
          suppressHydrationWarning
        >
          {dateLabel || "—"}
        </span>
      }
    >
      <div className="-mx-0.5 flex shrink-0 items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-7 whitespace-nowrap rounded-full px-3 text-[11px] font-medium transition-colors ${
              tab === t
                ? "bg-foreground text-background"
                : "border border-border bg-foreground/[0.05] text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Hero story */}
      <a className="group origin-raised relative block shrink-0 overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={hero.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${hero.tint}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/75">
              {hero.source} <span className="font-normal text-white/45">· {hero.ago}</span>
            </div>
            <div className="mt-1 line-clamp-2 text-[13.5px] font-semibold leading-snug text-white">
              {hero.headline}
            </div>
          </div>
        </div>
      </a>

      {/* List rows with thumbnails */}
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {rest.map((h, i) => (
          <a
            key={i}
            className="group -mx-1 flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:bg-foreground/[0.04]"
          >
            <div className="origin-raised relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${h.tint}`} />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                {h.source} <span className="font-normal text-muted-foreground/45">· {h.ago}</span>
              </div>
              <div className="mt-0.5 line-clamp-2 text-[12.5px] font-medium leading-snug text-foreground/95">
                {h.headline}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Panel>
  );
}
