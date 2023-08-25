import { For, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

export const UxGroup = <T extends { value: string | number }>(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & {
    each: T[];
    value?: string | number;
    onSelected?: (value: string | number) => void;
    children: (props: { onclick: () => void; selected: boolean; selectedValue?: string | number } & T) => JSX.Element;
  },
) => {
  const [p, rest] = splitProps(props, ["each", "children", "value", "onSelected"]);
  return (
    <div {...rest}>
      <For each={p.each}>
        {(item) => {
          const handleClick = () => {
            if (p.onSelected) {
              p.onSelected(item.value);
            }
          };
          return (
            <Dynamic
              {...{
                ...item,
                onclick: handleClick,
                selected: item.value === p.value,
                selectedValue: p.value,
              }}
              component={p.children}
            />
          );
        }}
      </For>
    </div>
  );
};
