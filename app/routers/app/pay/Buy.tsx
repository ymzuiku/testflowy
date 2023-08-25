import { FiCheck } from "solid-icons/fi";
import { IoCloseOutline } from "solid-icons/io";
import { createSignal, JSX, Match, Switch } from "solid-js";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxGroupButton } from "solid-ux/UxGroupButton";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { appStorage } from "../../appStorage";
import { css } from "../../css";
import { canSetTeamPeople, canUseDraftLength, canUseTaskLength } from "../../task/proDiff";

interface HeadItemProps {
  style: JSX.CSSProperties;
  title: JSX.Element;
  price: JSX.Element;
  info: JSX.Element;
}

const HeadItem = (p: HeadItemProps) => {
  const sm = createMediaQuerySm();
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        flex: 1,
        gap: "1em",
        "font-weight": "bold",
        "font-family": "var(--ux-mono)",
      }}
    >
      <div
        style={{
          "font-weight": "bold",
          "font-size": sm() ? "var(--ux-text-2xl)" : "var(--ux-text-lg)",
        }}
      >
        {p.title}
      </div>
      <div
        style={{
          height: "0.25em",
          "border-radius": "var(--ux-radius)",
          width: "100%",
          ...p.style,
        }}
      />
      <div style={{ "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)", "font-weight": "bold" }}>
        {p.price}
      </div>
      <div style={{ opacity: 0.5 }}>{p.info}</div>
    </div>
  );
};

const Cell = (p: { title: JSX.Element; free: JSX.Element; essential: JSX.Element }) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        gap: "1em",
        padding: "1em 0.5em",
        "border-bottom": "1px solid var(--ux-gray-200)",
      }}
    >
      <div
        style={{
          margin: "auto 0",
          flex: 2,
          "font-size": "var(--ux-text-lg)",
        }}
      >
        {p.title}
      </div>
      <Switch>
        <Match when={p.free === "empty"}>
          <Empty />
        </Match>
        <Match when={p.free === "right"}>
          <Right />
        </Match>
        <Match when={p.free !== "empty" || p.free !== "right"}>
          <Label>{p.free}</Label>
        </Match>
      </Switch>
      <Switch>
        <Match when={p.essential === "empty"}>
          <Empty />
        </Match>
        <Match when={p.essential === "right"}>
          <Right />
        </Match>
        <Match when={p.free !== "empty" || p.free !== "right"}>
          <Label>{p.essential}</Label>
        </Match>
      </Switch>
    </div>
  );
};

const Label = (p: { children: JSX.Element }) => {
  return (
    <div
      style={{
        margin: "auto 0",
        flex: 1,
        "font-size": "var(--ux-text-lg)",
      }}
    >
      {p.children}
    </div>
  );
};

const Right = () => {
  return (
    <div
      style={{
        margin: "auto 0",
        flex: 1,
        display: "flex",
        "flex-direction": "column",
        "align-items": "start",
        "justify-content": "center",
        color: "var(--ux-primary-500)",
      }}
    >
      <FiCheck
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
      />
    </div>
  );
};

const Empty = () => {
  return (
    <div
      style={{
        margin: "auto 0",
        flex: 1,
        display: "flex",
        "flex-direction": "column",
        "align-items": "start",
        "justify-content": "center",
        color: "var(--ux-gray-400)",
      }}
    >
      <IoCloseOutline
        style={{
          width: "1.75em",
          height: "1.75em",
        }}
      />
    </div>
  );
};

export const Buy = () => {
  const [plan, setPlan] = createSignal("year");
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        width: "100%",
        padding: "1em",
      }}
    >
      <div style={{ padding: "1em 0", width: "100%" }}>
        <div style={{ "font-size": "var(--ux-text-4xl)", "font-weight": "bold" }}>{i18n.购买License}</div>
        <div style={{ "margin-top": "1em", color: "var(--ux-gray-600)" }}>{i18n.注册即赠送十个License}</div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          "flex-direction": "column",
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            gap: "1em",
            padding: "0.5em",
          }}
        >
          <div style={{ margin: "auto 0", flex: 2 }}>
            <div style={{ "font-size": "var(--ux-text-2xl)", "font-weight": "bold", margin: "0 0 0.5em 0" }}>
              {i18n.计划}
            </div>
            <div style={{ padding: "0 4em 0 0" }}>
              <UxGroupButton
                selected={plan()}
                data={[
                  { value: "month", label: i18n.按月 },
                  { value: "year", label: i18n.按年 },
                ]}
                onChange={(value) => {
                  setPlan(value);
                }}
              />
            </div>
          </div>
          <HeadItem
            title={i18n.免费}
            price={
              <div>
                <span style={{ "font-size": "var(--ux-text-sm)" }}>$</span>0
              </div>
            }
            info={i18n.个人使用永久免费}
            style={{
              background: "var(--ux-green-300)",
            }}
          />
          <HeadItem
            title={i18n.订阅}
            price={
              <div>
                <span style={{ "font-size": "var(--ux-text-sm)" }}>$</span>
                {plan() === "month" ? "21" : "17"}
              </div>
            }
            info={i18n.每个成员每个月}
            style={{
              background: "var(--ux-primary-300)",
            }}
          />
        </div>
        <Cell title={i18n.自动化测试} free="right" essential="right" />
        <Cell title={i18n.组合测试} free="right" essential="right" />
        <Cell title={i18n.加速播放} free="right" essential="right" />
        <Cell title={i18n.追加录制} free="right" essential="right" />
        <Cell title={i18n.编辑测试文件} free="right" essential="right" />
        <Cell title={i18n.团队权限管理} free="right" essential="right" />
        <Cell title={i18n.个人用例上限} free={canUseDraftLength(false)} essential={canUseDraftLength(true)} />
        <Cell title={i18n.团队用例上限} free="empty" essential={canUseTaskLength(true)} />
        <Cell title={i18n.团队人数上限} free="empty" essential={canSetTeamPeople(true)} />
        {/* <Cell title={i18n.版本管理} free="empty" essential="right" /> */}
        {/* <Cell title={i18n.更换Logo} free="empty" essential="right" /> */}
        {/* <Cell title={i18n.自定义样式} free="empty" essential="right" /> */}
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "margin-top": "1em",
          }}
        >
          <UxButton
            style={{ ...css.button, flex: 1 }}
            onclick={() => {
              if (!appStorage.val.token) {
                routers.login.push();
                return;
              }
              routers.app_pay_info.push({ plan: plan() });
            }}
          >
            {i18n.升级}
          </UxButton>
        </div>
      </div>
    </div>
  );
};
