import { FiCheck } from "solid-icons/fi";
import { createSignal, mergeProps, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { UxLoading } from "solid-ux/UxLoading";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { apis } from "../../_apis";
import { actionLogin } from "../../appActions";
import { css } from "../../css";

export const RegisterForm = (props: { email?: string; justOpen?: boolean }) => {
  const sm = createMediaQuerySm();
  const p = mergeProps({ email: "" }, props);
  const [email, setEmail] = createSignal(p.email);
  const [code, setCode] = createSignal("");
  const [pwd, setPwd] = createSignal("");
  const [sentEmail, setSentEmail] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const handleSendEmail = async () => {
    setLoading(true);
    const res = await apis.login_register.sendRegisterEmail({ email: email() });
    setLoading(false);
    if (res.ok) {
      solidMsg.dark(i18n.已发送验证码到您的邮箱, 2000);
      setSentEmail(true);
      requestAnimationFrame(() => {
        const input = document.getElementById("inputCode");
        if (input) {
          input.focus();
        }
      });
    } else {
      const msg = (res as unknown as Record<string, string>).message;
      if (/请勿重复/.test(msg)) {
        setSentEmail(true);
      }
    }
  };
  const handleRegister = async () => {
    const res = await apis.login_register.register({ email: email(), code: code(), pwd: pwd() });
    if (res.ok) {
      const ok = await actionLogin({ email: email(), pwd: pwd() });
      if (ok) {
        solidMsg.dark(i18n.成功注册, 500);
        routers.app.push();
      }
    }
  };
  return (
    <>
      <form
        style={{
          display: "flex",
          "flex-direction": sm() ? "row" : "column",
          gap: "0.75em",
          margin: "2.5em auto 0 auto",
          "max-width": sm() ? "var(--ux-screen-sm)" : "100%",
          width: "100%",
        }}
        onsubmit={(e) => {
          e.preventDefault();
          if (p.justOpen) {
            routers.login_register.push({ email: email() });
            return;
          }
          if (sentEmail()) {
            handleRegister();
          } else {
            handleSendEmail();
          }
        }}
      >
        <Show when={!sentEmail()}>
          <UxInput
            type="email"
            style={{
              ...css.inputOutline,
              flex: 1,
              "flex-grow": 1,
              background: "var(--ux-gray-50)",
            }}
            focusStyle={css.inputOutlineFocus}
            value={email()}
            label={i18n.你的电子邮箱}
            oninput={(e) => setEmail(e.currentTarget.value)}
            placeholder={i18n.你的电子邮箱}
          />
          <UxButton
            style={{
              ...css.button,
              flex: "none",
              "max-width": sm() ? "170px" : "100%",
              "min-width": sm() ? "160px" : "150px",
            }}
          >
            <UxLoading loading={loading()}>{i18n.注册}</UxLoading>
          </UxButton>
        </Show>
        <Show when={sentEmail()}>
          <UxInput
            style={css.inputOutline}
            focusStyle={css.inputOutlineFocus}
            type="number"
            labelStyle={{
              background: "var(--ux-gray-50)",
              "font-size": "var(--ux-text-sm)",
              padding: "0 0.5em",
            }}
            value={code()}
            oninput={(e) => setCode(e.currentTarget.value)}
            label={i18n.验证码}
            placeholder={i18n.请输入验证码}
          />
          <UxInput
            style={css.inputOutline}
            focusStyle={css.inputOutlineFocus}
            type="password"
            labelStyle={{
              background: "var(--ux-gray-50)",
              "font-size": "var(--ux-text-sm)",
              padding: "0 0.5em",
            }}
            value={pwd()}
            oninput={(e) => setPwd(e.currentTarget.value)}
            label={i18n.密码}
            placeholder={i18n.请设定密码}
          />
          <UxButton
            style={{
              ...css.button,
              flex: "none",
              "max-width": sm() ? "170px" : "100%",
              "min-width": sm() ? "160px" : "150px",
            }}
            type="submit"
          >
            {i18n.下一步}
          </UxButton>
        </Show>
      </form>
      <Show when={sentEmail()}>
        <div
          style={{
            color: "var(--ux-primary-600)",
            "margin-top": "0.75em",
          }}
        >
          {i18n.已发送验证码到您的邮箱}: {email()}
        </div>
      </Show>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "font-size": "var(--ux-text-base)",
          gap: "0.5em",
          margin: "0.75em auto 0 auto",
          "max-width": sm() ? "var(--ux-screen-sm)" : "100%",
        }}
      >
        <FiCheck size={20} style={{ color: "var(--ux-primary-600)" }} />
        <span style={{ "padding-right": "0.5em" }}>{i18n.个人永久免费}</span>
        <FiCheck size={20} style={{ color: "var(--ux-primary-600)" }} />
        <span style={{ "padding-right": "0.5em" }}>{i18n.设置简单}</span>
        <FiCheck size={20} style={{ color: "var(--ux-primary-600)" }} />
        <span style={{ "padding-right": "0.5em" }}>{i18n.无需信用卡}</span>
      </div>
    </>
  );
};
