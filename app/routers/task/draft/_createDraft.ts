import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { isInLicene } from "../../app/license/_checkLicense";
import { checkToken } from "../../login/_token";
import { Auth, zodAuth, zodUid } from "../../zod";
import { canUseDraftLength } from "../proDiff";
import { getDrafts } from "./_getDrafts";

const zodPostDraft = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
  uid: zodUid.optional(),
  name: z.string().min(1, i18nKeys.请填写测试名称),
  md5: z.string().min(3),
  code: z.string(),
  crypto: z.boolean(),
  steps: z.number(),
  owner: zodUid.optional(),
  pass: z.boolean(),
});

export type Draft = z.infer<typeof zodPostDraft> & { updateAt?: string; createAt?: string };

export const errNameUnique = new Error(i18nKeys.名称重复);
export const errMaxFreeDraftLength = new Error(i18nKeys.免费账号只能使用某某条测试);
export const errMaxProDraftLength = new Error(i18nKeys.个人最大测试上限为某某条);

export const prefixDraftLength = (uid: string) => {
  return "draft_len_" + uid;
};

export const checkDraftLength = async (auth: Auth) => {
  const rds = await redisx();
  const rdsKey = prefixDraftLength(auth.uid);
  const old = await rds.get(rdsKey);
  let len = Number(old) || 0;
  if (len === 0) {
    const drafts = await getDrafts({ ...auth, limit: 1, offset: 0 });
    len = drafts.total;
  }
  const license = await isInLicene(auth);
  const maxLength = canUseDraftLength(!!license);
  if (len >= maxLength) {
    throw license ? errMaxProDraftLength : errMaxFreeDraftLength;
  }
  return { rds, rdsKey, lastLength: len };
};

export const createDraft = zodVaild(zodPostDraft, async (p: Draft) => {
  await checkToken(p.auth!);
  const { rds, rdsKey, lastLength } = await checkDraftLength(p.auth!);
  p.uid = p.auth!.uid;
  delete p.auth;
  let id = "";
  try {
    const res = await orm.insertOne({ table: tables.draft, data: p });
    id = res.id;
  } catch (err) {
    const msg = (err as Error).message;
    if (/duplicate key/.test(msg)) {
      throw errNameUnique;
    }
  }
  await rds.setEx(rdsKey, 60 * 60, String(lastLength + 1));
  return { ...success, id };
});
