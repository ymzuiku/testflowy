import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddCreateTask } from "./_createTask.test";
import { deleteTask } from "./_deleteTask";

it("delete tasks", async () => {
  const [draft, account] = await tddCreateTask();
  const [res, err] = await zodTry(() => {
    return deleteTask({
      auth: account,
      id: draft.id,
    });
  });
  expect(err).eq(void 0);
  expect(res!.ok).eq(1);
});

it("delete tasks again", async () => {
  const [draft, account] = await tddCreateTask();
  {
    const [res, err] = await zodTry(() => {
      return deleteTask({
        auth: account,
        id: draft.id,
      });
    });
    expect(err).eq(void 0);
    expect(res!.ok).eq(1);
  }
  {
    const [, err] = await zodTry(() => {
      return deleteTask({
        auth: account,
        id: draft.id,
      });
    });
    expect(/(Delete not found data)/.test(err!.message)).eq(true);
  }
});

it("delete tasks no one", async () => {
  const [draft, account] = await tddCreateTask();
  const [, err] = await zodTry(() => {
    return deleteTask({
      auth: account,
      id: draft.id + "1",
    });
  });
  expect(/(Delete not found data)/.test(err!.message)).eq(true);
});
