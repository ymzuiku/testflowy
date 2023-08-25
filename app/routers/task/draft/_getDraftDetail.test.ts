import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateDraft } from "./_createDraft.test";
import { errNoFoundDraftDetail, getDraftDetail } from "./_getDraftDetail";

it("get draft detail", async () => {
  const [draft, account] = await tddCreateDraft();
  const [res, err] = await zodTry(() => {
    return getDraftDetail({
      ...account,
      id: draft.id,
    });
  });
  expect(err).eq(void 0);
  expect(/(base-test-value)/.test(res!.code)).eq(true);
});

it("get draft detail id error", async () => {
  const [draft, account] = await tddCreateDraft();
  const [, err] = await zodTry(() => {
    return getDraftDetail({
      ...account,
      id: "99" + draft.id,
    });
  });
  expect(err).eq(errNoFoundDraftDetail);
});
