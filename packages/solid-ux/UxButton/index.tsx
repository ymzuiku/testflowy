import { Component, JSX, splitProps } from "solid-js";
import { createPointerActive } from "../createPointerActive";

export const UxButton: Component<JSX.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const [p, rest] = splitProps(props, ["style"]);
  const [active, events] = createPointerActive();
  return (
    <button
      {...events}
      style={{
        "box-sizing": "border-box",
        "font-size": "inherit",
        ...(p.style as JSX.CSSProperties),
        ...(active()
          ? {
              opacity: 0.6,
            }
          : {}),
      }}
      {...rest}
    ></button>
  );
};
