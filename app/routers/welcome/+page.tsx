import { CgDebug } from "solid-icons/cg";
import { FiLogIn } from "solid-icons/fi";
import {
  RiCommunicationMessageLine,
  RiEditorFlowChart,
  RiUserStarSmileLine,
  RiUserUserSettingsLine,
} from "solid-icons/ri";
import { Component, For, Show } from "solid-js";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxButton } from "solid-ux/UxButton";
import { UxI18nPick } from "solid-ux/UxI18nPick";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { UxSvg } from "solid-ux/UxSvg";
import { UxWaveLine } from "solid-ux/UxWaveLine";
import { routers } from "..";
import { i18n } from "../../i18n";
import { css } from "../css";
import { RegisterForm } from "./views/RegisterForm";

const CardInfo = (p: {
  title: string;
  info: string;
  reverse?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: Component<any>;
  img: string;
  horizontal?: boolean;
}) => {
  const sm = createMediaQuerySm();
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": sm() ? (p.reverse ? "row-reverse" : "row") : "column",
        "align-items": "center",
        "justify-content": "center",
        "box-sizing": "border-box",
        padding: sm() ? "2.5em" : "1.5em",
      }}
    >
      <img
        style={{
          width: sm() ? (p.horizontal ? "800px" : "500px") : "100%",
          background: "var(--ux-gray-50)",
          "border-radius": "var(--ux-radius-xl)",
          "box-shadow": "var(--ux-shadow-xl)",
        }}
        src={p.img}
      />
      <div style={{ width: sm() ? "400px" : "auto", padding: sm() ? "2.5em" : "1em" }}>
        <p.Icon
          size={40}
          style={{
            color: "var(--ux-gray-500)",
            margin: sm() ? "0 0 2.5em 0" : "2.5em 0",
          }}
        />
        <h2
          style={{
            "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
            "font-weight": "bold",
          }}
        >
          {p.title}
        </h2>
        <h3
          style={{
            "font-size": "var(--ux-text-2xl)",
            margin: sm() ? "2.5em 0 0 0" : "1em 0 0 0",
          }}
        >
          {p.info}
        </h3>
      </div>
    </div>
  );
};

const Welcome: Component<{ stackShow: boolean }> = (p) => {
  const sm = createMediaQuerySm();
  return (
    <Show when={p.stackShow}>
      <div>
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            "max-width": "var(--ux-screen-2xl)",
            margin: "0 auto",
            padding: sm() ? "2.5em" : "1em",
          }}
        >
          <UxSvg
            style={{
              width: sm() ? "4em" : "3em",
              height: sm() ? "4em" : "3em",
              color: "var(--ux-gray-900)",
            }}
            src={"/logo_custom.svg"}
          />
          <h1
            style={{
              "font-size": sm() ? "var(--ux-text-4xl)" : "var(--ux-text-3xl)",
              margin: "0 0 0 0.5em",
              color: "var(--ux-gray-900)",
              "font-family": "var(--ux-mono)",
              display: sm() ? "block" : "none",
            }}
          >
            Testflowy
          </h1>
          <div style={{ flex: 1 }}></div>
          <div
            style={{
              display: "flex",
              "flex-direction": "row",
              "align-items": "center",
              "font-size": "var(--ux-text-lg)",
              gap: "2.5em",
            }}
          >
            <UxI18nPick
              style={{
                "font-size": "var(--ux-text-lg)",
              }}
            />
            <a
              style={{
                cursor: "pointer",
                display: sm() ? "block" : "none",
                "font-size": "var(--ux-text-lg)",
              }}
              rel={routers.welcome_price.path}
              onclick={() => {
                routers.welcome_price.push();
              }}
            >
              {i18n.价格}
            </a>
            <a
              style={{
                cursor: "pointer",
                display: sm() ? "block" : "none",
                "font-size": "var(--ux-text-lg)",
              }}
              rel={routers.welcome_doc.path}
              onclick={() => {
                // location.href = "/other.html";
                // window.open(routers.doc.path);
                routers.welcome_doc.push();
              }}
            >
              {i18n.文档}
            </a>
            <a
              style={{
                cursor: "pointer",
                display: sm() ? "block" : "none",
                "font-size": "var(--ux-text-lg)",
              }}
              rel={routers.welcome_doc.path}
              onclick={() => {
                routers.welcome_example.push();
              }}
            >
              {i18n.示例}
            </a>
            <div
              style={{
                ...css.button,
                cursor: "pointer",
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
                "justify-content": "center",
              }}
              onclick={() => {
                routers.login.put();
              }}
            >
              <UxSolidIcon
                Icon={FiLogIn}
                style={{
                  margin: "0 0.75em 0 0",
                  width: "1.5em",
                  height: "1.5em",
                  "pointer-events": "none",
                }}
              />
              <span>{i18n.登入}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            "flex-direction": sm() ? "row" : "column",
            "align-items": "center",
            "justify-content": "center",
            padding: "1.5em",
            margin: sm() ? "4em 0 0 0" : "2.5em 0 0 0",
          }}
        >
          <div
            style={{
              width: sm() ? "600px" : "100%",
              "z-index": 10,
              padding: sm() ? "3em" : "0",
            }}
          >
            <div
              style={{
                "font-size": sm() ? "var(--ux-text-6xl)" : "var(--ux-text-5xl)",
                "font-weight": "bold",
              }}
            >
              {i18n.零代码自动化测试平台}
            </div>
            <div
              style={{
                "font-size": "var(--ux-text-2xl)",
                "margin-top": "1.5em",
              }}
            >
              {i18n.为企业提供实时测试团队协作测试提高系统正确性和用户转化}
            </div>
            <RegisterForm justOpen />
            <div
              style={{
                "flex-direction": "column",
                display: sm() ? "none" : "flex",
                gap: "1.5em",
                "margin-top": "2.5em",
              }}
            >
              <UxButton
                style={css.buttonOutline}
                onclick={() => {
                  // location.href = "/other.html";
                  // window.open(routers.doc.path);
                  routers.welcome_doc.push();
                }}
              >
                {i18n.文档}
              </UxButton>
              <UxButton
                style={css.buttonOutline}
                onclick={() => {
                  routers.welcome_price.push();
                }}
              >
                {i18n.价格}
              </UxButton>
            </div>
          </div>
          <img
            style={{
              height: sm() ? "300px" : "300px",
              transform: sm() ? "scale(1.6) translateX(2.5em)" : "scale(1)",
              "pointer-events": "none",
              padding: "2.5em",
            }}
            src="/imgs/open-doodles/MeditatingDoodle.svg"
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "font-size": "var(--ux-text-xl)",
            "max-width": "var(--ux-screen-2xl)",
            margin: sm() ? "8em auto 1em auto" : "0em auto 1em auto",
            padding: sm() ? "1em" : "0em 2.5em 2.5em 2.5em",
          }}
        >
          <h2
            style={{
              "font-size": sm() ? "var(--ux-text-5xl)" : "var(--ux-text-4xl)",
              margin: "0",
              "font-weight": "bold",
              "max-width": "var(--ux-screen-lg)",
              "text-align": "center",
            }}
          >
            {i18n.自动测试一行代码接入提高产品质量}
          </h2>
          <h3
            style={{
              "font-size": "var(--ux-text-2xl)",
              margin: "2.5em 0",
              "text-align": "center",
            }}
          >
            {i18n.将自动化测试功能添加到您的网站随时检测企业产品完整功能情况}
          </h3>
          <div
            style={{
              "font-size": "var(--ux-text-xl)",
              color: "var(--ux-gray-400)",
              margin: "0 0 1em 0",
            }}
          >
            {i18n.点击下面播放按钮体验}
          </div>
          <iframe
            style={{
              border: "1px solid var(--ux-gray-300)",
              "border-radius": "var(--ux-radius-xl)",
              height: sm() ? "850px" : "1100px",
              width: sm() ? "800px" : "100%",
              "box-shadow": "var(--ux-shadow-lg)",
            }}
            src="/example/index.html"
          />
        </div>
        <UxWaveLine
          style={{
            width: "100%",
            color: "var(--ux-indigo-200)",
            display: sm() ? "block" : "none",
          }}
        />
        <div
          style={{
            background: "var(--ux-indigo-200)",
            padding: "2.5em 0",
          }}
        >
          <CardInfo
            Icon={RiUserUserSettingsLine}
            img="/imgs/pb1.png"
            title={i18n.动动鼠标完成测试}
            info={i18n.通过测试环境外嵌Testflowy您可以直接在您的系统页面中进行交互录制和播放测试}
          />
          <CardInfo
            Icon={RiUserStarSmileLine}
            img="/imgs/pb2.png"
            horizontal
            reverse
            title={i18n.全用例回归}
            info={i18n.一键回归所有测试用例每一次发版都更有信心}
          />
        </div>
        <UxWaveLine
          bottom
          style={{
            width: "100%",
            color: "var(--ux-indigo-200)",
            display: sm() ? "block" : "none",
          }}
        />
        <div
          style={{
            "max-width": "var(--ux-screen-xl)",
            display: "flex",
            "flex-direction": sm() ? "row" : "column",
            "align-items": "center",
            "justify-content": "space-between",
            margin: "0 auto",
            padding: sm() ? "6em" : "2.5em",
            gap: sm() ? "0" : "4em",
          }}
        >
          <For
            each={[
              {
                icon: <CgDebug size={40} />,
                title: i18n.自动化测试,
                info: i18n.用Testflowy录制测试研发提速度我们会帮您减少产品漏洞并提高缩短开发周期,
              },
              {
                icon: <RiEditorFlowChart size={40} />,
                title: i18n.团队协同测试,
                info: i18n.通过团队协同功能您可以很轻松的让团队各成员复用自动化测试,
              },
              {
                icon: <RiCommunicationMessageLine size={40} />,
                title: i18n.本地密钥加密,
                info: i18n.您可以选择加密用例仅有您自己的本地秘钥才知道用例的内容我们平台不会知道您的测试用例的具体内容,
              },
            ]}
          >
            {(item) => {
              return (
                <div
                  style={{
                    width: "24em",
                    gap: "0.75em",
                  }}
                >
                  {item.icon}
                  <h3
                    style={{
                      "font-size": "var(--ux-text-3xl)",
                      "font-weight": 900,
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      "font-size": "var(--ux-text-lg)",
                    }}
                  >
                    {item.info}
                  </div>
                </div>
              );
            }}
          </For>
        </div>
        <UxWaveLine
          style={{
            color: "var(--ux-gray-100)",
            width: "100%",
            margin: "0 auto",
            display: sm() ? "block" : "none",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            "flex-direction": sm() ? "row" : "column",
            "align-items": "center",
            "justify-content": "center",
            padding: sm() ? "2em 0 0 0" : "2em 0 0",
            background: "var(--ux-gray-100)",
          }}
        >
          <div
            style={{
              width: sm() ? "640px" : "auto",
              padding: "1em 1em 0 1em",
              "z-index": 10,
            }}
          >
            <div
              style={{
                "font-size": "var(--ux-text-4xl)",
                "font-weight": "bold",
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
              }}
            >
              <UxSvg
                style={{
                  width: sm() ? "2em" : "3em",
                  height: sm() ? "2em" : "3em",
                  "margin-right": "0.5em",
                }}
                src="/logo_custom.svg"
              />
              <div
                style={{
                  "font-size": "var(--ux-text-xl)",
                }}
              >
                {i18n.立即试用Testflowy}
              </div>
            </div>
            <h3
              style={{
                "font-size": "var(--ux-text-lg)",
              }}
            >
              {i18n.为企业构建的自动化测试引导工具}
            </h3>
            <RegisterForm justOpen />
          </div>
          <img
            style={{
              "pointer-events": "none",
              transform: sm() ? "scale(1.65) translateY(2.5em)" : "scale(1) translateY(4em)",
              height: "300px",
            }}
            alt="cooler2.webp"
            src="/imgs/open-doodles/LovingDoodle.svg"
          />
        </div>
        <UxWaveLine
          style={{
            color: "var(--ux-black)",
            background: "var(--ux-gray-100)",
            display: sm() ? "block" : "none",
            width: "100%",
            margin: "0 auto",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            "flex-direction": sm() ? "row" : "column",
            "align-items": "center",
            "justify-content": "center",
            color: "var(--ux-white)",
            background: "var(--ux-black)",
            gap: "1em",
            padding: sm() ? "4em" : "2em 0",
          }}
        >
          <a
            rel={routers.login_register.path}
            style={{ cursor: "pointer" }}
            onclick={() => routers.welcome_termsOfService.push()}
          >
            服务条款
          </a>
          <a
            style={{ cursor: "pointer" }}
            rel={routers.login_register.path}
            onclick={() => routers.welcome_privacyPolicy.push()}
          >
            隐私政策
          </a>
          {/* <a
            style={{ cursor: "pointer" }}
            rel={routers.login_register.path}
            onclick={() => routers.welcome_aboutUs.push()}
          >
            关于我们
          </a> */}
          <UxI18nPick style={{ color: "var(--ux-white)" }} />
        </div>
      </div>
    </Show>
  );
};

export default Welcome;
