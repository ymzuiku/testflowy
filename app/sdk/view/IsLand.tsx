import { createDraggable } from "@thisbeyond/solid-dnd";
import { JSX, Match, Show, Switch } from "solid-js";
import { ih, isIwPhone, iw } from "solid-ux/createResize";
import { isDark } from "solid-ux/UxTheme";
import { LogoSvg } from "../../routers/svgs/LogoSvg";
import { isExample, isHidden, mouse, panel, run, setPanel, setRun } from "../record/data";
import { DragPanel } from "./DropPanel";
import { Panel } from "./Panel";
import { Tool } from "./Tool";

const overCss = {
  // left: "left-6 top-1/2 -translate-y-1/2",
  left: {
    left: "1.5em",
    top: "50%",
    transform: "translateY(-50%)",
  } as JSX.CSSProperties,
  // right: "right-6 top-1/2 -translate-y-1/2",
  right: {
    right: "1.5em",
    top: "50%",
    transform: "translateY(-50%)",
  } as JSX.CSSProperties,
  // top: "top-6 left-1/2 -translate-x-1/2",
  top: {
    top: "1.5em",
    left: "50%",
    transform: "translateY(-50%)",
  } as JSX.CSSProperties,
  // topLeft: "top-6 left-6",
  topLeft: {
    top: "1.5em",
    left: "1.5em",
  } as JSX.CSSProperties,
  // topRight: "top-6 right-6",
  topRight: {
    top: "1.5em",
    right: "1.5em",
  } as JSX.CSSProperties,
  // middle: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  middle: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  } as JSX.CSSProperties,
  // bottom: "bottom-6 left-1/2 -translate-x-1/2",
  bottom: {
    bottom: "1.5em",
    left: "50%",
    transform: "translateX(-50%)",
  } as JSX.CSSProperties,
  // bottomLeft: "bottom-6 left-6",
  bottomLeft: {
    bottom: "1.5em",
    left: "1.5em",
  } as JSX.CSSProperties,
  // bottomRight: "bottom-6 right-6",
  bottomRight: {
    bottom: "1.5em",
    right: "1.5em",
  } as JSX.CSSProperties,
} as Record<string, JSX.CSSProperties>;

const space = 20;

const overXyPhone = {
  left: () => ({
    left: 0,
    top: ih() / 2,
    transform: `translate(0%, -50%)`,
  }),
  right: () => ({
    left: iw(),
    top: ih() / 2,
    transform: `translate(-100%, -50%)`,
  }),
  top: () => ({
    left: iw() / 2,
    top: 0,
    transform: `translate(-50%, 0%)`,
  }),
  topLeft: () => ({
    left: 0,
    top: 0,
    transform: `translate(0%, 0%)`,
  }),
  topRight: () => ({
    left: iw(),
    top: 0,
    transform: `translate(-100%, 0%)`,
  }),
  middle: () => ({
    left: iw() / 2,
    top: ih() / 2,
    transform: `translate(-50%, -50%)`,
  }),
  bottom: () => ({
    left: iw() / 2,
    top: ih(),
    transform: `translate(-50%, -100%)`,
  }),
  bottomLeft: () => ({
    left: 0,
    top: ih(),
    transform: `translate(0%, -100%)`,
  }),
  bottomRight: () => ({
    left: iw(),
    top: ih(),
    transform: `translate(-100%, -100%)`,
  }),
};

const overXy = {
  left: () => ({
    left: space,
    top: ih() / 2,
    transform: `translate(0%, -50%)`,
  }),
  right: () => ({
    left: iw() - space,
    top: ih() / 2,
    transform: `translate(-100%, -50%)`,
  }),
  top: () => ({
    left: iw() / 2,
    top: space,
    transform: `translate(-50%, 0%)`,
  }),
  topLeft: () => ({
    left: space,
    top: space,
    transform: `translate(0%, 0%)`,
  }),
  topRight: () => ({
    left: iw() - space,
    top: space,
    transform: `translate(-100%, 0%)`,
  }),
  middle: () => ({
    left: iw() / 2,
    top: ih() / 2,
    transform: `translate(-50%, -50%)`,
  }),
  bottom: () => ({
    left: iw() / 2,
    top: ih() - space,
    transform: `translate(-50%, -100%)`,
  }),
  bottomLeft: () => ({
    left: space,
    top: ih() - space,
    transform: `translate(0%, -100%)`,
  }),
  bottomRight: () => ({
    left: iw() - space,
    top: ih() - space,
    transform: `translate(-100%, -100%)`,
  }),
};

export function IsLand(p: Omit<DragPanel, "type">) {
  const draggable = createDraggable("drag");

  const isPhonePanel = () => {
    return !p.dragMove && panel() == "panel" && isIwPhone();
  };
  const isDesktopPanel = () => {
    return !p.dragMove && panel() == "panel" && !isIwPhone();
  };
  return (
    <>
      <div
        data-testflowy
        data-testflowy-ignore
        class="testflowy dark"
        style={{
          "font-family": "var(--ux-sans)",
          "box-sizing": "border-box",
          "z-index": 9500,
          overflow: "hidden",
          position: "fixed",
          border: isDark() ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          "box-shadow": "var(--ux-shadox-xl)",
          display: "block",
          padding: 0,
          color: "var(--ux-gray-500)",
          background: "var(--ux-gray-50)",
          ...(!p.dragMove ? { transition: "all 200ms ease-out" } : {}),
          "font-size": "14px",
          "touch-action": "none",
          ...overCss[p.over!],
          ...(isHidden() ? { opacity: 0, "pointer-events": "none" } : {}),
          ...(!p.dragMove && panel() === "loading" ? { width: "160px", height: "50px", "border-radius": "30px" } : {}),
          ...(!p.dragMove && panel() === "logo" ? { width: "90px", height: "36px", "border-radius": "30px" } : {}),
          ...(!p.dragMove && panel() === "tool" && run() !== "record"
            ? { width: "220px", height: "50px", "border-radius": "30px" }
            : {}),
          ...(!p.dragMove && panel() === "tool" && run() === "record"
            ? { width: "270px", height: "50px", "border-radius": "30px" }
            : {}),
          ...(isDesktopPanel() ? { width: "460px", height: "560px", "border-radius": "30px" } : {}),
          ...(isPhonePanel() ? { width: "100vw", height: "100vh" } : {}),
          ...(p.dragMove ? { width: "70px", height: "70px", "border-radius": "26px", cursor: "move" } : {}),

          ...(!p.dragMove
            ? isPhonePanel()
              ? {
                  left: overXyPhone[p.over!]().left + "px",
                  top: overXyPhone[p.over!]().top + "px",
                  transform: overXyPhone[p.over!]().transform,
                }
              : {
                  left: overXy[p.over!]().left + "px",
                  top: overXy[p.over!]().top + "px",
                  transform: overXy[p.over!]().transform,
                }
            : {
                left: overXy[p.over!]().left + draggable.transform.x + "px",
                top: overXy[p.over!]().top + draggable.transform.y + "px",
                transform: overXy[p.over!]().transform,
              }),
        }}
      >
        <div
          ref={draggable}
          style={{
            "touch-action": "none",
            width: "100%",
            height: "100%",
            display: panel() === "panel" ? "none" : "block",
          }}
        >
          <Switch>
            <Match when={!p.dragMove && panel() === "logo"}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  "flex-direction": "row",
                  "align-items": "center",
                  "justify-content": "center",
                  "box-sizing": "border-box",
                }}
                onclick={() => {
                  if (isExample()) {
                    setPanel("tool");
                    setRun("idle");
                  } else {
                    setPanel("panel");
                  }
                }}
              >
                <LogoSvg
                  style={{
                    color: "var(--ux-white)",
                    width: "2em",
                    height: "2em",
                    "pointer-events": "none",
                  }}
                />
              </div>
            </Match>
            <Match when={!p.dragMove && panel() === "tool"}>
              <Tool />
            </Match>
          </Switch>
        </div>
        <Show when={panel() === "panel"}>
          <Panel />
        </Show>
      </div>
      <div
        data-testflowy-ignore
        data-testflowy-mouse
        style={{
          "pointer-events": "none",
          "z-index": 9400,
          width: "30px",
          height: "30px",
          border: "1px solid rgba(128,128,128,0.5)",
          background: "rgba(30,30,30,0.3)",
          opacity: 0.8,
          "border-radius": "0.5rem",
          position: "fixed",
          left: mouse.left - 15 + "px",
          top: mouse.top - 15 + "px",
          transform: `scale(${mouse.scale}) rotate(${mouse.rotate}deg)`,
          "transform-origin": "50% 50%",
          transition: "all 150ms ease-out",
        }}
      ></div>
    </>
  );
}
