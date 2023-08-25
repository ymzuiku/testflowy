import { z } from "zod";

export const CREATE_OEDER_PWD = "lesstranslate-wechatpay-thrid-app-create-order-v01";
export const CALLBACK_PAY_PWD = "lesstranslate-wechatpay-thrid-app-callback-v01";
export const WECHAT_PAT_ORDER_URL = "https://lesstranslate.com/v1/order/thrid";

export const zodPayOrder = z.object({
  total: z.number(),
  desc: z.string(),
  attach: z.string(),
  oid: z.string(),
  pwd: z.string(),
});

export type PayOrder = z.infer<typeof zodPayOrder>;

export interface OrderInfo {
  uid: string;
  channel: "paypal" | "wechat" | "trial";
  count: number;
  plan: "month" | "year" | "renewMonth" | "renewYear" | "trial";
  price: string; // 支付价格, 和支付渠道一致, 但无法作为统计用
  dollars: number; // 全部换算成美金, 方便统计微信支付和paypal支付的总价格
  oid: string;
  paypalId: string;
  desc: string;
  wechatId: string;
  done: number;
  attach: string;
  licenseIds?: string[];
}

export interface PayOrderData {
  code_url: string;
  oid: string;
  ok: string;
}

export interface WxPayCallback {
  wechatId: string;
  oid: string;
  total: string;
  pwd: string;
  attach: string;
}

export interface Attach {
  pwd: string;
  app: "testflowy";
}
