import { payCheck } from "./_payCheck";
import { paypalCreateOrder } from "./_paypalCreateOrder";
import { paypal_webhook } from "./_paypalWebhook";
import { wechatCallback } from "./_wechatCallback";
import { wechatCreateOrder } from "./_wechatCreateOrder";

payCheck.POST = true;
wechatCreateOrder.POST = true;

// @ts-ignore
wechatCallback.POST = true;
// @ts-ignore
paypal_webhook.POST = true;
paypalCreateOrder.POST = true;

export { payCheck, wechatCreateOrder, wechatCallback, paypalCreateOrder, paypal_webhook };
