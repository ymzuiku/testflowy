import { orm } from "pgx";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkTeamOwnerToken } from "../../login/_token";
import { Auth, zodAuth } from "../../zod";

export const getLicenseInServe = async (uid: string) => {
  const res = await orm.readMany<unknown, { useUid: string; owner: string; end: string }>({
    table: tables.license,
    filter: {
      eq: {
        owner: uid,
      },
      limit: 500,
      order: "createAt",
      desc: false,
    },
  });
  return res;
};

export const getLicense = zodVaild(zodAuth, async (p: Auth) => {
  await checkTeamOwnerToken(p);
  return getLicenseInServe(p.uid);
});

export type License = Awaited<ReturnType<typeof getLicense>>["data"][0];
