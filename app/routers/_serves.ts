// Don't edit
// Auto create with glob-router
/* eslint-disable */

import * as admin_accounts from "./admin/accounts/+serve";  
import * as admin_orders from "./admin/orders/+serve";  
import * as app_license from "./app/license/+serve";  
import * as app_pay from "./app/pay/+serve";  
import * as app_team from "./app/team/+serve";  
import * as app_team_leave from "./app/team/leave/+serve";  
import * as login from "./login/+serve";  
import * as login_changePwd from "./login/changePwd/+serve";  
import * as login_invitation from "./login/invitation/+serve";  
import * as login_register from "./login/register/+serve";  
import * as task_draft from "./task/draft/+serve";  
import * as task_task from "./task/task/+serve";  


export interface ServeItem {
  path: string;
  serve: {
    GET?: (input: any) => any;
    DELETE?: (input: any) => any;
    POST?: (input: any) => any;
    PUT?: (input: any) => any;
    PATCH?: (input: any) => any;
  };
}

export const serves = {
  admin_accounts: {
    path: "/admin/accounts",
    serve: admin_accounts,
  },
  admin_orders: {
    path: "/admin/orders",
    serve: admin_orders,
  },
  app_license: {
    path: "/app/license",
    serve: app_license,
  },
  app_pay: {
    path: "/app/pay",
    serve: app_pay,
  },
  app_team: {
    path: "/app/team",
    serve: app_team,
  },
  app_team_leave: {
    path: "/app/team/leave",
    serve: app_team_leave,
  },
  login: {
    path: "/login",
    serve: login,
  },
  login_changePwd: {
    path: "/login/changePwd",
    serve: login_changePwd,
  },
  login_invitation: {
    path: "/login/invitation",
    serve: login_invitation,
  },
  login_register: {
    path: "/login/register",
    serve: login_register,
  },
  task_draft: {
    path: "/task/draft",
    serve: task_draft,
  },
  task_task: {
    path: "/task/task",
    serve: task_task,
  },
};


export const serveArray: ServeItem[] = [];
Object.keys(serves).forEach((k) => {
  const item = (serves as any)[k];
  serveArray.push(item);
});
