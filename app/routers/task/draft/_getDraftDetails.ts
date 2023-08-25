import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth } from "../../zod";
import { Draft } from "./_createDraft";

const zodDraftDetails = z.object({
  auth: zodAuth,
  ids: z.array(z.string()),
});
type DraftDetails = z.infer<typeof zodDraftDetails>;

export const getDraftDetails = zodVaild(zodDraftDetails, async (p: DraftDetails) => {
  await checkToken(p.auth);
  const res = await orm.readMany<unknown, Draft>({
    table: tables.draft,
    ids: p.ids,
    total: false,
  });
  return res;
});
