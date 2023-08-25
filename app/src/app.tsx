/* @refresh reload */

import { render } from "solid-js/web";
import { solidMsg } from "solid-msg";
import { historyProxy, stackOptions } from "solid-router-stack";
import { i18n } from "../i18n";
import { routers } from "../routers";
import { appStorage, getAuth, logout, storageTemp } from "../routers/appStorage";
import { css } from "../routers/css";
import { apiOptions, apis } from "../routers/_apis";

const preloadRouters = ["app_pay", "app_setting", "app_report", "app_team"];
routers.app.preload = preloadRouters;
routers.app_report.preload = preloadRouters;
routers.app_pay.preload = preloadRouters;

solidMsg.setOptions({ position: "top" });
apiOptions.baseUrl = "/v1";
apiOptions.onError = (err) => {
  const msg = (i18n as unknown as Record<string, string>)[err.message] || err.message;
  if (msg === i18n.登录状态已过期) {
    logout();
  }
  solidMsg.red(msg);
};

const needLogin = {
  [routers.app.path]: true,
  [routers.app_pay.path]: true,
  [routers.app_report.path]: true,
  // [routers.tool.path]: true,
} as Record<string, boolean>;

historyProxy.beforeChange(async (url, path) => {
  // 如果需要登录态, 但是没有token, 就去登录
  if (needLogin[path] && !appStorage.val.token) {
    return routers.login.path;
  }
  if (needLogin[path] && !storageTemp.val.checkedToken) {
    const account = await apis.login.checkToken(getAuth());
    if (!account || !account.id) {
      storageTemp.assign({ checkedToken: true });
      return routers.login.path;
    }
  }
  // 如果如果有SDKID, 登录后去tool页面
  // if (path === routers.app.path && isSdk) {
  //   return routers.tool.path;
  // }
  //
  if (path === routers.login.path && appStorage.val.token) {
    const account = await apis.login.checkToken(getAuth());
    if (account.id) {
      return routers.app.path;
    }
  }
  return url;
});

if (appStorage.val.token) {
  apis.login.checkToken(getAuth()).then((account) => {
    appStorage.assign({
      uid: account.id,
      email: account.email,
      agent: account.agent,
      payed: account.payed,
      createAt: account.createAt,
      owner: account.owner,
      token: account.token,
    });
  });
}
solidMsg.setOptions({
  duration: 10000,
  progress: false,
});

stackOptions.style = css.pageBg;
document.body.style.fontFamily = "var(--ux-sans)";
document.body.style.padding = "0";
document.body.style.margin = "0";
render(() => <routers.Routers root={routers.welcome} hash />, document.getElementById("root")!);

const root = document.getElementById("root")!;
root.style.cssText = "";
