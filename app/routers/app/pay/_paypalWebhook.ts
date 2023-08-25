import { success } from "fastify-glob-router/success";
import paypalSdk from "paypal-rest-sdk";
import { orm, pgxTx } from "pgx";
import { redisx } from "redisx";
import { config } from "up-dir-env";
import { tables } from "../../../serve/tables";
import { LicenseCreateProps, licenseCreate } from "./_licenseCreate";
import { licenseRenew } from "./_licenseRenew";
import { PaymentCaptureCompleted } from "./_paypalWebhookTypes";
import { prefixPay } from "./_prefixs";
import { errNotFoundOrder } from "./_wechatCallback";

config();
export const paypalSdkConfig = {
  mode: "live", //sandbox or live
  client_id: "",
  client_secret: "",
};

let webhook_id = "";

function paypalVerify(headers: Record<string, string>, body: Record<string, unknown>) {
  if (!paypalSdkConfig.client_id) {
    config();
    paypalSdkConfig.client_id = process.env.paypal_client_id || "";
    paypalSdkConfig.client_secret = process.env.paypal_client_secret || "";
    webhook_id = process.env.paypal_webhook_id || "";
    paypalSdk.configure(paypalSdkConfig);
  }
  return new Promise((res, rej) => {
    paypalSdk.notification.webhookEvent.verify(
      {
        ...headers,
        Authorization: "Bearer Access-Token",
      },
      body,
      webhook_id,
      function (error, response) {
        if (error) {
          rej(error);
        } else if (response.verification_status !== "SUCCESS") {
          rej(new Error("paypal hook href verify error"));
        } else {
          res(response);
        }
      },
    );
  });
}

export const paypal_webhook = async (p: PaymentCaptureCompleted, headers: Record<string, string>) => {
  const paypalId = p.resource.id;
  const oid = p.resource.custom_id;
  const value = p.resource.amount.value;
  const currency_code = p.resource.amount.currency_code;

  // 验证 paypal 的请求是否真实
  await paypalVerify(headers, p);

  // 查询redis是否有订单 id
  const order = await orm.updateOne<
    unknown,
    { count: number; oid: string; plan: LicenseCreateProps["plan"]; uid: string }
  >({
    table: tables.order,
    filter: {
      eq: {
        oid,
        attach: `testflowy__${currency_code}_${value}`,
        done: 0,
      },
    },
    data: {
      paypalId,
      done: 1,
    },
  });

  if (!order) {
    throw errNotFoundOrder;
  }

  const licenseProps = {
    channel: "paypal" as const,
    count: order.count,
    oid: order.oid,
    plan: order.plan,
    uid: order.uid,
  };
  await pgxTx(async (tx) => {
    if (order.plan === "month" || order.plan === "year") {
      // 月,年首次付费成功
      await licenseCreate(tx, licenseProps);
    } else if (licenseProps.plan === "renewMonth" || licenseProps.plan === "renewYear") {
      // 月,年续费成功
      await licenseRenew(tx, licenseProps);
    }
  });

  const rd = await redisx();
  await rd.setEx(prefixPay(oid), 60 * 30, "done"); // 15 分钟
  console.log("paypal webhook done, oid:", oid);

  return success;
};
