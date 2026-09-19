import Table from 'cli-table3';
import pc from 'picocolors';

export interface TableColumn {
  name: string;
  width?: number;
}

export function renderTable(
  columns: string[],
  rows: string[][],
  options?: { colWidths?: number[] }
): string {
  const table = new Table({
    head: columns.map((c) => pc.cyan(pc.bold(c))),
    colWidths: options?.colWidths,
    style: {
      head: [],
      border: ['gray'],
    },
    wordWrap: true,
  });

  rows.forEach((row) => table.push(row));

  return table.toString();
}

export function printTable(
  columns: string[],
  rows: string[][],
  options?: { colWidths?: number[] }
): void {
  console.log(renderTable(columns, rows, options));
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + '…';
}