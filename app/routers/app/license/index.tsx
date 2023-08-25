import dayjs from "dayjs";
import { FiCheck } from "solid-icons/fi";
import { IoCloseOutline } from "solid-icons/io";
import { createSignal, For, onMount, Show } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxCheckbox } from "solid-ux/UxCheckbox";
import { routers } from "../..";
import { i18n } from "../../../i18n";
import { getAuth } from "../../appStorage";
import { css } from "../../css";
import { apis } from "../../_apis";
import type { License } from "./_getLicense";

const Right = () => {
  return (
    <div
      style={{
        margin: "auto 0",
        flex: 1,
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        color: "var(--ux-primary-500)",
      }}
    >
      <FiCheck
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
      />
    </div>
  );
};

const Empty = () => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        "align-items": "center",
        "justify-content": "center",
        margin: "auto 0",
        color: "var(--ux-gray-500)",
      }}
    >
      <IoCloseOutline
        style={{
          width: "1.75em",
          height: "1.75em",
        }}
      />
    </div>
  );
};

export const [license, setLicense] = createSignal<License[]>([]);

const LicensePage = () => {
  const sm = createMediaQuerySm();
  const [selecteds, setSelecteds] = createSignal<Set<string>>(new Set());
  const fetchLicense = async () => {
    const res = await apis.app_license.getLicense({
      ...getAuth(),
    });
    setLicense(res.data);
  };

  onMount(() => {
    fetchLicense();
  });

  const handleBuyNew = () => {
    routers.welcome_price.push();
  };
  const handleRenew = () => {
    if (!selecteds().size) {
      solidMsg.red(i18n.请先选择需要续费的License);
      return;
    }
    routers.app_pay_info.push({ plan: "year", licenseIds: Array.from(selecteds()).join(",") });
  };

  const allValue = () => license().length === selecteds().size;

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "column",
        width: "100%",
        height: "100%",
        padding: "1em",
        "box-sizing": "border-box",
      }}
    >
      <div
        style={{
          padding: "1em 0 0 0",
          "font-size": "var(--ux-text-4xl)",
          "font-weight": "bold",
        }}
      >
        {i18n.License}
      </div>
      <div></div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          gap: "1em",
          ...(sm() ? { "align-items": "center", "flex-direction": "row" } : {}),
        }}
      >
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            flex: 1,
          }}
        >
          <div>共有License: {license().length}</div>
          <div
            style={{
              margin: "0 0 0 1em",
              flex: 1,
            }}
          >
            已选择: {selecteds().size}
          </div>
        </div>
        <UxButton style={css.button} onclick={handleBuyNew}>
          {i18n.购新License}
        </UxButton>
        <UxButton style={css.button} onclick={handleRenew}>
          {i18n.续费License}
        </UxButton>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "box-sizing": "border-box",
          padding: "1em",
          margin: "1em 0",
          background: "var(--ux-gray-100)",
          "border-radius": "var(--ux-radius-lg)",
        }}
      >
        <UxCheckbox
          value={allValue()}
          half={!!selecteds().size}
          style={{
            width: "1.5em",
            height: "1.5em",
            margin: "0 1em 0 0",
            color: "var(--ux-primary-500)",
          }}
          onclick={() => {
            if (!allValue()) {
              const list = selecteds();
              license().forEach((item) => {
                list.add(item.id);
              });
              setSelecteds(new Set(Array.from(list)));
            } else {
              setSelecteds(new Set([]));
            }
          }}
        />
        <span style={{ flex: 1 }}>ID</span>
        <span
          style={{
            width: sm() ? "10em" : "6em",
            display: sm() ? "block" : "none",
          }}
        >
          {i18n.创建时间}
        </span>
        <span
          style={{
            width: sm() ? "10em" : "6em",
          }}
        >
          {i18n.到期时间}
        </span>
        <span style={{ width: "6em", "text-align": "center" }}>{i18n.有效}</span>
        <span style={{ width: "6em", "text-align": "center", display: sm() ? "block" : "none" }}>{i18n.使用中}</span>
      </div>
      <div style={{ flex: 1 }}>
        <For each={license()}>
          {(item) => {
            return (
              <div
                style={{
                  display: "flex",
                  "flex-direction": "row",
                  padding: "1em",
                }}
              >
                <UxCheckbox
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    margin: "0 1em 0 0",
                    color: "var(--ux-primary-500)",
                  }}
                  value={selecteds().has(item.id)}
                  onclick={() => {
                    const list = selecteds();
                    if (!list.has(item.id)) {
                      list.add(item.id);
                    } else {
                      list.delete(item.id);
                    }
                    setSelecteds(new Set(Array.from(list)));
                  }}
                />
                <span style={{ flex: 1 }}>LIcense-{item.id}</span>
                <span
                  style={{
                    width: sm() ? "10em" : "6em",
                    display: sm() ? "block" : "none",
                  }}
                >
                  {dayjs(item.createAt).format("YYYY-MM-D")}
                </span>
                <span
                  style={{
                    width: sm() ? "10em" : "6em",
                  }}
                >
                  {dayjs(item.end).format("YYYY-MM-D")}
                </span>

                <span
                  style={{
                    width: "6em",
                  }}
                >
                  <Show when={dayjs(item.end).diff(Date.now(), "day") > 0}>
                    <Right />
                  </Show>
                  <Show when={dayjs(item.end).diff(Date.now(), "day") <= 0}>
                    <Empty />
                  </Show>
                </span>
                <span
                  style={{
                    width: "6em",
                    display: sm() ? "block" : "none",
                  }}
                >
                  <Show when={item.useUid && !/^__/.test(item.useUid)}>
                    <Right />
                  </Show>
                </span>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default LicensePage;
