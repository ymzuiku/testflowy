import { RiSystemLockPasswordLine } from "solid-icons/ri";
import { Component, createSignal, mergeProps, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { UxLoading } from "solid-ux/UxLoading";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { apis } from "../../_apis";
import { css } from "../../css";

const ChangePwd: Component<{ stackShow: boolean; email: string }> = (props) => {
  const sm = createMediaQuerySm();
  const p = mergeProps({ email: "" }, props);
  const [email, setEmail] = createSignal(p.email);
  const [sentEmail, setSentEmail] = createSignal(false);
  const [code, setCode] = createSignal("");
  const [pwd, setPwd] = createSignal("");
  const [loading, setLoaing] = createSignal(false);
  const handleSendEmail = async () => {
    setLoaing(true);
    const res = await apis.login_changePwd.sendChangePwdEmail({
      email: email(),
    });
    setLoaing(false);

    if (res.ok) {
      solidMsg.dark(i18n.已发送验证码到您的邮箱, 2000);
      setSentEmail(true);
    }
  };

  const handleChangePwd = async () => {
    setLoaing(true);
    const res = await apis.login_changePwd.changePwd({
      email: email(),
      pwd: pwd(),
      code: code(),
    });
    setLoaing(false);
    if (res.ok) {
      solidMsg.dark(i18n.修改成功, 500);
      routers.goBack({ email: email() });
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
          <RiSystemLockPasswordLine size={36} />
          <h1
            style={{
              "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
              "margin-left": "1em",
            }}
          >
            {i18n.找回密码}
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
          }}
        >
          <UxInput
            disabled={sentEmail()}
            labelStyle={{
              "font-size": "var(--ux-text-sm)",
              padding: "0 0.5em",
              color: "var(--ux-gray-500)",
              background: "var(--ux-gray-50)",
            }}
            label={i18n.电子邮箱}
            style={{
              ...css.inputOutline,
              opacity: sentEmail() ? 0.5 : 1,
            }}
            focusStyle={css.inputOutlineFocus}
            placeholder={i18n.你的电子邮箱}
            value={email()}
            oninput={(e) => setEmail(e.currentTarget.value)}
          />
          <Show when={sentEmail()}>
            <UxInput
              style={css.inputOutline}
              focusStyle={css.inputOutlineFocus}
              labelStyle={{
                "font-size": "var(--ux-text-sm)",
                padding: "0 0.5em",
                color: "var(--ux-gray-500)",
                background: "var(--ux-gray-50)",
              }}
              label={i18n.验证码}
              value={code()}
              oninput={(e) => setCode(e.currentTarget.value)}
            />
            <UxInput
              type="password"
              style={css.inputOutline}
              focusStyle={css.inputOutlineFocus}
              labelStyle={{
                "font-size": "var(--ux-text-sm)",
                padding: "0 0.5em",
                color: "var(--ux-gray-500)",
                background: "var(--ux-gray-50)",
              }}
              label={i18n.密码}
              value={pwd()}
              oninput={(e) => setPwd(e.currentTarget.value)}
            />
          </Show>
          <Show when={!sentEmail()}>
            <UxButton style={css.button} disabled={loading()} onclick={handleSendEmail}>
              <UxLoading loading={loading()}>{i18n.找回密码}</UxLoading>
            </UxButton>
          </Show>
          <Show when={sentEmail()}>
            <UxButton style={css.button} disabled={loading()} onclick={handleChangePwd}>
              <UxLoading loading={loading()}>{i18n.修改密码}</UxLoading>
            </UxButton>
            <UxButton
              style={css.buttonText}
              onclick={() => {
                setSentEmail(false);
              }}
            >
              {i18n.返回上一步}
            </UxButton>
          </Show>
        </form>
      </div>
    </Show>
  );
};

export default ChangePwd;
