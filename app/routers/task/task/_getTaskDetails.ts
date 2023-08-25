import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { zodAuth } from "../../zod";
import { Draft } from "../draft/_createDraft";

const zodTaskDetails = z.object({
  auth: zodAuth,
  ids: z.array(z.string()),
});
type TaskDetails = z.infer<typeof zodTaskDetails>;

export const getTaskDetails = zodVaild(zodTaskDetails, async (p: TaskDetails) => {
  const license = await checkLicene(p.auth);
  const res = await orm.readMany<unknown, Draft>({
    table: tables.task,
    ids: p.ids,
    total: false,
    filter: {
      eq: {
        owner: license.owner,
      },
    },
  });
  return res;
});
