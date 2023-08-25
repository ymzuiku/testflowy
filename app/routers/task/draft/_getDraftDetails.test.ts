import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateDraft } from "./_createDraft.test";
import { getDraftDetails } from "./_getDraftDetails";

it("get draft details", async () => {
  const [draft, account] = await tddCreateDraft();
  const [res, err] = await zodTry(() => {
    return getDraftDetails({
      auth: account,
      ids: [draft.id],
    });
  });
  expect(err).eq(void 0);
  expect(res!.data.length).eq(1);
  expect(/(base-test-value)/.test(res!.data[0].code)).eq(true);
});

it("get draft detail id error", async () => {
  const [draft, account] = await tddCreateDraft();
  const [res] = await zodTry(() => {
    return getDraftDetails({
      auth: account,
      ids: ["99" + draft.id],
    });
  });
  expect(res!.data.length).eq(0);
});
