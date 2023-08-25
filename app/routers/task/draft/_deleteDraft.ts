import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth, zodUid } from "../../zod";
import { prefixDraftLength } from "./_createDraft";

const zodDeleteDraft = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
});

export type DeleteDraft = z.infer<typeof zodDeleteDraft>;
export const deleteDraft = zodVaild(zodDeleteDraft, async (p: DeleteDraft) => {
  await checkToken(p.auth!);
  const uid = p.auth!.uid;
  await orm.deleteOne({
    table: tables.draft,
    id: p.id,
    filter: {
      eq: { uid },
    },
  });
  const rdsKey = prefixDraftLength(p.auth!.uid);
  const rds = await redisx();
  await rds.DEL(rdsKey);
  return success;
});
