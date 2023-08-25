import { expect, it } from "vitest";
import { checkSendCode, errSendCodeTimesOut, sendCode } from "./sendCode";

it("send-code success", async () => {
  const key = "a" + Math.random();
  const theErr = new Error("a");
  await sendCode(key, 5, "dog");
  await checkSendCode(key, "dog", theErr);
  expect(0).eq(0);
});

it("send-code error", async () => {
  const key = "a" + Math.random();
  const theErr = new Error("a");
  await sendCode(key, 5, "dog");
  try {
    await checkSendCode(key, "dog2", theErr);
  } catch (err) {
    expect(err).eq(theErr);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of Array(5).fill(0)) {
    try {
      await checkSendCode(key, "dog2", theErr);
    } catch (err) {
      //
    }
  }
  try {
    await checkSendCode(key, "dog2", theErr);
  } catch (err) {
    expect(err).eq(errSendCodeTimesOut);
  }
});
