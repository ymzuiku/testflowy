import { Component, createSignal, JSX, onMount, Show, splitProps } from "solid-js";

function waitGet<T>(fn: () => T, timeout = 300): Promise<T | undefined> {
  return new Promise((res) => {
    const t = Date.now();
    const getFn = () => {
      const ele = fn();
      if (ele) {
        res(ele);
        return;
      }
      if (Date.now() - t < timeout) {
        requestAnimationFrame(() => {
          getFn();
        });
        return;
      }
      res(void 0);
    };
    getFn();
  });
}

const baseUrl = "https://unpkg.com/monaco-editor@0.34.0";
const loaderUrl = baseUrl + "/min/vs/loader.js";
let loaded = false;
const loadingSvg = `<svg width="100%" height="100%" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate></circle></g></svg>`;

// eslint-disable-next-line
let monaco: any;
export const UxMonacoEditor: Component<
  {
    value?: string;
    language?: string;
    theme?: string;
    readOnly?: boolean;
    // eslint-disable-next-line
    refEditor?: (editor: any, monaco: any) => void;
  } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [p, rest] = splitProps(props, ["refEditor", "value", "language", "theme", "readOnly"]);
  const [loading, setLoading] = createSignal(true);
  let ele: HTMLDivElement;
  // eslint-disable-next-line
  let editor: any;
  if (!loaded) {
    loaded = true;
    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // eslint-disable-next-line
      const require: any = window.require;
      require.config({ paths: { vs: baseUrl + "/min/vs" } });
      require(["vs/editor/editor.main"], function () {
        // eslint-disable-next-line
        monaco = (window as any).monaco;
      });
    };
    document.body.append(script);
  }
  onMount(() => {
    waitGet(() => {
      if (!monaco) {
        return void 0;
      }
      // monaco.defineTheme("hello");
      if (!editor) {
        requestAnimationFrame(() => {
          editor = monaco.editor.create(ele, {
            value: p.value || 'console.log("hello world")',
            language: p.language || "javascript",
            theme: p.theme || "vs-dark",
            readOnly: p.readOnly,
          });
        });
      }
      if (p.refEditor) {
        p.refEditor(editor, monaco);
      }
      setLoading(false);
      return editor;
    }, 20000);
  });

  return (
    <div ref={ele!} {...rest}>
      <Show when={loading()}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
            // "border-radius": "1em",
            background: "#1F1E1D",
            border: "1px solid var(--ux-gray-200)",
          }}
        >
          <div
            style={{
              width: "4em",
              height: "4em",
              color: "var(--ux-primary-400)",
            }}
            innerHTML={loadingSvg}
          ></div>
          <span style={{ color: "var(--ux-gray-400)" }}>Loading editor...</span>
        </div>
      </Show>
    </div>
  );
};
