import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddLogin } from "../../login/_login.test";
import { tddCreateTask } from "./_createTask.test";
import { getTasks } from "./_getTasks";

it("get tasks", async () => {
  const [, account] = await tddCreateTask();
  const [res, err] = await zodTry(() => {
    return getTasks({
      ...account,
      limit: 5,
      owner: account.uid,
      offset: 0,
    });
  });
  expect(err).eq(void 0);
  expect(res?.data.length).eq(1);
  const item = res!.data[0] as unknown as Record<string, string>;
  expect(item.code).eq(void 0);
});

it("get tasks empty", async () => {
  const account = await tddLogin();
  const [res, err] = await zodTry(() => {
    return getTasks({
      ...account,
      limit: 5,
      offset: 0,
      owner: account.uid,
    });
  });
  expect(err).eq(void 0);
  expect(res!.data.length).eq(0);
});
