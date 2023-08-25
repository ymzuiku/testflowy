import { expect, it } from "vitest";
import { createNosqlTableAndIndexTimes } from "../../createTable";
import { PgColumn } from "../../zodPg";
import { insertMany } from "../insertMany";

interface Props {
  name: string;
  age: number;
  vip: boolean;
}

const TABLE = "pgInsertMany".toLocaleLowerCase();
it("pg insert many", async () => {
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

  const res = await insertMany<Props>({
    datas: [
      {
        name: "hello",
        age: 10,
        vip: true,
      },
      {
        name: "hel222lo",
        age: 12,
        vip: true,
      },
      {
        name: "hel222lo",
        age: 13,
        vip: true,
      },
    ],
    columns,
    returnColumns: ["name", "age"],
    table: TABLE,
    sensitive: ["name"],
  });
  expect(res.count).eq(3);
  expect(res.data[0].name).eq("he***lo");
});
