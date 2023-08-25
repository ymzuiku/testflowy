// Don't edit
// Auto create with glob-router
/* eslint-disable */

import type * as admin_accounts from "./admin/accounts/+serve";  
import type * as admin_orders from "./admin/orders/+serve";  
import type * as app_license from "./app/license/+serve";  
import type * as app_pay from "./app/pay/+serve";  
import type * as app_team from "./app/team/+serve";  
import type * as app_team_leave from "./app/team/leave/+serve";  
import type * as login from "./login/+serve";  
import type * as login_changePwd from "./login/changePwd/+serve";  
import type * as login_invitation from "./login/invitation/+serve";  
import type * as login_register from "./login/register/+serve";  
import type * as task_draft from "./task/draft/+serve";  
import type * as task_task from "./task/task/+serve";  

export const apiOptions = {
  fetcher: (url: string, method: string, body: any) => {
    if (typeof window == "undefined") {
      return null;
    }
    if (method === "GET") {
      let params = new URLSearchParams(body).toString()
      if (params) {
        params = "?" + params
      }
      return fetch(url + params, { method })
        .then((v) => {
          return v.json();
        })
        .then((v) => {
          if (v.error) {
            apiOptions.onError(v);
          }
          return v;
        }).catch(err=>{
          return err;
        });
    }
    return fetch(url, { method, body: body ? JSON.stringify(body): void 0 })
      .then((v) => v.json())
      .then((v) => {
        if (v.error) {
          apiOptions.onError(v);
        }
        return v;
      }).catch(err=>{
        return err;
      });
  },
  onError: (error: any) => {},
  baseUrl: "",
};

export const apis = {
  admin_accounts: {
    checkAdmin: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/admin/accounts/checkAdmin", "POST", args);
		}) as any as typeof admin_accounts.checkAdmin,
getAccounts: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/admin/accounts/getAccounts", "POST", args);
		}) as any as typeof admin_accounts.getAccounts,

  },
  admin_orders: {
    getOrders: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/admin/orders/getOrders", "POST", args);
		}) as any as typeof admin_orders.getOrders,

  },
  app_license: {
    getLicense: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/license/getLicense", "POST", args);
		}) as any as typeof app_license.getLicense,
setLicenseUse: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/license/setLicenseUse", "POST", args);
		}) as any as typeof app_license.setLicenseUse,
deleteLicenseUse: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/license/deleteLicenseUse", "PATCH", args);
		}) as any as typeof app_license.deleteLicenseUse,
checkLicene: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/license/checkLicene", "POST", args);
		}) as any as typeof app_license.checkLicene,
getAgentLicense: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/license/getAgentLicense", "POST", args);
		}) as any as typeof app_license.getAgentLicense,

  },
  app_pay: {
    payCheck: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/pay/payCheck", "POST", args);
		}) as any as typeof app_pay.payCheck,
wechatCreateOrder: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/pay/wechatCreateOrder", "POST", args);
		}) as any as typeof app_pay.wechatCreateOrder,
wechatCallback: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/pay/wechatCallback", "POST", args);
		}) as any as typeof app_pay.wechatCallback,
paypal_webhook: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/pay/paypal_webhook", "POST", args);
		}) as any as typeof app_pay.paypal_webhook,
paypalCreateOrder: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/pay/paypalCreateOrder", "POST", args);
		}) as any as typeof app_pay.paypalCreateOrder,

  },
  app_team: {
    getTeamList: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/team/getTeamList", "POST", args);
		}) as any as typeof app_team.getTeamList,
changeAgent: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/team/changeAgent", "PATCH", args);
		}) as any as typeof app_team.changeAgent,
deleteAgent: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/app/team/deleteAgent", "DELETE", args);
		}) as any as typeof app_team.deleteAgent,

  },
  app_team_leave: {
    
    PATCH: ((args: any) => {
      return apiOptions.fetcher(apiOptions.baseUrl + "/app/team/leave", "PATCH", args);
    }) as any as typeof app_team_leave.PATCH,
      
  },
  login: {
    login: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/login", "POST", args);
		}) as any as typeof login.login,
checkToken: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/checkToken", "POST", args);
		}) as any as typeof login.checkToken,

  },
  login_changePwd: {
    changePwd: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/changePwd/changePwd", "POST", args);
		}) as any as typeof login_changePwd.changePwd,
sendChangePwdEmail: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/changePwd/sendChangePwdEmail", "POST", args);
		}) as any as typeof login_changePwd.sendChangePwdEmail,

  },
  login_invitation: {
    registerAndInvitation: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/invitation/registerAndInvitation", "POST", args);
		}) as any as typeof login_invitation.registerAndInvitation,
invitation: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/invitation/invitation", "POST", args);
		}) as any as typeof login_invitation.invitation,
sendInvitationEmail: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/invitation/sendInvitationEmail", "POST", args);
		}) as any as typeof login_invitation.sendInvitationEmail,

  },
  login_register: {
    register: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/register/register", "POST", args);
		}) as any as typeof login_register.register,
sendRegisterEmail: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/login/register/sendRegisterEmail", "POST", args);
		}) as any as typeof login_register.sendRegisterEmail,

  },
  task_draft: {
    getDraftDetail: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/getDraftDetail", "POST", args);
		}) as any as typeof task_draft.getDraftDetail,
createDraft: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/createDraft", "POST", args);
		}) as any as typeof task_draft.createDraft,
updateDarft: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/updateDarft", "PATCH", args);
		}) as any as typeof task_draft.updateDarft,
deleteDraft: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/deleteDraft", "DELETE", args);
		}) as any as typeof task_draft.deleteDraft,
getDraftDetails: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/getDraftDetails", "POST", args);
		}) as any as typeof task_draft.getDraftDetails,
getDrafts: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/getDrafts", "POST", args);
		}) as any as typeof task_draft.getDrafts,
updatePassDarft: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/draft/updatePassDarft", "PATCH", args);
		}) as any as typeof task_draft.updatePassDarft,

  },
  task_task: {
    createTask: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/createTask", "POST", args);
		}) as any as typeof task_task.createTask,
getTasks: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/getTasks", "POST", args);
		}) as any as typeof task_task.getTasks,
deleteTask: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/deleteTask", "DELETE", args);
		}) as any as typeof task_task.deleteTask,
getTaskDetails: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/getTaskDetails", "POST", args);
		}) as any as typeof task_task.getTaskDetails,
getTaskDetail: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/getTaskDetail", "POST", args);
		}) as any as typeof task_task.getTaskDetail,
updateTask: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/updateTask", "PATCH", args);
		}) as any as typeof task_task.updateTask,
updatePassTask: ((args:any)=>{
			return apiOptions.fetcher(apiOptions.baseUrl + "/task/task/updatePassTask", "PATCH", args);
		}) as any as typeof task_task.updatePassTask,

  },
};