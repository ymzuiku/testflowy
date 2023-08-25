import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { checkEmailCode, errCodeNotMatch, sendRegisterEmail } from "./_sendRegisterEmail";

it("check send code", async () => {
  const email = randomEmail();
  const [res] = await zodTry(() => sendRegisterEmail({ email }));
  expect(res?.ok).eq(1);
  {
    const [, err] = await zodTry(() => checkEmailCode({ email, code: "999995" }));
    expect(err).eq(errCodeNotMatch, "应该非999999");
  }
  {
    const [, err] = await zodTry(() => checkEmailCode({ email, code: "999999" }));
    expect(err).eq(void 0, "应该是999999");
  }
});
