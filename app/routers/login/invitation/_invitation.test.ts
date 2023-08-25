import { orm } from "pgx";
import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { tddLogin } from "../_login.test";
import { invitation } from "./_invitation";
import { errCodeNotMatch, errEmailNotRegister, sendInvitationEmail } from "./_sendInvitationEmail";

export const tddInvitation = async () => {
  const account = await tddLogin();
  const agent = await tddLogin();
  await sendInvitationEmail({
    auth: account,
    email: agent.email,
    ownerEmail: account.email,
  });
  const res = await invitation({
    email: agent.email,
    code: "999999",
    owner: account.uid,
  });
  expect(res?.ok).equal(1);
  const user = await orm.readOne<unknown, { owner: string }>({
    table: tables.account,
    id: agent.uid,
  });
  expect(user.owner).eq(account.uid);
  return agent;
};

it("test user invitation success", async () => {
  await tddInvitation();
});

it("test user invitation not register", async () => {
  const account = await tddLogin();
  // const agent = await tddInvitation();
  const email = randomEmail();
  await sendInvitationEmail({
    auth: account,
    email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    invitation({
      email,
      code: "999999",
      owner: account.uid,
    }),
  );
  expect(err).equal(errEmailNotRegister);
});

it("test user invitation again", async () => {
  const account = await tddLogin();
  const agent = await tddInvitation();
  await sendInvitationEmail({
    auth: account,
    email: agent.email,
    ownerEmail: account.email,
  });
  const res = await invitation({
    email: agent.email,
    code: "999999",
    owner: account.uid,
  });
  expect(res?.ok).equal(1);
});

it("test user invitation code fail", async () => {
  const account = await tddLogin();
  const agent = await tddLogin();
  await sendInvitationEmail({
    auth: account,
    email: agent.email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    invitation({
      email: agent.email,
      code: "999995",
      owner: account.uid,
    }),
  );
  expect(err).equal(errCodeNotMatch);
});

it("test user invitation owner fail", async () => {
  const account = await tddLogin();
  const agent = await tddLogin();
  await sendInvitationEmail({
    auth: account,
    email: agent.email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    invitation({
      email: agent.email,
      code: "999999",
      owner: account.uid + "1",
    }),
  );
  expect(err!.message).equal(i18nKeys.验证码不正确);
});

it("test user invitation angel email fail", async () => {
  const account = await tddLogin();
  const agent = await tddLogin();
  await sendInvitationEmail({
    auth: account,
    email: agent.email,
    ownerEmail: account.email,
  });
  const [, err] = await zodTry(() =>
    invitation({
      email: agent.email + "1",
      code: "999999",
      owner: account.uid,
    }),
  );
  expect(err!.message).equal(i18nKeys.验证码不正确);
});
