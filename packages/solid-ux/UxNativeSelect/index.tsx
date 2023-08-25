import { i18nLocal } from "i18n-less-translate";
import { Component, For, JSX, Show, splitProps } from "solid-js";

const optinos: { value: string; label: string }[] = [];
Object.keys(i18nLocal.languagesText).forEach((k) => {
  optinos.push({ value: k, label: i18nLocal.languagesText[k] });
});
export const UxNativeSelect: Component<
  Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "value" | "children"> & {
    each: { value: string; label: string }[];
    defaultItem?: { value: string; label: string };
    value?: string;
  }
> = (props) => {
  const [p, rest] = splitProps(props, ["each", "value", "class", "defaultItem", "style"]);
  return (
    <label
      class={p.class}
      style={{
        position: "relative",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        cursor: "pointer",
        "box-sizing": "border-box",
        opacity: rest.disabled ? 0.6 : 1,
        "background-color": rest.disabled ? "var(--ux-gray-200)" : "transparent",
        color: "var(--ux-gray-900)",
        ...(p.style as JSX.CSSProperties),
      }}
    >
      <For each={p.defaultItem ? [p.defaultItem, ...p.each] : p.each}>
        {(item) => {
          return <Show when={item.value === p.value}>{item.label}</Show>;
        }}
      </For>
      <select
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          outline: "none",
          appearance: "none",
          opacity: 0,
        }}
        value={p.value}
        {...rest}
      >
        <For each={p.defaultItem ? [p.defaultItem, ...p.each] : p.each}>
          {(item) => (
            <option selected={p.value === item.value} value={item.value}>
              {item.label}
            </option>
          )}
        </For>
      </select>
      <div
        style={{
          width: "1.25em",
          height: "1.25em",
          "margin-left": "0.25em",
        }}
        innerHTML={svg}
      ></div>
    </label>
  );
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><path d="m6 9 6 6 6-6"></path></svg>`;
