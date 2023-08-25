import { Component, JSX, splitProps } from "solid-js";

export interface UxSolidIconProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
}
export const UxSolidIcon: Component<JSX.HTMLAttributes<HTMLSpanElement> & UxSolidIconProps> = (props) => {
  const [p, rest] = splitProps(props, ["Icon"]);
  return (
    <span {...rest}>
      <p.Icon
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </span>
  );
};
