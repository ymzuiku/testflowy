import { CgClose } from "solid-icons/cg";
import { JSX, Show, splitProps } from "solid-js";
import { createFocus } from "../createFocus";

export const UxInput = (
  props: {
    right?: boolean;
    label?: string;
    labelClass?: string;
    labelStyle?: JSX.CSSProperties;
    focusStyle?: JSX.CSSProperties;
    inputClass?: string;
    inputStyle?: JSX.CSSProperties;
    hiddenClose?: boolean;
  } & JSX.InputHTMLAttributes<HTMLInputElement>,
) => {
  let input: HTMLInputElement;
  const [focus, focusEvents] = createFocus();
  const [p, rest] = splitProps(props, [
    "label",
    "class",
    "style",
    "focusStyle",
    "placeholder",
    "value",
    "labelClass",
    "hiddenClose",
    "inputClass",
    "labelStyle",
    "inputStyle",
    "right",
  ]);

  return (
    <label
      style={{
        "box-sizing": "border-box",
        flex: 1,
        position: "relative",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        color: "var(--ux-gray-900)",
        opacity: rest.disabled ? 0.6 : 1,
        ...(p.style as JSX.CSSProperties),
        ...(focus() ? p.focusStyle : {}),
      }}
    >
      <Show when={String(p.value).length}>
        <span
          class={p.labelClass}
          style={{
            "font-size": "var(--ux-text-sm)",
            padding: "0 0.5em",
            "background-color": "var(--ux-gray-50)",
            color: "var(--ux-gray-500)",
            left: "0.5em",
            top: 0,
            transform: "translateY(-50%)",
            position: "absolute",
            "text-align": p.right ? "right" : "left",
            ...p.labelStyle,
          }}
        >
          {p.label}
        </span>
      </Show>
      <input
        ref={input!}
        class={p.inputClass}
        {...focusEvents}
        style={{
          appearance: "none",
          "-webkit-appearance": "none",
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          border: "none",
          outline: "none",
          "box-sizing": "border-box",
          color: "var(--ux-gray-900)",
          "background-color": "transparent",
          "font-size": "var(--ux-text-md)",
          "text-align": p.right ? "right" : "left",
          ...p.inputStyle,
        }}
        value={p.value}
        placeholder={p.placeholder || p.label}
        {...rest}
      />
      <Show when={!p.hiddenClose && String(p.value).length && !rest.disabled}>
        <CgClose
          size={15}
          style={{
            opacity: 0.6,
          }}
          onclick={() => {
            if (rest.oninput) {
              input.value = "";
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (rest.oninput as any)({ target: input, currentTarget: input });
            } else if (rest.onchange) {
              input.value = "";
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (rest.onchange as any)({ target: input, currentTarget: input });
            }
          }}
        />
      </Show>
    </label>
  );
};
