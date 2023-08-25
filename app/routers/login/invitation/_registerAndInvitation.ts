import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { sha256 } from "utils/sha256";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { zodCode, zodEmail, zodPwd, zodUid } from "../../zod";
import { checkInvitationEmailCode } from "./_sendInvitationEmail";

const zodRegisterAndInvitation = z.object({
  email: zodEmail,
  code: zodCode,
  pwd: zodPwd,
  owner: zodUid,
  // agent: z.enum(["owner", "admin", "agent"]),
});

export type RegisterAndInvitation = z.infer<typeof zodRegisterAndInvitation>;

export const errEmailUnique = new Error(i18nKeys.该邮箱已注册);
export const errEmailNotRegister = new Error(i18nKeys.该邮箱未注册);

// 注册并且设置owner
export const registerAndInvitation = zodVaild(zodRegisterAndInvitation, async (p: RegisterAndInvitation) => {
  await checkInvitationEmailCode({
    email: p.email,
    code: p.code,
    owner: p.owner,
  });

  p.pwd = sha256(p.pwd);
  delete (p as Record<string, unknown>)["code"];
  try {
    await orm.insertOne({
      table: tables.account,
      data: {
        ...p,
        owner: p.owner,
        agent: "agent",
      },
    });
  } catch (err) {
    throw errEmailUnique;
  }
  return success;
});
