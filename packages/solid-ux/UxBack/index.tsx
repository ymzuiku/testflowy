import { IoChevronBackSharp } from "solid-icons/io";
import { Component, JSX, Show, splitProps } from "solid-js";

export const UxBack: Component<Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & { children?: JSX.Element }> = (
  props,
) => {
  const [p, rest] = splitProps(props, ["children", "style"]);
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        gap: "0.5em",
        cursor: "pointer",
        ...(p.style as JSX.CSSProperties),
      }}
      {...rest}
    >
      <IoChevronBackSharp size={24} />
      <Show when={p.children}>
        <span style={{ "font-size": "1.125em" }}>{p.children}</span>
      </Show>
    </div>
  );
};
