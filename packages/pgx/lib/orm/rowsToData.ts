import { rowToCell } from "./rowToCell";

export function rowsToData<T>(rows: unknown[], returnColumns?: unknown[], sensitive?: unknown[]): T[] {
  const list: T[] = [];
  for (const row of rows) {
    list.push(rowToCell(row, returnColumns, sensitive));
  }
  return list;
}
