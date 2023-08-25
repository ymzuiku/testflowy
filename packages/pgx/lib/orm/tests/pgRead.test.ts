import { v4 } from "uuid";
import { expect, it } from "vitest";
import { createNosqlIndex, createNosqlTableAndIndexTimes } from "../../createTable";
import { PgColumn } from "../../zodPg";
import { insertOne } from "../insertOne";
import { readMany, readOne } from "../read";

interface TestOrmTable {
  name: string;
  age: number;
  anime: string;
  vip: boolean;
}
const TABLE = "testormtable3";

const tddReadMany = async () => {
  await createNosqlTableAndIndexTimes(TABLE);
  await createNosqlIndex(TABLE, "anime", "text");
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
    },
    {
      name: "anime",
      typed: "string",
      pick: ["dog", "cat", "fish"],
    },
    {
      name: "age",
      typed: "int",
    },
  ];
  const key = v4();
  await insertOne({
    table: TABLE,
    data: {
      name: key,
      anime: "fish",
      age: 5,
      vip: false,
    },
    columns,
  });
  await insertOne({
    table: TABLE,
    data: {
      name: key,
      anime: "dog",
      age: 6,
      vip: true,
    },
    columns,
  });

  const res = await readMany<TestOrmTable, TestOrmTable>({
    table: TABLE,
    filter: {
      eq: {
        name: key,
      },
    },
    total: true,
    returnColumns: ["name", "age", "anime"],
  });

  expect(res.total).eq(2);
  for (const item of res.data) {
    expect(item).deep.contain({ name: key });
  }
  expect(res.data[1].age).eq(6);
  expect(res.data[1].vip).eq(void 0);
  expect(res.data[1].anime).eq("dog");
  return res;
};

it("pgReadMany pick", tddReadMany);

it("pgReadOne by id", async () => {
  const res = await tddReadMany();
  const ids = res.data.map((v) => v.id);
  const next = await readOne({
    table: TABLE,
    id: ids[0],
  });
  expect(res.data[0].id).eq(next.id);
});

it("pgReadMany by ids", async () => {
  const res = await tddReadMany();
  const ids = res.data.map((v) => v.id).sort();
  const next = await readMany({
    table: TABLE,
    ids,
  });
  const nextIds = next.data.map((v) => v.id).sort();
  expect(nextIds).toStrictEqual(ids);
});

it("pgReadOne pick", async () => {
  await createNosqlTableAndIndexTimes(TABLE);
  const columns: PgColumn[] = [
    {
      name: "name",
      typed: "string",
    },
    {
      name: "anime",
      typed: "string",
      pick: ["dog", "cat", "fish"],
    },
    {
      name: "age",
      typed: "int",
    },
  ];
  const key = v4();
  await insertOne({
    table: TABLE,
    data: {
      name: key,
      anime: "dog",
      age: 5,
      vip: true,
    },
    columns,
  });
  await insertOne({
    table: TABLE,
    data: {
      name: key,
      anime: "fish",
      age: 6,
      vip: false,
    },
    columns,
  });

  const res = await readOne<TestOrmTable, TestOrmTable>({
    table: TABLE,
    filter: {
      eq: {
        name: key,
      },
    },
    returnColumns: ["name", "age", "anime"],
  });

  expect(res.age).eq(5);
  expect(res.vip).eq(void 0);
  expect(res.anime).eq("dog");
});

it("pgReadMany by like", async () => {
  await tddReadMany();
  const next = await readMany({
    table: TABLE,
    filter: {
      comparable: [["anime", "like", "fis"]],
      limit: 5,
    },
  });
  expect(next.data[0].anime).toStrictEqual("fish");
  expect(next.data.length).toStrictEqual(5);
});
