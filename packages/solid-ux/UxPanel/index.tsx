// import { createRoot, createSignal, For } from "solid-js";
// import { Portal } from "solid-js/web";

import { Component, createEffect, createSignal, JSX, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { isDark } from "../UxTheme";

export interface UxPanelProps {
  show?: boolean;
  onclose?: (ok: boolean) => void;
  maskClose?: boolean;
  position?: "top" | "bottom" | "left" | "right" | "center";
  zIndex?: number;
}

export const createPanelShow = (baseShow = false) => {
  const [show, setShow] = createSignal(baseShow);
  const ref = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onclose: (ok: boolean) => {},
  };
  const onclose = (ok: boolean) => {
    ref.onclose(ok);
  };
  const promiseShow = () => {
    setShow(true);
    return new Promise<boolean>((res) => {
      ref.onclose = (ok: boolean) => {
        setShow(false);
        res(ok);
      };
    });
  };
  return [show, promiseShow, onclose] as [typeof show, typeof promiseShow, typeof onclose];
};

const positionBefore = {
  // left: "h-full opacity-0 left-0 -translate-x-full top-1/2 -translate-y-1/2",
  left: {
    height: "100%",
    opacity: 0,
    left: 0,
    transform: "translate(-100%, -50%)",
    top: "50%",
  } as JSX.CSSProperties,
  // right: "h-full opacity-0 right-0 translate-x-full top-1/2 -translate-y-1/2",
  right: {
    height: "100%",
    opacity: 0,
    right: 0,
    transform: `translate(100%, -50%)`,
    top: "50%",
  } as JSX.CSSProperties,
  // top: "w-full opacity-0 top-0 -translate-y-full left-1/2 -translate-x-1/2",
  top: {
    width: "100%",
    opacity: 0,
    top: 0,
    left: "-50%",
    transform: `translate(-50%, -100%)`,
  } as JSX.CSSProperties,
  // bottom: "w-full opacity-0 bottom-0 translate-y-full left-1/2 -translate-x-1/2",
  bottom: {
    width: "100%",
    opacity: 0,
    bottom: 0,
    left: "-50%",
    transform: `translate(-50%, 100%)`,
  } as JSX.CSSProperties,
  // center: "opacity-0 scale-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  center: {
    opacity: 0,
    transform: `translate(-50%, -50%) scale(0)`,
    left: "50%",
    top: "50%",
  } as JSX.CSSProperties,
};

const positionAfter = {
  // left: "h-full left-0 top-1/2 -translate-y-1/2",
  left: {
    height: "100%",
    left: 0,
    top: "50%",
    transform: `translateY(-50%)`,
  } as JSX.CSSProperties,
  // right: "h-full right-0 top-1/2 -translate-y-1/2",
  right: {
    height: "100%",
    right: 0,
    top: "50%",
    transform: `translateY(-50%)`,
  } as JSX.CSSProperties,
  // top: "w-full top-0 left-1/2 -translate-x-1/2",
  top: {
    width: "100%",
    top: 0,
    left: "50%",
    transform: `translateX(-50%)`,
  } as JSX.CSSProperties,
  // bottom: "w-full bottom-0 left-1/2 -translate-x-1/2",
  bottom: {
    width: "100%",
    bottom: 0,
    left: "50%",
    transform: `translateX(-50%)`,
  } as JSX.CSSProperties,
  // center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  center: {
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%)`,
  } as JSX.CSSProperties,
};

/**
 * // Example
 * const [show, openPanel, onClose] = createShow(false)
 *
 * const handlePanel = async ()=>{
 *  const ok = await openPanel()
 *  console.log("touch ok:", ok)
 * }
 * return <div>
 *      <div>page views</div>
 *      <div onclick={()=> handlePanel()}>open alert</div>
 *      <UxPanel show={show()} position="center">
 *        <div>the alert</div>
 *        <div onclick={()=>onClose(false)}>cancel</div>
 *         <div onclick={()=>onClose(true)}>ok</div>
 *      </UxPanel>
 * </div>
 */
export const UxPanel: Component<JSX.HTMLAttributes<HTMLDivElement> & UxPanelProps> = (p) => {
  const [show, setShow] = createSignal(!!p.show);
  const [opened, setOpened] = createSignal(!!p.show);

  createEffect(() => {
    if (p.show) {
      setShow(true);
      requestAnimationFrame(() => {
        setOpened(true);
      });
    } else {
      setOpened(false);
      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  });

  return (
    <Show when={show()}>
      <Portal>
        <div
          classList={{ dark: isDark() }}
          style={{
            "z-index": p.zIndex === void 0 ? 2000 : p.zIndex,
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              "background-color": "var(--ux-black)",
              transition: "opacity 200ms linear",
              opacity: opened() ? 0.5 : 0,
            }}
            onclick={() => {
              if (p.maskClose && p.onclose) {
                p.onclose(false);
              }
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              transition: "all 250ms ease-out",
              ...(opened() ? positionAfter[p.position || "center"] : positionBefore[p.position || "center"]),
            }}
          >
            {p.children}
          </div>
        </div>
      </Portal>
    </Show>
  );
};
