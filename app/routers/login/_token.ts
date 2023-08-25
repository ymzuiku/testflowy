import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { i18nKeys } from "../../i18n/i18nKeys";
import { tables } from "../../serve/tables";
import { priceToRMB } from "../app/pay/info/price";
import { zodPlant, zodUid, zodUUID } from "../zod";
import { Account, prefixToken } from "./_login";

const zodToken = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
});

export type Token = z.infer<typeof zodToken>;

export const errToken = new Error(i18nKeys.登录状态已过期);

export const updateToken = async (uid: string) => {
  const rds = await redisx();
  const res = await orm.readOne<
    unknown,
    { email: string; pwd?: string; owner?: string; agent?: "owner" | "admin" | "agent" }
  >({
    table: tables.account,
    id: uid,
  });
  delete res.pwd;
  const plants = ["pc", "mobile", "sdk"];
  for (const plant of plants) {
    const accountString = await rds.get(prefixToken(uid, plant));
    if (!accountString) {
      return;
    }
    const account = JSON.parse(accountString);
    Object.assign(res, { plant, token: account.token });
    console.log(res);

    rds.setEx(prefixToken(uid, plant), priceToRMB(3600 * 24), JSON.stringify(res));
  }
};

export const checkToken = async (p: Token): Account => {
  if (!p.uid || !p.plant || !p.token) {
    throw errToken;
  }
  const rds = await redisx();
  const accountString = (await rds.get(prefixToken(p.uid, p.plant))) || "{}";
  const account = JSON.parse(accountString);
  if (account.token !== p.token) {
    throw errToken;
  }
  return account;
};

checkToken.POST = true;

export const errTeamToken = new Error(i18nKeys.没有权限执行该操作);

export const isTeamOwnerToken = async (p: Token) => {
  await checkToken(p);
  return orm.has({
    table: tables.account,
    id: p.uid,
    filter: {
      eq: {
        owner: "self",
        agent: "owner",
      },
    },
  });
};

export const checkTeamOwnerToken = async (p: Token) => {
  const ok = await isTeamOwnerToken(p);
  if (!ok) {
    throw errTeamToken;
  }
  return success;
};
