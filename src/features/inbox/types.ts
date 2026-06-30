import type { LucideIcon } from "lucide-react";

export type InboxFolder = {
  name: string;
  icon: LucideIcon;
  count?: number;
};

export type InboxThread = {
  id: number;
  from: string;
  company: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  tag: string;
};

export type InboxSearch = {
  folder: string;
  thread: number;
  q: string;
};
