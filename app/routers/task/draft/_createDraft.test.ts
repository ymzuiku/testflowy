import { testMeta } from "utils/isDev";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { tddLicenseUse } from "../../app/license/_checkLicense.test";
import { tddRegisterAndInvitation } from "../../login/invitation/_registerAndInvitation.test";
import { errToken } from "../../login/_token";
import { Auth } from "../../zod";
import { canUseDraftLength } from "../proDiff";
import { createDraft, errMaxProDraftLength } from "./_createDraft";
import { updateDarft } from "./_updateDraft";

export const tddCreateDraft = async (): Promise<[{ id: string }, Auth, Auth]> => {
  const [account, agent] = await tddLicenseUse();
  const [res, err] = await zodTry(async () => {
    return createDraft({
      auth: account,
      code: JSON.stringify({ events: [{ type: "input", value: "base-test-value" }], meta: {} }),
      md5: "theMd5123",
      name: "create draft" + Math.random().toString(36).substring(2),
      steps: 1,
      crypto: false,
      pass: false,
    });
  });
  expect(err).eq(void 0);
  expect(res?.ok).eq(1);
  return [res!, account, agent];
};

it("create draft success", async () => {
  await tddCreateDraft();
});

it("create draft no auth", async () => {
  const [account] = await tddRegisterAndInvitation();
  account.token += "1";
  const [, err] = await zodTry(() => {
    return createDraft({
      auth: account,
      code: JSON.stringify({ events: [{ type: "input", value: "123" }], meta: {} }),
      md5: "12311111111111111111111",
      name: "create draft" + Math.random().toString(36).substring(2),
      steps: 1,
      crypto: false,
      pass: false,
    });
  });
  expect(err).eq(errToken);
});

it("create/update draft to max", async () => {
  const [account] = await tddLicenseUse();
  testMeta.isTest = true;
  const arr = Array(canUseDraftLength(true)).fill(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _item of arr) {
    const [res, err] = await zodTry(async () => {
      return createDraft({
        auth: account,
        code: JSON.stringify({ events: [{ type: "input", value: "base-test-value" }], meta: {} }),
        md5: "12311111111111111111111",
        name: "create draft" + Math.random().toString(36).substring(2),
        steps: 1,
        crypto: false,
        pass: false,
      });
    });
    expect(err).eq(void 0);
    expect(res?.ok).eq(1);
  }
  {
    const [, err] = await zodTry(async () => {
      return createDraft({
        auth: account,
        code: JSON.stringify({ events: [{ type: "input", value: "base-test-value" }], meta: {} }),
        md5: "12311111111111111111111",
        name: "create draft" + Math.random().toString(36).substring(2),
        steps: 1,
        crypto: false,
        pass: false,
      });
    });
    expect(err).eq(errMaxProDraftLength);
  }
  {
    const nextName = Math.random().toString(36).substring(2);
    const [, err] = await zodTry(async () => {
      return updateDarft({
        auth: account,
        code: "next-code-name",
        md5: nextName,
        crypto: false,
        name: nextName,
      });
    });
    expect(err).eq(errMaxProDraftLength);
  }
});

// it("create draft name unique", async () => {
//   const [account] = await tddRegisterAndInvitation();
//   const name = "create draft" + Math.random().toString(36).substring(2);
//   {
//     const [res, err] = await zodTry(() => {
//       return createDraft({
//         auth: account,
//         code: JSON.stringify({ events: [{ type: "input", value: "123" }], meta: {} }),
//         md5: "12311111111111111111111",
//         name,
//         steps: 1,
//       });
//     });
//     expect(err).eq(void 0);
//     expect(res?.ok).eq(1);
//   }
//   {
//     const [, err] = await zodTry(() => {
//       return createDraft({
//         auth: account,
//         code: JSON.stringify({ events: [{ type: "input", value: "123" }], meta: {} }),
//         md5: "12311111111111111111111",
//         name,
//         steps: 1,
//       });
//     });
//     expect(err).eq(errNameUnique);
//   }
// });
