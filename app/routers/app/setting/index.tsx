import { JSX } from "solid-js";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxI18nPick } from "solid-ux/UxI18nPick";
import { UxNativeSelect } from "solid-ux/UxNativeSelect";
import { getTheme, setTheme } from "solid-ux/UxTheme";
import { i18n } from "../../../i18n";
import { logout } from "../../appStorage";
import { css } from "../../css";

const Item = (p: { label: string; children: JSX.Element }) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        padding: "0.5em 1em",
        height: "4em",
        border: "1px solid var(--ux-gray-200)",
        "border-radius": "var(--ux-radius-lg)",
      }}
    >
      <div
        style={{
          flex: 1,
          "font-size": "var(--ux-text-lg)",
        }}
      >
        {p.label}:
      </div>
      <div>{p.children}</div>
    </div>
  );
};

export default function Team() {
  const sm = createMediaQuerySm();
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
          "padding-top": "1em",
          "font-size": "var(--ux-text-4xl)",
          "font-weight": "bold",
        }}
      >
        {i18n.设置}
      </div>
      <div
        style={{
          "margin-top": "2.5em",
          width: sm() ? "460px" : "auto",
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
        }}
      >
        <Item label={i18n.主题}>
          <UxNativeSelect
            value={getTheme()}
            each={[
              { value: "dark", label: i18n.暗色 },
              { value: "light", label: i18n.亮色 },
            ]}
            onchange={(e: { currentTarget: { value: string } }) => {
              setTheme(e.currentTarget.value as "light", true);
            }}
          />
        </Item>
        <Item label={i18n.语言选择}>
          <UxI18nPick />
        </Item>
        {/* <Item label={i18n.不进行测试网址提交}>
            <UxSwitch value={ignoreUrl()} onchange={setIgnoreUrl} />
          </Item> */}
        <Item label={i18n.登出}>
          <UxButton
            style={css.button}
            onclick={() => {
              logout();
            }}
          >
            {i18n.登出}
          </UxButton>
        </Item>
      </div>
    </div>
  );
}
