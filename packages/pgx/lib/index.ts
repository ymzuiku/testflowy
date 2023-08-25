import { Pool, PoolClient } from "pg";
import { config } from "up-dir-env";
export * from "./createTable";
export * from "./initTables";
export * from "./orm";
export * from "./safeSql";
export type { PoolClient, Pool };

const cache = {
  pg: null as never as Pool,
};

export const pgx = () => {
  if (!cache.pg) {
    config();
    cache.pg = postgresxInit(process.env["pg_url"]!);
  }
  return cache.pg;
};

export function postgresxInit(url: string) {
  return new Pool({ connectionString: url });
}

export async function pgxTx<T>(event: (tx: PoolClient) => Promise<T>) {
  const tx = await pgx().connect();
  try {
    tx.query("BEGIN");
    const res = await event(tx);
    await tx.query("COMMIT");
    return res;
  } catch (e) {
    await tx.query("ROLLBACK");
    throw e;
  } finally {
    tx.release();
  }
}
