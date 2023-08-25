import dayjs from "dayjs";
import { createSignal, JSX } from "solid-js";
import { i18n } from "../../i18n";
import { setAppMenu } from "../../sdk/record/data";
import { appStorage, getAuth } from "../appStorage";
import { apis } from "../_apis";

export const Battery = (p: { style?: JSX.CSSProperties }) => {
  const createAt = appStorage.val.createAt;
  let diffDays = 14 - dayjs().diff(createAt, "day");
  diffDays = diffDays >= 0 ? diffDays : 0;

  const baseProgress = diffDays / 14;
  const [progress, setProgress] = createSignal(baseProgress);
  return (
    <div style={{ padding: "1em", ...p.style }}>
      <div
        style={{
          "font-size": "var(--ux-text-sm)",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
        }}
      >
        <span style={{ opacity: 0.7 }}>{i18n.剩余试用天数}</span>
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "center",
          "margin-top": "0.5em",
        }}
        onmouseenter={() => {
          setProgress(1);
        }}
        onmouseleave={() => {
          setProgress(baseProgress);
        }}
        onclick={() => {
          setAppMenu("battery");
        }}
      >
        <div
          style={{
            "border-radius": "var(--ux-radius)",
            overflow: "hidden",
            position: "relative",
            flex: 1,
            border: "1px solid var(--ux-primary-500)",
            height: "2.5em",
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            "justify-content": "center",
          }}
        >
          <div
            style={{
              transform: `scaleX(${progress()})`,
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "2.5em",
              background: "var(--ux-primary-200)",
              "transform-origin": "left",
              transition: "all 500ms ease-out",
            }}
          ></div>
          <span
            style={{
              color: "var(--ux-primary-500)",
              "z-index": 50,
              ...(diffDays >= 3
                ? {
                    "border-top-right-radius": "var(--ux-radius)",
                    "border-bottom-right-radius": "var(--ux-radius)",
                    padding: "0 0.25em",
                    "pointer-events": "none",
                    "font-size": "var(--ux-text-base)",
                  }
                : {}),
              "font-weight": diffDays < 3 ? "bold" : "normal",
            }}
          >
            {diffDays} {i18n.days}
          </span>
        </div>
        <div style={{ width: "1px", height: "1em", "background-color": "var(--ux-primary-500)" }}></div>
      </div>
    </div>
  );
};

export const BatteryLicense = (p: { style?: JSX.CSSProperties }) => {
  const [end, setEnd] = createSignal(dayjs().add(1, "day").toString());
  const [progress, setProgress] = createSignal(1);
  const [diffDays, setDiffDays] = createSignal(1);
  const baseProgress = () => {
    let diffDays = 31 - dayjs().diff(end(), "day");
    diffDays = diffDays >= 0 ? diffDays : 0;
    setDiffDays(diffDays);
    return diffDays / 31;
  };
  apis.app_license.checkLicene(getAuth()).then((res) => {
    if (res && res.end) {
      setEnd(res.end);
      setProgress(baseProgress());
    }
  });

  return (
    <div style={{ padding: "1em", ...p.style }}>
      <div
        style={{
          "font-size": "var(--ux-text-sm)",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
        }}
      >
        <span style={{ opacity: 0.7 }}>{i18n.License剩余天数}</span>
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          "justify-content": "center",
          "margin-top": "0.5em",
        }}
        onmouseenter={() => {
          setProgress(1);
        }}
        onmouseleave={() => {
          setProgress(baseProgress());
        }}
        onclick={() => {
          setAppMenu("battery");
        }}
      >
        <div
          style={{
            "border-radius": "var(--ux-radius)",
            overflow: "hidden",
            position: "relative",
            flex: 1,
            border: "1px solid var(--ux-primary-500)",
            padding: "2px",
          }}
        >
          <div
            style={{
              transform: `scaleX(${progress()})`,
              width: "100%",
              height: "1.5em",
              background: "var(--ux-primary-200)",
              "transform-origin": "left",
              transition: "all 500ms ease-out",
            }}
          ></div>
          <span
            style={
              diffDays() >= 3
                ? {
                    "pointer-events": "none",
                    position: "absolute",
                    left: "50%",
                    transform: "tranlsate(-50%, -50%)",
                    top: "50%",
                    padding: "0 0.25em",
                    "font-size": "var(--ux-text-base)",
                    color: "var(--ux-primray-600)",
                  }
                : {
                    color: "var(--ux-red-600)",
                    "font-weight": "bold",
                  }
            }
          >
            {diffDays} {i18n.days}
          </span>
        </div>
        <div
          style={{
            width: "0.25em",
            height: "1em",
            background: "var(--ux-primray-500)",
          }}
        ></div>
      </div>
    </div>
  );
};
