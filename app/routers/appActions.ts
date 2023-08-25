import { isPhone } from "utils/device";
import { appStorage } from "./appStorage";
import { apis } from "./_apis";

export const actionLogin = async (p: { email: string; pwd: string }) => {
  const res = await apis.login.login({
    email: p.email,
    pwd: p.pwd,
    plant: isPhone() ? "mobile" : "pc",
  });

  if (res.token) {
    appStorage.set({
      uid: res.id,
      email: res.email,
      token: res.token,
      payed: res.payed,
      owner: res.owner || "",
      agent: res.agent || "",
      plant: res.plant as "pc",
      createAt: res.createAt,
      isAdmin: !!res.isAdmin,
    });
  }

  return !!res.token;
};
