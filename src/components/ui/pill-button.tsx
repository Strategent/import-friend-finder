import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * PillButton — Origin's CTA pills.
 *  - primary:   white pill, dark text (e.g. "Read full briefing", "Add accounts")
 *  - secondary: elevated dark/glass pill (e.g. "Review drafts")
 *  - brand:     Strategent gradient fill (kept for in-card actions like "Send")
 */
const pillVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md font-medium tracking-tight whitespace-nowrap transition-all hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-white/90",
        secondary:
          "border border-white/12 bg-white/[0.08] text-foreground/90 backdrop-blur-sm hover:bg-white/[0.13]",
        brand: "text-white",
      },
      size: {
        sm: "h-8 px-4 text-[12.5px]",
        md: "h-9 px-5 text-[13px]",
        xs: "h-7 px-3 text-[11.5px]",
      },
    },
    defaultVariants: { variant: "primary", size: "sm" },
  },
);

export interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof pillVariants> {}

export function PillButton({ className, variant, size, style, ...props }: PillButtonProps) {
  const brandStyle =
    variant === "brand"
      ? {
          background: "var(--gradient-primary)",
          boxShadow: "0 4px 14px -6px color-mix(in oklab, var(--primary) 60%, transparent)",
        }
      : undefined;
  return (
    <button
      className={cn(pillVariants({ variant, size }), className)}
      style={{ ...brandStyle, ...style }}
      {...props}
    />
  );
}
