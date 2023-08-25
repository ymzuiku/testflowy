import { SHA256 } from "crypto-js";
import { solidMsg } from "solid-msg";
import { filesLoad } from "utils/fileLoad";
import { sdkStorage, setLastRecord, TesterElement, TestflowyEvent } from "./data";
import { eventMap, EventMapKeys } from "./eventMap";
import { keyGet } from "./keyHelper";
import { lastMocks, mocks } from "./mock";
import { setAttrId } from "./setAttrId";
import { testx } from "./testx";
import { tiny_file } from "./tiny_file";
const ignoreTags: Record<string, boolean> = {
  path: true,
};

const pointerDownEvents: Record<string, boolean> = {
  // touchstart: true,
  pointerdown: true,
  // mousedown: true,
};

const pointerMoveEvents: Record<string, boolean> = {
  // touchstart: true,
  pointermove: true,
  // mousedown: true,
};

const pointerEndEvents: Record<string, boolean> = {
  // touchstart: true,
  pointerup: true,
  // mousedown: true,
};

const pointerEvents: Record<string, boolean> = {
  ...pointerDownEvents,
  ...pointerMoveEvents,
  ...pointerEndEvents,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getXY(e: any) {
  if (e.touches) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  return { x: e.x, y: e.y };
}

export const allowEvent: Record<string, boolean> = {
  click: true,
  change: true,
  // drag 的 target 还有问题,暂时注释, 并且监听的内容太多, 需要精简
  // dragover: true,
  // dragenter: true,
  // dragstart: true,
  // dragend: true,
  ...pointerEvents,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getElementData(eventName: string, element: TesterElement, event: any): Promise<TestflowyEvent> {
  if (element) {
    setAttrId(element);
  }
  let value =
    element.tagName === "SELECT" && element.multiple
      ? element.selectedOptions.length > 0
        ? JSON.stringify(Array.from(element.selectedOptions).map((o) => o.value))
        : null
      : element.value;

  let type;
  // let other: Record<string, unknown> | void;
  if (element.type === "checkbox" || element.type === "radio") {
    type = "checked";
  } else if (element.type === "file" && eventName === "change") {
    const files = await filesLoad(element);
    value = JSON.stringify(files);
    type = "file";
  } else if (pointerEvents[eventName]) {
    value = JSON.stringify(getXY(event));
  }

  const out = {
    key: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
    event: eventName,
    type,
    id: keyGet(element, "testflowy-id") || "",
    id2: keyGet(element, "testflowy-id2") || "",
    id3: keyGet(element, "testflowy-id3") || "",
    role: keyGet(element, "testflowy-role") || "",
    tag: element.tagName.toLowerCase(),
    value: (element as unknown as { __mockvalue: string }).__mockvalue || value || void 0,
    // other: other || void 0,
  };

  Object.keys(out).forEach((k) => {
    const v = (out as unknown as Record<string, unknown>)[k];
    if (v === void 0 || v === null) {
      delete (out as unknown as Record<string, unknown>)[k];
    }
  });

  return out;
}

export type TesterEvent = typeof eventMap.dragLeave & { name: string };

export function addInitEvents(node: Element) {
  // 实现mock
  window.addEventListener(
    "input",
    function (event) {
      if (sdkStorage.val.run !== "record") {
        return;
      }
      if (event.target === event.currentTarget) {
        return;
      }
      const element = (event as unknown as Record<string, unknown>).target as HTMLInputElement & {
        __mockvalue: string;
        __mocktype: string;
      };
      const value = element.value;
      // 替换mock值
      const last = lastMocks.val[value];
      if (last !== void 0) {
        element.__mockvalue = value;
        testx.fireEvent.input(element, { target: { value: last } });
      } else {
        const fn = mocks[value];
        if (fn) {
          element.__mockvalue = value;
          testx.fireEvent.input(element, { target: { value: fn() } });
        }
      }
    },
    true,
  );

  const drags: TestflowyEvent[] = [];

  const createEventLogger = (eventType: TesterEvent) => {
    return async function logEvent(event: Event) {
      if (sdkStorage.val.run !== "record" || sdkStorage.val.isHidden) {
        return;
      }
      if (!event || !event.target) {
        return;
      }
      if (event.target === event.currentTarget) {
        return;
      }

      let ele = event.target as TesterElement;
      if (ele === document.body) {
        return;
      }
      if (ele.closest("svg")) {
        ele = ele.closest("svg") as unknown as TesterElement;
      }
      if (ele.closest("[data-testflowy-ignore]")) {
        return;
      }

      const data = await getElementData(eventType.name, ele, event);
      if (ignoreTags[data.tag]) {
        return;
      }
      if (data.event !== "pointermove" && data.id + data.id2 + data.id3 + data.role === "") {
        console.log(ele, data.event);
        return;
      }

      if (pointerEvents[data.event]) {
        if (pointerDownEvents[data.event]) {
          drags.splice(0);
          drags.push(data);
        } else if (drags.length > 0 && pointerMoveEvents[data.event]) {
          drags.push(data);
        } else if (drags.length > 30 && pointerEndEvents[data.event]) {
          data.event = "drag";
          const start = JSON.parse(drags[0].value!);
          const end = JSON.parse(data.value!);
          data.value = JSON.stringify({ x: end.x - start.x, y: end.y - start.y });
          drags.splice(0);
          setLastRecord(data);
        }
        return;
      }

      if (data.type === "file") {
        if (data.value && data.value.length > 500000) {
          solidMsg.dark("[Testflowy] If file input max in 500KB, use base image file data.", 2000);
          data.value = tiny_file.value;
        }
        const metaId = "meta_" + SHA256(data.value || "").toString();
        const value = data.value;
        data.value = metaId;
        setLastRecord(data, { [metaId]: value! });
        return;
      }

      setLastRecord(data);
    };
  };

  const eventListeners: { name: EventMapKeys; listener: unknown }[] = [];
  const keys = Object.keys(allowEvent);
  for (const name of keys) {
    eventListeners.push({
      name: name.toLowerCase() as EventMapKeys,
      listener: node.addEventListener(
        name.toLowerCase(),
        createEventLogger({ name, ...eventMap[name as EventMapKeys] } as TesterEvent),
        true,
      ),
    });
  }

  return eventListeners;
}
