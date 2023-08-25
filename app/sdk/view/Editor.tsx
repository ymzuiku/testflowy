import { JSX, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { UxButton } from "solid-ux/UxButton";
import { UxMonacoEditor } from "solid-ux/UxMonacoEditor";
import { isDark } from "solid-ux/UxTheme";
import { timeLabel } from "utils/strs";
import { i18n } from "../../i18n";
import { actions } from "../record/actions";
import { editorOnlyView, sdkStorage, showEditor } from "../record/data";

const getOldValue = () => {
  // return JSON.stringify({ events: sdkStorage.val.events, meta: sdkStorage.val.meta }, null, 2);
  return JSON.stringify(sdkStorage.val.events, null, 2);
};

const buttonSty = {
  border: "none",
  padding: "0 1em",
  height: "3.5em",
  "border-radius": "0.25em",
  "box-sizing": "border-box",
  cursor: "pointer",
  outline: "none",
  background: "transparent",
  "font-size": "1.125em",
  color: "#CDA38C",
} as JSX.CSSProperties;

export const Editor = () => {
  // eslint-disable-next-line
  let editor: any;
  const save = async () => {
    const value = editor.getValue();
    editor.getAction("editor.action.formatDocument").run();
    try {
      // const { events, meta } = JSON.parse(value);
      sdkStorage.val.events = JSON.parse(value);
      // sdkStorage.val.meta = meta;
      actions.save();
      // eslint-disable-next-line
    } catch (err: any) {
      solidMsg.red(err.toString());
    }
  };
  return (
    <Show when={showEditor()}>
      <div
        data-testflowy-ignore
        classList={{
          dark: isDark(),
          testflowy: true,
        }}
        style={{
          "font-family": `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          width: "100%",
          height: "100%",
          display: "flex",
          "flex-direction": "column",
          position: "fixed",
          left: 0,
          top: 0,
          "z-index": "9600",
          background: "#181818",
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            padding: "0.2em 1.5em",
            color: "var(--ux-gray-700)",
            gap: "0.5em",
          }}
        >
          <div>
            <div style={{ "font-size": "1.125em" }}>{sdkStorage.val.name}</div>
            <div style={{ "font-size": "0.875em", opacity: "0.7" }}>{timeLabel(sdkStorage.val.updateAt)}</div>
          </div>
          <div style={{ flex: 1 }}></div>
          <UxButton
            style={buttonSty}
            onclick={() => {
              actions.closeEditor();
            }}
          >
            {i18n.关闭}
          </UxButton>
          <UxButton
            style={buttonSty}
            onclick={() => {
              editor.setValue(getOldValue());
            }}
          >
            {i18n.还原}
          </UxButton>
          <Show when={!editorOnlyView()}>
            <UxButton style={buttonSty} onclick={save}>
              {i18n.保存}
            </UxButton>
          </Show>
        </div>
        <UxMonacoEditor
          value={getOldValue()}
          language="json"
          refEditor={(e) => (editor = e)}
          style={{
            width: "100%",
            flex: 1,
          }}
        />
      </div>
    </Show>
  );
};
