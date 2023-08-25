import { orm, pgxTx } from "pgx";
import { redisx } from "redisx";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { licenseCreate } from "./_licenseCreate";
import { licenseRenew } from "./_licenseRenew";
import { prefixPay } from "./_prefixs";
import { CALLBACK_PAY_PWD, WxPayCallback } from "./_wechatTypes";

export const errNotFoundOrder = new Error(i18nKeys.未找到订单);

// 微信, paypal支付回调
export async function wechatCallback(p: WxPayCallback) {
  if (p.pwd !== CALLBACK_PAY_PWD) {
    throw new Error("callback pwd is error");
  }

  await pgxTx(async (tx) => {
    const order = await orm.readOne({
      tx,
      table: tables.order,
      filter: {
        eq: {
          oid: p.oid,
          channel: "wechat",
          attach: p.attach,
          price: p.total + "",
          done: 0,
        },
      },
    });
    if (!order) {
      throw errNotFoundOrder;
    }
    await orm.updateOne({
      tx,
      table: tables.order,
      id: order.id,
      data: {
        wechatId: p.wechatId,
        done: 1,
      },
    });
    if (order.plan === "month" || order.plan === "year") {
      // 月,年首次付费成功
      await licenseCreate(tx, {
        count: Number(order.count) || 0,
        plan: order.plan,
        uid: order.uid,
      });
    } else if (order.plan === "renewMonth" || order.plan === "renewYear") {
      // 月,年续费成功
      await licenseRenew(tx, {
        count: Number(order.count) || 0,
        plan: order.plan,
        uid: order.uid,
        oid: p.oid,
      });
    } else {
      throw new Error("plan is warn");
    }
  });
  const rd = await redisx();
  await rd.setEx(prefixPay(p.oid), 60 * 300, "done"); // 150 分钟
  return { code: "SUCCESS" };
}
