import { createSignal } from "solid-js";
import { solidMsg } from "solid-msg";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { UxSvg } from "solid-ux/UxSvg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { routers } from "../../..";
import { i18n } from "../../../../i18n";
import { apis } from "../../../_apis";
import { actionLogin } from "../../../appActions";
import { css } from "../../../css";

const InvitationRegister = (p: { code: string; email: string; owner: string; ownerEmail: string }) => {
  const sm = createMediaQuerySm();
  const [pwd, setPwd] = createSignal("");
  const [pwdAgain, setPwdAgain] = createSignal("");
  const handleInvitationAndRegister = async () => {
    if (pwd() !== pwdAgain()) {
      solidMsg.red(i18n.两次密码不一致);
      return;
    }
    const invitation = await apis.login_invitation.registerAndInvitation({
      code: p.code,
      email: p.email,
      owner: p.owner,
      pwd: pwd(),
    });
    if (invitation.ok) {
      solidMsg.dark(i18n.成功注册, 500);
      if (await actionLogin({ email: p.email, pwd: pwd() })) {
        routers.app.push();
      }
    }
  };
  return (
    <div>
      <UxBackBar
        title={i18n.首页}
        onBack={() => {
          routers.welcome.clearTo();
        }}
      />
      <div
        style={{
          padding: "2.5em",
          "max-width": sm() ? "var(--ux-screen-3xl)" : "100%",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            padding: "1em",
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            "justify-content": "center",
            "box-sizing": "border-box",
          }}
        >
          <UxSvg src="/logo_custom.svg" style={{ width: sm() ? "4em" : "3em", height: sm() ? "4em" : "3em" }} />
          <h1
            style={{
              "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
            }}
          >
            <span
              style={{
                "margin-right": "0.25em",
                color: "var(--ux-primary-500)",
              }}
            >
              {p.ownerEmail}
            </span>
            <span>{i18n.邀您加入团队}</span>
          </h1>
        </div>
        <form
          style={{
            display: "flex",
            "flex-direction": "column",
            "margin-top": "2.5em",
            width: "400px",
            margin: "0 auto",
            gap: "0.75em",
          }}
          onsubmit={(e) => {
            e.preventDefault();
            handleInvitationAndRegister();
          }}
        >
          <UxInput
            type="email"
            style={{ ...css.inputOutline, flex: 1, background: "var(--ux-gray-50)" }}
            focusStyle={css.inputOutlineFocus}
            value={p.email}
            disabled
            label={i18n.电子邮箱}
            oninput={(e) => setPwd(e.currentTarget.value)}
          />
          <UxInput
            type="password"
            style={{
              ...css.inputOutline,
              flex: 1,
              background: "var(--ux-gray-50)",
            }}
            focusStyle={css.inputOutlineFocus}
            value={pwd()}
            label={i18n.密码}
            oninput={(e) => setPwd(e.currentTarget.value)}
          />
          <UxInput
            type="password"
            style={{
              ...css.inputOutline,
              flex: 1,
              background: "var(--ux-gray-50)",
            }}
            focusStyle={css.inputOutlineFocus}
            value={pwdAgain()}
            label={i18n.确认密码}
            oninput={(e) => setPwdAgain(e.currentTarget.value)}
          />
          <UxButton
            style={{
              ...css.button,
              width: "100%",
            }}
            type="submit"
          >
            {i18n.注册}
          </UxButton>
        </form>
      </div>
    </div>
  );
};

export default InvitationRegister;
