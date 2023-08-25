import { emailx } from "emailx";
import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { checkSendCode, hasKey, sendCode } from "redisx";
import { isDev } from "utils/isDev";
import { randomCode } from "utils/strs";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { zodEmail } from "../../zod";

const zodSendEmail = z.object({
  email: zodEmail,
});

export type SendEmail = z.infer<typeof zodSendEmail>;
const prefixSendEmail = (email: string) => "sendcode:" + email;
export const errSentCode = new Error(i18nKeys.请勿重复发送验证码);
export const errSendEmailUniqe = new Error(i18nKeys.该邮箱已注册);

export const sendRegisterEmail = zodVaild(zodSendEmail, async (p: SendEmail) => {
  // 如果邮件已发送短信, 返回错误
  await hasKey(prefixSendEmail(p.email), errSentCode);
  // 如果邮件已注册, 返回错误
  if (
    await orm.has({
      table: tables.account,
      filter: {
        eq: {
          email: p.email,
        },
      },
    })
  ) {
    throw errSendEmailUniqe;
  }
  const code = randomCode(6, isDev());
  // 生产环境才发送邮件
  if (!isDev()) {
    await emailx({
      title: `Bind your Testflowy email`,
      email: p.email,
      text: `Testflowy register account, code: ${code}`,
      html: `
        <div>
          <h2>Register Testflowy account code:</h2>
          <p style="font-size:40px; color:#33f">${code}</p>
          <div>The email frome: testflowy.com</div>
        </div>
      `,
    });
  }

  await sendCode(prefixSendEmail(p.email), 60 * 6, code);
  return success;
});

sendRegisterEmail.POST = true;

export const errCodeNotMatch = new Error(i18nKeys.验证码不正确);

export const checkEmailCode = async (p: { email: string; code: string }) => {
  return checkSendCode(prefixSendEmail(p.email), p.code, errCodeNotMatch);
};
