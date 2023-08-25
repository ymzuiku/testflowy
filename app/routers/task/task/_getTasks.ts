import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { zodNumericString, zodPlant, zodUid, zodUUID } from "../../zod";
import type { Draft } from "../draft/_createDraft";

const zodGetTasks = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  limit: zodNumericString(z.number().min(1).max(30)),
  name: z.string().optional(),
  offset: zodNumericString(z.number()),
  owner: zodUid,
  pass: z.boolean().optional(),
});
export type GetTasks = z.infer<typeof zodGetTasks>;

export type TaskListItem = Omit<Draft, "code"> & { edited?: boolean; editName?: string; selected?: boolean };

export const getTasks = zodVaild(zodGetTasks, async (p: GetTasks) => {
  const license = await checkLicene(p);
  const eq = {
    owner: license.owner,
  } as Record<string, unknown>;

  if (p.pass !== void 0) {
    eq.pass = p.pass;
  }
  const list = await orm.readMany<Draft, TaskListItem>({
    table: tables.task,
    filter: {
      eq,
      comparable: p.name ? [["name", "like", p.name]] : void 0,
      offset: p.offset,
      order: "createAt",
      limit: p.limit,
    },
    total: true,
    returnColumns: ["auth", "id", "md5", "owner", "name", "steps", "pass", "crypto"],
  });
  return list;
});
