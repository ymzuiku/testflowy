import { PoolClient } from "pg";
import { PgColumn } from "../zodPg";
import { pgErrs } from "./pgErrs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function columnsUnique(pg: PoolClient, table: string, data: any, columns: PgColumn[]) {
  for (const col of columns) {
    if (!col.unique || !col.name) {
      return;
    }

    const res = await pg.query(`select id from "${table}" where j@>$1 limit 1`, [{ [col.name]: data[col.name] }]);
    if (res.rowCount) {
      throw Error(pgErrs["A column is unique"]);
    }
  }
}
