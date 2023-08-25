import { SHA256 } from "crypto-js";
import { BiSolidMessageError } from "solid-icons/bi";
import { FaSolidPlay } from "solid-icons/fa";
import { HiSolidInbox } from "solid-icons/hi";
import { VsChromeClose } from "solid-icons/vs";
import { createEffect, createRoot, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { solidMsg } from "solid-msg";
import { createScroll } from "solid-ux/createScroll";
import { UxAlert } from "solid-ux/UxAlert";
import { createPanelShow } from "solid-ux/UxPanel";
import { UxSearch } from "solid-ux/UxSearch";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { i18n } from "../../../i18n";
// import { actions } from "../../../sdk/record/actions";
// import { focusFail, getSdkAuth, license, setFocusFail, setLicense } from "../../../sdk/record/data";
import { apis } from "../../_apis";
import { appStorage, getAuth } from "../../appStorage";
import { css } from "../../css";
import { DraftListItem } from "../../task/draft/_getDrafts";
import type { License } from "../license/_getLicense";
import { TaskItem } from "./TaskItem";

const [search, setSearch] = createRoot(() => createSignal(""));

const [license, setLicense] = createSignal<Partial<License>>({ id: "", end: "", owner: "" });

function playTask(ids: string[], code: string) {
  const str = new URLSearchParams({ testflowy_tasks: ids.join(",") }).toString();
  const data = JSON.parse(code);
  const event = data.events && data.events[0];
  if (!event) {
    solidMsg.red(i18n.该用例没有内容);
    return;
  }
  const url = `${event.tag}${event.value}?${str}`;
  window.open(url);
}

export default function Testing() {
  const [tasks, setTasks] = createStore<{ list: DraftListItem[] }>({ list: [] });
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
    apis.app_license.checkLicene(getAuth()).then((res) => {
      if (res) {
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
    const res = await apis.task_task.getTasks({
      ...getAuth(),
      name: search(),
      offset: tasks.list.length,
      limit: 20,
      owner: license().owner!,
    });
    const nextList = tasks.list.concat(res.data || []);
    setTasks("list", [...nextList]);
    setEnd(nextList.length === res.total);
    setTotal(res.total);
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
    const res = await apis.task_task.deleteTask({ auth: getAuth(), id: item.id! });
    if (res.ok) {
      solidMsg.dark(i18n.删除成功, 500);
      setTasks("list", []);
      fetchTaskList();
    }
  };
  const handleUse = async (item: DraftListItem) => {
    const res = await apis.task_task.getTaskDetail({ ...getAuth(), id: item.id! });
    // actions.load(res);
    // actions.loadAll([res]);
    // actions.run("task");

    playTask([res.id], res.code);
  };

  const handleUpdate = async (name: string, item: DraftListItem) => {
    const data = await apis.task_task.getTaskDetail({ ...getAuth(), id: item.id! });
    const res = await apis.task_task.updateTask({
      auth: getAuth(),
      id: item.id!,
      md5: SHA256(data.code).toString(),
      crypto: false,
      name,
    });
    if (res.ok) {
      solidMsg.dark(i18n.修改成功, 500);
    }
    return res.ok;
  };

  const handleUseSelected = async () => {
    const selectedList = tasks.list.filter((v) => v.selected);
    const ids = selectedList.map((v) => v.id!);
    if (ids.length > 10) {
      solidMsg.dark(i18n.同时执行条数不能大于十条, 500);
      return;
    }
    const res = await apis.task_task.getTaskDetails({ auth: getAuth(), ids });
    playTask(ids, res.data[0].code);
  };

  return (
    <div
      style={{
        padding: "1em",
        width: "100%",
        height: "100%",
        display: "flex",
        "flex-direction": "column",
        "box-sizing": "border-box",
      }}
    >
      <div
        style={{
          "padding-top": "1em",
          "font-size": "var(--ux-text-4xl)",
          "font-weight": "bold",
        }}
      >
        {i18n.测试}
      </div>
      <div
        style={{
          color: "var(--ux-gray-600)",
          padding: "1em 0",
        }}
      >
        {i18n.测试网址说明}
      </div>
      <UxAlert onclose={onCloseDeleteAlert} show={showDeleteAlert()}>
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

      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          flex: 1,
          overflow: "hidden",
          "margin-top": "1em",
        }}
      >
        <Switch>
          <Match when={!license().end}>
            <div
              style={{
                display: "flex",
                "flex-direction": "column",
                "align-items": "center",
                "justify-content": "center",
                "box-sizing": "border-box",
                gap: "1em",
                "margin-top": "5em",
              }}
            >
              <BiSolidMessageError
                style={{
                  width: "2.5em",
                  height: "2.5em",
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
          <Match when={license().end}>
            <div
              style={{
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
                  "margin-top": "0.5em",
                }}
              >
                <UxSearch
                  style={css.inputOutline}
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
                    <span
                      style={{
                        padding: "0 0.25em",
                      }}
                    >
                      {total()}
                    </span>
                    {i18n.条自动化测试}
                  </span>
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
                        padding: "0 0.25em",
                        color: "var(--ux-primary-400)",
                        "font-size": "var(--ux-text-lg)",
                      }}
                    >
                      {selectors()}
                    </span>
                    {i18n.条自动化测试}
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
                        width: "1.25em",
                        height: "1.25em",
                        cursor: "pointer",
                      }}
                      onclick={() => handleUseSelected()}
                    />
                  </div>
                </Show>
              </div>

              <Show when={!tasks.list.length}>
                <div
                  style={{
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center",
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
              </Show>
              <Show when={tasks.list.length}>
                <div
                  class="testflowy-sdk-scroll"
                  onscroll={scroll.onscroll}
                  style={{
                    flex: 1,
                    "overflow-y": "auto",
                  }}
                >
                  <For each={tasks.list}>
                    {(item) => (
                      <TaskItem
                        agent={appStorage.val.agent}
                        fullPage
                        item={item}
                        setList={setTasks}
                        handleUse={handleUse}
                        handleUpdate={handleUpdate}
                        handleDeleteCode={handleDeleteCode}
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
              </Show>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
