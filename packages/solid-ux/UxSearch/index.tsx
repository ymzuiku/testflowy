import { IoSearch } from "solid-icons/io";
import { createSignal, JSX, splitProps } from "solid-js";

export const UxSearch = (
  props: {
    value: string;
    label?: string;
    labelClass?: string;
    onSearch?: (value: string) => void;
  } & JSX.InputHTMLAttributes<HTMLInputElement>,
) => {
  const [focus, setFocus] = createSignal(false);
  let input: HTMLInputElement;
  const [p, rest] = splitProps(props, ["label", "onSearch", "class", "style", "placeholder", "value", "labelClass"]);

  // 记录上一次搜索的内容, 每当blur时,判断内容是否一样,如果不一样就执行搜索
  let lastSearch = "";

  return (
    <div
      class={p.class}
      style={{
        padding: "0.25em 0.75em",
        "box-sizing": "border-box",
        appearance: "none",
        "border-radius": "var(--ux-radius)",
        flex: 1,
        display: "flex",
        position: "relative",
        "flex-direction": "row",
        "align-items": "center",
        color: "var(--ux-gray-900)",
        ...(p.style as JSX.CSSProperties),
        ...(focus() ? { border: "1px solid var(--ux-primary-400)" } : {}),
      }}
    >
      <input
        ref={input!}
        style={{
          appearance: "none",
          "-webkit-appearance": "none",
          width: "100%",
          height: "100%",
          border: "none",
          flex: 1,
          color: "var(--ux-gray-900)",
          "background-color": "transparent",
        }}
        onkeydown={(e) => {
          if (e.key === "Enter") {
            if (p.onSearch) {
              lastSearch = p.value;
              p.onSearch(p.value);
            }
          }
        }}
        onblur={(e) => {
          const value = e.currentTarget.value;
          if (value !== lastSearch) {
            lastSearch = value;
            p.onSearch && p.onSearch(value);
          }
          setFocus(false);
        }}
        onfocus={() => setFocus(true)}
        value={p.value}
        placeholder={p.placeholder || p.label}
        {...rest}
      />
      <div
        style={{
          background: "var(--ux-primary-500)",
          padding: "0.5em 1em",
          "border-radius": "var(--ux-radius)",
          transition: "all 150ms ease",
          "transform-origin": "right",
          color: "var(--ux-white)",
          ...(!p.value && !focus() ? { opacity: 0, "pointer-events": "none", transform: "scaleX(0)" } : {}),
        }}
      >
        <IoSearch
          size={16}
          onclick={() => {
            if (p.onSearch) {
              p.onSearch(p.value);
            }
          }}
        />
      </div>
    </div>
  );
};
