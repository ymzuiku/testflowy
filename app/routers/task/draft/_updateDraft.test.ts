import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateDraft } from "./_createDraft.test";
import { getDraftDetail } from "./_getDraftDetail";
import { updateDarft } from "./_updateDraft";

it("update draft", async () => {
  const [, account] = await tddCreateDraft();
  const nextName = Math.random().toString(36).substring(2);
  const [res, err] = await zodTry(() => {
    return updateDarft({
      auth: account,
      code: "next-code-name",
      md5: nextName,
      crypto: false,
      name: nextName,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  const draft = await getDraftDetail({ ...account, id: res!.id });
  expect(draft.code).eq("next-code-name");
  expect(draft.name).eq(nextName);
});
