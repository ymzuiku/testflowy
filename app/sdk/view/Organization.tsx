import { SHA256 } from "crypto-js";
import { BiSolidMessageError } from "solid-icons/bi";
import { FaSolidPlay } from "solid-icons/fa";
import { HiSolidInbox } from "solid-icons/hi";
import { VsChromeClose } from "solid-icons/vs";
import { createEffect, createRoot, createSignal, For, JSX, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { solidMsg } from "solid-msg";
import { createScroll } from "solid-ux/createScroll";
import { UxAlert } from "solid-ux/UxAlert";
import { UxCheckbox } from "solid-ux/UxCheckbox";
import { createPanelShow } from "solid-ux/UxPanel";
import { UxSearch } from "solid-ux/UxSearch";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { i18n } from "../../i18n";
import { apis } from "../../routers/_apis";
import { LoadingSvg } from "../../routers/svgs/LoadingSvg";
import type { DraftListItem } from "../../routers/task/draft/_getDrafts";
import { actions } from "../record/actions";
import { focusFail, getSdkAuth, license, sdkStorage, setFocusFail, setLicense } from "../record/data";
import { TaskItem } from "./TaskItem";

const cssInputOutline = {
  padding: "0.25em 0.75em",
  height: "3.5em",
  color: "var(--ux-gray-50)",
  "box-sizing": "border-box",
  border: "1px solid var(--ux-gray-200)",
  "border-radius": "var(--ux-radius)",
  appearance: "none",
} as JSX.CSSProperties;

// const cssInputOutlineFocus = {
//   border: "1px solid var(--ux-primary-400)",
// } as JSX.CSSProperties;

const [search, setSearch] = createRoot(() => createSignal(""));

export function Organization() {
  const [tasks, setTasks] = createStore<{ list: DraftListItem[] }>({ list: [] });
  const [loading, setLoading] = createSignal(true);
  const [showDeleteAlert, setShowDeleteAlert, onCloseDeleteAlert] = createPanelShow();
  const [selectors, setSelectors] = createSignal(0);
  const [end, setEnd] = createSignal(false);
  const [total, setTotal] = createSignal(0);
  const scroll = createScroll({
    onBottom: () => {
      if (!end()) {
        fetchTaskList();
      }
    },
  });

  if (!license().id) {
    apis.app_license.checkLicene(getSdkAuth()).then((res) => {
      if (res && res.id) {
        setLicense(res);
        fetchTaskList();
      }
    });
  }

  createEffect(() => {
    const arr = tasks.list.filter((v) => v && v.selected);
    setSelectors(arr.length);
  });

  const fetchTaskList = async () => {
    if (!license().owner) {
      return;
    }
    setLoading(true);
    const res = await apis.task_task.getTasks({
      ...getSdkAuth(),
      name: search(),
      offset: tasks.list.length,
      pass: focusFail() ? false : void 0,
      limit: 20,
      owner: license().owner!,
    });
    const nextList = tasks.list.concat(res.data || []);
    setTasks("list", [...nextList]);
    setEnd(nextList.length === res.total);
    setTotal(res.total);

    setLoading(false);
  };
  fetchTaskList();

  const fetchSearch = async () => {
    // setList("list", []);
    setTasks("list", []);
    fetchTaskList();
  };

  const handleDeleteCode = async (item: DraftListItem) => {
    if (!(await setShowDeleteAlert())) {
      return;
    }
    const res = await apis.task_task.deleteTask({ auth: getSdkAuth(), id: item.id! });
    if (res.ok) {
      solidMsg.dark(i18n.删除成功, 500);
      setTasks("list", []);
      fetchTaskList();
    }
  };
  const handleUse = async (item: DraftListItem) => {
    const res = await apis.task_task.getTaskDetail({ ...getSdkAuth(), id: item.id! });
    // actions.load(res);
    actions.loadAll([res]);
    actions.run("task");
  };

  const handleUpdate = async (name: string, item: DraftListItem) => {
    const data = await apis.task_task.getTaskDetail({ ...getSdkAuth(), id: item.id! });
    const res = await apis.task_task.updateTask({
      auth: getSdkAuth(),
      id: item.id!,
      md5: SHA256(data.code).toString(),
      name,
      crypto: false,
    });
    if (res.ok) {
      solidMsg.dark(i18n.修改成功, 500);
    }
    return res.ok;
  };

  const handleCopyToSelf = async (item: DraftListItem) => {
    const task = await apis.task_task.getTaskDetail({ ...getSdkAuth(), id: item.id! });
    const res = await apis.task_draft.createDraft({
      code: task.code,
      md5: task.md5,
      name: task.name,
      steps: task.steps,
      auth: getSdkAuth(),
      pass: false,
      crypto: false,
    });
    if (res.ok) {
      solidMsg.dark(i18n.操作成功, 500);
    }
  };

  const handleUseSelected = async () => {
    const selectedList = tasks.list.filter((v) => v.selected);
    const ids = selectedList.map((v) => v.id!);
    if (ids.length > 10) {
      solidMsg.dark(i18n.同时执行条数不能大于十条, 1000);
      return;
    }
    const res = await apis.task_task.getTaskDetails({ auth: getSdkAuth(), ids });
    actions.loadAll(res.data.filter((v) => v.code !== "[]"));
    actions.run("task");
  };

  const handleEdit = async (item: DraftListItem) => {
    const res = await apis.task_task.getTaskDetail({ ...getSdkAuth(), id: item.id! });
    actions.load(res);
    actions.openEditor(true);
  };

  const handleChangeFocusFail = () => {
    setFocusFail(!focusFail());
    fetchSearch();
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        "flex-direction": "column",
        "overflow-y": "hidden",
      }}
    >
      <UxAlert class="testflowy" zIndex={9900} onclose={onCloseDeleteAlert} show={showDeleteAlert()}>
        <div
          style={{
            padding: "1.5em",
            "font-size": "var(--ux-text-lg)",
            "text-align": "center",
            color: "var(--ux-gray-900)",
          }}
        >
          {i18n.确定删除该测试}
        </div>
      </UxAlert>
      <Switch>
        <Match when={!license().id}>
          <div
            style={{
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "box-sizing": "border-box",
              gap: "1em",
            }}
          >
            <BiSolidMessageError
              style={{
                width: "1.5em",
                height: "1.5em",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                "font-size": "var(--ux-text-2xl)",
                "font-weight": "bold",
                opacity: 0.5,
              }}
            >
              {i18n.LicenseExpired}
            </div>
            <div
              style={{
                "font-size": "var(--ux-text-xl)",
                opacity: 0.5,
              }}
            >
              {i18n.请联系您的团队管理员}
            </div>
          </div>
        </Match>
        <Match when={license().id}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              "flex-direction": "column",
              "overflow-y": "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                gap: "0.5em",
                padding: "0 1em",
                "margin-top": "0.5em",
              }}
            >
              <UxSearch
                style={cssInputOutline}
                label={i18n.搜索}
                value={search()}
                oninput={(e) => setSearch(e.currentTarget.value)}
                onSearch={fetchSearch}
              />
            </div>
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
                height: "3em",
                margin: "0.5em 0",
                padding: "0 1em",
              }}
            >
              <VsChromeClose
                size={16}
                style={{
                  color: "var(--ux-gray-900)",
                  "margin-right": "0.5em",
                  cursor: "pointer",
                  display: selectors() === 0 ? "none" : "block",
                }}
                onclick={() => {
                  setTasks("list", (v) => !!v, "selected", false);
                }}
              />
              <Show when={selectors() === 0}>
                <span>
                  {i18n.共有}
                  <span style={{ padding: "0 0.25em" }}>{total()}</span>
                  {/* {i18n.条自动化测试} */}
                </span>
                <div
                  style={{
                    display: "flex",
                    "flex-direction": "row",
                    "margin-left": "1em",
                  }}
                >
                  <span style={{ "margin-right": "0.25em" }}>{i18n.只显示失败}</span>
                  <UxCheckbox
                    style={{
                      "flex-shrink": 0,
                      width: "1.5em",
                      height: "1.5em",
                    }}
                    value={focusFail()}
                    onclick={handleChangeFocusFail}
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                  }}
                />
              </Show>
              <Show when={selectors() > 0}>
                <span>
                  {i18n.已选择}
                  <span
                    style={{
                      padding: "0 0.5em",
                      "font-size": "var(--ux-text-lg)",
                    }}
                  >
                    {selectors()}
                  </span>
                  {/* {i18n.条自动化测试} */}
                </span>
                <div style={{ flex: 1 }} />
                <div
                  style={{
                    display: "flex",
                    "flex-direction": "row",
                    gap: "1em",
                    "margin-right": "0.5em",
                  }}
                >
                  <FaSolidPlay
                    style={{
                      width: "1.75em",
                      height: "1.75em",
                      cursor: "pointer",
                    }}
                    onclick={() => handleUseSelected()}
                  />
                </div>
              </Show>
            </div>

            <Switch>
              <Match when={loading()}>
                <LoadingSvg
                  style={{
                    opacity: 0.3,
                    width: "5em",
                    height: "5em",
                    margin: "2.5 auto 0 auto",
                  }}
                />
              </Match>
              <Match when={!tasks.list?.length}>
                <div
                  style={{
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center",
                    "box-sizing": "border-box",
                    "margin-top": "2.5em",
                  }}
                >
                  <UxSolidIcon
                    Icon={HiSolidInbox}
                    style={{
                      width: "5em",
                      height: "5em",
                      opacity: 0.3,
                    }}
                  />
                  <div style={{ opacity: 0.4 }}>{i18n.未找到数据}</div>
                </div>
              </Match>
              <Match when={tasks.list?.length}>
                <div
                  style={{
                    flex: 1,
                    "overflow-y": "auto",
                    padding: "0 1em",
                  }}
                  onscroll={scroll.onscroll}
                >
                  <For each={tasks.list}>
                    {(item) => (
                      <TaskItem
                        agent={sdkStorage.val.agent}
                        item={item}
                        setList={setTasks}
                        handleUse={handleUse}
                        handleUpdate={handleUpdate}
                        handleDeleteCode={handleDeleteCode}
                        handleCopyToSelf={handleCopyToSelf}
                        handleEdit={handleEdit}
                        // handleCopyCode={handleCopyCode}
                        // handleShareCloud={handleShareCloud}
                      />
                    )}
                  </For>
                  <Show when={end()}>
                    <div
                      style={{
                        opacity: 0.3,
                        "text-align": "center",
                        margin: "1em 0",
                      }}
                    >
                      {i18n.没有更多了}
                    </div>
                  </Show>
                </div>
              </Match>
            </Switch>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
