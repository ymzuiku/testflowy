import { orm } from "pgx";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { Auth, zodAuth } from "../../zod";

interface License {
  owner: string;
  useUid: string;
  end: string;
  id: string;
}

export const errNoHaveAgentLicense = new Error(i18nKeys.未找到证书);

export const getAgentLicense = zodVaild(zodAuth, async (p: Auth) => {
  // const ok = await isTeamOwnerToken(p);

  // if (ok) {
  //   return {
  //     id: "self",
  //     useUid: p.uid,
  //     owner: p.uid,
  //     end: dayjs().add(45, "day").toString(),
  //   };
  // }

  const license = await orm.readOne<unknown, License>({
    table: tables.license,
    filter: {
      eq: {
        useUid: p.uid,
      },
    },
  });
  if (!license) {
    throw errNoHaveAgentLicense;
  }
  return license;
});
