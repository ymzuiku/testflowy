import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { createTestflowyTables } from "./tables";

it("create all testflowy tables", async () => {
  const [, err] = await zodTry(() => createTestflowyTables());
  expect(err).eq(void 0);
});
