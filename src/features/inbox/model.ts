import type { InboxThread } from "./types";

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function filterThreads(threads: InboxThread[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return threads;

  return threads.filter((thread) =>
    [thread.from, thread.company, thread.subject, thread.preview, thread.tag].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}
