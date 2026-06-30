import { Inbox as InboxIcon, Star, Flag, FileEdit, Send, Archive, Trash2 } from "lucide-react";
import type { InboxFolder, InboxThread } from "./types";

export const folders: InboxFolder[] = [
  { name: "Inbox", icon: InboxIcon, count: 12 },
  { name: "VIPs", icon: Star, count: 3 },
  { name: "Flagged", icon: Flag, count: 2 },
  { name: "Drafts", icon: FileEdit, count: 4 },
  { name: "Sent", icon: Send },
  { name: "Archive", icon: Archive },
  { name: "Trash", icon: Trash2 },
];

export const threads: InboxThread[] = [
  {
    id: 1,
    from: "Sarah Lin",
    company: "Acme Corp",
    subject: "Re: Proposal v2 â€” minor tweaks",
    preview: "Looks great overall. Two small notes on pricing tier 2 and timing for kickoffâ€¦",
    time: "2m",
    unread: true,
    tag: "Hot lead",
  },
  {
    id: 2,
    from: "Marcus Reed",
    company: "Northwind",
    subject: "Onboarding questions",
    preview: "Hey team, before we sign, can you confirm SOC2 status and data residencyâ€¦",
    time: "23m",
    unread: true,
    tag: "Sales",
  },
  {
    id: 3,
    from: "Stripe",
    company: "Payouts",
    subject: "Payout $12,840 scheduled",
    preview: "Your payout of $12,840.00 will arrive on May 30â€¦",
    time: "1h",
    unread: false,
    tag: "Billing",
  },
  {
    id: 4,
    from: "Jenna Park",
    company: "Helios",
    subject: "Renewal in 14 days",
    preview: "Quick heads up â€” annual renewal coming up. Happy with the value so farâ€¦",
    time: "3h",
    unread: false,
    tag: "Renewal",
  },
  {
    id: 5,
    from: "Linear",
    company: "Notifications",
    subject: "3 issues assigned to Syra",
    preview: "OPS-128, OPS-129, OPS-131 are now in Syra's queueâ€¦",
    time: "6h",
    unread: false,
    tag: "System",
  },
  {
    id: 6,
    from: "Olivia Chen",
    company: "Bridgewater",
    subject: "Quick intro to our ops lead",
    preview: "Wanted to connect you with Priya who runs revenue ops at Bridgewaterâ€¦",
    time: "Yesterday",
    unread: false,
    tag: "Intro",
  },
  {
    id: 7,
    from: "DocuSign",
    company: "Agreements",
    subject: "Signed: MSA â€” Northwind",
    preview: "All parties have completed the document. View completed envelopeâ€¦",
    time: "Yesterday",
    unread: false,
    tag: "Legal",
  },
];

export const INBOX_FOLDER_NAMES = folders.map((folder) => folder.name) as [string, ...string[]];
export const INBOX_DEFAULT_SEARCH = {
  folder: "Inbox",
  thread: threads[0].id,
  q: "",
};
