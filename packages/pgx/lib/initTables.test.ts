import { it } from "vitest";
import { initeTables } from "./initTables";

it("concurrent test 1", async () => {
  await initeTables();
});
