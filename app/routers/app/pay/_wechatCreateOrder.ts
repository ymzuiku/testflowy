import { orm } from "pgx";
import { redisx } from "redisx";
import { isDev } from "utils/isDev";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth, zodNumericString } from "../../zod";
import { priceToRMB, priceTotal } from "./info/price";
import { prefixPay } from "./_prefixs";
import { CREATE_OEDER_PWD, OrderInfo, PayOrder, PayOrderData, WECHAT_PAT_ORDER_URL } from "./_wechatTypes";

export const testHelp = {
  test: !!process.env.is_dev,
};

export const errNotFoundLicenesIds = new Error(i18nKeys.缺少License);

const zodPay = z.object({
  auth: zodAuth,
  plan: z.enum(["month", "year", "renewMonth", "renewYear"]),
  count: zodNumericString(z.number().min(1).max(999)),
  licenseIds: z.array(z.string()).optional(),
});

export type Pay = z.infer<typeof zodPay>;

// const errCreateOrder = new Error(i18nKeys.创建订单错误);

// 用户下单
export const wechatCreateOrder = zodVaild(zodPay, async (p: Pay) => {
  await checkToken(p.auth);
  const count = p.licenseIds && p.licenseIds ? p.licenseIds.length : p.count;
  const price = priceToRMB(priceTotal(p.plan, count) * 100);
  const dollars = priceTotal(p.plan, count);
  if (p.plan === "renewMonth" || p.plan === "renewYear") {
    if (!p.licenseIds || !p.licenseIds.length) {
      throw errNotFoundLicenesIds;
    }
  }

  const oid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // 随机字符串
  let pwd;
  if (testHelp.test) {
    pwd = "123456789";
  } else {
    pwd = Math.random().toString(36).substring(2);
  }
  const orderInfo: OrderInfo = {
    uid: p.auth.uid,
    plan: p.plan,
    channel: "wechat",
    count,
    price: price + "",
    dollars,
    oid,
    licenseIds: p.licenseIds,
    paypalId: "",
    wechatId: "",
    desc: `Testflowy ${p.plan} x${count}`,
    attach: `testflowy__${pwd}_${price}`,
    done: 0,
  };
  const res = await payWechat({
    desc: orderInfo.desc,
    attach: orderInfo.attach,
    total: price,
    pwd: CREATE_OEDER_PWD,
    oid: oid,
  });

  await orm.insertOne({
    table: tables.order,
    data: orderInfo,
  });

  const rd = await redisx();
  await rd.setEx(prefixPay(orderInfo.oid), 60 * 30, "wait");
  return {
    ...res,
    oid,
  };
});

// 利用中间服务创建wechat订单
export const payWechat = async (p: PayOrder): Promise<PayOrderData> => {
  if (testHelp.test || isDev()) {
    return { code_url: "https://baidu.com/?type=wechat", ok: "1", oid: p.oid };
  }
  return fetch(WECHAT_PAT_ORDER_URL, { method: "POST", body: JSON.stringify(p) }).then((v) => v.json());
};
