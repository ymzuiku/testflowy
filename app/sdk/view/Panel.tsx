import { IoCloseSharp } from "solid-icons/io";
import { createRoot, createSignal, Match, onMount, Switch } from "solid-js";
import { i18n } from "../../i18n";
import { logined, sdkStorage, setPanel } from "../record/data";
import Login from "./Login";
import { Organization } from "./Organization";
import { Personal } from "./Personal";
import { Setup } from "./Setup";

const [tab, setTab] = createRoot(() => createSignal(0));
const [left, setLeft] = createRoot(() => createSignal(0));
const [width, setWidth] = createRoot(() => createSignal(0));

export const Panel = () => {
  // let userRef: HTMLDivElement;
  // let orgRef: HTMLDivElement;
  // let orgRef: HTMLDivElement;
  const ref: Record<number, HTMLDivElement | null> = {
    0: null,
    1: null,
    2: null,
  };
  const handleTabLineLeft = (ele: HTMLDivElement) => {
    requestAnimationFrame(() => {
      const rect = ele.getBoundingClientRect();
      const parentRect = ele.parentElement!.getBoundingClientRect();
      setLeft(rect.left - parentRect.left);
      setWidth(rect.width);
    });
  };
  onMount(() => {
    handleTabLineLeft(ref[tab()]!);
  });
  return (
    <div
      data-testflowy-ignore
      style={{
        color: "var(--ux-gray-900)",
        padding: "1em",
        width: "100%",
        height: "100%",
        "box-sizing": "border-box",
        "overflow-y": "hidden",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          padding: "0 1em",
          margin: "0.5em 0 1em 0",
          position: "relative",
        }}
      >
        <div
          ref={(r) => (ref[0] = r)}
          style={{
            display: !logined() ? "none" : "block",
            "text-align": "center",
            cursor: "pointer",
            "font-weight": "bold",
            opacity: tab() !== 0 ? 0.8 : 1,
          }}
          onclick={(e) => {
            const ele = e.currentTarget;
            setTab(0);
            handleTabLineLeft(ele);
          }}
        >
          {i18n.个人}
        </div>
        <div
          ref={(r) => (ref[1] = r)}
          style={{
            display: !logined() ? "none" : "block",
            "text-align": "center",
            cursor: "pointer",
            "margin-left": "1em",
            "font-weight": "bold",
            opacity: tab() !== 1 ? 0.8 : 1,
          }}
          onclick={(e) => {
            const ele = e.currentTarget;
            setTab(1);
            handleTabLineLeft(ele);
          }}
        >
          {i18n.组织}
        </div>
        <div
          ref={(r) => (ref[2] = r)}
          style={{
            display: !logined() ? "none" : "block",
            "text-align": "center",
            cursor: "pointer",
            "margin-left": "1em",
            "font-weight": "bold",
            opacity: tab() !== 2 ? 0.8 : 1,
          }}
          onclick={(e) => {
            const ele = e.currentTarget;
            setTab(2);
            handleTabLineLeft(ele);
          }}
        >
          {i18n.设置}
        </div>
        <div style={{ flex: 1 }}></div>
        <IoCloseSharp
          size={24}
          style={{ cursor: "pointer" }}
          onclick={() => {
            setPanel(!sdkStorage.val.name ? "logo" : "tool");
          }}
        />
        <div
          style={{
            left: left() + "px",
            width: width() + "px",
            position: "absolute",
            bottom: "-0.25em",
            height: "2px",
            background: "var(--ux-gray-900)",
            "border-radius": "var(--ux-radius)",
            transition: "all 150 ease-out",
          }}
        ></div>
      </div>
      <div
        style={{
          "overflow-y": "hidden",
          flex: 1,
        }}
      >
        <Switch>
          <Match when={!logined()}>
            <Login />
          </Match>
          <Match when={logined() && tab() === 0}>
            <Personal />
          </Match>
          <Match when={logined() && tab() === 1}>
            <Organization />
          </Match>
          <Match when={logined() && tab() === 2}>
            <Setup />
          </Match>
        </Switch>
      </div>
    </div>
  );
};
