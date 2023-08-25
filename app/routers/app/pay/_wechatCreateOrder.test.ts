import dayjs from "dayjs";
import { expect, it } from "vitest";
import { zodTry } from "zod-dx/zodTry";
import { createTestflowyTables } from "../../../serve/tables";
import { tddLogin } from "../../login/_login.test";
import { getLicense } from "../license/+serve";
import { priceToRMB, priceTotal } from "./info/price";
import { payCheck } from "./_payCheck";
import { wechatCallback } from "./_wechatCallback";
import { testHelp, wechatCreateOrder } from "./_wechatCreateOrder";
import { CALLBACK_PAY_PWD } from "./_wechatTypes";

export const tddWechatCreateOrder = async (account: Awaited<ReturnType<typeof tddLogin>>) => {
  await createTestflowyTables();
  testHelp.test = true;
  const url = await wechatCreateOrder({
    auth: account,
    count: 3,
    plan: "month",
  });
  expect(url.code_url.length > 5).eq(true);

  const price = priceToRMB(priceTotal("month", 3) * 100) + "";
  const attach = "testflowy__123456789_" + price;

  // 模拟微信回调
  const [, err] = await zodTry(() =>
    wechatCallback({
      wechatId: Math.random().toString(36).substring(2),
      oid: url.oid,
      attach: attach,
      pwd: CALLBACK_PAY_PWD,
      total: priceToRMB(priceTotal("month", 3)) * 100 + "",
    }),
  );
  expect(err).eq(void 0);

  const resCheck = await payCheck({ oid: url.oid });
  expect(resCheck.ok).eq(1);

  const license = await getLicense(account);
  expect(license.total).eq(-1);
  expect(license.data.length).eq(13);
  const item = license.data[12];
  expect(item.owner).eq(account.uid);
  expect("month:" + dayjs().add(31, "day").month()).eq("month:" + dayjs(item.end).month());
  expect("create:" + dayjs().add(31, "day").date()).eq("create:" + dayjs(item.end).date());
  return license.data;
};

it("create order", async () => {
  const account = await tddLogin();
  await tddWechatCreateOrder(account);
});

it("create order1", async () => {
  const account = await tddLogin();
  await tddWechatCreateOrder(account);
});

it("create order2", async () => {
  const account = await tddLogin();
  await tddWechatCreateOrder(account);
});

it("renew order", async () => {
  testHelp.test = true;
  const account = await tddLogin();

  const _license = await tddWechatCreateOrder(account);
  const ids = _license.map((v) => v.id);
  const url = await wechatCreateOrder({
    auth: account,
    count: ids.length,
    plan: "renewMonth",
    licenseIds: ids,
  });

  expect(url.code_url.length > 5).eq(true);

  const price = priceToRMB(priceTotal("month", ids.length) * 100) + "";
  const attach = "testflowy__123456789_" + price;

  // 模拟微信回调
  await wechatCallback({
    wechatId: Math.random().toString(36).substring(2),
    oid: url.oid,
    attach: attach,
    pwd: CALLBACK_PAY_PWD,
    total: price,
  });

  const resCheck = await payCheck({ oid: url.oid });
  expect(resCheck.ok).eq(1);

  const license = await getLicense(account);

  expect(license.total).eq(-1);
  expect(license.data.length).eq(13);
  const item = license.data[12];
  expect("id:" + item.owner).eq("id:" + account.uid);

  expect("month:" + dayjs().add(62, "day").month()).eq("month:" + dayjs(item.end).month());
  expect("renew:" + dayjs().add(62, "day").date()).eq("renew:" + dayjs(item.end).date());
});
