import { Calendar, FileText, Inbox } from "lucide-react";

export type SyraMessage = { role: "syra" | "user"; text: string };

export const quickActions = [
  { icon: FileText, label: "Draft Email" },
  { icon: Inbox, label: "Triage Inbox" },
  { icon: Calendar, label: "Schedule Meeting" },
];

export const models = [
  { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5", provider: "Anthropic" },
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic" },
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI" },
  { id: "gpt-5-mini", name: "GPT-5 Mini", provider: "OpenAI" },
];

export const seedMessages: SyraMessage[] = [
  {
    role: "syra",
    text: "Hey John - three drafts are waiting in the inbox, and the Hartley Trust review is your top priority today.",
  },
];
