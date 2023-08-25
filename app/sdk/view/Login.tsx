import { FiLogIn } from "solid-icons/fi";
import { createSignal, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { i18n } from "../../i18n";
import { css } from "../../routers/css";
import { appUrl, isExample, sdkActionLogin, setLogined } from "../record/data";

const Login = () => {
  const sm = createMediaQuerySm();
  const [email, setEmail] = createSignal("");
  const [pwd, setPwd] = createSignal("");
  const handleLogin = async () => {
    const ok = await sdkActionLogin({
      email: email(),
      pwd: pwd(),
    });
    if (ok) {
      setLogined(true);
      solidMsg.dark(i18n.成功登录, 500);
    }
  };

  return (
    <div>
      <Show when={isExample()}>
        <div
          style={{
            "margin-bottom": "1em",
            margin: "0 auto",
            "text-align": "center",
          }}
        >
          {i18n.此为DOMO不支持登录}
        </div>
      </Show>
      <div
        style={{
          "font-family": "var(--ux-sans)",
          padding: "1em",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "center",
          "box-sizing": "border-box",
          "pointer-events": "none",
          opacity: isExample() ? 0.3 : 1,
        }}
      >
        <FiLogIn size={36} />
        <h1
          style={{
            "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
            "margin-left": "1em",
          }}
        >
          {i18n.登录到Testflowy}
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
          "pointer-events": isExample() ? "none" : "auto",
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
            "box-sizing": "border-box",
            padding: "0.5em 0",
          }}
        >
          <span
            style={{
              color: "var(--ux-gray-500)",
            }}
          >
            {i18n.已有账号}?
          </span>
          <span
            style={{
              cursor: "pointer",
              color: "var(--ux-primary-500)",
              margin: "0 0 0 0.5em",
            }}
            onclick={() => {
              window.open(appUrl + "/#/login/changePwd");
            }}
          >
            {i18n.找回密码}
          </span>
        </div>
        <UxButton
          type="button"
          onclick={() => {
            window.open(appUrl + "/#/welcome");
          }}
          style={css.buttonOutline}
        >
          {i18n.注册}
        </UxButton>
      </form>
    </div>
  );
};

export default Login;
