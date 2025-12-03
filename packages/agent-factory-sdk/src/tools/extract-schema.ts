import type { SimpleSchema, Table, Column } from '@qwery/domain/entities';

export interface ExtractSchemaOptions {
  dbPath: string;
  viewName?: string;
}

export const extractSchema = async (
  opts: ExtractSchemaOptions,
): Promise<SimpleSchema> => {
  const { DuckDBInstance } = await import('@duckdb/node-api');
  const instance = await DuckDBInstance.create(opts.dbPath);
  const conn = await instance.connect();

  try {
    // If no viewName specified, get all views
    if (!opts.viewName) {
      const viewsReader = await conn.runAndReadAll(`
        SELECT view_name 
        FROM information_schema.views 
        WHERE view_schema = 'main'
      `);
      await viewsReader.readAll();
      const views = viewsReader.getRowObjectsJS() as Array<{
        view_name: string;
      }>;

      const tables: Table[] = [];
      for (const view of views) {
        const viewName = view.view_name.replace(/"/g, '""');
        const schemaReader = await conn.runAndReadAll(`DESCRIBE "${viewName}"`);
        await schemaReader.readAll();
        const schemaRows = schemaReader.getRowObjectsJS() as Array<{
          column_name: string;
          column_type: string;
        }>;

        const columns: Column[] = schemaRows.map((row) => ({
          columnName: row.column_name,
          columnType: row.column_type,
        }));

        tables.push({
          tableName: view.view_name,
          columns,
        });
      }

      return {
        databaseName: 'google_sheet',
        schemaName: 'google_sheet',
        tables,
      };
    }

    // Get schema information using DESCRIBE on the specific view
    const viewName = opts.viewName.replace(/"/g, '""');
    const schemaReader = await conn.runAndReadAll(`DESCRIBE "${viewName}"`);
    await schemaReader.readAll();
    const schemaRows = schemaReader.getRowObjectsJS() as Array<{
      column_name: string;
      column_type: string;
    }>;

    // Convert to SimpleSchema format
    const columns: Column[] = schemaRows.map((row) => ({
      columnName: row.column_name,
      columnType: row.column_type,
    }));

    const table: Table = {
      tableName: opts.viewName,
      columns,
    };

    const schema: SimpleSchema = {
      databaseName: 'google_sheet',
      schemaName: 'google_sheet',
      tables: [table],
    };

    return schema;
  } finally {
    conn.closeSync();
    instance.closeSync();
  }
};
