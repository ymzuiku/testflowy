import { NanoStorage } from "nano-storage";
import { routers } from ".";

export const appStorage = NanoStorage("testflowy_v1", {
  searchs: [] as string[],
  token: "",
  payed: false,
  uid: "",
  isAdmin: false,
  email: "",
  owner: "",
  agent: "",
  createAt: "",
  plant: "pc" as "mobile" | "pc",
});

export const isAgent = () => {
  return appStorage.val.owner && appStorage.val.agent === "agent";
};

export const logout = () => {
  appStorage.clear();
  document.cookie = "";
  routers.welcome.clearTo();
};

export const getAuth = () => {
  return { token: appStorage.val.token, uid: appStorage.val.uid, plant: appStorage.val.plant };
};

export const storageTemp = NanoStorage(
  "testflowy_temp_v1",
  {
    checkedToken: false,
  },
  "sessionStorage",
);
