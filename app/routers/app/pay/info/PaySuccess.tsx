import { FaSolidCircleCheck } from "solid-icons/fa";
import { UxButton } from "solid-ux/UxButton";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { routers } from "../../..";
import { i18n } from "../../../../i18n";
import { setAppMenu } from "../../../../sdk/record/data";
import { css } from "../../../css";

export const PaySuccess = () => {
  return (
    <>
      <div
        style={{
          width: "4em",
          height: "4em",
          margin: "4em auto 0 auto",
        }}
      >
        <UxSolidIcon
          Icon={FaSolidCircleCheck}
          style={{
            width: "4em",
            height: "4em",
            color: "var(--ux-green-600)",
          }}
        />
      </div>
      <div
        style={{
          "font-size": "var(--ux-text-xl)",
          "font-weight": "bold",
          color: "var(--ux-green-600)",
          background: "var(--ux-gray-50)",
          margin: "1.5em auto",
          "text-align": "center",
        }}
      >
        {i18n.支付成功感谢您的付款}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          "flex-direction": "column",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        <UxButton
          style={{
            ...css.button,
            margin: "0 auto",
          }}
          onclick={() => {
            setAppMenu("license");
            routers.app.replace();
          }}
        >
          {i18n.查看License}
        </UxButton>
      </div>
    </>
  );
};
