/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineDelete, AiOutlineMenu, AiOutlineSafety } from "solid-icons/ai";
import { BiRegularEdit } from "solid-icons/bi";
import { BsStopFill } from "solid-icons/bs";
import { FaSolidPlay } from "solid-icons/fa";
import { RiDeviceSaveLine } from "solid-icons/ri";
import { VsDebugRestart } from "solid-icons/vs";
import { Component, Show } from "solid-js";
import { UxCircle } from "solid-ux/UxCircle";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import "../record";
import { actions } from "../record/actions";
import { isExample, lastRecord, name, recordLength, run, sdkStorage, setPanel, step } from "../record/data";
import "../record/replay";

const blue = "rgba(100,143,255,1.0)";
const blueWeak = "rgba(100,143,255,0.2)";
const red = "rgba(232,82,82,1)";
// const redWeak = "rgba(232,82,82,0.2)";

const IdleTool = () => {
  return (
    <>
      <span
        style={{
          color: blue,
        }}
      >
        <FaSolidPlay
          style={{
            "margin-left": "1.5em",
            width: "1.5em",
            height: "1.5em",
            cursor: "pointer",
          }}
          onclick={() => actions.run()}
        />
      </span>
      <Show when={!sdkStorage.val.multiple}>
        <div
          style={{
            "margin-left": "1em",
            "flex-shrink": 0,
            width: "1.25em",
            height: "1.25em",
            background: red,
            "border-radius": "2em",
            cursor: "pointer",
          }}
          onclick={() => {
            actions.record();
          }}
        ></div>
      </Show>
      <div style={{ "margin-left": "1em" }}>
        <div
          style={{
            "font-size": "1em",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            width: "5.5em",
          }}
        >
          {name()}
        </div>
        <div
          style={{
            "font-size": "0.75em",
            opacity: 0.5,
          }}
        >
          Steps: {recordLength()}
        </div>
      </div>
    </>
  );
};

const RecordTool = () => {
  return (
    <>
      <UxSolidIcon
        Icon={BsStopFill}
        style={{
          "margin-left": "1em",
          width: "2em",
          height: "2em",
          transform: "transitionY(2px)",
          color: red,
          cursor: "pointer",
        }}
        onclick={() => {
          actions.idle();
        }}
      />
      <UxSolidIcon
        Icon={AiOutlineDelete}
        style={{
          "margin-left": "0.7em",
          width: "1.5em",
          height: "1.5em",
          color: "var(--ux-white)",
          cursor: "pointer",
        }}
        onclick={() => {
          actions.clear();
        }}
      />
      <UxSolidIcon
        Icon={RiDeviceSaveLine}
        style={{
          "margin-left": "0.7em",
          width: "1.5em",
          height: "1.5em",
          transform: "transitionY(2px)",
          color: "var(--ux-white)",
          cursor: "pointer",
        }}
        onclick={() => {
          actions.save();
        }}
      />
      <UxSolidIcon
        Icon={BiRegularEdit}
        style={{
          "margin-left": "0.7em",
          width: "1.5em",
          height: "1.5em",
          // transform: "transitionY(2px)",
          color: "var(--ux-white)",
          cursor: "pointer",
          opacity: isExample() ? 0.3 : 1,
          "pointer-events": isExample() ? "none" : "auto",
        }}
        onclick={() => {
          actions.openEditor();
        }}
      />
      <div style={{ "margin-left": "1em" }}>
        <div style={{ "font-size": "1em" }}>Step: {recordLength()}</div>
      </div>
      <div style={{ flex: 1 }}></div>
      <UxSolidIcon
        Icon={AiOutlineSafety}
        style={{
          "margin-right": "1.2em",
          width: "1.5em",
          height: "1.5em",
          transform: "transitionY(-2px)",
          color: "var(--ux-green-500)",
          cursor: "pointer",
          opacity: lastRecord() && lastRecord().id[0] !== "*" ? 0.3 : 0.9,
        }}
      />
    </>
  );
};

const ReplayTool = () => {
  return (
    <>
      <div
        style={{
          "margin-left": "0.5em",
          width: "2.5em",
          height: "2.5em",
          position: "relative",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "center",
          cursor: "pointer",
        }}
        onclick={() => {
          actions.idle();
        }}
      >
        <UxCircle
          background={blueWeak}
          color={blue}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "2.5em",
            height: "2.5em",
          }}
          width={36}
          value={(step() + 1) / recordLength()}
        ></UxCircle>
        <div
          style={{
            width: "0.75em",
            height: "0.75em",
            background: blue,
            "border-radius": "0.25em",
          }}
        ></div>
      </div>
      <VsDebugRestart
        style={{
          width: "1.5em",
          height: "1.5em",
          color: "var(--ux-white)",
          margin: "0 0.5em",
          cursor: "pointer",
        }}
        onclick={() => {
          actions.run();
        }}
      />
      <div
        style={{
          "margin-left": "0.5em",
          "margin-right": "1em",
        }}
      >
        <div
          style={{
            "font-size": "1em",
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            width: "5.5em",
          }}
        >
          {name()}
        </div>
        <div
          style={{
            "font-size": "0.75em",
            opacity: 0.5,
          }}
        >
          {step() + 1}/{recordLength()}
        </div>
      </div>
    </>
  );
};

export const Tool: Component<{ draggable?: (r: HTMLElement) => unknown }> = (p) => {
  return (
    <div
      data-testflowy-ignore
      style={{
        position: "relative",
        color: "var(--ux-white)",
        display: "flex",
        "flex-direction": "row",
        height: "100%",
        "align-items": "center",
      }}
      ref={p.draggable}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "flex",
          "flex-direction": "row",
          height: "100%",
          "align-items": "center",
          transition: "all 200ms ease-out",
          transform: run() !== "idle" ? `translateX(-50%)` : "auto",
          opacity: run() !== "idle" ? 0 : "auto",
          "pointer-events": run() !== "idle" ? "none" : "auto",
        }}
      >
        <IdleTool />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "flex",
          "flex-direction": "row",
          height: "100%",
          width: "100%",
          "align-items": "center",
          transition: "all 200ms ease-out",
          transform: run() !== "record" ? `translateX(-50%)` : "auto",
          opacity: run() !== "record" ? 0 : "auto",
          "pointer-events": run() !== "record" ? "none" : "auto",
        }}
      >
        <RecordTool />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          display: "flex",
          "flex-direction": "row",
          height: "100%",
          width: "100%",
          "align-items": "center",
          transition: "all 200ms ease-out",
          transform: run() !== "replay" ? `translateX(-50%)` : "auto",
          opacity: run() !== "replay" ? 0 : "auto",
          "pointer-events": run() !== "replay" ? "none" : "auto",
        }}
      >
        <ReplayTool />
      </div>
      <Show when={run() !== "record"}>
        <>
          <div style={{ flex: 1 }}></div>
          <AiOutlineMenu
            style={{
              height: "1.5em",
              width: "1.5em",
              "margin-right": "1.5em",
            }}
            onclick={() => {
              setPanel("panel");
            }}
          />
        </>
      </Show>
    </div>
  );
};
