import { expect, it } from "vitest";
import { tddRegister } from "../register/_register.test";
import { login } from "../_login";
import { changePwd } from "./_changePwd";
import { sendChangePwdEmail } from "./_sendChangePwdEmail";

it("change pwd", async () => {
  const account = await tddRegister();
  await sendChangePwdEmail(account);
  await changePwd({
    email: account.email,
    pwd: "qweqwe",
    code: "999999",
  });
  const res = await login({ ...account, pwd: "qweqwe", plant: "pc" });
  expect(res.token.length).eq(36);
});
