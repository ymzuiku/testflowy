import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { checkAgent } from "../../app/team/_checkAgent";
import { zodAuth, zodUid } from "../../zod";

const zodUpdateTask = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
  uid: zodUid.optional(),
  name: z.string().min(1, i18nKeys.请填写测试名称).optional(),
  md5: z.string().min(3),
  code: z.string().optional(),
  crypto: z.boolean(),
  steps: z.number().optional(),
});

export type UpdateTask = z.infer<typeof zodUpdateTask>;

export const updateTask = zodVaild(zodUpdateTask, async (p: UpdateTask) => {
  const licene = await checkLicene(p.auth!);
  await checkAgent({ auth: p.auth!, needAgent: ["admin", "owner"] });
  delete p.auth;
  let id = "";
  try {
    const res = await orm.updateOne({
      table: tables.task,
      id: p.id,
      data: p,
      filter: {
        eq: { owner: licene.owner },
        comparable: [["md5", "!=", p.md5]],
      },
    });
    id = res.id;
  } catch (err) {
    const msg = (err as Error).message;
    if (/duplicate key/.test(msg)) {
      throw new Error(i18nKeys.名称重复);
    }
    throw err;
  }

  return { ...success, id };
});
