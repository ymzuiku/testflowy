import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { register } from "./+serve";
import { errCodeNotMatch, errSendEmailUniqe, sendRegisterEmail } from "./_sendRegisterEmail";

it("创建账号-验证码错误", async () => {
  const email = randomEmail();
  const [res, err] = await zodTry(() => register({ email, code: "123456", pwd: "123123" }));
  expect(res).eq(void 0);
  expect(err).eq(errCodeNotMatch);
});

export const tddRegister = async () => {
  const email = randomEmail();
  {
    const [res] = await zodTry(() => sendRegisterEmail({ email }));
    expect(res?.ok).eq(1);
  }
  const [res, err] = await zodTry(() =>
    register({
      email,
      code: "999999",
      pwd: "123123",
    }),
  );
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  return { email, pwd: "123123" };
};

it("创建账号-成功创建", async () => {
  await tddRegister();
});

it("创建账号-手机号重复创建", async () => {
  const email = randomEmail();
  {
    const [res] = await zodTry(() => sendRegisterEmail({ email }));
    expect(res?.ok).eq(1);
  }
  {
    const [res, err] = await zodTry(() =>
      register({
        code: "999999",
        email,
        pwd: "123123",
      }),
    );

    expect(err).eq(void 0);
    expect(res?.ok).eq(1);
  }
  {
    const [res, err] = await zodTry(() =>
      register({
        code: "999999",
        email,
        pwd: "123123",
      }),
    );
    expect(res).eq(void 0);
    expect(err).eq(errCodeNotMatch);
  }
  {
    const [, err] = await zodTry(() => sendRegisterEmail({ email }));
    expect(err).eq(errSendEmailUniqe);
  }
});
