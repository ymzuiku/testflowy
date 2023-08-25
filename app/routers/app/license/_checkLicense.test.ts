import dayjs from "dayjs";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddRegisterAndInvitation } from "../../login/invitation/_registerAndInvitation.test";
import { checkLicene } from "./_checkLicense";
import { errNoHaveAgentLicense } from "./_getAgentLicense";
import { getLicense } from "./_getLicense";
import { setLicenseUse } from "./_setLicenseUse";

export const tddLicenseUse = async () => {
  const [account, agent] = await tddRegisterAndInvitation();
  const licenseList = await getLicense(account);
  await setLicenseUse({ auth: account, agentId: account.uid, licenseId: licenseList.data[0].id });
  await setLicenseUse({ auth: account, agentId: agent.uid, licenseId: licenseList.data[1].id });
  {
    const [license, err] = await zodTry(() => {
      return checkLicene(agent);
    });
    expect(err).eq(void 0);
    expect(dayjs(license!.end).diff() > 0).eq(true);
    expect(license!.end.length > 5).eq(true);
  }

  {
    const [license, err] = await zodTry(() => {
      return checkLicene(account);
    });
    expect(license!.end.length > 5).eq(true);
    expect(err).eq(void 0);
  }
  return [account, agent];
};

it("license check is right", async () => {
  await tddLicenseUse();
});

it("license check is not set", async () => {
  const [, agent] = await tddRegisterAndInvitation();
  {
    const [, err] = await zodTry(() => {
      return checkLicene(agent);
    });
    expect(err).eq(errNoHaveAgentLicense);
  }
});

it("dayjs diff", () => {
  const end = dayjs().add(10, "day");
  expect(dayjs(end).diff() > 0).eq(true);
  {
    const now = dayjs().add(13, "day");
    expect(dayjs(end).diff(now) < 0).eq(true);
  }
  {
    const now = dayjs().add(9, "day");
    expect(dayjs(end).diff(now) > 0).eq(true);
  }
});
