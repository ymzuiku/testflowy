import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { login } from "../+serve";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tddLogin } from "../_login.test";
import { checkTeamOwnerToken, errTeamToken } from "../_token";
import { registerAndInvitation } from "./+serve";
import { errCodeNotMatch, sendInvitationEmail } from "./_sendInvitationEmail";

export function accountToAuth(account: { id: string; token: string; email: string }) {
  return { uid: account.id, token: account.token, plant: "pc" as "pc" | "mobile", email: account.email };
}

export const tddRegisterAndInvitation = async () => {
  const account = await tddLogin();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  const res = await registerAndInvitation({
    code: "999999",
    email,
    owner: account.uid,
    pwd: "123123",
  });
  expect(res.ok).equal(1);
  const agent = await login({ email, pwd: "123123", plant: "pc" });
  expect(agent.owner).eq(account.uid);
  return [account, accountToAuth(agent)];
};

it("test user register and invitation success", async () => {
  await tddRegisterAndInvitation();
});

it("test user register and invitation code fail", async () => {
  const account = await tddLogin();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  try {
    await registerAndInvitation({
      code: "999995",
      email,
      owner: account.uid,
      pwd: "123123",
    });
  } catch (err) {
    expect(err).equal(errCodeNotMatch);
  }
});

it("test user register and invitation pwd fail", async () => {
  const account = await tddLogin();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    registerAndInvitation({
      code: "999999",
      email,
      owner: account.uid,
      pwd: "123",
    }),
  );
  expect(err!.message).equal(i18nKeys.密码太短);
});

it("test user register and invitation owner fail", async () => {
  const account = await tddLogin();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    registerAndInvitation({
      code: "999999",
      email,
      owner: account.uid + 10,
      pwd: "123123",
    }),
  );
  expect(err!.message).equal(i18nKeys.验证码不正确);
});

it("test user register and invitation angel email fail", async () => {
  const account = await tddLogin();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    registerAndInvitation({
      code: "999999",
      email: email + "b",
      owner: account.uid,
      pwd: "123123",
    }),
  );
  expect(err!.message).equal(i18nKeys.验证码不正确);
});

it("检测登录-是否是企业主", async () => {
  {
    const account = await tddLogin();
    const [res, err] = await zodTry(() =>
      checkTeamOwnerToken({ uid: account.uid, plant: account.plant, token: account.token }),
    );
    expect(err).eq(void 0);
    expect(res?.ok).eq(1);
  }
});

it("检测登录-是否是企业主-邀请的用户", async () => {
  {
    const [account, agent] = await tddRegisterAndInvitation();
    {
      const [res, err] = await zodTry(() => checkTeamOwnerToken(account));
      expect(err).eq(void 0);
      expect(res?.ok).eq(1);
    }
    {
      const [, err] = await zodTry(() => checkTeamOwnerToken(agent));
      expect(err).eq(errTeamToken);
    }
  }
});
