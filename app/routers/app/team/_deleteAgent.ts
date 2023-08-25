import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkTeamOwnerToken } from "../../login/_token";
import { zodAuth, zodUid } from "../../zod";
import { deleteLicenseUse } from "../license/_deleteLicenseUse";

const zodDeleteTeam = z.object({
  auth: zodAuth,
  agentId: zodUid,
});

export type DeleteTeam = z.infer<typeof zodDeleteTeam>;

// 移除代理人
export const deleteAgent = zodVaild(zodDeleteTeam, async (p: DeleteTeam) => {
  await checkTeamOwnerToken(p.auth);
  await orm.updateOne({
    table: tables.account,
    id: p.agentId,
    data: {
      owner: "self",
      agent: "owner",
    },
  });

  await deleteLicenseUse({ auth: p.auth, agentId: p.agentId });
  return success;
});
