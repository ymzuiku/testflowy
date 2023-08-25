import dayjs from "dayjs";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { Auth, zodAuth } from "../../zod";
import { getAgentLicense } from "./_getAgentLicense";

export const errLicenseOut = new Error(i18nKeys.LicenseExpired);

export const checkLicene = zodVaild(zodAuth, async (p: Auth) => {
  const license = await getAgentLicense(p);
  if (dayjs(license.end).diff() < 0) {
    throw errLicenseOut;
  }
  return license;
});

export const isInLicene = zodVaild(zodAuth, async (p: Auth) => {
  const license = await getAgentLicense(p);
  const ok = dayjs(license.end).diff() > 0;
  if (ok) {
    return license;
  }
  return void 0;
});
