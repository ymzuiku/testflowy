import { v4 } from "uuid";
import { expect, it } from "vitest";
import { pgx } from ".";
import { createNosqlTableAndIndexTimes } from "./createTable";

it("pg CRUD", async () => {
  //
  await createNosqlTableAndIndexTimes("dog");
  const key = v4();
  await pgx().query("insert into dog (j) values ($1)", [
    {
      name: key,
      age: 10,
    },
  ]);
  await pgx().query("insert into dog (j) values ($1)", [
    {
      name: key,
      age: 12,
    },
  ]);
  const data = await pgx().query("select (id)::text, j from dog where j@>$1 and del = '0'", [{ name: key }]);
  expect(data.rowCount).eq(2);

  const _total = await pgx().query("select count(*) from dog where j@>$1 and del = '0'", [{ name: key }]);
  const total = Number((_total.rows[0] as { count: number }).count);
  expect(total).eq(2);

  const data2 = await pgx().query<{ id: string; j: { name: string; age: number } }>(
    "update dog set j=j||$1 where j@>$2 returning (id)::text, j",
    [{ age: 100 }, { name: key }],
  );

  expect(data2.rows[0].j.age).eq(100);

  const del = await pgx().query<{ id: string; j: { name: string; age: number } }>(
    "update dog set del = '1' where j@>$1 and del = '0' returning (id)::text, j",
    [{ age: 100 }],
  );

  expect(del.rowCount).eq(2);

  const data3 = await pgx().query<{ id: string; j: { name: string; age: number } }>(
    "update dog set j=j||$1 where j@>$2 and del = '0' returning (id)::text, j",
    [{ age: 100 }, { name: key }],
  );

  expect(data3.rowCount).eq(0);
});
