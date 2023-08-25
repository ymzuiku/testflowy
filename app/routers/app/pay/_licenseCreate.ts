import dayjs from "dayjs";
import { orm, PoolClient } from "pgx";
import { tables } from "../../../serve/tables";

export interface LicenseCreateProps {
  plan: "month" | "year" | "renewMonth" | "renewYear" | "trial";
  count: number;
  uid: string;
  // channel: "paypal" | "wechat" | "trial";
}

// 创建若干个license
export const licenseCreate = async (tx: PoolClient, props: LicenseCreateProps) => {
  const list = [];
  const end = props.plan === "month" ? dayjs().add(31, "day") : dayjs().add(365, "day");
  for (let i = 0; i < props.count; i++) {
    list.push({
      owner: props.uid,
      end: end.toString(),
    });
  }

  await orm.insertMany({
    tx,
    table: tables.license,
    datas: list,
  });
};

export const licenseTrial = async (tx: PoolClient | void, props: LicenseCreateProps) => {
  const list = [];
  const end = dayjs().add(14, "day");
  for (let i = 0; i < props.count; i++) {
    list.push({
      owner: props.uid,
      end: end.toDate(),
    });
  }
  const license = await orm.insertMany({
    tx,
    table: tables.license,
    datas: list,
  });
  return license;
};
