import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateTask } from "./_createTask.test";
import { getTaskDetail } from "./_getTaskDetail";
import { updatePassTask } from "./_updatePassTask";

it("update pass draft", async () => {
  const [, account] = await tddCreateTask();
  const [res, err] = await zodTry(() => {
    return updatePassTask({
      auth: account,
      pass: true,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  const draft = await getTaskDetail({ ...account, id: res!.id });
  expect(draft.pass).eq(true);
});
