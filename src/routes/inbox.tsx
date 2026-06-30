import { createFileRoute } from "@tanstack/react-router";
import { InboxScreen } from "@/features/inbox";
import { INBOX_DEFAULT_SEARCH, INBOX_FOLDER_NAMES } from "@/features/inbox/fixtures";
import type { InboxSearch } from "@/features/inbox/types";
import { readEnumParam, readIntegerParam, readStringParam } from "@/lib/url-search-params";

export const Route = createFileRoute("/inbox")({
  component: InboxRoute,
  validateSearch: (search): InboxSearch => ({
    folder: readEnumParam(search.folder, INBOX_FOLDER_NAMES, INBOX_DEFAULT_SEARCH.folder),
    thread: readIntegerParam(search.thread, INBOX_DEFAULT_SEARCH.thread),
    q: readStringParam(search.q, INBOX_DEFAULT_SEARCH.q),
  }),
  head: () => ({ meta: [{ title: "Inbox — Harwick & Sterne" }] }),
});

function InboxRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (next: Partial<InboxSearch>) => {
    void navigate({ search: (previous) => ({ ...previous, ...next }) });
  };

  return <InboxScreen search={search} onSearchChange={updateSearch} />;
}
