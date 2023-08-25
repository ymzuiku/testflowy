import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateDraft } from "./_createDraft.test";
import { deleteDraft } from "./_deleteDraft";

it("delete draft", async () => {
  const [draft, account] = await tddCreateDraft();
  const [res, err] = await zodTry(() => {
    return deleteDraft({
      auth: account,
      id: draft.id,
    });
  });
  expect(err).eq(void 0);
  expect(res!.ok).eq(1);
});

it("delete draft no one", async () => {
  const [draft, account] = await tddCreateDraft();
  const [, err] = await zodTry(() => {
    return deleteDraft({
      auth: account,
      id: draft.id + "1",
    });
  });
  expect(/(Delete not found data)/.test(err!.message)).eq(true);
});
