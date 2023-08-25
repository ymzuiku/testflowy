import { createDroppable } from "@thisbeyond/solid-dnd";
import { isDark } from "solid-ux/UxTheme";

export type Over =
  | "middle"
  | "left"
  | "right"
  | "top"
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomLeft"
  | "bottomRight";
export type Where = "inside" | "outside";
export interface DragPanel {
  where?: Where;
  dragMove: boolean;
  over?: Over;
  type: Over;
}

const dragingCss = {
  left: {
    left: "1.5em",
    top: "calc(50% - 40px)",
    width: "80px",
  },
  right: {
    right: "1.5em",
    top: "calc(50% - 40px)",
    width: "80px",
  },
  top: {
    top: "1.5em",
    left: "calc(50% - 40px)",
    width: "80px",
  },
  bottom: {
    bottom: "1.5em",
    left: "calc(50% - 40px)",
    width: "80px",
  },
  topLeft: {
    top: "1.5em",
    left: "1.5em",
    width: "80px",
  },
  topRight: {
    top: "1.5em",
    right: "1.5em",
    width: "80px",
  },
  bottomLeft: {
    bottom: "1.5em",
    left: "1.5em",
    width: "80px",
  },
  bottomRight: {
    bottom: "1.5em",
    right: "1.5em",
    width: "80px",
  },
  middle: {
    top: "calc(50% - 40px)",
    left: "calc(50% - 40px)",
    width: "80px",
  },
};

const noDragCss = {
  left: {
    transform: "translateX(-100%)",
  },
  right: {
    transform: "translateX(100%)",
  },
  top: {
    transform: "translateY(-100%)",
    top: 0,
  },
  topLeft: {
    transform: "translateY(-100%)",
    top: 0,
  },
  topRight: {
    transform: "translateY(-100%)",
    top: 0,
  },
  middle: {},
  bottom: {
    transform: "translateY(100%)",
    bottom: 0,
  },
  bottomLeft: {
    transform: "translateY(100%)",
    bottom: 0,
  },
  bottomRight: {
    transform: "translateY(100%)",
    bottom: 0,
  },
};

export const Overs = [
  "left",
  "right",
  "top",
  "topLeft",
  "topRight",
  "middle",
  "bottom",
  "bottomLeft",
  "bottomRight",
] as Over[];

export function DropPanel(p: DragPanel) {
  const droppable = createDroppable(p.type);
  return (
    <div
      data-drop-id={p.type}
      data-testflowy-ignore="1"
      ref={droppable}
      style={{
        "font-size": "14px",
        position: "fixed",
        "z-index": 9400,
        height: "5.5em",
        transition: "all 300ms ease-out",
        background: "var(--ux-gray-500)",
        "border-radius": "2.5em",
        color: "var(--ux-gary-900)",
        border: isDark() ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
        ...dragingCss[p.type],
        ...(!p.dragMove ? noDragCss[p.type] : {}),
        ...(!p.dragMove
          ? {
              opacity: 0,
              "pointer-events": "none",
            }
          : {}),
        ...(p.dragMove && !droppable.isActiveDroppable ? { opacity: 0.2 } : {}),
        ...(p.dragMove && droppable.isActiveDroppable ? { opacity: 0.5 } : {}),
      }}
    ></div>
  );
}
