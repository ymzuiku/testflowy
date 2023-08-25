import { expect, it } from "vitest";
import { createNosqlTableAndIndexTimes } from "../../createTable";
import { PgColumn } from "../../zodPg";
import { insertOne } from "../insertOne";

interface Props {
  name: string;
  age: number;
  vip: boolean;
}

const TABLE = "pgInsertOne".toLocaleLowerCase();
it("pg insert one", async () => {
  await createNosqlTableAndIndexTimes(TABLE);
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
      required: false,
    },
    {
      name: "age",
      typed: "int",
    },
    {
      name: "vip",
      typed: "bool",
    },
  ];

  const res = await insertOne<Props>({
    data: {
      name: "hello",
      age: 10,
      vip: true,
    },
    columns,
    returnColumns: ["name", "age"],
    table: TABLE,
    sensitive: ["name"],
  });
  expect(res.age).eq(10);
  expect(res.name).eq("he***lo");
});
