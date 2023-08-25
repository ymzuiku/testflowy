import { BsBrowserSafari } from "solid-icons/bs";
import { FaSolidDemocrat } from "solid-icons/fa";
import { HiSolidUsers } from "solid-icons/hi";
import { RiDocumentBook3Fill, RiSystemSettingsFill, RiSystemShieldKeyholeFill } from "solid-icons/ri";
import { Component, JSX, Match, Show, Switch } from "solid-js";
import type { RouterNavigate } from "solid-router-stack/lib/types";
import { createPointerHover } from "solid-ux/createPointerHover";
import { UxAvatar } from "solid-ux/UxAvatar";
import { UxSvg } from "solid-ux/UxSvg";
import { hiddenSomeStrs } from "utils/strs";
import { routers } from "..";
import { i18n } from "../../i18n";
import { appMenu, Menus, setAppMenu } from "../../sdk/record/data";
import { appStorage, isAgent } from "../appStorage";
import { Battery, BatteryLicense } from "./Battery";

const Line = () => {
  return (
    <div
      style={{
        "margin-left": "10px",
        width: "calc(100% - 20px)",
        height: "1px",
        background: "transparent",
        // background: "var(--ux-gray-300)",
        "border-bottom": "1px solid var(--ux-gray-300)",
      }}
    ></div>
  );
};

const Item = (p: {
  onclick?: () => void;
  children: JSX.Element;
  // eslint-disable-next-line
  Icon: Component<any>;
  name?: Menus;
  router?: RouterNavigate;
  anime?: boolean;
  url?: string;
}) => {
  const [hover, hoverEvent] = createPointerHover();

  const isMatch = () => appMenu() === p.name;

  return (
    <div
      {...hoverEvent}
      style={{
        padding: "0.5em",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        gap: "1em",
        "border-radius": "var(--ux-radius-lg)",
        cursor: "pointer",
        background: isMatch() && hover() ? "var(--ux-primary-100)" : "transparent",
        ...(isMatch() ? { background: "var(--ux-primary-500)", color: "var(--ux-gray-50)" } : {}),
      }}
      onclick={() => {
        if (p.name) {
          setAppMenu(p.name);
          return;
        }
        if (p.url) {
          window.open(p.url);
        } else if (p.router) {
          p.router.put(void 0, !p.anime);
        }
        if (p.onclick) {
          p.onclick();
        }
      }}
    >
      <div
        style={{
          color: isMatch() ? "var(--ux-gray-50)" : "var(--ux-primary-400)",
        }}
      >
        <p.Icon style={{ width: "1.25em", height: "1.25em" }} />
      </div>
      <div>{p.children}</div>
    </div>
  );
};

interface MenuListProps {
  onclick?: () => void;
  class?: string;
  style?: JSX.CSSProperties;
}

export const MenuList = (p: MenuListProps) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        background: "var(--ux-gray-100)",
        "border-right": "1px solid var(--ux-gray-200)",
        "flex-grow": 0,
        "max-width": "var(--ux-screen-lg)",
        height: "100%",
        color: "var(--ux-gray-700)",
        overflow: "auto",
        ...p.style,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1em",
          "flex-direction": "row",
          "align-items": "center",
          padding: "1em",
        }}
      >
        <UxAvatar size="2em" name={appStorage.val.email} />
        <div>{hiddenSomeStrs(appStorage.val.email)}</div>
      </div>
      <Line />
      <div style={{ padding: "1em", display: "flex", "flex-direction": "column", gap: "1em" }}>
        <Item onclick={p.onclick} Icon={BsBrowserSafari} name="testing">
          {i18n.测试}
        </Item>
        <Item onclick={p.onclick} Icon={HiSolidUsers} name="team">
          {i18n.团队}
        </Item>
        <Show when={!isAgent()}>
          <>
            <Item onclick={p.onclick} Icon={RiSystemShieldKeyholeFill} name="license">
              {i18n.License}
            </Item>
            {/* <Item onclick={p.onclick} Icon={RiFinanceVipDiamondFill} router={routers.app_pay}>
              {i18n.购新License}
            </Item> */}
          </>
        </Show>
        <Item onclick={p.onclick} Icon={RiSystemSettingsFill} name="setting">
          {i18n.设置}
        </Item>
      </div>
      <Line />

      <Switch>
        <Match when={appStorage.val.payed || appStorage.val.agent === "agent"}>
          <BatteryLicense />
        </Match>
        <Match when={appStorage.val.agent !== "agent"}>
          <Battery />
        </Match>
      </Switch>
      <Line />
      <div
        style={{
          padding: "1em",
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
        }}
      >
        <Item
          onclick={p.onclick}
          Icon={FaSolidDemocrat}
          anime
          // url="/example/index.html"
          router={routers.app_example}
        >
          {i18n.示例}
        </Item>
        <Item
          onclick={p.onclick}
          Icon={RiDocumentBook3Fill}
          anime
          // url="/document/index.html"
          router={routers.app_doc}
        >
          {i18n.文档}
        </Item>
      </div>
      <div style={{ flex: 1 }}></div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          margin: "1.5em 0",
          "justify-content": "center",
          width: "100%",
        }}
      >
        <UxSvg
          style={{
            width: "2em",
            height: "2em",
            cursor: "pointer",
          }}
          onclick={() => routers.welcome.put()}
          src="/logo_custom.svg"
        />
      </div>
    </div>
  );
};
