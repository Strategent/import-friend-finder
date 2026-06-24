import { cn } from "@/lib/utils";
import syraLogo from "@/assets/syra-mark.png";

/**
 * SyraMark — the canonical brand mark for Syra.
 * The blue glass "S" logo on a dark gray circular backdrop.
 */
export function SyraMark({
  size = 16,
  className,
  flat = false,
}: {
  size?: number;
  className?: string;
  flat?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-grid place-items-center select-none rounded-full", className)}
      style={{
        height: size,
        width: size,
        background: "var(--syra-mark-bg)",
        boxShadow: flat ? undefined : "var(--syra-mark-shadow)",
      }}
    >
      <img
        src={syraLogo}
        alt=""
        style={{
          width: Math.round(size * 0.62),
          height: Math.round(size * 0.62),
          objectFit: "contain",
        }}
      />
    </span>
  );
}
