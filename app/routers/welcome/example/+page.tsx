import { UxBackBar } from "solid-ux/UxBackBar";
import { routers } from "../..";
import { i18n } from "../../../i18n";

export default function Example(p: { hiddenBack?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        height: "calc(100% - 4px)",
        position: "relative",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      {!p.hiddenBack && (
        <UxBackBar
          title={i18n.返回}
          onBack={() => {
            routers.goBack();
          }}
        />
      )}
      <iframe
        style={{
          border: "none",
          outline: "none",
          padding: 0,
          margin: 0,
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        src="/example/index.html"
      />
    </div>
  );
}
