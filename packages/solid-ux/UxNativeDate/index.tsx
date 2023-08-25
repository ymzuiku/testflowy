import dayjs from "dayjs";
import { createEffect, createSignal, JSX, splitProps } from "solid-js";

type TimeType = "date" | "time" | "datetime-local";

type UxNativeDateProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "children" | "value" | "oninput"> & {
  type: TimeType;
  value?: string;
  children?: JSX.Element;
  // inputFormat?: (val: string) => string;
  format?: (val: string) => string;
  placeholder?: string;
  oninput?: (t: string) => void;
};

const formats = {
  date: "YYYY-MM-DD",
  time: "HH:MM",
  "datetime-local": "YYYY-MM-DDTHH:MM",
};

if (typeof window !== "undefined") {
  const ele = document.createElement("style");
  ele.innerText = `
  input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator,
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  width: 100%;
  height: 20px;
  border-width: thin;
}
  `;
  document.body.appendChild(ele);
}

export function UxNativeDate(props: UxNativeDateProps) {
  const [p, rest] = splitProps(props, [
    "children",
    "type",
    "format",
    "placeholder",
    "oninput",
    "value",
    "class",
    "style",
  ]);
  const [v, setV] = createSignal(p.value);
  createEffect(() => {
    setV(p.value);
  });
  const valuef = () => dayjs(v()).format(formats[p.type]);
  const labelf = () => {
    const _v = v();
    if (_v !== null && _v !== "") {
      return valuef().replace("T", " ");
    }
    if (p.children) {
      return p.children;
    }
    return "Please select";
  };

  return (
    <label style={{ position: "relative" }}>
      {labelf()}
      <input
        type={p.type}
        placeholder={p.placeholder}
        value={valuef()}
        class={p.class}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          ...(p.style as JSX.CSSProperties),
        }}
        oninput={(e) => {
          const _v = p.format ? p.format(e.currentTarget.value) : e.currentTarget.value;
          p.oninput && p.oninput(_v);
          setV(_v);
        }}
        {...rest}
      ></input>
    </label>
  );
}
