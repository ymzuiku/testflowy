import { AiOutlineMenu } from "solid-icons/ai";
import { Component, createSignal, JSX, Show } from "solid-js";
import { isIwPhone } from "solid-ux/createResize";
import { UxPanel } from "solid-ux/UxPanel";
import { AdminMenuList } from "./AdminMenuList";

export const AdminMenuLayout: Component<JSX.HTMLAttributes<HTMLDivElement>> = (p) => {
  const [showMenu, setShowMenu] = createSignal(false);
  return (
    <div
      style={{
        display: "flex",
        background: "var(--ux-gray-100)",
        "flex-direction": "row",
        height: "100%",
        width: "100%",
        "box-sizing": "border-box",
      }}
    >
      <AdminMenuList style={{ display: isIwPhone() ? "none" : "flex" }} />
      <UxPanel maskClose position="left" onclose={setShowMenu} show={showMenu()}>
        <AdminMenuList style={{ width: "64vw" }} onclick={() => setShowMenu(false)} />
      </UxPanel>
      <div
        style={{
          color: "var(--ux-gray-900)",
          background: "var(--ux-gray-50)",
          "box-sizing": "border-box",
          flex: 1,
          height: "100%",
        }}
      >
        <Show when={isIwPhone()}>
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              "border-bottom": "1px solid var(--ux-gray-200)",
              padding: "0.75em",
              "box-sizing": "border-box",
              height: "4em",
            }}
            onclick={() => setShowMenu(true)}
          >
            <AiOutlineMenu
              style={{
                width: "1.5em",
                height: "1.5em",
                "margin-right": "1em",
              }}
            />
            <div>Menu</div>
          </div>
        </Show>
        <div
          style={{
            padding: "1em",
            width: "100%",
            height: "100%",
            "box-sizing": "border-box",
          }}
        >
          {p.children}
        </div>
      </div>
    </div>
  );
};
