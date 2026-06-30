import { createFileRoute } from "@tanstack/react-router";
import { CalendarScreen } from "@/features/calendar";
import { CALENDAR_DEFAULT_SEARCH, CALENDAR_MODES } from "@/features/calendar/fixtures";
import type { CalendarSearch } from "@/features/calendar/types";
import { readDateParam, readEnumParam } from "@/lib/url-search-params";

export const Route = createFileRoute("/calendar")({
  component: CalendarRoute,
  validateSearch: (search): CalendarSearch => ({
    date: readDateParam(search.date, CALENDAR_DEFAULT_SEARCH.date),
    mode: readEnumParam(search.mode, CALENDAR_MODES, CALENDAR_DEFAULT_SEARCH.mode),
  }),
  head: () => ({ meta: [{ title: "Calendar — Harwick & Sterne" }] }),
});

function CalendarRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (next: Partial<CalendarSearch>) => {
    void navigate({ search: (previous) => ({ ...previous, ...next }) });
  };

  return <CalendarScreen search={search} onSearchChange={updateSearch} />;
}
