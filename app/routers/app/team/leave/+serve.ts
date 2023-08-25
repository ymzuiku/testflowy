import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../../serve/tables";
import { checkToken } from "../../../login/_token";
import { zodAuth } from "../../../zod";

const zodLeaveteam = z.object({
  auth: zodAuth,
});

export type LeaveTeam = z.infer<typeof zodLeaveteam>;

export const leaveTeam = zodVaild(zodLeaveteam, async (p: LeaveTeam) => {
  await checkToken(p.auth);
  await orm.updateOne({
    table: tables.account,
    id: p.auth.uid,
    data: {
      owner: "",
      agent: "",
    },
  });
  return success;
});

export const PATCH = leaveTeam;
