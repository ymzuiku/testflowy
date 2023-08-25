import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { errNoFoundDraftDetail } from "../draft/_getDraftDetail";
import { tddCreateTask } from "./_createTask.test";
import { getTaskDetail } from "./_getTaskDetail";

it("get task detail", async () => {
  const [draft, account] = await tddCreateTask();
  const [res, err] = await zodTry(() => {
    return getTaskDetail({
      ...account,
      id: draft.id,
    });
  });
  expect(err).eq(void 0);
  expect(/(base-test-value)/.test(res!.code)).eq(true);
});

it("get task detail id error", async () => {
  const [draft, account] = await tddCreateTask();
  const [, err] = await zodTry(() => {
    return getTaskDetail({
      ...account,
      id: "99" + draft.id,
    });
  });
  expect(err).eq(errNoFoundDraftDetail);
});
