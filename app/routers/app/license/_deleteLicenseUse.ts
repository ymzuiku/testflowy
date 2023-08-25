import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth, zodUid } from "../../zod";

export const zodDeleteLicenseUse = z.object({
  auth: zodAuth,
  agentId: zodUid,
});
export type DeleteLicenseUse = z.infer<typeof zodDeleteLicenseUse>;

export const deleteLicenseUse = zodVaild(zodDeleteLicenseUse, async (p: DeleteLicenseUse) => {
  await checkToken(p.auth);
  await orm.updateMany({
    table: tables.license,
    filter: {
      eq: {
        useUid: p.agentId,
      },
    },
    data: {
      useUid: "__" + Math.random().toString(36).substring(2),
    },
  });
  return success;
});
