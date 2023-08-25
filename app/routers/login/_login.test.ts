import { randomEmail } from "utils/strs/randomEmail";
import { randomPhone } from "utils/strs/randomPhone";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { i18nKeys } from "../../i18n/i18nKeys";
import { accountToAuth } from "./invitation/_registerAndInvitation.test";
import { tddRegister } from "./register/_register.test";
import { errPassword, login } from "./_login";

it("登录账号-参数", async () => {
  {
    const [, err] = await zodTry(() => login({ email: "111", pwd: "123", plant: "pc" }));
    expect(err?.message).contain(i18nKeys.邮箱不正确);
  }
  {
    const [, err] = await zodTry(() => login({ email: randomPhone(), pwd: "123", plant: "pc" }));
    expect(err?.message).contain(i18nKeys.邮箱不正确);
  }
});

it("登录账号-没有注册", async () => {
  const email = randomEmail();
  const [, err] = await zodTry(() => login({ email, pwd: "123123", plant: "pc" }));
  expect(err).eq(errPassword);
});

it("登录账号-密码错误", async () => {
  const email = randomEmail();
  const [, err] = await zodTry(() => login({ email, pwd: "111111111", plant: "pc" }));
  expect(err).eq(errPassword);
});

it("登录账号-邮箱错误", async () => {
  const [, err] = await zodTry(() => login({ email: "13333333333", pwd: "123123", plant: "pc" }));
  expect(err?.message).contain(i18nKeys.邮箱不正确);
});

export const tddLogin = async () => {
  const account = await tddRegister();
  const [res, err] = await zodTry(() => login({ ...account, plant: "pc" }));
  expect(err).eq(void 0);
  expect(res?.token.length).above(10);
  return accountToAuth(res!);
};

it("登录账号-正常登录", async () => {
  await tddLogin();
});
