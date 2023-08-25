import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth, zodUid } from "../../zod";
import { checkDraftLength } from "./_createDraft";

const zodUpdatePassDraft = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
  uid: zodUid.optional(),
  // md5: z.string().min(3),
  pass: z.boolean().optional(),
});

export type UpdatePassDraft = z.infer<typeof zodUpdatePassDraft>;

export const updatePassDarft = zodVaild(zodUpdatePassDraft, async (p: UpdatePassDraft) => {
  await checkToken(p.auth!);
  await checkDraftLength(p.auth!);
  const uid = p.auth!.uid;
  delete p.auth;
  let id = "";
  try {
    const res = await orm.updateOne({
      table: tables.draft,
      id: p.id,
      data: p,
      filter: {
        eq: { uid },
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
