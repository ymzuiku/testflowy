import { redisx } from ".";

export const hasKey = async (key: string, error: Error) => {
  const rd = await redisx();
  if (await rd.get(key)) {
    throw error;
  }
};

export const sendCode = async (key: string, secondTimeout: number, value: string) => {
  const rd = await redisx();
  await rd.setEx(key, secondTimeout, value);
};

export const errSendCodeTimesOut = new Error("There are too many code checks. Please wait and send the code again.");
export const errSendCodeLockType = new Error("lock data type error");

export const checkSendCode = async (key: string, value: string, error: Error) => {
  const rd = await redisx();
  const lock = await rd.get("lock_" + key);
  const n = Number(lock) || 0;
  if (n > 5) {
    throw errSendCodeTimesOut;
  }
  const data = await rd.get(key);
  if (data !== value) {
    await rd.setEx("lock_" + key, 60 * 5, String(n + 1));
    throw error;
  }
  await rd.del(key);
  if (n > 0) {
    await rd.del("lock_" + key);
  }
};
