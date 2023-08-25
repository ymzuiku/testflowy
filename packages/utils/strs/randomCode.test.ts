import { expect, it } from "vitest";
import { randomCode } from "./randomCode";

it("randomCode 4", () => {
  const v = randomCode(4);
  expect(v.length).eq(4, v);
});

it("randomCode 6", () => {
  const v = randomCode(6);
  expect(v.length).eq(6, v);
});
