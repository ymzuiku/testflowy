import { testMeta } from "utils/isDev";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { errToken } from "../../login/_token";
import { Auth } from "../../zod";
import { tddCreateDraft } from "../draft/_createDraft.test";
import { canUseTaskLength } from "../proDiff";
import { createTask, errMaxProTaskLength } from "./_createTask";

export const tddCreateTask = async (): Promise<[{ id: string }, Auth, Auth]> => {
  const [draft, account, agent] = await tddCreateDraft();
  const [res, err] = await zodTry(async () => {
    return createTask({
      ...account,
      id: draft.id,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  expect(res?.id).not.eq(draft.id);
  return [res!, account, agent];
};

it("create tasks success", async () => {
  await tddCreateTask();
});

it("create tasks no auth", async () => {
  const [draft, account] = await tddCreateDraft();
  account.token += "1";
  const [, err] = await zodTry(async () => {
    return createTask({
      ...account,
      id: draft.id,
    });
  });
  expect(err).eq(errToken);
});

it("create tasks to max", async () => {
  testMeta.isTest = true;
  const [draft, account] = await tddCreateDraft();
  const arr = new Array(canUseTaskLength(true)).fill(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _item of arr) {
    const [res, err] = await zodTry(async () => {
      return createTask({
        ...account,
        id: draft.id,
      });
    });
    expect(err).eq(void 0);
    expect(res?.ok).eq(1);
    expect(res?.id).not.eq(draft.id);
  }
  const [, err] = await zodTry(async () => {
    return createTask({
      ...account,
      id: draft.id,
    });
  });
  expect(err).eq(errMaxProTaskLength);
});
