import { pgx } from ".";

export async function initeTables() {
  // 设置慢查询和事务级别
  // await pgx().query(`
  // set statement_timeout = 10000;
  // set log_min_duration_statement = 2000;
  // alter role all set default_transaction_isolation ='read committed';
  //   `);

  await pgx().query(`
  create table if not exists "nosql" (
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    del boolean NOT NULL DEFAULT '0',
    j jsonb not null
  );
  create index if not exists nosql_j on nosql using GIN(j);
  `);

  await pgx().query(`
  create table if not exists "int_nosql" (
    id integer primary key generated always as identity,
    del boolean NOT NULL DEFAULT '0',
    j jsonb not null
  );
  create index if not exists int_nosql_j on nosql using GIN(j);
  `);

  await pgx().query(`
  create table if not exists "kv" (
    k varchar(2048) NOT NULL PRIMARY KEY,
    v varchar(81920),
    updateAt timestamptz NOT NULL DEFAULT now()
  );
  `);
}
