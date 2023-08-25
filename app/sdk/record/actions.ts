import { solidMsg } from "solid-msg";
import { cacheFn } from "utils/cacheFn";
import { i18n } from "../../i18n";
import { apis } from "../../routers/_apis";
import {
  eventKeys,
  getSdkAuth,
  isExample,
  isHidden,
  panel,
  recordLength,
  sdkStorage,
  setEditorOnlyView,
  setIsHidden,
  setLastRecord,
  setMouse,
  setName,
  setPanel,
  setRecordLength,
  setRun,
  setSessionEventKeys,
  setShowEditor,
  setStep,
} from "./data";
import { eventsParse, eventsToString } from "./eventsParse";
import { replay } from "./replay";

const recordNowUrl = () => {
  if (recordLength() === 0) {
    // 只存相对路径
    setLastRecord({
      key: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
      event: "gotoUrl",
      value: location.href.replace(location.origin, ""),
      id: "",
      id2: "",
      id3: "",
      role: "",
      tag: location.origin,
    });
  }
};

export const waitTimer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timer: 0 as any,
};

const stopWaitTimer = () => {
  if (waitTimer.timer) {
    clearTimeout(waitTimer.timer);
    waitTimer.timer = 0;
  }
};

export const actions = {
  hidden: () => {
    setIsHidden(!isHidden());
  },
  run: (type?: "draft" | "task") => {
    stopWaitTimer();
    setIsHidden(false);
    if (type) {
      sdkStorage.assign({ runType: type });
    }
    // run
    setStep(0);
    setSessionEventKeys([]);
    eventKeys.clear();
    setPanel("tool");
    if (sdkStorage.val.events.length) {
      setRun("replay");
      replay();
    } else {
      setRun("idle");
    }
  },
  record: () => {
    stopWaitTimer();
    setIsHidden(false);
    setMouse("top", -100);
    recordNowUrl();
    setPanel("tool");
    setRun("record");
  },
  clear: () => {
    stopWaitTimer();
    setSessionEventKeys([]);
    eventKeys.clear();
    sdkStorage.assign({ events: [] });
    setStep(0);
    setRecordLength(sdkStorage.val.events.length);
    recordNowUrl();
  },
  idle: () => {
    stopWaitTimer();
    setSessionEventKeys([]);
    eventKeys.clear();
    setMouse("top", -100);
    setPanel("tool");
    setRun("idle");
  },
  window: cacheFn("actions.window", 50, () => {
    if (panel()) {
      setPanel("tool");
    } else {
      setPanel("panel");
    }
  }),
  load: ({
    name,
    code,
    id,
    pass,
    crypto,
  }: {
    name: string;
    code: string;
    id: string;
    pass: boolean;
    crypto: boolean;
  }) => {
    let events;
    let meta;
    const passList: Record<string, boolean> = { [id]: !!pass };
    try {
      const data = eventsParse(code, crypto);
      events = data.events;
      events.forEach((v: Record<string, unknown>, i: number) => {
        v.taskId = id;
        v.isLast = i === events.length - 1;
      });
      const last = events[events.length - 1];
      if (last) {
        last.taskId = id;
        last.isLast = true;
      }
      meta = data.meta;
    } catch (err) {
      events = [];
      meta = {};
    }
    sdkStorage.assign({ name, id, events, meta, step: 0, multiple: false, passList });
    setRecordLength(sdkStorage.val.events.length);
    setName(name);
  },
  loadAll: (list: { name: string; code: string; id: string; merge?: boolean; pass: boolean; crypto: boolean }[]) => {
    const events: typeof sdkStorage.val.events = [];
    const passList: Record<string, boolean> = {};
    const meta = {};
    let id = "";
    list.forEach((item) => {
      try {
        const subEvents = eventsParse(item.code, item.crypto);
        Object.assign(meta, subEvents.meta);
        const last = subEvents.events[subEvents.events.length - 1];
        if (last) {
          last.taskId = item.id;
        }
        passList[item.id] = !!item.pass;

        const len = subEvents.events.length;
        subEvents.events.forEach((v: Record<string, unknown>, i: number) => {
          v.taskId = item.id;
          v.isLast = i === len - 1;
        });
        events.push(...subEvents.events);
        id += "__" + item.id;
      } catch (err) {
        //
      }
    });

    sdkStorage.assign({ name: "Some", id, events, meta, step: 0, multiple: true, passList });
    setRecordLength(sdkStorage.val.events.length);
    setName("Some");
  },
  save: async () => {
    const { code, md5 } = eventsToString(sdkStorage.val.events, sdkStorage.val.meta);
    if (!isExample()) {
      const name = sdkStorage.val.name;
      const res = await apis.task_draft.updateDarft({
        auth: getSdkAuth(),
        id: sdkStorage.val.id,
        code,
        md5,
        name: name,
        crypto: !!sdkStorage.val.localPwd,
        steps: sdkStorage.val.events.length,
      });
      if (res.ok) {
        solidMsg.dark(i18n.修改成功, 500);
      }
    } else {
      solidMsg.dark(i18n.暂存本地, 500);
    }
  },
  openEditor: async (onlyView = false) => {
    setEditorOnlyView(onlyView);
    setShowEditor(true);
  },
  closeEditor: async () => {
    setShowEditor(false);
  },
};
