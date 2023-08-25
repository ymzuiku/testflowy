import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodLimit, zodOffset, zodPlant, zodUid, zodUUID } from "../../zod";

export const zodGetTeam = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  limit: zodLimit,
  offset: zodOffset,
});

export type GetTeam = z.infer<typeof zodGetTeam>;

// 获取代理人列表
export const getTeamList = zodVaild(zodGetTeam, async (p: GetTeam) => {
  await checkToken(p);
  const owner = await orm.readOne({
    table: tables.account,
    id: p.uid,
  });
  const res = await orm.readMany<unknown, { owner: string; email: string; agent: "owner" | "admin" | "agent" }>({
    table: tables.account,
    filter: {
      eq: {
        owner: p.uid,
      },
      limit: p.limit,
      offset: p.offset,
    },
    total: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.data = [owner as any, ...res.data];
  res.total += 1;
  res.data = res.data.map((v) => {
    return {
      createAt: v.createAt,
      updateAt: v.updateAt,
      id: v.id,
      owner: v.owner,
      email: v.email,
      agent: v.agent,
    };
  });
  return res;
});

export type TeamList = Awaited<ReturnType<typeof getTeamList>>["data"];
