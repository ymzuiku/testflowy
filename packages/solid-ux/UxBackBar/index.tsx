import { Component, JSX, Show, splitProps } from "solid-js";
import { createMediaQuerySm } from "../createMediaQuerySm";
import { UxBack } from "../UxBack";

export const UxBackBar: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & {
    onBack?: () => void;
    children?: JSX.Element;
    right?: JSX.Element;
    title?: JSX.Element;
    float?: boolean;
    mobileFloat?: boolean;
    desktopFloat?: boolean;
  }
> = (props) => {
  const sm = createMediaQuerySm();
  const [p, rest] = splitProps(props, [
    "children",
    "title",
    "onBack",
    "style",
    "float",
    "mobileFloat",
    "desktopFloat",
    "right",
  ]);
  return (
    <div
      style={{
        padding: "1.5em 1em",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        "line-height": "1.5",
        "justify-content": "space-between",
        ...(p.float ? { position: "fixed", left: 0, top: 0 } : {}),
        ...(p.mobileFloat ? { position: sm() ? "static" : "fixed", left: 0, top: 0 } : {}),
        ...(p.desktopFloat ? { position: sm() ? "fixed" : "static", left: 0, top: 0 } : {}),
        ...(p.style as JSX.CSSProperties),
      }}
      {...rest}
    >
      <UxBack onclick={p.onBack}>{p.title}</UxBack>
      {p.children}
      <Show when={p.right}>
        <div style={{ flex: 1 }}></div>
        {p.right}
      </Show>
    </div>
  );
};
