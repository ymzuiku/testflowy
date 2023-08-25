import { expect, it } from "vitest";
import { isIPString } from "./isIPString";

it("is Ip", () => {
  expect(isIPString("192.168.0.1")).eq(true);
  expect(isIPString("255.255.0.1")).eq(true);
  expect(isIPString("192.168.199.9")).eq(true);
  expect(isIPString("300.400.900.200")).eq(false);
  expect(isIPString("a00.400.900.200")).eq(false);
  expect(isIPString("a00.400.0.0")).eq(false);
});
