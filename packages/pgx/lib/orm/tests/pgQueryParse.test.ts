import { expect, it } from "vitest";
import { queryParse } from "../queryParse";

it("pgQueryParse", () => {
  expect(queryParse("select * from $0 $0 $0 $2")).eq("select * from $1 $2 $3 $2");
});
