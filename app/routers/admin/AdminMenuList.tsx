import { RiFinanceSecurePaymentFill, RiUserAccountBoxLine } from "solid-icons/ri";
import { Component, JSX } from "solid-js";
import { historyProxy } from "solid-router-stack";
import type { RouterNavigate } from "solid-router-stack/lib/types";
import { createPointerHover } from "solid-ux/createPointerHover";
import { UxAvatar } from "solid-ux/UxAvatar";
import { UxSvg } from "solid-ux/UxSvg";
import { hiddenSomeStrs } from "utils/strs";
import { routers } from "..";
import { appStorage } from "../appStorage";

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
  router: RouterNavigate;
  anime?: boolean;
  url?: string;
}) => {
  const matchPath = historyProxy.nowUrl() === p.router.path;
  const [hover, hoverEvent] = createPointerHover();

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
        background: !matchPath && hover() ? "var(--ux-primary-100)" : "transparent",
        ...(matchPath ? { background: "var(--ux-primary-500)", color: "var(--ux-gray-50)" } : {}),
      }}
      onclick={() => {
        if (p.url) {
          window.open(p.url);
        } else {
          p.router.put(void 0, !p.anime);
        }
        if (p.onclick) {
          p.onclick();
        }
      }}
    >
      <div
        style={{
          color: matchPath ? "var(--ux-gray-50)" : "var(--ux-primary-400)",
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

export const AdminMenuList = (p: MenuListProps) => {
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
          "justify-content": "center",
          "font-weight": "bold",
          padding: "1em",
        }}
      >
        Admin
      </div>
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
        <Item onclick={p.onclick} Icon={RiUserAccountBoxLine} router={routers.admin_accounts}>
          账号
        </Item>
        <Item onclick={p.onclick} Icon={RiFinanceSecurePaymentFill} router={routers.admin_orders}>
          订单
        </Item>
      </div>
      <Line />
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
