import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateDraft } from "./_createDraft.test";
import { getDraftDetail } from "./_getDraftDetail";
import { updatePassDarft } from "./_updatePassDraft";

it("update pass draft", async () => {
  const [, account] = await tddCreateDraft();
  const [res, err] = await zodTry(() => {
    return updatePassDarft({
      auth: account,
      pass: true,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  const draft = await getDraftDetail({ ...account, id: res!.id });
  expect(draft.pass).eq(true);
});
