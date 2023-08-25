import { Component, JSX, Show, splitProps } from "solid-js";

export const UxOption: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & { children?: JSX.Element; selected?: boolean }
> = (props) => {
  const [p, rest] = splitProps(props, ["children", "selected", "class", "style"]);
  return (
    <div
      {...rest}
      class={p.class}
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        cursor: "pointer",
        ...(p.style as JSX.CSSProperties),
      }}
    >
      <div
        style={{
          width: "1em",
          height: "1em",
          "border-radius": "var(--ux-radius-full)",
          "box-shadow": "var(--ux-ring-4)",
          "--ux-ring-color": "var(--ux-primary-500)",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "center",
        }}
      >
        <div
          style={{
            width: "0.75em",
            height: "0.75em",
            "border-radius": "100%",
            background: "var(--ux-primary-400)",
            transition: "transform 200ms ease-out",
            transform: !p.selected ? "scale(0)" : "none",
          }}
        ></div>
      </div>
      <Show when={p.children}>
        <div style={{ "margin-left": "0.75em" }}>{p.children}</div>
      </Show>
    </div>
  );
};
