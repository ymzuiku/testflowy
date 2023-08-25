import { createEventProps, EventProps } from "@solid-primitives/event-props";
import { createMemo } from "solid-js";

export const createPointerActive = (): [() => boolean, EventProps<["pointerdown", "pointerup", "pointerleave"]>] => {
  const [events, eventProps] = createEventProps("pointerdown", "pointerup", "pointerleave");
  const isDown = createMemo(() => {
    const a = events.pointerdown?.timeStamp || 0;
    return a > (events.pointerup?.timeStamp || 1) && a > (events.pointerleave?.timeStamp || 1);
  });
  return [isDown, eventProps];
};
