import { success } from "fastify-glob-router/success";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { prefixPay } from "./_prefixs";

const zodPayCheck = z.object({
  oid: z.string(),
});

const errNofoundOrder = new Error(i18nKeys.未找到订单);
// 用户查看订单是否完成
type PayCheck = z.infer<typeof zodPayCheck>;
export const payCheck = zodVaild(zodPayCheck, async (p: PayCheck) => {
  const rd = await redisx();
  const res = await rd.get(prefixPay(p.oid));
  // 成功支付
  if (res === "done") {
    return success;
  }

  // 有订单, 但是还没回掉成功
  if (res === "wait") {
    return {
      ok: 0,
    };
  }
  throw errNofoundOrder;
});
