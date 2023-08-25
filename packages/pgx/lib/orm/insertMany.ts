import { PoolClient } from "pg";
import { pgx } from "..";
import { safeSql } from "../safeSql";
import { PgBaseModel } from "../zodPg";
import { columnsCheck } from "./columnsCheck";
import { columnsUnique } from "./columnsUnique";
import { pgErrs } from "./pgErrs";
import { PgInsertMany } from "./pgInterface";
import { rowsToData } from "./rowsToData";

export async function insertMany<T>({
  tx,
  datas,
  returnColumns,
  table,
  columns,
  sensitive,
}: PgInsertMany<T>): Promise<{ count: number; data: (T & PgBaseModel)[] }> {
  if (!datas.length) {
    throw new Error("insert many no has datas");
  }
  const pg = (tx as PoolClient) || pgx();
  if (!Array.isArray(datas)) {
    throw new Error(pgErrs["Data need a object"]);
  }
  table = safeSql(table);

  for (const data of datas) {
    const now = new Date();
    (data as Record<string, unknown>)["createAt"] = now;
    (data as Record<string, unknown>)["updateAt"] = now;
    if (columns) {
      columnsCheck(data, columns);
      await columnsUnique(pg, table, data, columns);
    }
  }
  const keys = datas.map((_v, i) => `($${i + 1})`).join(",");

  const res = await pg
    .query<{ id: string; j: T & PgBaseModel }>(`insert into ${table} (j) values ${keys} returning (id)::text, j`, [
      ...datas,
    ])
    .catch((err) => {
      console.log(`insert into ${table} (j) values ${keys} returning (id)::text, j`);

      throw err;
    });

  return {
    count: res.rowCount,
    data: rowsToData(res.rows, returnColumns, sensitive),
  };
}
