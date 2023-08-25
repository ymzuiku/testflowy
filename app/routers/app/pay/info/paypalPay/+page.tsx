import { getPaypal } from "paypal";
import { createSignal, Match, onCleanup, onMount, Switch } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { routers } from "../../../..";
import { i18n } from "../../../../../i18n";
import { apis } from "../../../../_apis";
import { getAuth } from "../../../../appStorage";
import { LoadingSvg } from "../../../../svgs/LoadingSvg";
import { PaySuccess } from "../PaySuccess";
import { polling } from "../polling";
import { priceTotal } from "../price";

const paypalClientId = import.meta.env.VITE_paypal_client_id;
console.log("--debug--", paypalClientId);

const Item = (p: { label: string; info: string | number; big?: boolean }) => {
  return (
    <div
      style={{
        width: "calc(100% - 40px)",
        "max-width": "600px",
        display: "flex",
        "flex-direction": "row",
      }}
    >
      <span
        style={{
          flex: 1,
          "font-size": "var(--ux-text-lg)",
          color: "var(--ux-gray-500)",
        }}
      >
        {p.label}
      </span>
      <span
        style={{
          color: p.big ? "var(--ux-primary-700)" : "var(--ux-gray-500)",
          "font-size": p.big ? "var(--ux-text-2xl)" : "var(--ux-text-lg)",
        }}
      >
        {p.info}
      </span>
    </div>
  );
};

const PaypalPay = (p: {
  kind: "renew" | "new";
  count: number;
  plan: "year" | "month" | "renewYear" | "renewMonth";
  licenseIds?: string;
}) => {
  const sm = createMediaQuerySm();
  const [ordered, setOrdered] = createSignal(false);
  const [payed, setPayed] = createSignal(false);
  const [oid, setOid] = createSignal(sessionStorage.getItem("paypal_oid") || "");
  apis.app_pay
    .paypalCreateOrder({
      licenseIds: p.licenseIds ? p.licenseIds.split(",") : void 0,
      auth: getAuth(),
      count: Number(p.count),
      plan: p.plan,
      currency_code: "USD",
      value: priceTotal(p.plan, p.count) + "",
    })
    .then((res) => {
      setOid(res.oid);
    })
    .catch((err) => {
      solidMsg.red(err);
      return;
    });
  const initPayPalButton = async () => {
    const paypal = await getPaypal(paypalClientId, "USD");
    paypal.Buttons!({
      style: {
        shape: "pill",
        color: "gold",
        layout: "vertical",
        label: "paypal",
      },

      createOrder: async function (_data, actions) {
        console.log("create order");

        return actions.order.create({
          purchase_units: [
            {
              description: "testflowy-paypal-" + p.kind + "-" + p.plan,
              custom_id: oid(),
              amount: {
                // currency_code: "USD",
                currency_code: "USD",
                value: priceTotal(p.plan, p.count) + "",
              },
            },
          ],
        });
      },
      onApprove: function (_data, actions) {
        return actions.order!.capture().then(function (orderData) {
          // Full available details
          console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
          // 如果支付成功, 创建订单
          setOrdered(true);
          // const paypalId = orderData.purchase_units[0].payments!.captures![0].id as string;
          // 轮询查看 pay 状态
          polling(oid(), payed).then(() => {
            setPayed(true);
          });
        });
      },

      onError: function (err) {
        console.log(err);
      },
    }).render("#paypal-button-container");
  };
  onMount(() => {
    initPayPalButton();
  });
  onCleanup(() => {
    setPayed(true);
  });
  return (
    <div
      style={{
        margin: "0 auto",
        "min-height": "100%",
        background: "var(--ux-gray-100)",
      }}
    >
      <UxBackBar
        desktopFloat
        title={i18n.返回}
        onBack={() => {
          routers.goBack();
        }}
      />
      <div
        style={{
          padding: "1.5em",
          margin: "0 auto",
          "max-width": sm() ? "var(--ux-screen-sm)" : "100%",
          "min-height": "100vh",
          background: "var(--ux-gray-50)",
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            gap: "1em",
            "margin-bottom": "1.5em",
          }}
        >
          <span
            style={{
              "font-size": "var(--ux-text-3xl)",
              "font-weight": "bold",
              padding: "1em",
            }}
          >
            {i18n.订单详情}
          </span>
          <Item label={i18n.订单类型} info={p.kind === "new" ? i18n.购买License : i18n.续费License} />
          <Item label={i18n.购买时长} info={p.plan === "year" ? i18n.一年 : i18n.一个月} />
          <Item label={i18n.单价} info={"$" + priceTotal(p.plan, 1)} />
          <Item label={i18n.购买个数} info={"x" + p.count} />
          <Item big label={i18n.总价格} info={"$" + priceTotal(p.plan, p.count)} />
        </div>
        <div style={{ padding: "1em" }}>
          <Switch>
            <Match when={payed()}>
              <PaySuccess />
            </Match>
            <Match when={ordered()}>
              <LoadingSvg
                style={{
                  width: "4em",
                  height: "4em",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  margin: "1em auto 0 auto",
                  "text-align": "center",
                  "font-size": "var(--ux-text-lg)",
                  color: "var(--ux-gray-500)",
                }}
              >
                {i18n.正在查询付款状态}
              </div>
            </Match>
            <Match when={true}>
              <div id="smart-button-container">
                <div style="text-align: center;">
                  <div id="paypal-button-container"></div>
                </div>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default PaypalPay;
