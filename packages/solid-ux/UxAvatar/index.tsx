import { Component, JSX, Show, splitProps } from "solid-js";

const colors = [`var(--ux-red-700)`, `var(--ux-yellow-800)`, `var(--ux-indigo-800)`];

export const UxAvatar: Component<
  { size: string; name: string; src?: string; style?: JSX.CSSProperties } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [p, rest] = splitProps(props, ["style", "src", "name", "size"]);
  const label = () => {
    return p.name ? p.name[0].toUpperCase() : "N";
  };
  const color = () => {
    const i = label().charCodeAt(0) % colors.length;
    return colors[i] + " ";
  };
  return (
    <div
      style={{
        overflow: "hidden",
        flex: 1,
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        "justify-content": "center",
        "background-color": color(),
        "border-radius": "var(--ux-radius-full)",
        width: p.size,
        height: p.size,
        "min-width": p.size,
        "max-width": p.size,
        "min-height": p.size,
        "max-height": p.size,
        color: "var(--ux-gray-50)",
        "font-size": "var(--ux-text-lg)",
        ...(p.style as JSX.CSSProperties),
      }}
      {...rest}
    >
      <Show when={p.src}>
        <img
          style={{
            width: "100%",
            height: "100%",
            "background-size": "cover",
          }}
          src={p.src}
        />
      </Show>
      <Show when={!p.src}>{label()}</Show>
    </div>
  );
};
