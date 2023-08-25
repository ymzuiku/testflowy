import { randomEmail } from "utils/strs/randomEmail";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddLogin } from "../_login.test";
import { errInvitationOwnerEmail, errInvitationSelf, sendInvitationEmail } from "./_sendInvitationEmail";

it("check invitation not register", async () => {
  const owner = await tddLogin();
  const [, err] = await zodTry(() =>
    sendInvitationEmail({
      email: randomEmail(),
      ownerEmail: owner.email,
      auth: owner,
    }),
  );
  expect(err).eq(void 0);
});

it("check invitation registered", async () => {
  const owner = await tddLogin();
  const [, err] = await zodTry(() =>
    sendInvitationEmail({
      email: randomEmail(),
      ownerEmail: owner.email,
      auth: owner,
    }),
  );
  expect(err).eq(void 0);
});

it("check invitation self", async () => {
  const owner = await tddLogin();
  const email = randomEmail();
  const [, err] = await zodTry(() =>
    sendInvitationEmail({
      email,
      ownerEmail: email,
      auth: owner,
    }),
  );
  expect(err).eq(errInvitationSelf);
});

it("check invitation owner email error", async () => {
  const owner = await tddLogin();
  const email = randomEmail();
  const [, err] = await zodTry(() =>
    sendInvitationEmail({
      email,
      ownerEmail: email + "1",
      auth: owner,
    }),
  );
  expect(err).eq(errInvitationOwnerEmail);
});
