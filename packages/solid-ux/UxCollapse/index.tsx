import { Component, createSignal, mergeProps, Show, splitProps } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { UxSvg } from "../UxSvg";

export interface UxCollapseProps {
  title: JSX.Element | ((isOpen: boolean) => JSX.Element);
  baseOpen?: boolean;
  hiddenArrow?: boolean;
  arrowClass?: string;
  style?: JSX.CSSProperties;
  arrowStyle?: JSX.CSSProperties;
  contentStyle?: JSX.CSSProperties;
  contentClass?: string;
  arrowSize?: number;
  class?: string;
}
export const UxCollapse: Component<Omit<JSX.HTMLAttributes<HTMLDivElement>, "title"> & UxCollapseProps> = (props) => {
  const [_p, rest] = splitProps(props, [
    "arrowClass",
    "style",
    "arrowSize",
    "baseOpen",
    "hiddenArrow",
    "arrowStyle",
    "title",
    "children",
    "contentStyle",
    "contentClass",
  ]);
  const p = mergeProps({ arrowSize: 1 }, _p);
  let ref: HTMLDivElement;
  const [isOpen, setIsOpen] = createSignal(!!p.baseOpen);
  const mx = () => {
    if (isOpen()) {
      if (ref) {
        return (ref.scrollHeight || "1000") + "px";
      }
      return "1000px";
    }
    return "0px";
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          "flex-direction": "row",
          "align-items": "center",
          ...(p.style as JSX.CSSProperties),
        }}
        onclick={() => {
          setIsOpen(!isOpen());
        }}
        {...rest}
      >
        {typeof p.title === "function" ? (p.title as (isOpen: boolean) => JSX.Element)(!!isOpen()) : p.title}
        <Show when={!p.hiddenArrow}>
          <UxSvg
            src={arrowSvg}
            class={p.arrowClass}
            style={{
              display: "block",
              "margin-left": "0.4rem",
              width: `${1.2 * p.arrowSize}rem`,
              height: `${1.2 * p.arrowSize}rem`,
              transition: "transform 150ms ease",
              transform: isOpen() ? "rotate(90deg)" : "rotate(0deg)",
              ...p.arrowStyle,
            }}
          />
        </Show>
      </div>
      <div
        ref={(r) => (ref = r)}
        class={p.contentClass}
        style={{
          transition: isOpen() ? "max-height 200ms ease" : "max-height 300ms ease",
          padding: 0,
          margin: 0,
          overflow: "hidden",
          "max-height": mx(),
          ...p.contentStyle,
        }}
      >
        {p.children}
      </div>
    </>
  );
};

const arrowSvg = `<svg t="1669983030989" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20702" width="100%" height="100%"><path d="M593.450667 512.128L360.064 278.613333l45.290667-45.226666 278.613333 278.762666L405.333333 790.613333l-45.226666-45.269333z" p-id="20703" fill="currentColor"></path></svg>`;
