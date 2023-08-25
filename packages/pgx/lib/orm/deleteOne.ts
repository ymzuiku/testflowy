import { PoolClient } from "pg";
import { pgx } from "..";
import { pgErrs } from "./pgErrs";
import { PgDeleteOne } from "./pgInterface";

export async function deleteOne({ id, table, tx }: PgDeleteOne): Promise<string> {
  const pg = (tx as PoolClient) || pgx();

  if (!id) {
    throw Error(pgErrs["Update need a id or filter"]);
  }

  const res = await pg.query(`update "${table}" set del = '1' where id=$1 and del = '0'`, [id]);
  if (!res.rowCount) {
    throw Error(pgErrs["Delete not found data"]);
  }

  return id;
}
