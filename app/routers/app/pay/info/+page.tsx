import { BsWechat } from "solid-icons/bs";
import { ImPaypal } from "solid-icons/im";
import { createSignal, Match, Show, Switch } from "solid-js";
import { createPropsSignal } from "solid-router-stack";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxButton } from "solid-ux/UxButton";
import { UxGroupButton } from "solid-ux/UxGroupButton";
import { UxInput } from "solid-ux/UxInput";
import { timeLabelDay } from "utils/strs";
import { routers } from "../../..";
import { i18n } from "../../../../i18n";

import { css } from "../../../css";
import { license } from "../../license";
import { numberFix, priceMonth, priceToRMB, priceTotal, priceYear } from "./price";

const Item = (p: { label: string; save: string; price: string; total?: string }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "space-between",
        }}
      >
        <div style={{ "font-size": "var(--ux-text-2xl)" }}>{p.label}</div>
        <div style={{ "font-size": "var(--ux-text-base)", "font-weight": "normal" }}>{p.save}</div>
      </div>
      <div
        style={{
          margin: "0.5em 0 0 0",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
        }}
      >
        <Switch>
          <Match when={!p.total}>
            <span style={{ margin: "0 0.5em 0 0", "font-weight": "normal" }}>{i18n.每个成员每个月}</span>
            <span style={{ "font-size": "var(--ux-text-2xl)" }}>{p.price}</span>
          </Match>
          <Match when={p.total}>
            <span style={{ margin: "0 0.5em 0 0", "font-weight": "normal" }}>{i18n.每个成员每年}</span>
            <span style={{ "font-size": "var(--ux-text-2xl)" }}>{p.total}</span>
          </Match>
        </Switch>
      </div>
    </div>
  );
};

const PayInfoPage = (p: { plan: "year" | "month"; licenseIds?: string }) => {
  const sm = createMediaQuerySm();
  const licenseIds = p.licenseIds ? p.licenseIds.split(",") : [];
  const [plan, setPlan] = createPropsSignal(p, "plan", "year");
  const [count, setCount] = createSignal(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [payWay, setPayWay] = createSignal("paypal");

  const price = () => {
    if (payWay() === "paypal") {
      return "$" + priceTotal(plan(), licenseIds.length || count());
    }
    return priceToRMB(priceTotal(plan(), licenseIds.length || count())) + "元";
  };

  const priceTip = (v: number) => {
    if (payWay() === "paypal") {
      return "$" + numberFix(v);
    }
    return priceToRMB(v) + "元";
  };

  const handleGoPay = () => {
    if (payWay() === "paypal") {
      routers.app_pay_info_paypalPay.push({
        kind: licenseIds.length ? "renew" : "new",
        plan: plan(),
        licenseIds: p.licenseIds,
        count: licenseIds.length || count(),
      });
    } else {
      // 移除支付url缓存
      sessionStorage.removeItem("wechat_code_url");
      sessionStorage.removeItem("wechat_oid");
      sessionStorage.removeItem("paypal_oid");
      const kind = licenseIds.length ? "renew" : "new";
      routers.app_pay_info_wechatPay.push({
        kind: kind,
        plan: kind === "new" ? plan() : plan() === "month" ? "renewMonth" : "renewYear",
        licenseIds: p.licenseIds,
        count: licenseIds.length || count(),
      });
    }
  };

  return (
    <div
      style={{
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
          display: "flex",
          "flex-direction": "column",
          padding: "1.5em",
          margin: "0 auto",
          background: "var(--ux-gray-50)",
          "min-height": "100vh",
          ...(sm() ? { "max-width": "var(--ux-screem-sm)" } : {}),
        }}
      >
        <div>
          <div style={{ "font-size": "var(--ux-text-3xl)", "font-weight": "bold", padding: "1em 0" }}>
            {licenseIds.length ? i18n.续费License : i18n.购买License}
          </div>
          <Show when={licenseIds.length}>
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  "box-sizing": "border-box",
                }}
              >
                <div
                  style={{
                    margin: "0 0 1em 0",
                    display: "flex",
                    "flex-direction": "row",
                    "align-items": "center",
                    color: "var(--ux-gray-500)",
                  }}
                >
                  <span style={{ flex: 1 }}>{i18n.License}</span>
                  {i18n.共有}
                  <span style={{ flex: 1, margin: "0 0 0 0.5em", "font-size": "var(--ux-text-xl)" }}>{count}</span>
                </div>
                {licenseIds.map((item) => {
                  const licene = license().find((v) => v.id === item);
                  return (
                    <div
                      style={{
                        display: "flex",
                        "flex-direction": "row",
                        "box-sizing": "border-box",
                        border: "1px solid var(--ux-gray-300)",
                        width: "100%",
                        padding: "1em",
                        margin: "0 0 0.5em 0",
                      }}
                    >
                      <div style={{ flex: 1 }}>License-{item}</div>
                      <Show when={licene}>
                        <div style={{ color: "var(--ux-gray-400)", margin: "0 1em 0 0" }}>
                          {licene!.useUid ? i18n.使用中 : ""}
                        </div>
                        <div style={{ color: "var(--ux-gray-500)" }}>
                          {i18n.到期时间} {timeLabelDay(licene!.end)}
                        </div>
                      </Show>
                    </div>
                  );
                })}
              </div>
            </div>
          </Show>
          <div style={{ "font-size": "var(--ux-text-2xl)", "font-weight": "bold", padding: "1em 0" }}>
            {i18n.支付渠道}
          </div>
          <UxGroupButton
            selected={payWay()}
            onChange={setPayWay}
            data={[
              {
                label: (
                  <div>
                    <ImPaypal
                      style={{
                        width: "2.5em",
                        height: "2.5em",
                        margin: "0 0 0.5em 0",
                      }}
                    />
                    <div>{i18n.贝宝支付}</div>
                  </div>
                ),
                value: "paypal",
              },
              {
                label: (
                  <div>
                    <BsWechat style={{ width: "2.5em", height: "2.5em", margin: "0 0 0.5em 0" }} />
                    <div>{i18n.微信支付}</div>
                  </div>
                ),
                value: "wechat",
              },
            ]}
          />
          <div
            style={{
              "font-size": "var(--ux-text-md)",
              color: "var(--ux-gray-500)",
              padding: "0.5em 0",
            }}
          >
            {i18n.中国地区请使用微信支付}
          </div>
          <div
            style={{
              "font-size": "var(--ux-text-2xl)",
              "font-weight": "bold",
              padding: "1em 0",
            }}
          >
            {i18n.计划}
          </div>
          <UxGroupButton
            selected={plan()}
            onChange={setPlan}
            data={[
              {
                label: <Item price={priceTip(priceMonth)} save="" label={i18n.按月} />,
                value: "month",
              },
              {
                label: (
                  <Item
                    price={priceTip(priceYear)}
                    total={priceTip(12 * priceYear)}
                    save="Save 32%"
                    label={i18n.按年}
                  />
                ),
                value: "year",
              },
            ]}
          />
          <Show when={!licenseIds.length}>
            <div
              style={{
                "font-size": "var(--ux-text-2xl)",
                "font-weight": "bold",
                padding: "1em 0",
                "margin-top": "1em",
              }}
            >
              {i18n.订阅人数}
            </div>
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
              }}
            >
              <div style={{ margin: "0 0.5 0 0", flex: 2 }}>{i18n.请输入个数}: </div>
              <UxInput
                value={count()}
                style={css.inputOutline}
                focusStyle={css.inputOutlineFocus}
                inputStyle={{ "font-size": "var(--ux-text-2xl)" }}
                oninput={(e) => {
                  const v = e.currentTarget.value;
                  const n = Number(v);
                  if (!isNaN(n)) {
                    setCount(n);
                  }
                }}
                type="number"
                placeholder={i18n.请输入个数}
              />
            </div>
          </Show>
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              "margin-top": "1.5em",
            }}
          >
            <div style={{ margin: "0 0.5em 0 0", flex: 2 }}>{i18n.总价格}: </div>
            <div style={{ "font-size": "var(--ux-text-xl)", color: "var(--ux-primary-700)" }}>{price()}</div>
          </div>
        </div>

        <div
          style={{
            "font-size": "var(--ux-text-xl)",
            "margin-top": "2.5em",
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
          }}
        >
          <UxButton style={{ ...css.button, "font-size": "var(--ux-text-xl)", flex: 1 }} onclick={handleGoPay}>
            {i18n.下一步}
          </UxButton>
        </div>
      </div>
    </div>
  );
};

export default PayInfoPage;
