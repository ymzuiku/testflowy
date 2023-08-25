import dayjs from "dayjs";
import { orm, PoolClient } from "pgx";
import { tables } from "../../../serve/tables";
import { OrderInfo } from "./_wechatTypes";

const errNoFoundLicenseIds = new Error("NoFoundLicenseIds");
const errFoundCountLicenseIdsNoEq = new Error("FoundCountLicenseIdsNoEq");

interface LicenseRenewProps {
  oid: string;
  plan: "month" | "year" | "renewMonth" | "renewYear" | "trial";
  count: number;
  uid: string;
  // channel: "paypal" | "wechat";
}

export function changeEndTime(time: string, addDay: number) {
  const baseTime = Date.now() > dayjs(time).toDate().getTime() ? Date.now() : time;
  const end = dayjs(baseTime).add(addDay, "day").toDate();
  return end;
}

export const licenseRenew = async (tx: PoolClient, props: LicenseRenewProps) => {
  const order: OrderInfo = await orm.readOne({
    tx,
    table: tables.order,
    filter: {
      eq: {
        oid: props.oid,
        // channel: props.channel,
        done: 1,
      },
    },
  });
  if (!order.licenseIds || !order.licenseIds.length) {
    throw errNoFoundLicenseIds;
  }
  const license = await orm.readMany({
    tx,
    table: tables.license,
    ids: order.licenseIds,
    filter: {
      limit: 500,
    },
  });

  if (license.data.length !== order.licenseIds.length) {
    throw errFoundCountLicenseIdsNoEq;
  }

  // 一个个更新 license 的 end 时间
  for (const item of license.data) {
    // 计算当前时间和历史时间哪个大, 用大的时间做后续加法
    const end = changeEndTime(item.end, props.plan === "renewMonth" ? 31 : 365);
    await orm.updateOne({
      tx,
      table: tables.license,
      id: item.id,
      data: {
        end: end,
      },
    });
  }
};
