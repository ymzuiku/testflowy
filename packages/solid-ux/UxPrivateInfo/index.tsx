import { For } from "solid-js";
import { UxBackBar } from "../UxBackBar";

const titles = {
  "一、": true,
  "二、": true,
  "三、": true,
  "四、": true,
  "五、": true,
  "六、": true,
  "七、": true,
  "八、": true,
  "九、": true,
  "十、": true,
  "十一、": true,
  "十二、": true,
  "十三、": true,
  "十四、": true,
  "十五、": true,
  "十六、": true,
  "十七、": true,
  "十八、": true,
  "十九、": true,
};
const titlesValues = Object.keys(titles);

export const UxPrivateInfo = (p: { backTitle: string; onBack: () => void; text: string }) => {
  const texts = p.text.trim().split("\n");

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100% - 4px)",
        position: "relative",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <UxBackBar title={p.backTitle} onBack={p.onBack} />
      <div style={{ padding: "0 2em" }}>
        <For each={texts}>
          {(item, index) => {
            if (index() === 0) {
              return <h1 style={{ "font-size": "var(--ux-text-4xl)" }}>{item}</h1>;
            }
            const isTtitle = titlesValues.find((v) => item.indexOf(v) === 0);
            return (
              <p
                style={{
                  padding: "0.5em 0",
                  margin: 0,
                  "font-size": isTtitle ? "var(--ux-text-2xl)" : "var(--ux-text-md)",
                }}
              >
                {item}
              </p>
            );
          }}
        </For>
        <div style={{ height: "6em" }}></div>
      </div>
    </div>
  );
};
