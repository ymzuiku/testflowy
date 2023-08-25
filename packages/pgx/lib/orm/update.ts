import { PoolClient } from "pg";
import { pgx } from "..";
import { PgBaseModel } from "../zodPg";
import { columnsCheck } from "./columnsCheck";
import { columnsUnique } from "./columnsUnique";
import { pgErrs } from "./pgErrs";
import { PgUpdateMany, PgUpdateOne } from "./pgInterface";
import { rowToCell } from "./rowToCell";

export async function updateMany<T>({
  data,
  table,
  filter,
  readSoftDelete,
  columns,
  tx,
}: PgUpdateMany<T>): Promise<number> {
  const pg = (tx as PoolClient) || pgx();
  if (columns) {
    columnsCheck(data, columns, true);
    await columnsUnique(pg, table, data, columns);
  }
  let andDel;
  if (readSoftDelete) {
    andDel = "";
  } else {
    andDel = "and del = '0'";
  }
  if (!data) {
    throw Error(pgErrs["Data need a object"]);
  }
  if (!filter || !filter.eq) {
    throw Error(pgErrs["Update need a id or filter"]);
  }
  (data as Record<string, unknown>).updateAt = new Date();
  const res = await pg.query(`update "${table}" set j=j||$1 where j@>$2 ${andDel}`, [data, filter.eq]);
  if (!res.rowCount) {
    throw Error(pgErrs["Update not found data"]);
  }

  return res.rowCount;
}

export async function updateOne<T, D>({
  id,
  data,
  table,
  filter,
  columns,
  readSoftDelete,
  returnColumns,
  sensitive,
  tx,
}: PgUpdateOne<Partial<T>>): Promise<Omit<D, "password"> & PgBaseModel> {
  const pg = (tx as PoolClient) || pgx();
  if (columns) {
    columnsCheck(data, columns, true);
    await columnsUnique(pg, table, data, columns);
  }
  let andDel;
  if (readSoftDelete) {
    andDel = "";
  } else {
    andDel = "and del = '0'";
  }

  if (!data) {
    throw Error(pgErrs["Data need a object"]);
  }
  (data as Record<string, unknown>).updateAt = new Date();

  if (id) {
    const res = await pg.query(`update "${table}" set j=j||$1 where id=$2 ${andDel} returning (id)::text, j`, [
      data,
      id,
    ]);
    if (res.rowCount === 0) {
      throw new Error("No update any");
    }

    return rowToCell(res.rows[0], returnColumns, sensitive);
  }

  if (filter && filter.eq) {
    const res = await pg.query(`update "${table}" set j=j||$1 where j@>$2 ${andDel} returning (id)::text, j`, [
      data,
      filter.eq,
    ]);

    if (res.rowCount === 0) {
      throw new Error("No update any");
    }
    return rowToCell(res.rows[0], returnColumns, sensitive);
  }

  throw Error(pgErrs["Update need a id or filter"]);
}
