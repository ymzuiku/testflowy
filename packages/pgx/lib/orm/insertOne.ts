import { PoolClient } from "pg";
import { pgx } from "..";
import { safeSql } from "../safeSql";
import { PgBaseModel } from "../zodPg";
import { columnsCheck } from "./columnsCheck";
import { columnsUnique } from "./columnsUnique";
import { pgErrs } from "./pgErrs";
import { PgInsertOne } from "./pgInterface";
import { rowToCell } from "./rowToCell";

export async function insertOne<T>({
  tx,
  data,
  returnColumns,
  table,
  columns,
  sensitive,
}: PgInsertOne<T>): Promise<T & PgBaseModel> {
  const pg = (tx as PoolClient) || pgx();
  if (typeof data !== "object") {
    throw Error(pgErrs["Data need a object"]);
  }
  if ((data as unknown as Record<string, unknown>).id) {
    delete (data as unknown as Record<string, unknown>).id;
  }
  table = safeSql(table);
  if (columns) {
    columnsCheck(data, columns);
    await columnsUnique(pg, table, data, columns);
  }
  const now = new Date();
  (data as Record<string, unknown>)["createAt"] = now;
  (data as Record<string, unknown>)["updateAt"] = now;
  const res = await pg.query<{ id: string; j: T & PgBaseModel }>(
    `insert into ${table} (j) values ($1) returning (id)::text, j`,
    [data],
  );

  return rowToCell(res.rows[0], returnColumns, sensitive);
}
