import { useEffect, useState } from "react";
import { Panel } from "@/components/ui/panel";

/**
 * MarketWatchCard — sleek Apple-native market widget. A few headline indices
 * on top, a short watchlist below as hairline rows. Values tick subtly so it
 * feels live. Exported as BulletinCard to preserve the existing import.
 */

type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  pct: number;
};

const indices: Quote[] = [
  { symbol: "SPX", name: "S&P 500", price: 5482.13, change: 18.42, pct: 0.34 },
  { symbol: "NDX", name: "Nasdaq 100", price: 19842.06, change: 96.21, pct: 0.49 },
  { symbol: "US10Y", name: "10Y Yield", price: 4.218, change: -0.024, pct: -0.57 },
];

const watchlist: Quote[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 232.18, change: 1.42, pct: 0.62 },
  { symbol: "MSFT", name: "Microsoft", price: 438.91, change: -0.86, pct: -0.2 },
  { symbol: "BRK.B", name: "Berkshire", price: 462.05, change: 2.11, pct: 0.46 },
  { symbol: "TLT", name: "20Y Treasury", price: 92.74, change: -0.38, pct: -0.41 },
];

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function useTicker(seed: Quote[], intervalMs: number) {
  const [data, setData] = useState(seed);
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((q) => {
          const drift = (Math.random() - 0.5) * 0.0008 * q.price;
          const decimals = q.price < 10 ? 3 : 2;
          const price = +(q.price + drift).toFixed(decimals);
          const change = +(q.change + drift).toFixed(decimals);
          const pct = +((change / Math.max(price - change, 0.0001)) * 100).toFixed(2);
          return { ...q, price, change, pct };
        }),
      );
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return data;
}

export function BulletinCard() {
  const idx = useTicker(indices, 5000);
  const list = useTicker(watchlist, 3500);
  const [clock, setClock] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel
      label="Markets"
      bodyClassName="gap-4"
      action={
        <span className="inline-flex items-center gap-1.5 text-[10.5px] tabular-nums text-muted-foreground/80">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span suppressHydrationWarning>{clock || "—"} ET</span>
        </span>
      }
    >
      {/* Headline indices */}
      <div className="grid shrink-0 grid-cols-3 gap-3">
        {idx.map((q) => {
          const up = q.change >= 0;
          return (
            <div key={q.symbol} className="min-w-0">
              <div className="truncate text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
                {q.name}
              </div>
              <div className="mt-1 text-[15px] font-semibold leading-none tracking-tight tabular-nums text-foreground">
                {q.symbol === "US10Y" ? `${fmt(q.price, 3)}%` : fmt(q.price)}
              </div>
              <div
                className={`mt-1 text-[10.5px] font-medium tabular-nums ${
                  up ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {up ? "▲" : "▼"} {fmt(Math.abs(q.pct), 2)}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-px shrink-0 bg-border/60" />

      {/* Watchlist — hairline rows */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-2 flex shrink-0 items-center justify-between">
          <div className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            Watchlist
          </div>
          <span className="text-[10px] tabular-nums text-muted-foreground/70">
            {list.length} tracked
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          {list.map((q, i) => {
            const up = q.change >= 0;
            return (
              <button
                key={q.symbol}
                className={`group flex items-center gap-3 py-2 text-left transition-colors hover:bg-foreground/[0.03] ${
                  i === 0 ? "" : "border-t border-border/50"
                }`}
              >
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate text-[12.5px] font-semibold tracking-tight text-foreground/95">
                    {q.symbol}
                  </div>
                  <div className="truncate text-[10.5px] text-muted-foreground/80">{q.name}</div>
                </div>
                <div className="text-right leading-tight">
                  <div className="text-[12.5px] font-semibold tabular-nums text-foreground/95">
                    {fmt(q.price)}
                  </div>
                  <div
                    className={`text-[10.5px] font-medium tabular-nums ${
                      up ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {up ? "+" : ""}
                    {fmt(q.change)} · {up ? "+" : ""}
                    {fmt(q.pct, 2)}%
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}