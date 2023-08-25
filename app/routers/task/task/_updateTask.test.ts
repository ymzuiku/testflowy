import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateTask } from "./_createTask.test";
import { getTaskDetail } from "./_getTaskDetail";
import { updateTask } from "./_updateTask";

it("update draft", async () => {
  const [, account] = await tddCreateTask();
  const nextName = Math.random().toString(36).substring(2);
  const [res, err] = await zodTry(() => {
    return updateTask({
      auth: account,
      code: "next-code-name",
      md5: nextName,
      name: nextName,
      crypto: false,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  const draft = await getTaskDetail({ ...account, id: res!.id });
  expect(draft.code).eq("next-code-name");
  expect(draft.name).eq(nextName);
});
