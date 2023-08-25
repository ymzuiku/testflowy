import { FiLogIn } from "solid-icons/fi";
import { Component, createSignal, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { actionLogin } from "../../appActions";
import { appStorage } from "../../appStorage";
import { css } from "../../css";

const Login: Component<{ stackShow: boolean }> = (p) => {
  const sm = createMediaQuerySm();
  const [email, setEmail] = createSignal("");
  const [pwd, setPwd] = createSignal("");
  const handleLogin = async () => {
    const ok = await actionLogin({
      email: email(),
      pwd: pwd(),
    });
    if (ok) {
      if (!appStorage.val.isAdmin) {
        solidMsg.dark(i18n.该账号没有权限, 1000);
        return;
      }
      solidMsg.dark(i18n.成功登录, 500);
      routers.admin_accounts.push(void 0, false);
    }
  };

  return (
    <Show when={p.stackShow}>
      <div>
        <UxBackBar
          title={i18n.登录}
          onBack={() => {
            routers.goBack();
          }}
        />
        <div
          style={{
            padding: "1em",
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <FiLogIn size={36} />
          <h1
            style={{
              "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
              "margin-left": "1em",
            }}
          >
            {i18n.登录到TestflowyAdmin}
          </h1>
        </div>
        <form
          style={{
            padding: "1em",
            display: "flex",
            "flex-direction": "column",
            gap: "1.25em",
            "max-width": sm() ? "var(--ux-screen-md)" : "100%",
            margin: "0 auto",
          }}
          onsubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <UxInput
            style={css.inputOutline}
            focusStyle={css.inputOutlineFocus}
            labelStyle={{
              "font-size": "var(--ux-text-sm)",
              padding: "0 0.5em",
              color: "var(--ux-gray-500)",
              background: "var(--ux-gray-50)",
            }}
            label={i18n.电子邮箱}
            placeholder={i18n.你的电子邮箱}
            value={email()}
            oninput={(e) => setEmail(e.currentTarget.value)}
          />
          <UxInput
            style={css.inputOutline}
            focusStyle={css.inputOutlineFocus}
            labelStyle={{
              "font-size": "var(--ux-text-sm)",
              padding: "0 0.5em",
              color: "var(--ux-gray-500)",
              background: "var(--ux-gray-50)",
            }}
            type="password"
            label={i18n.你的密码}
            placeholder={i18n.你的密码}
            value={pwd()}
            oninput={(e) => setPwd(e.currentTarget.value)}
          />
          <UxButton type="submit" style={css.button}>
            {i18n.登录}
          </UxButton>
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              "justify-content": "center",
              padding: "0.5em 0",
            }}
          >
            <span
              style={{
                color: "var(--ux-gray-500)",
                "margin-right": "0.5em",
              }}
            >
              {i18n.已有账号}?
            </span>
            <UxButton
              style={{
                background: "none",
                outline: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--ux-primary-500)",
                margin: "0 0 0 0.25em",
              }}
              onclick={() => {
                setPwd("");
                routers.login_changePwd.push({ email: email() });
              }}
            >
              {i18n.找回密码}
            </UxButton>
          </div>
          <UxButton
            type="button"
            onclick={() => {
              setPwd("");
              routers.login_register.push({ email: email() });
            }}
            style={css.buttonOutline}
          >
            {i18n.注册}
          </UxButton>
        </form>
      </div>
    </Show>
  );
};

export default Login;
