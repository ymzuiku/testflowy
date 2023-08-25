import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { sha256 } from "utils/sha256";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { zodCode, zodEmail, zodPwd } from "../../zod";
import { checkEmailCode } from "./_sendChangePwdEmail";

const zodChangePwd = z.object({
  email: zodEmail,
  code: zodCode,
  pwd: zodPwd,
});

export type ChangePwd = z.infer<typeof zodChangePwd>;

export const prefixChangePwd = (phone: string) => "changepwd:" + phone;

export const changePwd = zodVaild(zodChangePwd, async (p: ChangePwd) => {
  await checkEmailCode(p);
  await orm.updateOne({
    table: tables.account,
    data: {
      pwd: sha256(p.pwd),
    },
    filter: {
      eq: {
        email: p.email,
      },
    },
  });
  return success;
});
