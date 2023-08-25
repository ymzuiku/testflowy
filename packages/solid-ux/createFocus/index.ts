import { createEventProps, EventProps } from "@solid-primitives/event-props";
import { createMemo } from "solid-js";

export const createFocus = (): [() => boolean, EventProps<["focus", "blur"]>] => {
  const [events, eventProps] = createEventProps("focus", "blur");
  const isDown = createMemo(() => (events.focus?.timeStamp || 0) > (events.blur?.timeStamp || 1));
  return [isDown, eventProps];
};
