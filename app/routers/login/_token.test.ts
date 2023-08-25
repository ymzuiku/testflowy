import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddLogin } from "./_login.test";
import { checkToken, errToken } from "./_token";

it("检测登录-id或token错误", async () => {
  const account = await tddLogin();
  expect((account as Record<string, unknown>)["pwd"]).eq(void 0);
  expect((account as Record<string, unknown>)["code"]).eq(void 0);
  {
    const [, err] = await zodTry(() => checkToken({ uid: "123123213213", plant: account.plant, token: account.token }));
    expect(err).eq(errToken);
  }
  {
    const [, err] = await zodTry(() =>
      checkToken({ uid: account.uid, plant: account.plant, token: account.token + "1" }),
    );
    expect(err).eq(errToken);
  }
});

it("检测登录-成功", async () => {
  const account = await tddLogin();
  const [account2, err] = await zodTry(() =>
    checkToken({ uid: account.uid, plant: account.plant, token: account.token }),
  );
  expect(err).eq(void 0);
  expect(!!account2?.id).eq(true);
});
