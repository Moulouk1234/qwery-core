import { DataGrid } from '../data-grid';
import { SheetIcon } from 'lucide-react';

export interface ViewSheetData {
  sheetName: string;
  totalRows: number;
  displayedRows: number;
  columns: string[];
  rows: Array<Record<string, unknown>>;
  message: string;
}

interface ViewSheetVisualizerProps {
  data: ViewSheetData;
}

export function ViewSheetVisualizer({ data }: ViewSheetVisualizerProps) {
  const { sheetName, totalRows, displayedRows, columns, rows } = data;
  const isPartial = displayedRows < totalRows;

  return (
    <div className="min-w-0 space-y-3 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="flex size-9 items-center justify-center rounded-lg border-2 border-foreground/10 shrink-0">
            <SheetIcon className="size-4.5 text-foreground" />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <h3 className="text-base font-semibold text-foreground truncate">
              {sheetName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {isPartial
                ? `Showing ${displayedRows.toLocaleString()} of ${totalRows.toLocaleString()} rows`
                : `${totalRows.toLocaleString()} row${totalRows !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      {/* Data Grid */}
      <div className="rounded-lg border border-border/60 overflow-hidden shadow-sm">
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
}

