import { createSignal, JSX, Show } from "solid-js";
import { UxButton } from "solid-ux/UxButton";
import { UxI18nPick } from "solid-ux/UxI18nPick";
import { UxInput } from "solid-ux/UxInput";
import { UxNativeSelect } from "solid-ux/UxNativeSelect";
import { getTheme, setTheme } from "solid-ux/UxTheme";
import { i18n } from "../../i18n";
import { css } from "../../routers/css";
import { appUrl, logout, sdkStorage } from "../record/data";

const cssInputOutline = {
  padding: "0.25em 0.75em",
  height: "3.5em",
  color: "var(--ux-gray-50)",
  "box-sizing": "border-box",
  border: "1px solid var(--ux-gray-200)",
  "border-radius": "var(--ux-radius)",
  appearance: "none",
} as JSX.CSSProperties;

const [playSleep, _setPlaySleep] = createSignal(sdkStorage.val.speed);
const setPlaySleep = (speed: number) => {
  _setPlaySleep(speed);
  sdkStorage.assign({ speed });
};

const [localPwd, _setLocalPwd] = createSignal(sdkStorage.val.localPwd);
const setLocalPwd = (localPwd: string) => {
  _setLocalPwd(localPwd);
  sdkStorage.assign({ localPwd });
};

const Item = (p: { label: string; info?: string; children: JSX.Element }) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
      }}
    >
      <div
        style={{
          "font-size": "var(--ux-text-lg)",
          flex: 1,
        }}
      >
        <div>{p.label}:</div>
        <Show when={p.info}>
          <div
            style={{
              "font-size": "var(--ux-text-sm)",
              opacity: 0.5,
              flex: 1,
            }}
          >
            {p.info}
          </div>
        </Show>
      </div>

      <div>{p.children}</div>
    </div>
  );
};

export function Setup() {
  return (
    <div
      style={{
        padding: "1em",
        width: "100%",
        height: "100%",
        display: "flex",
        "flex-direction": "column",
        "box-sizing": "border-box",
      }}
    >
      <div
        style={{
          "margin-top": "2.5em",
          display: "flex",
          "flex-direction": "column",
          gap: "1.25em",
        }}
      >
        <Item label={i18n.邮箱}>
          <div
            style={{
              opacity: 0.6,
            }}
          >
            {sdkStorage.val.email}
          </div>
        </Item>
        <Item label={i18n.语言选择}>
          <UxI18nPick />
        </Item>
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
        <Item label={i18n.本地密钥} info={i18n.仅会存储在浏览器缓存中}>
          <UxInput
            type="text"
            right
            hiddenClose
            style={cssInputOutline}
            focusStyle={css.inputOutlineFocus}
            placeholder={i18n.可选输入}
            value={localPwd()}
            oninput={(e) => {
              const v = e.currentTarget.value;
              setLocalPwd(v);
            }}
          />
        </Item>
        <Item label={i18n.播放速率}>
          <UxInput
            type="number"
            right
            hiddenClose
            style={cssInputOutline}
            focusStyle={css.inputOutlineFocus}
            placeholder="ms"
            value={playSleep()}
            oninput={(e) => {
              const v = e.currentTarget.value;
              let ms = Number(v);
              if (isNaN(ms) || ms < 0) {
                ms = 1;
              }
              if (ms > 5) {
                ms = 5;
              }
              setPlaySleep(ms);
            }}
          />
        </Item>
        <Item label={i18n.控制台}>
          <UxButton
            style={css.buttonOutline}
            onclick={() => {
              window.open(appUrl + "/#/app");
            }}
          >
            {i18n.控制台}
          </UxButton>
        </Item>
        <Item label={i18n.登出}>
          <UxButton
            style={css.buttonOutline}
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
