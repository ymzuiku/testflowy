import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateTask } from "./_createTask.test";
import { getTaskDetails } from "./_getTaskDetails";

it("get task details", async () => {
  const [draft, account] = await tddCreateTask();
  const [res, err] = await zodTry(() => {
    return getTaskDetails({
      auth: account,
      ids: [draft.id],
    });
  });
  expect(err).eq(void 0);
  expect(res!.data.length).eq(1);
  expect(/(base-test-value)/.test(res!.data[0].code)).eq(true);
});

it("get task detail id error", async () => {
  const [draft, account] = await tddCreateTask();
  const [res] = await zodTry(() => {
    return getTaskDetails({
      auth: account,
      ids: ["99" + draft.id],
    });
  });
  expect(res!.data.length).eq(0);
});
