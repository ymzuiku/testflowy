import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { checkAgent } from "../../app/team/_checkAgent";
import { zodAuth, zodUid } from "../../zod";

const zodUpdatePassTask = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
  uid: zodUid.optional(),
  pass: z.boolean().optional(),
});

export type UpdatePassTask = z.infer<typeof zodUpdatePassTask>;

export const updatePassTask = zodVaild(zodUpdatePassTask, async (p: UpdatePassTask) => {
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
      },
    });
    id = res.id;
  } catch (err) {
    const msg = (err as Error).message;
    if (/duplicate key/.test(msg)) {
      throw new Error(i18nKeys.名称重复);
    }
  }

  return { ...success, id };
});
