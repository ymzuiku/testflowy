import { BiSolidCopy, BiSolidEdit } from "solid-icons/bi";
import { FaSolidCloudArrowDown, FaSolidCloudArrowUp, FaSolidPlay } from "solid-icons/fa";
import { RiSystemDeleteBin4Fill } from "solid-icons/ri";
import { VsLockSmall } from "solid-icons/vs";
import { Show } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { UxCheckbox } from "solid-ux/UxCheckbox";
import { UxSolidIcon } from "solid-ux/UxSolidIcon";
import { timeLabelDay } from "utils/strs";
import type { DraftListItem } from "../../task/draft/_getDrafts";

export interface TaskItemProps {
  agent: string;
  item: DraftListItem;
  setList: SetStoreFunction<{
    list: DraftListItem[];
  }>;
  fullPage?: boolean;
  handleUpdate: (name: string, item: DraftListItem) => Promise<number>;
  handleUse: (item: DraftListItem) => void;
  handleEdit?: (item: DraftListItem) => void;
  handleCopyCode?: (item: DraftListItem) => void;
  handleDeleteCode: (item: DraftListItem) => void;
  handleShareCloud?: (item: DraftListItem) => void;
  handleCopyToSelf?: (item: DraftListItem) => void;
}

export const TaskItem = (p: TaskItemProps) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        gap: "1em",
        padding: "0.75em 0",
        overflow: "hidden",
      }}
    >
      <UxCheckbox
        style={{
          "flex-shrink": 0,
          width: "1.5em",
          height: "1.5em",
        }}
        value={!!p.item.selected}
        onclick={() => {
          p.setList("list", (v) => v.id === p.item.id, "selected", !p.item.selected);
        }}
      />

      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
            "font-size": "var(--ux-text-lg)",
            color: "var(--ux-gray-900)",
            outline: "none",
            border: "none",
            display: p.item.edited ? "none" : "block",
          }}
        >
          {p.item.editName === void 0 ? p.item.name : p.item.editName}
        </div>

        <div
          style={{
            "flex-shrink": 0,
            "font-size": "var(--ux-text-sm)",
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            gap: "0.75em",
          }}
        >
          <span
            style={{
              color: p.item.pass ? "var(--ux-green-500)" : "var(--ux-red-500",
            }}
          >
            {p.item.pass ? "Pass" : "Fail"}
          </span>
          <span style={{ opacity: 0.5 }}>Steps: {p.item.steps}</span>
          <span style={{ opacity: 0.5 }}>{timeLabelDay(p.item.updateAt)}</span>
          <Show when={p.item.crypto}>
            <UxSolidIcon
              Icon={VsLockSmall}
              style={{
                width: "1em",
                height: "1em",
                "margin-bottom": "0.25em",
                opacity: 0.5,
              }}
            />
          </Show>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          gap: p.fullPage ? "2em" : "0.5em",
        }}
      >
        <FaSolidPlay
          style={{
            width: "1.25em",
            height: "1.25em",
            cursor: "pointer",
            "flex-grow": 0,
          }}
          onclick={() => p.handleUse(p.item)}
        />
        {p.handleEdit && (
          <BiSolidEdit
            style={{
              width: "1.5em",
              height: "1.5em",
              cursor: "pointer",
            }}
            onclick={() => p.handleEdit!(p.item)}
          />
        )}
        {p.handleCopyCode && (
          <BiSolidCopy
            style={{
              width: "1.5em",
              height: "1.5em",
              cursor: "pointer",
              "flex-grow": 0,
            }}
            onclick={() => p.handleCopyCode!(p.item)}
          />
        )}
        {p.handleCopyToSelf && (
          <FaSolidCloudArrowDown
            style={{
              width: "1.75em",
              height: "1.75em",
              cursor: "pointer",
              "flex-grow": 0,
            }}
            onclick={() => p.handleCopyToSelf!(p.item)}
          />
        )}
        {p.handleShareCloud && (
          <FaSolidCloudArrowUp
            style={{
              width: "1.75em",
              height: "1.75em",
              cursor: "pointer",
              "flex-grow": 0,
            }}
            onclick={() => p.handleShareCloud!(p.item)}
          />
        )}
        <Show when={p.agent !== "agent"}>
          <RiSystemDeleteBin4Fill
            style={{
              width: "1.5em",
              height: "1.5em",
              cursor: "pointer",
              "flex-grow": 0,
            }}
            onclick={() => p.handleDeleteCode(p.item)}
          />
        </Show>
      </div>
    </div>
  );
};
