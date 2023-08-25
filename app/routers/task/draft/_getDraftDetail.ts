import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodPlant, zodUid, zodUUID } from "../../zod";
import { Draft } from "./_createDraft";

const zodGetDraft = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  id: zodUid,
});
export type GetDraft = z.infer<typeof zodGetDraft>;

export const errNoFoundDraftDetail = new Error(i18nKeys.未找到数据);

export const getDraftDetail = zodVaild(zodGetDraft, async (p: GetDraft) => {
  await checkToken({ uid: p.uid, token: p.token, plant: p.plant });
  const list = await orm.readOne<unknown, Draft>({
    table: tables.draft,
    id: p.id,
    filter: {
      eq: {
        uid: p.uid,
      },
    },
  });
  if (!list) {
    throw errNoFoundDraftDetail;
  }
  return list;
});
