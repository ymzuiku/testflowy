import { Code as HighlightCode } from "@cn-ui/highlight";
import "highlight.js/styles/github-dark.css";
import { For, JSX, splitProps } from "solid-js";
import { UxMonacoEditor } from "../UxMonacoEditor";
import { UxVideo } from "../UxVideo";

export interface UxDocumentContent {
  kind:
    | "empty"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "monaco"
    | "code"
    | "codeLine"
    | "img"
    | "video"
    | "link"
    | "buttonLink"
    | "ol"
    | "ul"
    | "iframe";
  html?: string;
  language?: "html" | "javascript" | "css" | "typescript" | "go" | "json";
  readOnly?: boolean;
  src?: string;
  height?: string;
  width?: string;
  style?: JSX.CSSProperties;
  htmls?: string[];
}

export const Empty = (p: UxDocumentContent) => {
  return <div style={p.style}></div>;
};

export const H1 = (p: UxDocumentContent) => {
  return (
    <div
      id={"h1" + p.html}
      style={{
        "margin-top": "1.5em",
        "margin-bottom": "1.5em",
        "font-size": "var(--ux-text-5xl)",
        color: "var(--ux-gray-800)",
        "font-weight": "bold",
      }}
      innerHTML={p.html}
    ></div>
  );
};

export const H2 = (p: UxDocumentContent) => {
  return (
    <div
      id={"h2" + p.html}
      style={{
        "margin-top": "2em",
        "font-size": "var(--ux-text-3xl)",
        "font-weight": 700,
        color: "var(--ux-gray-800)",
      }}
      innerHTML={p.html}
    ></div>
  );
};

export const H3 = (p: UxDocumentContent) => {
  return (
    <div
      id={"h3" + p.html}
      style={{
        "margin-top": "1.5em",
        "font-size": "var(--ux-text-2xl)",
        "font-weight": 500,
        color: "var(--ux-gray-800)",
      }}
      innerHTML={p.html}
    ></div>
  );
};

export const H4 = (p: UxDocumentContent) => {
  return (
    <div
      id={"h4" + p.html}
      style={{
        "margin-top": "1em",
        "font-size": "var(--ux-text-xl)",
        "font-weight": 500,
        color: "var(--ux-gray-800)",
      }}
      innerHTML={p.html}
    ></div>
  );
};

export const Text = (p: UxDocumentContent) => {
  return (
    <div
      innerHTML={p.html}
      style={{
        padding: "1.5em 0",
        "font-size": "var(--ux-text-lg)",
        color: "var(--ux-gray-800)",
      }}
    ></div>
  );
};

export const Monaco = (p: UxDocumentContent) => {
  return (
    <div
      style={{
        padding: "1.5em 0",
        height: p.height || "400px",
        width: p.width || "auto",
      }}
    >
      <UxMonacoEditor readOnly={p.readOnly} style={{ height: "100%" }} language={p.language || "json"} value={p.html} />
    </div>
  );
};

export const Code = (p: UxDocumentContent) => {
  return (
    <div
      style={{
        height: p.height || "auto",
        width: p.width || "auto",
        color: "#aaa",
      }}
    >
      <HighlightCode
        style={{ padding: "1.5em", margin: "0px", "border-radius": "1em" }}
        lang={p.language || "javascript"}
        code={p.html ? p.html.trim() : ""}
      ></HighlightCode>
    </div>
  );
};

export const CodeLine = (p: UxDocumentContent) => {
  return (
    <div
      style={{
        height: p.height || "80px",
        width: p.width || "auto",
        "border-radius": "var(--ux-radius-lg)",
        overflow: "hidden",
      }}
    >
      <HighlightCode
        style={{ padding: "1.5em", margin: "0px", "border-radius": "1em" }}
        lang={p.language || "javascript"}
        code={p.html ? p.html.trim() : ""}
      ></HighlightCode>
    </div>
  );
};

export const Link = (p: UxDocumentContent) => {
  return (
    <a
      target="_blank"
      style={{
        color: "var(--ux-indigo-500)",
        "font-size": "var(--ux-text-lg)",
        cursor: "pointer",
      }}
      href={p.src}
      innerHTML={p.html}
    ></a>
  );
};

export const ButtonLink = (p: UxDocumentContent) => {
  return (
    <a
      target="_blank"
      style={{
        display: "inline-block",
        margin: "1em",
        padding: "1em",
        "border-radius": "0.5em",
        "box-shadow": "0px 2px 4px var(--ux-gray-300)",
        background: "var(--ux-indigo-500)",
        color: "var(--ux-white)",
        "font-size": "var(--ux-text-lg)",
        "text-decoration": "none",
        cursor: "pointer",
      }}
      href={p.src}
      innerHTML={p.html}
    ></a>
  );
};

export const Img = (p: UxDocumentContent) => {
  return (
    <img
      width={p.width || "100%"}
      height={p.height}
      style={{
        margin: "1em auto",
        "border-radius": "var(--ux-radius-2xl)",
        overflow: "hidden",
        border: "1px solid var(--ux-gray-200)",
        "object-fit": "contain",
      }}
      src={p.src}
    />
  );
};

export const Video = (p: UxDocumentContent) => {
  return (
    <UxVideo
      src={p.src!}
      style={{
        height: "400px",
        margin: "0 auto",
      }}
    />
  );
};

export const Iframe = (p: UxDocumentContent) => {
  return (
    <div
      style={{
        width: "100%",
      }}
      innerHTML={p.html}
    ></div>
  );
};

export const Ol = (p: UxDocumentContent) => {
  if (!p.htmls) {
    return null;
  }
  return (
    <For each={p.htmls}>
      {(item, index) => {
        return (
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              gap: "0.5em",
              margin: "1em 0 0 1em",
            }}
          >
            <div style={{ "font-size": "var(--ux-text-base)" }}>{index() + 1}.</div>
            <span style={{ "font-size": "var(--ux-text-lg)", color: "var(--ux-gray-800)" }} innerHTML={item}></span>
          </div>
        );
      }}
    </For>
  );
};

export const Ul = (p: UxDocumentContent) => {
  if (!p.htmls) {
    return null;
  }
  return (
    <For each={p.htmls}>
      {(item) => {
        return (
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              gap: "0.5em",
              margin: "1em 0 0 1em",
            }}
          >
            <div
              style={{
                width: "5px",
                height: "5px",
                "flex-shrink": 0,
                "flex-grow": 0,
                "background-color": "var(--ux-gray-700)",
                "border-radius": "var(--ux-radius-full)",
              }}
            ></div>
            <span
              style={{
                "font-size": "var(--ux-text-lg)",
                color: "var(--ux-gray-800)",
              }}
              innerHTML={item}
            ></span>
          </div>
        );
      }}
    </For>
  );
};

const components = {
  empty: Empty,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Text,
  monaco: Monaco,
  code: Code,
  codeLine: CodeLine,
  link: Link,
  buttonLink: ButtonLink,
  img: Img,
  video: Video,
  ol: Ol,
  ul: Ul,
  iframe: Iframe,
};

const htmlElement = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  p: true,
  link: true,
} as Record<string, unknown>;

const htmlsElement = {
  ol: true,
  ul: true,
} as Record<string, unknown>;

export const Content = (p: UxDocumentContent) => {
  const Comp = components[p.kind] || Text;
  // 预防script注入
  if (htmlElement[p.kind] && typeof p.html === "string") {
    const html = p.html.replace("<script", "");
    const [, rest] = splitProps(p, ["html"]);
    return <Comp {...rest} html={html} />;
  } else if (htmlsElement[p.kind] && p.htmls) {
    const htmls = p.htmls.map((v) => v.replace("<script", ""));
    const [, rest] = splitProps(p, ["htmls"]);
    return <Comp {...rest} htmls={htmls} />;
  }

  return <Comp {...p} />;
};
