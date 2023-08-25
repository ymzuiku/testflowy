import { isPhone } from "utils/device";
import { testx } from "./testx";

// https://stackoverflow.com/a/53946549/1179377
function isElement(obj?: Element) {
  if (typeof obj !== "object") {
    return false;
  }
  let prototypeStr, prototype;
  do {
    prototype = Object.getPrototypeOf(obj);
    // to work in iframe
    prototypeStr = Object.prototype.toString.call(prototype);
    // '[object Document]' is used to detect document
    if (prototypeStr === "[object Element]" || prototypeStr === "[object Document]") {
      return true;
    }
    obj = prototype;
    // null is the terminal of object
  } while (prototype !== null);
  return false;
}

function getElementClientCenter(element: Element) {
  const { left, top, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

const getCoords = (charlie?: Element): { x: number; y: number } => {
  return (isElement(charlie) ? getElementClientCenter(charlie!) : charlie) as unknown as { x: number; y: number };
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function drag(
  element: Element,
  {
    to: inTo,
    delta,
    steps = 20,
    duration = 100,
  }: { to?: Element; delta?: { x: number; y: number }; steps?: number; duration?: number },
) {
  const from = getElementClientCenter(element);
  const to = delta
    ? {
        x: from.x + delta.x,
        y: from.y + delta.y,
      }
    : getCoords(inTo);

  const step = {
    x: (to.x - from.x) / steps,
    y: (to.y - from.y) / steps,
  };

  const current = {
    clientX: from.x,
    clientY: from.y,
  };

  testx.fireEvent.mouseEnter(element, current);
  testx.fireEvent.mouseOver(element, current);
  testx.fireEvent.mouseMove(element, current);
  testx.fireEvent.mouseDown(element, current);

  testx.fireEvent.pointerEnter(element, current);
  testx.fireEvent.pointerOver(element, current);
  testx.fireEvent.pointerMove(element, current);
  testx.fireEvent.pointerDown(element, current);

  if (isPhone()) {
    testx.fireEvent.touchStart(element, current);
    testx.fireEvent.touchMove(element, current);
    testx.fireEvent.touchEnd(element, current);
  }

  for (let i = 0; i < steps; i++) {
    current.clientX += step.x;
    current.clientY += step.y;
    await sleep(duration / steps);
    testx.fireEvent.mouseMove(element, current);
    testx.fireEvent.pointerMove(element, current);
    if (isPhone()) {
      testx.fireEvent.touchMove(element, current);
    }
  }
  testx.fireEvent.mouseUp(element, current);
  testx.fireEvent.pointerUp(element, current);
  if (isPhone()) {
    testx.fireEvent.touchEnd(element, current);
  }
}
