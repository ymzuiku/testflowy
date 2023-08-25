import { solidMsg } from "solid-msg";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { UxSvg } from "solid-ux/UxSvg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { apis } from "../../_apis";
import { logout } from "../../appStorage";
import { css } from "../../css";

const Invitation = (p: { code: string; email: string; owner: string; ownerEmail: string }) => {
  const sm = createMediaQuerySm();
  const handleInvitation = async () => {
    const invitation = await apis.login_invitation.invitation({
      code: p.code,
      email: p.email,
      owner: p.owner,
    });
    if (invitation.ok) {
      solidMsg.dark(i18n.成功加入团队请重新登录, 2000);
      logout();
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
          <UxSvg
            src="/logo_custom.svg"
            style={{
              width: sm() ? "4em" : "3em",
              height: sm() ? "4em" : "3em",
            }}
          />
          <h1
            style={{
              "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
              "margin-left": "1em",
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
            margin: "0 auto",
            width: "400px",
            "margin-top": "2.5em",
            gap: "0.75em",
          }}
          onsubmit={(e) => {
            e.preventDefault();
            handleInvitation();
          }}
        >
          <UxInput
            type="email"
            style={{
              ...css.inputOutline,
              flex: 1,
              background: "var(--ux-gray-50)",
            }}
            focusStyle={css.inputOutlineFocus}
            value={p.email}
            disabled
            label={i18n.电子邮箱}
          />
          <UxButton
            style={{
              ...css.button,
              width: "100%",
            }}
            type="submit"
          >
            {i18n.加入团队}
          </UxButton>
        </form>
      </div>
    </div>
  );
};

export default Invitation;
