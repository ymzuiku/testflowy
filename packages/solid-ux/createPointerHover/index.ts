import { createEventProps, EventProps } from "@solid-primitives/event-props";
import { createMemo } from "solid-js";
import { createMediaQuerySm } from "../createMediaQuerySm";

export const createPointerHover = (): [() => boolean, EventProps<["mouseenter", "mouseleave"]>] => {
  const [events, eventProps] = createEventProps("mouseenter", "mouseleave");
  const sm = createMediaQuerySm();
  const isDown = createMemo(() => {
    if (!sm()) {
      return false;
    }

    const a = events.mouseenter?.timeStamp || 0;
    return a > (events.mouseleave?.timeStamp || 1);
  });
  return [isDown, eventProps];
};
