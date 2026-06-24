import { FilterBar, SearchField } from "@/components/app";
import { stageOptions } from "../model";
import type { StageFilter } from "../types";

export function CrmToolbar({
  query,
  stage,
  selectedCount,
  onQueryChange,
  onStageChange,
}: {
  query: string;
  stage: StageFilter;
  selectedCount: number;
  onQueryChange: (query: string) => void;
  onStageChange: (stage: StageFilter) => void;
}) {
  return (
    <>
      <SearchField
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onClear={() => onQueryChange("")}
        placeholder="Search clients, companies, email..."
        containerClassName="max-w-md"
      />
      <FilterBar
        ariaLabel="Client stage"
        value={stage}
        options={stageOptions}
        onValueChange={onStageChange}
      />
      {selectedCount > 0 && (
        <div className="text-[11px] text-muted-foreground">{selectedCount} selected</div>
      )}
    </>
  );
}
