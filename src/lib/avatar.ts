/**
 * Deterministic profile-picture URL for a contact name.
 * Same name → same image, across team cards, inbox, and anywhere else.
 */
export function avatarUrl(name: string, size = 96): string {
  const seed = name.trim().toLowerCase().replace(/\s+/g, "-");
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}