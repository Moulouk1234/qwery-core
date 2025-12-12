'use client';

import * as React from 'react';
import { Database, Table2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SchemaColumn {
  columnName: string;
  columnType: string;
}

export interface SchemaTable {
  tableName: string;
  columns: SchemaColumn[];
}

export interface SchemaData {
  databaseName: string;
  schemaName: string;
  tables: SchemaTable[];
}

export interface SchemaVisualizerProps {
  schema: SchemaData;
  tableName?: string;
  className?: string;
}

/**
 * Specialized component for visualizing database schema information
 */
export function SchemaVisualizer({
  schema,
  tableName,
  className,
}: SchemaVisualizerProps) {
  // Use the passed tableName to filter, or show all tables if not provided
  const tables = tableName
    ? schema.tables.filter((t) => t.tableName === tableName)
    : schema.tables;

  if (tables.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-4', className)}>


      {tables.map((table) => (
        <div
          key={table.tableName}
          className="overflow-hidden rounded-md border bg-card"
        >
          {/* Table Header */}
          <div className="bg-muted/30 flex items-center justify-between border-b px-3 py-2">
            <div className="flex items-center gap-2">
              <Table2 className="text-primary/70 h-4 w-4" />
              <h3 className="text-sm font-medium">{table.tableName}</h3>
            </div>
            <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-mono text-[10px]">
              {table.columns.length} columns
            </span>
          </div>

          {/* Columns Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-muted/5 border-b text-xs text-muted-foreground/70 uppercase tracking-wider">
                  <th className="px-3 py-2 font-medium w-1/3">Column</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {table.columns.map((col) => (
                  <tr
                    key={col.columnName}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="text-foreground/90 px-3 py-1.5 font-medium">
                      {col.columnName}
                    </td>
                    <td className="text-muted-foreground px-3 py-1.5 font-mono text-xs">
                      {col.columnType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
