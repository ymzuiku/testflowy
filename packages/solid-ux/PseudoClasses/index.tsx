import { JSX } from "solid-js";
import { createPointerActive } from "../createPointerActive";
import { createPointerHover } from "../createPointerHover";

export interface PseudoClassProps {
  hover?: boolean;
  active?: boolean;
  focus?: boolean;
  sm?: boolean;
  children: (p: {
    active: () => boolean;
    hover: () => boolean;
    focus: () => boolean;
    // sm: () => boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: any;
  }) => JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNot = (): [() => boolean, any] => {
  return [() => false, {}];
};

export const PseudoClasses = (p: PseudoClassProps) => {
  const [hover, hoverEvents] = p.hover ? createPointerHover() : createNot();
  const [active, activeEvents] = p.active ? createPointerActive() : createNot();
  const [focus, focusEvents] = p.focus ? createPointerHover() : createNot();
  // const sm = p.sm ? createMediaQuerySm() : () => false;

  return p.children({
    hover,
    active,
    focus,
    // sm,
    events: {
      ...hoverEvents,
      ...activeEvents,
      ...focusEvents,
    },
  });
};
