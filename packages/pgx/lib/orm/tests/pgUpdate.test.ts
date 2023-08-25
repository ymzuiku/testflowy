import { v4 } from "uuid";
import { expect, it } from "vitest";
import { createNosqlTableAndIndexTimes } from "../../createTable";
import { PgColumn } from "../../zodPg";
import { insertOne } from "../insertOne";
import { updateOne } from "../update";

const TABLE = "testOrmTable".toLocaleLowerCase();

interface TestOrmTable {
  name: string;
  age: number;
  anime: string;
  vip: boolean;
}

it("pgUpdateOne", async () => {
  await createNosqlTableAndIndexTimes(TABLE);
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
      max: 100,
    },
    {
      name: "age",
      typed: "int",
    },
  ];
  const key = v4();
  const data = await insertOne({
    table: TABLE,
    data: {
      name: key,
      age: 5,
      vip: true,
    },
    columns,
  });
  const data2 = await updateOne<TestOrmTable, TestOrmTable>({
    id: data.id,
    data: {
      age: 10,
    },
    table: TABLE,
    columns,
  });
  expect(data2.age).eq(10);
  expect(data2.name).eq(key);
});
