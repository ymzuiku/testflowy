import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodNumericString, zodPlant, zodUid, zodUUID } from "../../zod";
import { Draft } from "./_createDraft";

const zodGetDrafts = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  limit: zodNumericString(z.number().min(1).max(30)),
  name: z.string().optional(),
  offset: zodNumericString(z.number()),
  pass: z.boolean().optional(),
});
export type GetDrafts = z.infer<typeof zodGetDrafts>;

export type DraftListItem = Omit<Draft, "code"> & { edited?: boolean; editName?: string; selected?: boolean };

export const getDrafts = zodVaild(zodGetDrafts, async (p: GetDrafts) => {
  await checkToken(p);
  const eq = {
    uid: p.uid,
  } as Record<string, unknown>;

  if (p.pass !== void 0) {
    eq.pass = p.pass;
  }
  const list = await orm.readMany<Draft, DraftListItem>({
    table: tables.draft,
    filter: {
      eq,
      comparable: p.name ? [["name", "like", p.name]] : void 0,
      offset: p.offset,
      order: "createAt",
      limit: p.limit,
    },
    total: true,
    returnColumns: ["auth", "id", "md5", "name", "steps", "pass", "crypto"],
  });
  return list;
});
