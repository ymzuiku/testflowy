import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddLogin } from "../../login/_login.test";
import { tddCreateDraft } from "./_createDraft.test";
import { getDrafts } from "./_getDrafts";

it("get drafts", async () => {
  const [, account] = await tddCreateDraft();
  const [res, err] = await zodTry(() => {
    return getDrafts({
      ...account,
      limit: 5,
      offset: 0,
    });
  });
  expect(err).eq(void 0);
  expect(res?.data.length).eq(1);
  const item = res!.data[0] as unknown as Record<string, string>;
  expect(item.code).eq(void 0);
});

it("get drafts empty", async () => {
  const account = await tddLogin();
  const [res, err] = await zodTry(() => {
    return getDrafts({
      ...account,
      limit: 5,
      offset: 0,
    });
  });
  expect(err).eq(void 0);
  expect(res!.data.length).eq(0);
});
