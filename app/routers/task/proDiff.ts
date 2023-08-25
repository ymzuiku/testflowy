import { testMeta } from "utils/isDev";

export const canUseDraftLength = (isPro: boolean) => {
  if (testMeta.isTest) {
    return isPro ? 10 : 20;
  }
  return isPro ? 100 : 20;
};

export const canUseTaskLength = (isPro: boolean) => {
  if (testMeta.isTest) {
    return isPro ? 10 : 0;
  }
  return isPro ? 1000 : 0;
};

export const canSetTeamPeople = (isPro: boolean) => {
  if (testMeta.isTest) {
    return isPro ? 500 : 0;
  }
  return isPro ? 500 : 0;
};
