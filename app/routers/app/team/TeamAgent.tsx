import { solidMsg } from "solid-msg";
import { UxAlert } from "solid-ux/UxAlert";
import { UxButton } from "solid-ux/UxButton";
import { createPanelShow } from "solid-ux/UxPanel";
import { i18n } from "../../../i18n";
import { apis } from "../../_apis";
import { appStorage, getAuth, logout } from "../../appStorage";
import { css } from "../../css";

interface ItemProps {
  key: string;
  value: string;
}

const Item = (p: ItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
      }}
    >
      <div
        style={{
          "margin-right": "0.5em",
          color: "var(--ux-gray-600)",
        }}
      >
        {p.key}:
      </div>
      <div
        style={{
          color: "var(--ux-gray-600)",
          "font-weight": "bold",
        }}
      >
        {p.value}
      </div>
    </div>
  );
};

const Line = () => {
  return (
    <div
      style={{
        margin: "0.5em 0 0.5em 10px",
        width: "100%",
        height: "1px",
        background: "var(--ux-gray-200)",
      }}
    ></div>
  );
};

export function TeamAgent() {
  const [show, setShow, onclose] = createPanelShow();
  const handleLeave = async () => {
    const ok = await setShow();
    if (!ok) {
      return;
    }
    const res = await apis.app_team_leave.PATCH({
      auth: getAuth(),
    });
    if (res?.ok) {
      logout();
      solidMsg.dark(i18n.操作成功, 500);
    }
  };

  return (
    <div
      style={{
        padding: "1em",
        width: "100%",
        height: "100%",
        "box-sizing": "border-box",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <div
        style={{
          padding: "1em 0",
          "font-size": "var(--ux-text-4xl)",
          "font-weight": "bold",
        }}
      >
        {i18n.已加入团队}
      </div>
      <UxAlert ok="ok" cancel="cancel" show={show()} onclose={onclose}>
        <div style={{ padding: "1.5em", "text-align": "center" }}>{i18n.是否离开此团队}</div>
      </UxAlert>
      <Line />
      <div
        style={{
          margin: "1em 0",
          display: "flex",
          "flex-direction": "row",
          gap: "1em",
        }}
      >
        <Item key={i18n.团队} value={appStorage.val.owner} />
        <Item key={i18n.角色} value={appStorage.val.agent} />
      </div>
      <UxButton
        style={{
          ...css.buttonOutline,
          width: "8em",
        }}
        onclick={() => handleLeave()}
      >
        {i18n.离开此团队}
      </UxButton>
    </div>
  );
}
