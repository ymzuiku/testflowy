import { JSX, mergeProps, Show, splitProps } from "solid-js";
import { PseudoClasses } from "../PseudoClasses";
import { UxPanel, UxPanelProps } from "../UxPanel";
import { isDark } from "../UxTheme";

export type UxAlertProps = JSX.HTMLAttributes<HTMLDivElement> & {
  title?: JSX.Element;
  ok?: JSX.Element;
  cancel?: JSX.Element;
  onclose: UxPanelProps["onclose"];
  width?: number;
  borderStyle?: JSX.CSSProperties;
} & Omit<UxPanelProps, "onclose">;

export const UxAlert = (props: UxAlertProps) => {
  const [_p, rest] = splitProps(props, ["width", "title", "ok", "cancel", "children", "onclose", "borderStyle"]);
  const p = mergeProps({ cancel: UxAlert.options.cancel, ok: UxAlert.options.ok }, _p);
  return (
    <UxPanel position="center" onclose={p.onclose} {...rest}>
      <div
        style={{
          width: (p.width || 440) + "px",
          background: "var(--ux-gray-50)",
          "max-width": "calc(100vw - 40px)",
          overflow: "hidden",
          "border-radius": "var(--ux-radius-xl)",
          "box-sizing": "border-box",
          "box-shadow": "var(--ux-shadow-2xl)",
          border: isDark() ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Show when={p.title}>
          <div
            style={{
              padding: "1em",
              "text-align": "center",
              "font-size": "1.125em",
              "font-weight": "bold",
              "border-bottom": "1px solid var(--ux-gray-200)",
              "box-sizing": "border-box",
            }}
          >
            {p.title}
          </div>
        </Show>
        <div style={{ "padding-bottom": 0 }}>{p.children}</div>
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "border-top": "1px solid var(--ux-gray-100)",
            ...p.borderStyle,
          }}
        >
          <PseudoClasses hover active>
            {({ active, hover, events }) => (
              <div
                {...events}
                style={{
                  color: "var(--ux-gray-800)",
                  flex: 1,
                  display: "flex",
                  "flex-direction": "row",
                  "align-items": "center",
                  "justify-content": "center",
                  height: "4em",
                  cursor: "pointer",
                  background: hover() ? "var(--ux-gray-100)" : "transparent",
                  opacity: active() ? 0.5 : 1,
                }}
                onclick={() => {
                  if (p.onclose) {
                    p.onclose(false);
                  }
                }}
              >
                {p.cancel}
              </div>
            )}
          </PseudoClasses>

          <Show when={p.ok}>
            <PseudoClasses hover active>
              {({ hover, active, events }) => (
                <div
                  {...events}
                  style={{
                    color: "var(--ux-primary-600)",
                    flex: 1,
                    display: "flex",
                    "flex-direction": "row",
                    "align-items": "center",
                    "justify-content": "center",
                    height: "4em",
                    "border-left": "1px solid var(--ux-gray-50)",
                    background: hover() ? "var(--ux-gray-100)" : "transparent",
                    opacity: active() ? 0.5 : 1,
                    ...p.borderStyle,
                  }}
                  onclick={() => {
                    if (p.onclose) {
                      p.onclose(true);
                    }
                  }}
                >
                  {p.ok}
                </div>
              )}
            </PseudoClasses>
          </Show>
        </div>
      </div>
    </UxPanel>
  );
};

UxAlert.options = {
  ok: "Ok",
  cancel: "Cancel",
};
