import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddRegister } from "../register/_register.test";
import { checkEmailCode, errCodeNotMatch, errEmailNotRegister, sendChangePwdEmail } from "./_sendChangePwdEmail";

it("check send code", async () => {
  const [, err] = await zodTry(() => sendChangePwdEmail({ email: randomEmail() }));
  expect(err).eq(errEmailNotRegister);

  const account = await tddRegister();
  const email = account.email;
  const [res] = await zodTry(() => sendChangePwdEmail({ email }));
  expect(res?.ok).eq(1);
  {
    const [, err] = await zodTry(() => checkEmailCode({ email, code: "999995" }));
    expect(err).eq(errCodeNotMatch, "应该非9999");
  }
  {
    const [, err] = await zodTry(() => checkEmailCode({ email, code: "999999" }));
    expect(err).eq(void 0, "应该是999999");
  }
});
