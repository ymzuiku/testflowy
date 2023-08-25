import { v4 } from "uuid";
import { expect, it } from "vitest";
import { createNosqlTableAndIndexTimes } from "../../createTable";
import { PgColumn } from "../../zodPg";
import { deleteOne } from "../deleteOne";
import { insertOne } from "../insertOne";

const TABLE = "testOrmTable".toLocaleLowerCase();

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
  const delId = await deleteOne({
    id: data.id,
    table: TABLE,
  });
  expect(delId).eq(data.id);
});
