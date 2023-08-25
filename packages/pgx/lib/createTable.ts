import { pgx } from ".";
import { redisx } from "../../redisx/lib";
import { safeSql } from "./safeSql";

// 进程内的锁即可

export async function createNosqlTable(table: string): Promise<boolean> {
  table = safeSql(table);
  await pgx().query(`create table if not exists "${table}" ( like int_nosql including all )`);
  return true;
}

export async function createNosqlUUIDTable(table: string): Promise<boolean> {
  table = safeSql(table);
  await pgx().query(`create table if not exists "${table}" ( like nosql including all )`);
  return true;
}

export async function createNosqlTableKV(table: string): Promise<boolean> {
  table = safeSql(table);
  await pgx().query(`create table if not exists "${table}" ( like kv including all )`);
  return true;
}

export async function createNosqlIndex(table: string, key: string, dataType: "text" | "int64"): Promise<boolean> {
  table = safeSql(table);
  key = safeSql(key);
  dataType = safeSql(dataType) as typeof dataType;
  const index = `idx_${table}_${key}`;
  const rds = await redisx();
  if (await rds.get(index)) {
    return false;
  }
  await rds.setEx(index, 10, "1");
  await pgx().query(`create index if not exists "${index}" on "${table}" using BTREE (((j->'${key}')::${dataType}));`);
  return true;
}

export async function createNosqlTableAndIndexTimes(table: string): Promise<boolean> {
  if (await createNosqlTable(table)) {
    await createNosqlIndex(table, "createAt", "text");
    await createNosqlIndex(table, "updateAt", "text");
    return true;
  }
  return false;
}

export async function createNosqlUUIDTableAndIndexTimes(table: string): Promise<boolean> {
  if (await createNosqlUUIDTable(table)) {
    await createNosqlIndex(table, "createAt", "text");
    await createNosqlIndex(table, "updateAt", "text");
    return true;
  }
  return false;
}

interface UniqueKey {
  key: string;
  dataType: "text" | "int64";
}

export async function createNosqlUniqueIndex(table: string, unique: UniqueKey): Promise<boolean> {
  table = safeSql(table);
  const key = safeSql(unique.key);
  const dataType = safeSql(unique.dataType) as typeof unique.dataType;
  const index = `idx_unique_${table}_${key}`;
  const rds = await redisx();
  if (await rds.get(index)) {
    return false;
  }
  await rds.setEx(index, 10, "1");
  await pgx().query(
    `create UNIQUE index if not exists "${index}" on "${table}" using BTREE (((j->'${key}')::${dataType}));`,
  );
  return true;
}

export async function createNosqlDoubleUniqueIndex(
  table: string,
  unique: UniqueKey,
  unique2: UniqueKey,
): Promise<boolean> {
  table = safeSql(table);
  const keyA = safeSql(unique.key);
  const dataTypeA = safeSql(unique.dataType) as typeof unique.dataType;
  const keyB = safeSql(unique2.key);
  const dataTypeB = safeSql(unique2.dataType) as typeof unique2.dataType;
  const index = `idx_unique_${table}_${keyA}_${keyB}`;
  const rds = await redisx();
  if (await rds.get(index)) {
    return false;
  }
  await rds.setEx(index, 10, "1");
  await pgx().query(
    `create UNIQUE index if not exists "${index}" on "${table}" using BTREE (((j->'${keyA}')::${dataTypeA}), ((j->'${keyB}')::${dataTypeB}));`,
  );
  return true;
}

export async function createNosqlThreeUniqueIndex(
  table: string,
  unique: UniqueKey,
  unique2: UniqueKey,
  unique3: UniqueKey,
): Promise<boolean> {
  table = safeSql(table);
  const keyA = safeSql(unique.key);
  const dataTypeA = safeSql(unique.dataType) as typeof unique.dataType;
  const keyB = safeSql(unique2.key);
  const dataTypeB = safeSql(unique2.dataType) as typeof unique2.dataType;
  const keyC = safeSql(unique3.key);
  const dataTypeC = safeSql(unique3.dataType) as typeof unique3.dataType;
  const index = `idx_unique_${table}_${keyA}_${keyB}_${keyC}`;
  const rds = await redisx();

  if (await rds.get(index)) {
    return false;
  }
  await rds.setEx(index, 10, "1");
  await pgx().query(
    `create UNIQUE index if not exists "${index}" on "${table}" using BTREE (((j->'${keyA}')::${dataTypeA}), ((j->'${keyB}')::${dataTypeB}), ((j->'${keyC}')::${dataTypeC}));`,
  );
  return true;
}
