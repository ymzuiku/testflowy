import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkTeamOwnerToken, updateToken } from "../../login/_token";
import { zodAuth, zodUid, zodUserAgent } from "../../zod";

const zodChangAgent = z.object({
  auth: zodAuth,
  agentId: zodUid,
  agent: zodUserAgent,
});

export type ChangeAgent = z.infer<typeof zodChangAgent>;

// 修改用户权限
export const changeAgent = zodVaild(zodChangAgent, async (p: ChangeAgent) => {
  await checkTeamOwnerToken(p.auth);
  const res = await orm.updateOne({
    table: tables.account,
    id: p.agentId,
    data: {
      owner: p.auth.uid,
      agent: p.agent,
    },
  });
  await updateToken(p.agentId);
  return res;
});
