import { solidMsg } from "solid-msg";
import { base64toFiles } from "utils/strs/base64";
import { i18n } from "../../i18n";
import { apis } from "../../routers/_apis";
import { actions, waitTimer } from "./actions";
import { eventKeys, getSdkAuth, sdkStorage, setEventKeys, setMouse, setStep } from "./data";
import drag from "./drag";
import { eventsParse } from "./eventsParse";
import { finder } from "./finder";
import { mockValue } from "./mock";
import { testx } from "./testx";

const ignoreEvent: Record<string, boolean> = { ignoreEvent: true };

let n = 0;
const updateMouse = (el: Element | null) => {
  if (!el) {
    setMouse({ top: -100 });
    return;
  }
  n += 2;
  n = n % 1000;
  const rect = el.getBoundingClientRect();
  if (!rect) {
    setMouse({ top: -100 });
    return;
  }
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  setMouse({
    left: x,
    top: y,
    rotate: n * 90,
    scale: 0.3,
  });
  requestAnimationFrame(() => {
    setMouse({ scale: 1 });
  });
};

export async function replay() {
  if (sdkStorage.val.isHidden || sdkStorage.val.run !== "replay") {
    return;
  }
  const speed = sdkStorage.val.speed;
  let i = -1;
  // const events = JSON.parse(JSON.stringify(sdkStorage.val.events));
  const events = sdkStorage.val.events || [];

  for (const item of events) {
    if (item.error) {
      solidMsg.red(item.error);
      actions.idle();
      const nextData = eventsParse(item.code!, item.isCrypto!);
      sdkStorage.assign({ events: nextData.events, meta: nextData.meta });
      return;
    }
    if (sdkStorage.val.isHidden || sdkStorage.val.run !== "replay") {
      return;
    }
    i++;
    if (eventKeys.has(item.key) || ignoreEvent[item.event]) {
      continue;
    }
    if (item.wait && !isNaN(Number(item.wait))) {
      const duration = Number(item.wait) * 1000;
      solidMsg.dark(`Waiting ${item.wait}s`, duration);
      await new Promise((res) => {
        waitTimer.timer = setTimeout(res, duration);
      });
    }
    setStep(i + 1);
    setEventKeys(item.key);
    if (item.event === "gotoUrl" && item.value) {
      await new Promise((res) => setTimeout(res, 250));
      const nowUrl = location.href.replace(location.origin, "");
      location.href = item.value!;
      if (nowUrl === item.value) {
        history.go(0);
        location.reload();
      }
      return;
    }
    const el = await finder(item);

    updateMouse(el);
    if (!el) {
      // 测试失败, 如果之前的记录不是失败,要更新
      if (sdkStorage.val.passList[item.taskId!] === true) {
        if (sdkStorage.val.runType === "draft") {
          await apis.task_draft.updatePassDarft({
            auth: getSdkAuth(),
            id: item.taskId!,
            pass: false,
            uid: getSdkAuth().uid,
          });
        } else if (sdkStorage.val.runType === "task") {
          await apis.task_task.updatePassTask({
            auth: getSdkAuth(),
            id: item.taskId!,
            pass: false,
            uid: getSdkAuth().uid,
          });
        }
      }
      return;
    }
    if (item.event === "click") {
      await new Promise((res) => setTimeout(res, 250 / speed));
      await testx.click(el);
    } else if (item.type === "file") {
      try {
        const fileValue = sdkStorage.val.meta[item.value!];
        const file = base64toFiles(JSON.parse(fileValue));
        await testx.upload(el as HTMLElement, file);
      } catch (e) {
        console.error(e);
      }
    } else if (item.event === "input" || item.event === "change") {
      await new Promise((res) => setTimeout(res, 250 / speed));
      if (item.tag === "select") {
        testx.fireEvent.change(el, {
          target: {
            value: mockValue(item.value!),
            checked: item.type === "checked",
          },
        });
      } else {
        testx.fireEvent.input(el, {
          target: {
            value: mockValue(item.value!),
            checked: item.type === "checked",
          },
        });
      }
    } else if (item.event === "drag") {
      await new Promise((res) => setTimeout(res, 10 / speed));
      await drag(el, {
        delta: JSON.parse(item.value!),
      });
    } else if (item.event === "dragover") {
      await new Promise((res) => setTimeout(res, 10 / speed));
      testx.fireEvent.dragOver(el);
    } else if (item.event === "dragenter") {
      await new Promise((res) => setTimeout(res, 10 / speed));
      testx.fireEvent.dragEnter(el);
    } else if (item.event === "dragstart") {
      await new Promise((res) => setTimeout(res, 10 / speed));
      testx.fireEvent.dragStart(el);
    } else if (item.event === "dragend") {
      await new Promise((res) => setTimeout(res, 10 / speed));
      testx.fireEvent.dragEnd(el);
    }

    // dragover: true,
    // dragenter: true,
    // dragstart: true,
    // dragend: true,

    // 如果是某个序列中最后一个, 并且之前的记录是失败, 更新记录
    if (item.isLast && !sdkStorage.val.passList[item.taskId!]) {
      if (sdkStorage.val.runType === "draft") {
        await apis.task_draft.updatePassDarft({
          auth: getSdkAuth(),
          id: item.taskId!,
          pass: true,
          uid: getSdkAuth().uid,
        });
      } else if (sdkStorage.val.runType === "task") {
        await apis.task_task.updatePassTask({
          auth: getSdkAuth(),
          id: item.taskId!,
          pass: true,
          uid: getSdkAuth().uid,
        });
      }
    }
    if (i === events.length - 1) {
      actions.idle();
      solidMsg.green(i18n.测试通过, 2000);
    }
  }
}
