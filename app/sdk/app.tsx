import { DragDropProvider, DragDropSensors, DragEventHandler } from "@thisbeyond/solid-dnd";
import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { solidMsg } from "solid-msg";
import { themeConfig } from "solid-ux/UxTheme";
import { i18n } from "../i18n";
import { apiOptions } from "../routers/_apis";
import { record } from "./record";
import { autoReplay } from "./record/autoReplay";
import { logout, sdkStorage, setIsExample, setIsHidden, setPanel } from "./record/data";
import { keyboard } from "./record/keyboard";
import { observe } from "./record/observe";
import { replay } from "./record/replay";
import { DropPanel, Over, Overs, Where } from "./view/DropPanel";
import { Editor } from "./view/Editor";
import { IsLand } from "./view/IsLand";

themeConfig.key = "testflowy-theme";
themeConfig.baseTheme = "dark";

solidMsg.setOptions({ zIndex: "9999", progress: true, position: "center" });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
apiOptions.baseUrl = ((window as any).testflowyURL || "") + "/v1";
apiOptions.onError = (err) => {
  const msg = (i18n as unknown as Record<string, string>)[err.message] || err.message;
  if (msg === i18n.登录状态已过期) {
    logout();
  }
  solidMsg.red(msg);
};

keyboard();
observe();
record();
autoReplay();
if (sdkStorage.val.run !== "none") {
  setPanel("tool");
}

if (sdkStorage.val.run === "replay") {
  replay();
}

const opt = {
  example: false,
  // id: "",
  // title: "",
  // testflowySide: false,
  // url: "",
};

function App() {
  const [dragMove, setDragMove] = createSignal(false);
  const [where, setWhere] = createSignal<Where>("outside");
  const [over, _setOver] = createSignal<Over>(sdkStorage.val.over);
  const setOver = (v: Over) => {
    sdkStorage.assign({ over: v });
    _setOver(v);
  };

  const onDragEnd: DragEventHandler = ({ droppable }) => {
    if (droppable) {
      setOver(droppable.node.getAttribute("data-drop-id") as Over);
    } else {
      setOver(over());
    }
    requestAnimationFrame(() => {
      setDragMove(false);
    });
  };
  const onDragMove: DragEventHandler = (v) => {
    requestAnimationFrame(() => {
      if (v.overlay) {
        //
      }
      setDragMove(true);
    });
  };
  const onDragOver: DragEventHandler = ({ droppable }) => {
    if (droppable) {
      setWhere("inside");
    } else {
      setWhere("outside");
    }
  };
  return (
    <>
      <DragDropProvider onDragMove={onDragMove} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <DragDropSensors />
        <IsLand where={where()} dragMove={dragMove()} over={over()} />
        {Overs.map((v) => {
          return <DropPanel type={v} dragMove={dragMove()} />;
        })}
      </DragDropProvider>
      <Editor />
    </>
  );
}

export const testflowySDK = function (input: Partial<typeof opt> = {}) {
  if (input.example) {
    setIsHidden(false);
    setIsExample(true);
  }
  render(App, document.body);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).testflowySDK = testflowySDK;
