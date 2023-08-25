import { Component, JSX } from "solid-js";

export const UxSwitch: Component<
  JSX.HTMLAttributes<HTMLDivElement> & {
    value: boolean;
    onchange?: (value: boolean) => void;
    buttonStyle?: JSX.CSSProperties;
  }
> = (p) => {
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "4px",
        cursor: "pointer",
        width: "44px",
        height: "22px",
        "border-radius": "var(--ux-radius-full)",
        ...(p.style as JSX.CSSProperties),
      }}
      onclick={() => {
        if (p.onchange) {
          p.onchange(!p.value);
        }
      }}
    >
      <div
        style={{
          background: "var(--ux-gray-50)",
          height: "100%",
          width: "50%",
          transition: "all 200ms ease-out",
          "box-shadow": "var(--ux-shadow-lg)",
          "border-radius": "var(--ux-radius-full)",
          ...(p.value ? { transform: `translateX(100%)` } : {}),
          ...(p.buttonStyle as JSX.CSSProperties),
        }}
      ></div>
    </div>
  );
};
