import { success } from "fastify-glob-router/success";
import { orm, PoolClient } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkTeamOwnerToken } from "../../login/_token";
import { zodAuth, zodUid } from "../../zod";

export const zodSetLicenseUse = z.object({
  auth: zodAuth,
  licenseId: zodUid,
  agentId: zodUid,
});
export type SetLicenseUse = z.infer<typeof zodSetLicenseUse>;

export const setLicenseUseInServe = async (tx: PoolClient | null, p: SetLicenseUse) => {
  try {
    await orm.updateMany({
      tx,
      table: tables.license,
      filter: {
        eq: {
          useUid: p.agentId,
          // owner: p.auth.uid,
        },
      },
      data: {
        useUid: "__" + Math.random().toString(36).substring(2),
      },
    });
  } catch (err) {
    //
  }
  await orm.updateOne({
    tx,
    table: tables.license,
    id: p.licenseId,
    filter: {
      eq: {
        owner: p.auth.uid,
      },
    },
    data: {
      useUid: p.agentId,
    },
  });
  return success;
};

export const setLicenseUse = zodVaild(zodSetLicenseUse, async (p: SetLicenseUse) => {
  await checkTeamOwnerToken(p.auth);
  return setLicenseUseInServe(null, p);
});
