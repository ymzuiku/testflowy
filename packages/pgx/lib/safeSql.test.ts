import { expect, it } from "vitest";
import { safeSql } from "./safeSql";

it("safeSql", () => {
  expect(safeSql("hello")).eq("hello");
  expect(safeSql("\nhello")).eq("_hello");
  expect(safeSql(" h ello ")).eq("_h_ello_");
  expect(safeSql("\nmhello")).eq("_mhello");
  expect(safeSql(`\\hello`)).eq("_hello");
  expect(safeSql(`'hello'`)).eq("_hello_");
  expect(safeSql(`"hello`)).eq("_hello");
  expect(safeSql("`hello`")).eq("_hello_");
  expect(safeSql("``hello`")).eq("__hello_");
  expect(safeSql("||hello")).eq("__hello");
  expect(safeSql("&hello")).eq("_hello");
  expect(safeSql("&&hello")).eq("__hello");
  expect(safeSql("(hello)")).eq("_hello_");
  expect(safeSql("[hello]")).eq("_hello_");
  expect(safeSql("{hello}")).eq("_hello_");
  expect(safeSql(safeSql("{hello}"))).eq("_hello_");
  expect(safeSql(safeSql(""))).eq("");
});
