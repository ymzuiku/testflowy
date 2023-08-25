import { expect, it } from "vitest";
import { orm } from "..";
import { createNosqlTableAndIndexTimes } from "../../createTable";

const TABLE = "testormtable4";

it("read one", async () => {
  await createNosqlTableAndIndexTimes(TABLE);
  const dog = Math.random().toString(36).substring(2);
  const cat = Math.random().toString(36).substring(2);
  const res = await orm.insertOne({
    table: TABLE,
    data: {
      dog,
      cat,
    },
  });
  {
    const item = await orm.readOne({
      table: TABLE,
      id: res.id,
    });
    expect(item.dog).eq(dog);
    expect(item.cat).eq(cat);
  }
  {
    const item = await orm.readOne({
      table: TABLE,
      id: res.id,
      filter: {
        eq: {
          dog,
          cat,
        },
      },
    });
    expect(item.dog).eq(dog);
    expect(item.cat).eq(cat);
  }
});
