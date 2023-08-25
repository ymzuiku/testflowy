import { SHA256 } from "crypto-js";
import { AiOutlineFileAdd } from "solid-icons/ai";
import { FaSolidPlay } from "solid-icons/fa";
import { HiSolidInbox } from "solid-icons/hi";
import { RiDevelopmentGitMergeFill } from "solid-icons/ri";
import { VsChromeClose } from "solid-icons/vs";
import { createEffect, createRoot, createSignal, For, JSX, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { solidMsg } from "solid-msg";
import { createScroll } from "solid-ux/createScroll";
import { UxAlert } from "solid-ux/UxAlert";
import { UxCheckbox } from "solid-ux/UxCheckbox";
import { UxInput } from "solid-ux/UxInput";
import { createPanelShow } from "solid-ux/UxPanel";
import { UxSearch } from "solid-ux/UxSearch";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { timeLabelFull } from "utils/strs";
import { i18n } from "../../i18n";
import { apis } from "../../routers/_apis";
import { ClickArrowSvg } from "../../routers/svgs/ClickArrow";
import { LoadingSvg } from "../../routers/svgs/LoadingSvg";
import type { DraftListItem } from "../../routers/task/draft/_getDrafts";
import { actions } from "../record/actions";
import { focusFail, getSdkAuth, sdkStorage, setFocusFail } from "../record/data";
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

const cssInputOutlineFocus = {
  border: "1px solid var(--ux-primary-400)",
} as JSX.CSSProperties;

const [search, setSearch] = createRoot(() => createSignal(""));

export function Personal() {
  const [drafts, setDrafts] = createStore<{ list: DraftListItem[] }>({ list: [] });
  const [selectors, setSelectors] = createSignal(0);
  const [showDeleteAlert, setShowDeleteAlert, onCloseDeleteAlert] = createPanelShow();
  const [newName, setNewName] = createSignal("");
  const [loading, setLoading] = createSignal(true);
  const [end, setEnd] = createSignal(false);
  const [total, setTotal] = createSignal(0);
  const [addCodeAlert, setAddCodeAlert, onCloseAddCodeAlert] = createPanelShow(false);
  const scroll = createScroll({
    onBottom: () => {
      if (!end()) {
        fetchDraftList();
      }
    },
  });

  createEffect(() => {
    const arr = drafts.list.filter((v) => v && v.selected);
    setSelectors(arr.length);
  });
  const fetchDraftList = async () => {
    setLoading(true);
    const res = await apis.task_draft.getDrafts({
      ...getSdkAuth(),
      name: search(),
      pass: focusFail() ? false : void 0,
      offset: drafts.list.length,
      limit: 20,
    });
    const nextList = drafts.list.concat(res.data);
    setDrafts("list", [...nextList]);
    setEnd(nextList.length === res.total);
    setTotal(res.total);
    setLoading(false);
  };
  fetchDraftList();

  const fetchSearch = async () => {
    setDrafts("list", []);
    fetchDraftList();
  };

  const handleAddCode = async () => {
    const ok = await setAddCodeAlert();
    if (!ok) {
      return;
    }
    // const name = timeLabel() + "-" + Math.random().toString(36).substring(2);
    const name = newName();
    setNewName("");
    const res = await apis.task_draft.createDraft({
      name,
      code: JSON.stringify({ events: [], meta: { version: "1.0.0" } }),
      md5: SHA256("").toString(),
      auth: getSdkAuth(),
      steps: 0,
      crypto: false,
      pass: false,
    });
    if (res.ok) {
      solidMsg.dark(i18n.创建成功, 500);
      fetchDraftList();
    }
  };

  const handleCopyCode = async (item: DraftListItem) => {
    const data = await apis.task_draft.getDraftDetail({ ...getSdkAuth(), id: item.id! });
    const name = item.name + "_copy";
    const res = await apis.task_draft.createDraft({
      name,
      code: data.code,
      md5: SHA256(data.code).toString(),
      auth: getSdkAuth(),
      steps: data.steps,
      crypto: false,
      pass: false,
    });
    if (res.ok) {
      solidMsg.dark(i18n.复制成功, 500);
      fetchDraftList();
    }
  };

  const handleDeleteCode = async (item: DraftListItem) => {
    if (!(await setShowDeleteAlert())) {
      return;
    }
    const res = await apis.task_draft.deleteDraft({ auth: getSdkAuth(), id: item.id! });
    if (res.ok) {
      solidMsg.dark(i18n.删除成功, 500);
      fetchSearch();
    }
  };

  const handleUpdate = async (name: string, item: DraftListItem) => {
    const data = await apis.task_draft.getDraftDetail({ ...getSdkAuth(), id: item.id! });
    const res = await apis.task_draft.updateDarft({
      auth: getSdkAuth(),
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

  const handleUse = async (item: DraftListItem) => {
    const res = await apis.task_draft.getDraftDetail({ ...getSdkAuth(), id: item.id! });
    actions.load(res);
    actions.run("draft");
  };

  const handleEdit = async (item: DraftListItem) => {
    const res = await apis.task_draft.getDraftDetail({ ...getSdkAuth(), id: item.id! });
    actions.load(res);
    actions.openEditor();
  };

  const handleUseSelected = async () => {
    const selectedList = drafts.list.filter((v) => v.selected);
    const ids = selectedList.map((v) => v.id!);
    if (ids.length > 10) {
      solidMsg.dark(i18n.同时执行条数不能大于十条, 1000);
      return;
    }
    const res = await apis.task_draft.getDraftDetails({ auth: getSdkAuth(), ids });
    actions.loadAll(res.data.filter((v) => v.code !== "[]"));
    actions.run("draft");
  };

  // const handleDeleteCodeAll = () => {};
  const handleMergeSelected = async () => {
    const selectedList = drafts.list.filter((v) => v.selected);
    const ids = selectedList.map((v) => v.id!);
    const res = await apis.task_draft.getDraftDetails({ auth: getSdkAuth(), ids });
    actions.loadAll(res.data);
    const name = "merge-" + timeLabelFull();
    const add = await apis.task_draft.createDraft({
      name,
      code: JSON.stringify([]),
      md5: SHA256("").toString(),
      auth: getSdkAuth(),
      steps: 0,
      crypto: false,
      pass: false,
    });
    if (add.ok) {
      solidMsg.dark(i18n.创建成功, 500);
      fetchSearch();
    }
  };
  const handleShareCloud = async (item: DraftListItem) => {
    const res = await apis.task_task.createTask({ ...getSdkAuth(), id: item.id! });
    if (res.ok) {
      solidMsg.dark(i18n.操作成功, 500);
    }
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
      <UxAlert class="testflowy" zIndex={9900} onclose={onCloseAddCodeAlert} show={addCodeAlert()}>
        <div
          style={{
            padding: "1em",
          }}
        >
          <div
            style={{
              "font-size": "var(--ux-text-xl)",
              color: "var(--ux-gray-900)",
              "margin-bottom": "1.5em",
              "margin-top": "1em",
              "text-align": "center",
            }}
          >
            {i18n.创建新测试}
          </div>
          <UxInput
            value={newName()}
            oninput={(e) => setNewName(e.currentTarget.value)}
            hiddenClose
            autofocus
            style={cssInputOutline}
            focusStyle={cssInputOutlineFocus}
            placeholder={i18n.请填写测试名称}
          />
        </div>
      </UxAlert>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          gap: "0.5em",
          padding: "0 1em",
          "margin-top": "0.25em",
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
            setDrafts("list", (v) => !!v, "selected", false);
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
            {/* {i18n.条自动化测试} */}
          </span>
          <div
            style={{
              "margin-left": "1em",
              display: "flex",
              "flex-direction": "row",
              cursor: "pointer",
            }}
            onclick={handleChangeFocusFail}
          >
            <span style={{ "margin-right": "0.25em" }}>{i18n.只显示失败}</span>
            <UxCheckbox
              style={{
                "flex-shrink": 0,
                width: "1.5em",
                height: "1.5em",
              }}
              value={focusFail()}
            ></UxCheckbox>
          </div>
          <div style={{ flex: 1 }} />
          <UxSolidIcon
            Icon={AiOutlineFileAdd}
            style={{
              width: "1.75em",
              height: "1.75em",
              cursor: "pointer",
            }}
            onclick={handleAddCode}
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
                width: "1.25em",
                height: "1.25em",
                cursor: "pointer",
              }}
              onclick={() => handleUseSelected()}
            />
            <Show when={handleMergeSelected}>
              <RiDevelopmentGitMergeFill
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  cursor: "pointer",
                }}
                onclick={() => handleMergeSelected()}
              />
            </Show>
          </div>
        </Show>
      </div>
      <Show when={!drafts.list.length && !focusFail()}>
        <div
          class="testflowy-fade-in"
          style={{
            display: "flex",
            "flex-direction": "row",
            "pointer-events": "none",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          />
          <ClickArrowSvg
            style={{
              "margin-right": "2.5em",
            }}
          />
        </div>
      </Show>
      <Switch>
        <Match when={loading()}>
          <LoadingSvg
            style={{
              opacity: 0.3,
              width: "5em",
              height: "5em",
              "margin-top": "2.5em",
              margin: "0 auto",
            }}
          />
        </Match>
        <Match when={!drafts.list.length}>
          <div
            style={{
              display: "flex",
              "flex-direction": "column",
              "align-items": "center",
              "justify-content": "center",
              "box-sizing": "border-box",
              "margin-top": "2.5em",
              "pointer-events": "none",
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
            <div
              style={{
                opacity: 0.4,
              }}
            >
              {i18n.未找到数据}
            </div>
          </div>
        </Match>
        <Match when={drafts.list.length}>
          <div
            class="testflowy-sdk-scroll"
            style={{
              flex: 1,
              "overflow-y": "auto",
              padding: "0 1em",
            }}
            onscroll={scroll.onscroll}
          >
            <For each={drafts.list}>
              {(item) => (
                <TaskItem
                  agent={sdkStorage.val.agent}
                  item={item}
                  setList={setDrafts}
                  handleUse={handleUse}
                  handleEdit={handleEdit}
                  handleUpdate={handleUpdate}
                  handleCopyCode={handleCopyCode}
                  handleDeleteCode={handleDeleteCode}
                  handleShareCloud={handleShareCloud}
                />
              )}
            </For>
            <Show when={end()}>
              <div
                style={{
                  opacity: 0.3,
                  "text-align": "center",
                  margin: "0 1em",
                }}
              >
                {i18n.没有更多了}
              </div>
            </Show>
          </div>
        </Match>
      </Switch>
    </div>
  );
}
