import { cn } from "@/lib/utils";

/**
 * SectionLabel — the signature Origin card header: ALL-CAPS, ~11px, mono,
 * letter-spaced, muted gray, followed by a small › chevron.
 *
 * e.g. <SectionLabel label="INBOX" />  →  INBOX ›
 */
export function SectionLabel({
  label,
  chevron = true,
  className,
}: {
  label: string;
  chevron?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("section-label", className)}>
      {label}
      {chevron && <span className="chev">›</span>}
    </span>
  );
}
