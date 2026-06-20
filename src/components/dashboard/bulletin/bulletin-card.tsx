import { useEffect, useMemo, useRef, useState } from "react";
import { Panel } from "@/components/ui/panel";

/**
 * MarketsCard — Apple Stocks–style list. Symbol + name on the left,
 * mini sparkline in the middle, price + green/red pill on the right.
 */

type Ticker = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  decimals?: number;
};

const SEED_TICKERS: Ticker[] = [
  { symbol: "^GSPC", name: "S&P 500", price: 5482.13, change: 18.42 },
  { symbol: "^DJI", name: "Dow Jones", price: 39150.33, change: -42.77 },
  { symbol: "^IXIC", name: "NASDAQ", price: 17689.36, change: 87.5 },
  { symbol: "AAPL", name: "Apple Inc.", price: 214.29, change: 1.42 },
  { symbol: "BTC-USD", name: "Bitcoin USD", price: 64812.4, change: -512.8 },
];

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function buildSeries(base: number, points = 36, seed = 7) {
  const out: number[] = [];
  let v = base * 0.992;
  let s = seed;
  for (let i = 0; i < points; i++) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280 - 0.5;
    v += rnd * base * 0.002 + (base - v) * 0.02;
    out.push(v);
  }
  out[out.length - 1] = base;
  return out;
}

function MiniSparkline({ data, up }: { data: number[]; up: boolean }) {
  const { path, w, h } = useMemo(() => {
    const w = 100;
    const h = 32;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = w / Math.max(data.length - 1, 1);
    const path = data
      .map((d, i) => {
        const x = i * step;
        const y = h - ((d - min) / range) * (h - 4) - 2;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
    return { path, w, h };
  }, [data]);
  const stroke = up ? "rgb(48,209,88)" : "rgb(255,69,58)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full">
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BulletinCard() {
  const [tickers, setTickers] = useState<Ticker[]>(SEED_TICKERS);
  const initialSeries = useMemo(() => {
    const m: Record<string, number[]> = {};
    SEED_TICKERS.forEach((t, i) => {
      m[t.symbol] = buildSeries(t.price, 36, 7 + i * 13);
    });
    return m;
  }, []);
  const [series, setSeries] = useState<Record<string, number[]>>(initialSeries);
  const seedRef = useRef(91);

  const [clock, setClock] = useState("");
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

  useEffect(() => {
    const id = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const decimals = t.decimals ?? 2;
          seedRef.current = (seedRef.current * 9301 + 49297) % 233280;
          const rnd = seedRef.current / 233280 - 0.5;
          const drift = rnd * 0.0015 * t.price;
          return {
            ...t,
            price: +(t.price + drift).toFixed(decimals),
            change: +(t.change + drift).toFixed(decimals),
          };
        }),
      );
      setSeries((prev) => {
        const next: Record<string, number[]> = {};
        for (const k of Object.keys(prev)) {
          const arr = prev[k];
          const last = arr[arr.length - 1];
          seedRef.current = (seedRef.current * 9301 + 49297) % 233280;
          const rnd = seedRef.current / 233280 - 0.5;
          const nv = +(last + rnd * last * 0.002).toFixed(2);
          next[k] = [...arr.slice(1), nv];
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <Panel
      label="Markets"
      bodyClassName="gap-0"
      action={
        <span className="inline-flex items-center gap-1.5 text-[10.5px] tabular-nums text-muted-foreground/80">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-foreground/30" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-foreground/70" />
          </span>
          <span suppressHydrationWarning>{clock || "—"} ET</span>
        </span>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {tickers.map((t) => {
          const up = t.change >= 0;
          const pct = (t.change / Math.max(t.price - t.change, 0.0001)) * 100;
          const data = series[t.symbol] ?? [];
          return (
            <div
              key={t.symbol}
              className="flex items-center gap-3 border-b border-border/30 py-2.5 last:border-b-0"
            >
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[14px] font-semibold tracking-tight text-foreground">
                  {t.symbol.replace("^", "").replace("-USD", "")}
                </div>
                <div className="truncate text-[10.5px] text-muted-foreground/70">
                  {t.name}
                </div>
              </div>
              <div className="h-7 w-[88px] shrink-0">
                <MiniSparkline data={data} up={up} />
              </div>
              <div className="flex w-[72px] flex-col items-end gap-1 leading-none">
                <div className="text-[13px] font-semibold tabular-nums text-foreground">
                  {fmt(t.price, t.decimals ?? 2)}
                </div>
                <div
                  className={`rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums text-white ${
                    up ? "bg-[rgb(48,209,88)]" : "bg-[rgb(255,69,58)]"
                  }`}
                >
                  {up ? "+" : ""}
                  {fmt(pct, 2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}
