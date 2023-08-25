import { UxBackBar } from "solid-ux/UxBackBar";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { Buy } from "../../app/pay/Buy";

export default function Price() {
  return (
    <div>
      <UxBackBar
        title={i18n.返回}
        onBack={() => {
          routers.goBack();
        }}
      />
      <div
        style={{
          padding: "2em",
          "margin-right": "2em",
        }}
      >
        <Buy />
      </div>
    </div>
  );
}
