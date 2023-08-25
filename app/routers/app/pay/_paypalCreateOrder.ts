import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { zodAuth, zodNumericString } from "../../zod";
import { priceTotal } from "./info/price";
import { prefixPay } from "./_prefixs";
import { OrderInfo } from "./_wechatTypes";

export const testHelp = {
  test: !!process.env.is_dev,
};

const zodPay = z.object({
  auth: zodAuth,
  plan: z.enum(["month", "year", "renewMonth", "renewYear"]),
  count: zodNumericString(z.number().min(1).max(999)),
  // paypalId: z.string(),
  currency_code: z.string(),
  value: z.string(),
  licenseIds: z.array(z.string()).optional(),
});

export type Pay = z.infer<typeof zodPay>;

// 用户下单
export const paypalCreateOrder = zodVaild(zodPay, async (p: Pay) => {
  await checkToken(p.auth);
  const count = p.licenseIds && p.licenseIds ? p.licenseIds.length : p.count;
  const price = priceTotal(p.plan, count);
  const dollars = priceTotal(p.plan, count);

  const oid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); // 随机字符串
  const orderInfo: OrderInfo = {
    uid: p.auth.uid,
    channel: "paypal",
    count: count,
    plan: p.plan,
    price: price + "",
    dollars,
    oid,
    licenseIds: p.licenseIds,
    paypalId: "",
    wechatId: "",
    done: 0,
    desc: `Testflowy ${p.plan} x${count}`,
    attach: `testflowy__${p.currency_code}_${p.value}`,
  };

  await orm.insertOne({
    table: tables.order,
    data: orderInfo,
  });

  const rd = await redisx();
  await rd.setEx(prefixPay(orderInfo.oid), 60 * 30, "wait");

  return { ...success, oid };
});
