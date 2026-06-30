import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  headerClassName?: string;
};

export function DataTable<T>({
  rows,
  columns,
  getRowKey,
  getRowLabel,
  selectedRows,
  onSelectRow,
  onSelectAll,
  empty,
  className,
  rowClassName,
}: {
  rows: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (row: T) => string | number;
  getRowLabel?: (row: T) => string;
  selectedRows?: Set<string | number>;
  onSelectRow?: (row: T) => void;
  onSelectAll?: () => void;
  empty?: ReactNode;
  className?: string;
  rowClassName?: (row: T) => string | undefined;
}) {
  const selectable = Boolean(selectedRows && onSelectRow);
  const allSelected =
    selectable && rows.length > 0 && rows.every((row) => selectedRows?.has(getRowKey(row)));
  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left">
        <thead className="border-b border-border/60 bg-table-header text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <tr>
            {selectable && (
              <th className="h-10 w-8 py-2 pl-4 pr-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  aria-label="Select all rows"
                  className="h-3.5 w-3.5 cursor-pointer accent-primary"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn(
                  "h-10 px-2 py-2 font-medium",
                  column.align === "right" && "text-right",
                  column.align === "center" && "text-center",
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={colSpan}
                className="px-4 py-12 text-center text-[13px] text-muted-foreground"
              >
                {empty ?? "No results."}
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              const rowKey = getRowKey(row);
              const selected = selectedRows?.has(rowKey) ?? false;
              return (
                <tr
                  key={rowKey}
                  data-state={selected ? "selected" : undefined}
                  className={cn(
                    "h-14 border-b border-border/40 transition-colors hover:bg-table-row-hover data-[state=selected]:bg-table-row-selected",
                    rowClassName?.(row),
                  )}
                >
                  {selectable && (
                    <td className="py-2.5 pl-4 pr-2">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onSelectRow?.(row)}
                        aria-label={`Select ${getRowLabel?.(row) ?? `row ${rowKey}`}`}
                        className="h-3.5 w-3.5 cursor-pointer accent-primary"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "px-2 py-2.5",
                        column.align === "right" && "text-right",
                        column.align === "center" && "text-center",
                        column.className,
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
