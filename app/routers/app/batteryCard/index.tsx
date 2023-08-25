import { IoTrailSignOutline } from "solid-icons/io";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { i18n } from "../../../i18n";
import { setAppMenu } from "../../../sdk/record/data";
import { css } from "../../css";
import { Battery } from "../Battery";

const BatteryCard = () => {
  const sm = createMediaQuerySm();
  return (
    <div
      style={{
        "margin-top": "2.5em",
        position: "relative",
        width: sm() ? "500px" : "auto",
        margin: sm() ? "2.5em" : "0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          "z-index": 10,
          background: "var(--ux-indigo-400)",
          display: "inline-block",
          color: "var(--ux-white)",
          padding: "0.5em 1.5em",
          "border-radius": "var(--ux-radius-full)",
        }}
      >
        {i18n.免费}
      </div>
      <div
        style={{
          margin: "0 auto",
          padding: "2.5em",
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          border: "1px solid var(--ux-gray-200)",
          "border-radius": "var(--ux-radius-xl)",
          background: "var(--ux-gary-50)",
        }}
      >
        <IoTrailSignOutline
          style={{
            color: "var(--ux-primary-500)",
            width: "1.5em",
            height: "1.5em",
            margin: "1em 0",
          }}
        />
        <div
          style={{
            "font-size": "var(--ux-text-4xl)",
            "font-weight": "bold",
            "margin-top": "0.5em",
          }}
        >
          {i18n.企业自动化测试扶持计划}
        </div>
        <div style={{ padding: "2.5em 0" }}>
          <Battery style={{ "min-width": "200px" }} />
        </div>
        <div>
          <div>{i18n.首次注册赠送十个}</div>
          <UxButton
            style={{
              ...css.button,
              width: "100%",
              "margin-top": "1.5em",
            }}
            onclick={() => setAppMenu("license")}
          >
            {i18n.查看License}
          </UxButton>
        </div>
      </div>
    </div>
  );
};

export default BatteryCard;
