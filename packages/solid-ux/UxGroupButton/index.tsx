import { Component, For, JSX } from "solid-js";
import { createMediaQuerySm } from "../createMediaQuerySm";

export type UxGroupButtonProps = {
  data: { label: JSX.Element; value: string }[];
  selected?: string;
  onChange?: (value: string) => void;
};

export const UxGroupButton: Component<UxGroupButtonProps> = (p) => {
  const sm = createMediaQuerySm();
  return (
    <div
      style={{
        "border-radius": "var(--ux-radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--ux-gray-300)",
        display: "flex",
        "flex-direction": sm() ? "row" : "column",
      }}
    >
      <For each={p.data}>
        {(item, index) => {
          return (
            <div
              style={{
                cursor: "pointer",
                padding: "0.75em",
                flex: 1,
                color: "var(--ux-gray-500)",
                "text-align": "center",
                ...(p.selected === item.value ? { color: "var(--ux-primary-600)", "font-weight": "bold" } : {}),
                ...(index() < p.data.length - 1
                  ? { "border-bottom": sm() ? "none" : "1px solid var(--ux-gray-300)" }
                  : {}),
                ...(index() < p.data.length - 1
                  ? { "border-right": !sm() ? "none" : "1px solid var(--ux-gray-300)" }
                  : {}),
              }}
              onclick={() => {
                if (p.onChange) {
                  p.onChange(item.value);
                }
              }}
            >
              {item.label}
            </div>
          );
        }}
      </For>
    </div>
  );
};
