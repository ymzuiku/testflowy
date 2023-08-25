import { createMediaQuery } from "@solid-primitives/media";
import { createSignal, For, Show } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createMediaQuerySm } from "../createMediaQuerySm";
import { PseudoClasses } from "../PseudoClasses";
import { UxBackBar } from "../UxBackBar";
import { UxCollapse } from "../UxCollapse";
import { UxI18nPick } from "../UxI18nPick";
import { UxSolidIcon } from "../UxSolidIcon";
import { ArrowLeftSvg } from "./ArrowLeftSvg";
import { ArrowRightSvg } from "./ArrowRightSvg";
import { Content, UxDocumentContent } from "./Item";
import { Subtitle } from "./Subtitle";
import { addUrlParams, getUrlParam } from "./urlHelper";

export interface UxDocumentItemData {
  uri?: string;
  label: string;
  content: UxDocumentContent[];
  lastItem?: UxDocumentItemData;
  nextItem?: UxDocumentItemData;
}
export interface UxDocumentItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  title: string;
  uris?: Record<string, string>;
  items: UxDocumentItemData[];
}

export interface UxDocumentProps {
  goback?: () => void;
  gobackTitle?: string;
  languageSelector?: boolean;
  title: string;
  tip: string;
  Logo: () => JSX.Element;
  data: UxDocumentItem[];
}

// 排除汉子和字母数字
const urlReg = /[^\u4e00-\u9fa5^a-z^A-Z^0-9]/g;

export function UxDocument(p: UxDocumentProps) {
  const sm = createMediaQuerySm();
  const lg = createMediaQuery("(min-width:1280px)");
  let i = 0;
  let contentBox: HTMLDivElement;
  let firstUri = getUrlParam("u");
  const cacheTitle: Record<string, boolean> = {};
  const menuMap: Record<string, UxDocumentItemData> = {};
  let lastItem: UxDocumentItemData;
  p.data.forEach((menu) => {
    menu.uris = {};
    menu.items.forEach((item) => {
      let label = item.label.replace(urlReg, "");
      if (!label) {
        i++;
        label += i;
      }
      if (!item.uri) {
        if (cacheTitle[label]) {
          i++;
          item.uri = label + "_" + i;
        } else {
          item.uri = label;
        }
        cacheTitle[label] = true;
      }
      if (!firstUri) {
        firstUri = item.uri;
        addUrlParams("u", firstUri);
      }
      menu.uris![item.uri] = label;
      menuMap[item.uri] = item;
      if (lastItem) {
        item.lastItem = lastItem;
        lastItem.nextItem = item;
      }
      lastItem = item;
    });
  });
  const [selected, _setSelected] = createSignal(firstUri);
  const setSelected = (v: string) => {
    v = v.replace(urlReg, "");
    _setSelected(v);
    addUrlParams("u", v);
    if (contentBox) {
      contentBox.scrollTo(0, 0);
    }
  };

  const getItem = () => {
    return menuMap[selected()] || {};
  };
  return (
    <div
      style={{
        "font-family": "var(--ux-sans)",
        width: "100%",
        height: "100%",
        display: "flex",
        "flex-direction": sm() ? "row" : "column",
        color: "var(--ux-gray-800)",
      }}
    >
      <div
        class="testflowy-scroll"
        style={{
          width: sm() ? "20em" : "auto",
          "flex-shrink": 0,
          display: "flex",
          "flex-direction": "column",
          padding: "1em",
          "line-height": "1.5",
          "box-sizing": "border-box",
          height: sm() ? "100%" : "auto",
          "overflow-y": sm() ? "auto" : "visible",
          "border-bottom": sm() ? "none" : "1px dashed var(--ux-gray-200)",
          "border-right": sm() ? "1px dashed var(--ux-gray-200)" : "none",
          "background-color": "var(--ux-gray-100)",
        }}
      >
        {p.goback && (
          <UxBackBar
            title={p.gobackTitle}
            right={
              <Show when={p.languageSelector}>
                <div
                  style={{
                    width: "auto",
                    padding: "0.5em",
                    "border-radius": "var(--ux-radius)",
                    display: sm() ? "none" : "block",
                  }}
                >
                  <UxI18nPick
                    onChange={() => {
                      addUrlParams("u", "");
                    }}
                  />
                </div>
              </Show>
            }
            onBack={() => {
              p.goback!();
            }}
          />
        )}

        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
          }}
        >
          <p.Logo />
          <h2
            style={{
              "font-size": "var(--ux-text-xl)",
              "font-weight": "bold",
            }}
          >
            {p.title}
          </h2>
          <span
            style={{
              "margin-left": "0.5em",
              color: "var(--ux-white)",
              "background-color": "var(--ux-green-500)",
              padding: "0.25em 0.5em",

              "border-radius": "var(--ux-radius-full)",
              "font-size": "var(--ux-text-sm)",
            }}
          >
            {p.tip}
          </span>
        </div>
        <div
          style={{
            padding: "1.5em",
            display: "flex",
            "flex-direction": "column",
            gap: "0.5em",
          }}
        >
          <For each={p.data}>
            {(menu) => {
              return (
                <UxCollapse
                  style={{ "font-size": "var(--ux-text-xl)", padding: "0.5em 0" }}
                  contentStyle={{
                    display: "flex",
                    "flex-direction": "column",
                  }}
                  baseOpen={!!menu.items.find((v) => v.uri === selected())}
                  title={
                    <div
                      style={{
                        display: "flex",
                        "flex-direction": "row",
                        "align-items": "center",
                      }}
                    >
                      <Show when={menu.Icon}>
                        <UxSolidIcon
                          style={{
                            width: "2.5em",
                            height: "2.5em",
                            padding: "0.5em",
                            "box-sizing": "border-box",
                            color: "var(--ux-primary-500)",
                            "margin-right": "1em",
                            "background-color": "var(--ux-primary-200)",
                            "border-radius": "var(--ux-radius-xl)",
                          }}
                          Icon={menu.Icon}
                        />
                      </Show>
                      <span
                        style={{
                          "font-weight": menu.uris![selected()] ? "500" : "400",
                        }}
                      >
                        {menu.title}
                      </span>
                    </div>
                  }
                >
                  <For each={menu.items}>
                    {(item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            "flex-direction": "row",
                            "align-items": "center",
                            gap: "0.5em",
                            margin: "1em 0 0 1.5em",
                            cursor: "pointer",
                          }}
                          onclick={() => setSelected(item.uri!)}
                        >
                          <div
                            style={{
                              width: "5px",
                              height: "5px",
                              "flex-shrink": 0,
                              "flex-grow": 0,
                              "background-color": "var(--ux-gray-300)",
                              "border-radius": "var(--ux-radius-full)",
                            }}
                          ></div>
                          <span
                            style={{
                              "font-size": "var(--ux-text-lg)",
                              color: item.uri === selected() ? "var(--ux-gray-800)" : "var(--ux-gray-500)",
                              "font-weight": item.uri === selected() ? "600" : "normal",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    }}
                  </For>
                </UxCollapse>
              );
            }}
          </For>
        </div>
      </div>
      <div
        ref={(r) => (contentBox = r)}
        style={{
          height: "100%",
          display: "flex",
          "flex-direction": "row",
          flex: 1,
          "overflow-y": sm() ? "auto" : "visible",
        }}
      >
        <div
          style={{
            width: sm() ? "calc(100% - 140px)" : "calc(100% - 60px)",
            padding: sm() ? "0 70px" : "0 30px",
            "max-width": sm() ? "var(--ux-screen-lg)" : "100%",
          }}
        >
          <div
            style={{
              height: "2.5em",
            }}
          ></div>

          <For each={getItem().content}>
            {(item, index) => {
              if (index() === 0) {
                if (item.kind !== "h1") {
                  return (
                    <>
                      <Content kind="h1" html={getItem().label} />
                      <Content kind="empty" html="h-6" />
                      <Content {...item} />
                    </>
                  );
                }
              }
              return <Content {...item} />;
            }}
          </For>
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              gap: "1em",
              "margin-top": "2.5em",
            }}
          >
            <Show when={getItem().lastItem}>
              <PseudoClasses hover>
                {({ hover, events }) => (
                  <div
                    style={{
                      flex: 1,
                      height: "4em",
                      "box-sizing": "border-box",
                      border: "1px solid var(--ux-gray-300)",
                      display: "flex",
                      "flex-direction": "row",
                      "align-items": "center",
                      "justify-content": "center",
                      padding: "0 1em",
                      "border-radius": "var(--ux-radius-md)",
                      color: hover() ? "var(--ux-primary-500)" : "var(--ux-gray-600)",
                      cursor: "pointer",
                    }}
                    {...events}
                    onclick={() => {
                      setSelected(getItem().lastItem!.uri!);
                    }}
                  >
                    <ArrowLeftSvg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        margin: "0 1em",
                        transform: hover() ? "translateX(-1em)" : "none",
                        transition: "all 200ms ease",
                      }}
                    />
                    <span>{getItem().lastItem!.label}</span>
                  </div>
                )}
              </PseudoClasses>
            </Show>
            <Show when={getItem().nextItem}>
              <PseudoClasses hover>
                {({ hover, events }) => (
                  <div
                    {...events}
                    style={{
                      flex: 1,
                      height: "4em",
                      "box-sizing": "border-box",
                      border: "1px solid var(--ux-gray-300)",
                      display: "flex",
                      "flex-direction": "row",
                      "align-items": "center",
                      "justify-content": "center",
                      padding: "0 1em",
                      "border-radius": "var(--ux-radius-md)",
                      color: hover() ? "var(--ux-primary-500)" : "var(--ux-gray-600)",
                      cursor: "pointer",
                    }}
                    onclick={() => {
                      setSelected(getItem().nextItem!.uri!);
                    }}
                  >
                    <span>{getItem().nextItem!.label}</span>
                    <ArrowRightSvg
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        margin: "0 1em",
                        transform: hover() ? "translateX(1em)" : "none",
                        transition: "all 200ms ease",
                      }}
                    />
                  </div>
                )}
              </PseudoClasses>
            </Show>
          </div>
          <div
            style={{
              height: "5em",
            }}
          />
        </div>
        <Show when={getItem().content}>
          <div
            class="testflowy-scroll"
            style={{
              display: lg() ? "flex" : "none",
              height: "100%",
              "overflow-y": "auto",
              width: "18em",
              "margin-right": "2.5em",
            }}
          ></div>
          <div
            class="testflowy-scroll"
            style={{
              position: "fixed",
              right: "0px",
              top: "0px",
              display: lg() ? "flex" : "none",
              "justify-content": "flex-start",
              background: "var(--ux-white)",
              height: "100%",
              "overflow-y": "auto",
              width: "18em",
              "border-left": sm() ? "1px solid var(--ux-gray-200)" : "none",
            }}
          >
            <div
              style={{
                padding: "0 1.5em",
                "max-width": sm() ? "var(--ux-screen-lg)" : "100%",
                width: "100%",
                margin: "0 auto",
                "box-sizing": "border-box",
              }}
            >
              <div
                style={{
                  height: "7em",
                }}
              ></div>
              <div
                style={{
                  "font-size": "var(--ux-text-xl)",
                  "font-weight": "700",
                }}
              >
                Contents
              </div>
              <div style={{ "padding-left": "0.75em" }}>
                <Subtitle kind="h1" html={getItem().label} />
                <For each={getItem().content}>{(item) => <Subtitle {...item} />}</For>
              </div>
            </div>
          </div>
        </Show>
      </div>

      <Show when={p.languageSelector}>
        <div style={{ position: "fixed", right: "2.5em", top: "2.5em", display: "flex", "flex-direction": "row" }}>
          <div
            style={{
              width: "auto",
              padding: "0.5em",
              "border-radius": "var(--ux-radius-lg)",
              display: sm() ? "block" : "none",
            }}
          >
            <UxI18nPick
              onChange={() => {
                addUrlParams("u", "");
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
            }}
          />
        </div>
      </Show>
    </div>
  );
}
