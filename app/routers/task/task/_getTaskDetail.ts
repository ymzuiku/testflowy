import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { zodPlant, zodUid, zodUUID } from "../../zod";
import { Draft } from "../draft/_createDraft";
import { errNoFoundDraftDetail } from "../draft/_getDraftDetail";

const zodGetTaskDetail = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  id: zodUid,
});
export type GetTaskDetail = z.infer<typeof zodGetTaskDetail>;

export const getTaskDetail = zodVaild(zodGetTaskDetail, async (p: GetTaskDetail) => {
  const license = await checkLicene({ uid: p.uid, token: p.token, plant: p.plant });
  const list = await orm.readOne<unknown, Draft>({
    table: tables.task,
    id: p.id,
    filter: {
      eq: {
        owner: license.owner,
      },
    },
  });
  if (!list) {
    throw errNoFoundDraftDetail;
  }
  return list;
});
