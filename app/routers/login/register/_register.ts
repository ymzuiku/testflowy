import { success } from "fastify-glob-router/success";
import { orm, pgxTx } from "pgx";
import { sha256 } from "utils/sha256";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { setLicenseUseInServe } from "../../app/license/_setLicenseUse";
import { licenseTrial } from "../../app/pay/_licenseCreate";
import { zodCode, zodEmail, zodPwd } from "../../zod";
import { checkEmailCode } from "./_sendRegisterEmail";

const zodRegister = z.object({
  email: zodEmail,
  code: zodCode,
  pwd: zodPwd,
});

export type Register = z.infer<typeof zodRegister>;

export const errEmailUnique = new Error(i18nKeys.该邮箱已注册);

export const register = zodVaild(zodRegister, async (p: Register) => {
  await checkEmailCode(p);

  p.pwd = sha256(p.pwd);
  delete (p as Record<string, unknown>)["code"];

  await pgxTx(async (tx) => {
    const res = await orm.insertOne({
      tx,
      table: tables.account,
      data: {
        ...p,
        owner: "self",
        agent: "owner",
      },
    });

    const license = await licenseTrial(tx, {
      count: 10,
      plan: "trial",
      uid: res.id,
    });

    // 默认把第一个license 给用户自己用上
    await setLicenseUseInServe(tx, {
      auth: { uid: res.id, token: "", plant: "pc" },
      agentId: res.id,
      licenseId: license.data[0].id,
    });
  });

  return success;
});
