import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxBackBar } from "solid-ux/UxBackBar";
import { UxSvg } from "solid-ux/UxSvg";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { RegisterForm } from "../../welcome/views/RegisterForm";

const Register = (p: { email?: string }) => {
  const sm = createMediaQuerySm();
  return (
    <div>
      <UxBackBar
        title={i18n.注册}
        onBack={() => {
          routers.goBack();
        }}
      />
      <div
        style={{
          padding: "2.5em",
          "max-width": "var(--ux-screen-3xl)",
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
            {i18n.欢迎注册Testflowy}
          </h1>
        </div>
        <RegisterForm email={p.email} />
      </div>
    </div>
  );
};

export default Register;
