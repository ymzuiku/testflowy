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
import { zodAuth, zodEmail } from "../../zod";
import { checkToken } from "../_token";

const zodSendEmail = z.object({
  auth: zodAuth,
  ownerEmail: zodEmail,
  email: zodEmail,
});

export type SendEmail = z.infer<typeof zodSendEmail>;
const prefixSendEmail = (email: string) => "addteam:" + email;
export const errSentCode = new Error(i18nKeys.请勿重复邀请);
export const errInvitationSelf = new Error(i18nKeys.您不能邀请您自己);
export const errInvitationOwnerEmail = new Error(i18nKeys.所有者的邮箱不正确);
export const errEmailNotRegister = new Error(i18nKeys.邮箱未注册);

export const sendInvitationEmail = zodVaild(zodSendEmail, async (p: SendEmail) => {
  await checkToken(p.auth);
  if (p.ownerEmail === p.email) {
    throw errInvitationSelf;
  }
  const account = await orm.readOne({
    table: tables.account,
    id: p.auth.uid,
  });
  if (account.email !== p.ownerEmail) {
    throw errInvitationOwnerEmail;
  }
  await hasKey(prefixSendEmail(p.email), errSentCode);

  const code = randomCode(6, isDev());
  const useSendEmail = async (router: string) => {
    const url = `/#/${router}?email=${p.email}&ownerEmail=${p.ownerEmail}&owner=${p.auth.uid}&code=${code}`;
    if (!isDev()) {
      const releaseUrl = "https://testflowy.com" + url;
      await emailx({
        title: "Testflowy teams invitation",
        email: p.email,
        text: `Testflowy group(${p.ownerEmail}) invitation you, Please click this link: 
               ${releaseUrl}`,
        html: `
           <div>
           <h2 style="color:#1D1E79; font-size:25px;">Testflowy group(${p.ownerEmail}) invitation you</h2>
           <p>Please click this link:</p>
           <div style="padding:8px; border:1px solid #ccc; border-radius: 8px; box-shadow:0px 2px 4px rgba(0,0,0,0.07)">
            <a  href="${releaseUrl}">${releaseUrl}</a>
           </div>
           <div style="margin-top: 20px; opacity:0.5;" >The email from testflowy.com, don't reply</div>
           </div>
        `,
      });
      return "";
    } else {
      return url;
    }
  };

  let url = "";
  if (
    !(await orm.has({
      table: tables.account,
      filter: {
        eq: {
          email: p.email,
        },
      },
    }))
  ) {
    // throw errEmailNotRegister;
    // 生产环境才发送邮件
    // 未注册的用户使用注册地址
    url = await useSendEmail("login/invitation/register");
  } else {
    // 已注册的用户使用changeTeam的地址
    url = await useSendEmail("login/invitation");
  }

  // 6个小时过期
  await sendCode(prefixSendEmail(p.email), 60 * 60 * 60 * 6, p.auth.uid + "_" + code);
  return {
    ...success,
    url,
  };
});

export const POST = sendInvitationEmail;

export const errCodeNotMatch = new Error(i18nKeys.验证码不正确);
export const errCodeNotHave = new Error(i18nKeys.邀请已过期);

export const checkInvitationEmailCode = async (p: { owner: string; email: string; code: string }) => {
  return checkSendCode(prefixSendEmail(p.email), p.owner + "_" + p.code, errCodeNotMatch);
};
