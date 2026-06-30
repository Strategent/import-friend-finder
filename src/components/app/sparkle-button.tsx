import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SparkleButton — the indigo ✦ AI-accent button pinned to each card's
 * top-right. 32px rounded-square with the sparkle accent color.
 */
export function SparkleButton({
  className,
  label = "Ask Syra",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "group grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all hover:scale-[1.05] active:scale-95",
        className,
      )}
      style={{
        background: "var(--sparkle-soft)",
        borderColor: "var(--sparkle-border)",
      }}
      {...props}
    >
      <Sparkle
        className="h-3.5 w-3.5 transition-opacity"
        strokeWidth={1.75}
        style={{ color: "var(--sparkle)" }}
        fill="currentColor"
      />
    </button>
  );
}
