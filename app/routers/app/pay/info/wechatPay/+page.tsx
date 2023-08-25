import { BsWechat } from "solid-icons/bs";
import { createSignal, Match, onCleanup, Switch } from "solid-js";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxQRCode } from "solid-ux/UxQrcode";
import { routers } from "../../../..";
import { i18n } from "../../../../../i18n";
import { getAuth } from "../../../../appStorage";
import { css } from "../../../../css";
import { LoadingSvg } from "../../../../svgs/LoadingSvg";
import { apis } from "../../../../_apis";
import { PaySuccess } from "../PaySuccess";
import { polling } from "../polling";
import { priceToRMB, priceTotal } from "../price";

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
          "font-size": p.big ? "var(--ux-text-2xl)" : "var(--ux-text-lg)",
          color: p.big ? "var(--ux-primary-700)" : "var(--ux-gray-500)",
        }}
      >
        {p.info}
      </span>
    </div>
  );
};

const WechatPay = (p: {
  kind: "renew" | "new";
  count: number;
  plan: "year" | "month" | "renewYear" | "renewMonth";
  licenseIds?: string;
}) => {
  const sm = createMediaQuerySm();
  const [codeUrl, setCodeUrl] = createSignal(sessionStorage.getItem("wechat_code_url") || "");
  const [payed, setPayed] = createSignal(false);
  const [oid, setOid] = createSignal(sessionStorage.getItem("wechat_oid") || "");

  const handleCheckPay = async () => {
    const data = await apis.app_pay.payCheck({ oid: oid() });
    if (data.ok) {
      setPayed(true);
    }
  };
  if (!codeUrl()) {
    apis.app_pay
      .wechatCreateOrder({
        licenseIds: p.licenseIds ? p.licenseIds.split(",") : void 0,
        auth: getAuth(),
        count: Number(p.count),
        plan: p.plan,
      })
      .then((res) => {
        if (res.ok) {
          setCodeUrl(res.code_url);
          setOid(res.oid);
          // 防止用户疯狂刷新页面导致疯狂创建订单
          sessionStorage.setItem("wechat_code_url", res.code_url);
          sessionStorage.setItem("wechat_oid", res.oid);
          polling(oid(), payed).then(() => {
            setPayed(true);
          });
        }
      });
  } else {
    polling(oid(), payed).then(() => {
      setPayed(true);
    });
  }
  onCleanup(() => {
    setPayed(true);
  });

  return (
    <div
      style={{
        margin: "0 auto",
        background: "var(--ux-gray-100)",
        "min-height": "100%",
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
          <Item label={i18n.订单号} info={oid()} />
          <Item label={i18n.订单类型} info={p.kind === "new" ? i18n.购买License : i18n.续费License} />
          <Item label={i18n.购买时长} info={p.plan === "year" ? i18n.一年 : i18n.一个月} />
          <Item label={i18n.单价} info={priceToRMB(priceTotal(p.plan, 1)) + " 元"} />
          <Item label={i18n.购买个数} info={"x" + p.count} />
          <Item big label={i18n.总价格} info={priceToRMB(priceTotal(p.plan, p.count)) + " 元"} />
        </div>
        <div
          style={{
            padding: "0 1em 1em 1em",
          }}
        >
          <Switch>
            <Match when={payed()}>
              <PaySuccess />
            </Match>
            <Match when={!codeUrl()}>
              <LoadingSvg
                style={{
                  width: "4em",
                  height: "4em",
                  margin: "0 auto",
                }}
              />
              <div
                style={{
                  "font-size": "var(--ux-text-xl)",
                  color: "var(--ux-gray-400)",
                  "text-align": "center",
                  margin: "1em 0 0 0",
                }}
              >
                {i18n.正在创建订单}...
              </div>
            </Match>
            <Match when={codeUrl()}>
              <div
                style={{
                  display: "flex",
                  "flex-direction": "column",
                  "align-items": "center",
                  "justify-content": "center",
                  color: "var(--ux-gray-400)",
                }}
              >
                <BsWechat
                  style={{
                    width: "2.5em",
                    height: "2.5em",
                    margin: "0.5em 0",
                  }}
                />
                <div>{i18n.微信扫一扫付款}</div>
                <UxQRCode width={300} url={codeUrl()} />
                {/* 用户可以手动验证是否支付成功 */}
                <button
                  style={{
                    ...css.buttonOutline,
                    "margin-top": "1em",
                  }}
                  onclick={handleCheckPay}
                >
                  {i18n.我已付款}
                </button>
              </div>
            </Match>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default WechatPay;
