import { RiSystemCheckboxBlankLine, RiSystemCheckboxFill, RiSystemCheckboxIndeterminateFill } from "solid-icons/ri";
import { Component, JSX, Match, splitProps, Switch } from "solid-js";

export const UxCheckbox: Component<JSX.HTMLAttributes<HTMLDivElement> & { value: boolean; half?: boolean }> = (
  props,
) => {
  // eslint-disable-next-line
  const [p, rest] = splitProps(props, ["value", "half", "style"]);
  return (
    <div
      style={{
        cursor: "pointer",
        ...(p.style as JSX.CSSProperties),
      }}
      {...rest}
    >
      <Switch>
        <Match when={p.value}>
          <RiSystemCheckboxFill
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Match>
        <Match when={p.half}>
          <RiSystemCheckboxIndeterminateFill
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Match>
        <Match when={!p.half && !p.value}>
          <RiSystemCheckboxBlankLine
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Match>
      </Switch>
    </div>
  );
};
