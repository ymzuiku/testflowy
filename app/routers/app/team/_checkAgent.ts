import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { zodArrayString } from "pgx/lib/zodPg";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { Auth, UserAgent, zodAuth } from "../../zod";

// 获取用户权限
export const getAgent = zodVaild(zodAuth, async (p: Auth): Promise<UserAgent> => {
  const res = await orm.readOne({
    table: tables.account,
    id: p.uid,
  });
  return res.agent;
});

const zodCheckAgent = z.object({
  auth: zodAuth,
  needAgent: zodArrayString,
});

export const errRoleNoPermission = new Error(i18nKeys.角色无权限执行改操作);

type CheckAgent = z.infer<typeof zodCheckAgent>;
export const checkAgent = zodVaild(zodCheckAgent, async (p: CheckAgent) => {
  const res = await getAgent(p.auth);
  if (p.needAgent.indexOf(res) < 0) {
    throw errRoleNoPermission;
  }
  return success;
});
