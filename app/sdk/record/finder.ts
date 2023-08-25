import { solidMsg } from "solid-msg";
import { TestflowyEvent } from "./data";
import { keyGetElement } from "./keyHelper";
import { waitGet } from "./waitGet";

const needPointEvents: Record<string, boolean> = {
  click: true,
  input: true,
  change: true,
};

const getByTestflowyId = (event: TestflowyEvent) => {
  return waitGet<Element | null>(() => {
    const ele =
      keyGetElement("testflowy-id", event.id) ||
      keyGetElement("testflowy-id2", event.id2) ||
      keyGetElement("testflowy-id3", event.id3) ||
      keyGetElement("testflowy-role", event.role);

    if (ele) {
      if (needPointEvents[event.event] && window.getComputedStyle(ele).pointerEvents === "none") {
        return null;
      }
      if (ele.closest("[data-testflowy-ignore]")) {
        ele.setAttribute("data-testflowy-ignore", "1");
        return null;
      }
    }
    return ele;
  }, 2000);
};

export const finder = async (event: TestflowyEvent) => {
  let ele: Element | null = null;

  try {
    ele = await getByTestflowyId(event);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("No found:", event);
    solidMsg.dark(
      `No found tag:${event.tag}\n${event.id ? `id=${event.id}` : `${event.id2}\n or ${event.id3}\n or ${event.role}`}`,
      1000 * 60 * 60 * 24,
    );
    return null;
  }
  return ele;
};
