import { config } from "up-dir-env";
import { expect, it } from "vitest";

it("send email test", async () => {
  config();

  expect(1).eq(1);
});
