// Don't edit
// Auto create with glob-router
/* eslint-disable */

export interface PageItem {
  path: string;
  render: () => Promise<any>;
}

export const pages = {
  admin_accounts: {
    path: "/admin/accounts",
    render: () => import("./admin/accounts/+page"),
  },
  admin_login: {
    path: "/admin/login",
    render: () => import("./admin/login/+page"),
  },
  admin_orders: {
    path: "/admin/orders",
    render: () => import("./admin/orders/+page"),
  },
  app: {
    path: "/app",
    render: () => import("./app/+page"),
  },
  app_doc: {
    path: "/app/doc",
    render: () => import("./app/doc/+page"),
  },
  app_example: {
    path: "/app/example",
    render: () => import("./app/example/+page"),
  },
  app_pay: {
    path: "/app/pay",
    render: () => import("./app/pay/+page"),
  },
  app_pay_info: {
    path: "/app/pay/info",
    render: () => import("./app/pay/info/+page"),
  },
  app_pay_info_paypalPay: {
    path: "/app/pay/info/paypalPay",
    render: () => import("./app/pay/info/paypalPay/+page"),
  },
  app_pay_info_wechatPay: {
    path: "/app/pay/info/wechatPay",
    render: () => import("./app/pay/info/wechatPay/+page"),
  },
  app_report: {
    path: "/app/report",
    render: () => import("./app/report/+page"),
  },
  login: {
    path: "/login",
    render: () => import("./login/+page"),
  },
  login_changePwd: {
    path: "/login/changePwd",
    render: () => import("./login/changePwd/+page"),
  },
  login_invitation: {
    path: "/login/invitation",
    render: () => import("./login/invitation/+page"),
  },
  login_invitation_register: {
    path: "/login/invitation/register",
    render: () => import("./login/invitation/register/+page"),
  },
  login_register: {
    path: "/login/register",
    render: () => import("./login/register/+page"),
  },
  welcome: {
    path: "/welcome",
    render: () => import("./welcome/+page"),
  },
  welcome_aboutUs: {
    path: "/welcome/aboutUs",
    render: () => import("./welcome/aboutUs/+page"),
  },
  welcome_doc: {
    path: "/welcome/doc",
    render: () => import("./welcome/doc/+page"),
  },
  welcome_example: {
    path: "/welcome/example",
    render: () => import("./welcome/example/+page"),
  },
  welcome_price: {
    path: "/welcome/price",
    render: () => import("./welcome/price/+page"),
  },
  welcome_privacyPolicy: {
    path: "/welcome/privacyPolicy",
    render: () => import("./welcome/privacyPolicy/+page"),
  },
  welcome_termsOfService: {
    path: "/welcome/termsOfService",
    render: () => import("./welcome/termsOfService/+page"),
  },
};

export const pageArray: PageItem[] = [];
Object.keys(pages).forEach((k) => {
  const item = (pages as any)[k];
  pageArray.push(item);
});
