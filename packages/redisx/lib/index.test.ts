import { expect, it } from "vitest";
import { redisx } from ".";

// beforeTestRedisx();

it("redix init", async () => {
  const rd = await redisx();
  rd.setEx("dog", 1000, "50");
  const v = await rd.get("dog");
  expect(v).toEqual("50");
});
