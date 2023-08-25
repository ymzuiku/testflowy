import { CgRemove } from "solid-icons/cg";
import { createSignal, For, onMount } from "solid-js";
import { solidMsg } from "solid-msg";
import { createMediaQuerySm } from "solid-ux/createMediaQuerySm";
import { UxAlert } from "solid-ux/UxAlert";
import { UxAvatar } from "solid-ux/UxAvatar";
import { UxButton } from "solid-ux/UxButton";
import { UxInput } from "solid-ux/UxInput";
import { UxNativeSelect } from "solid-ux/UxNativeSelect";
import { createPanelShow } from "solid-ux/UxPanel";
import { i18n } from "../../../i18n";
import { apis } from "../../_apis";
import { appStorage, getAuth } from "../../appStorage";
import { css } from "../../css";
import type { License } from "../license/_getLicense";
import type { TeamList } from "./_getTeamList";

const Line = () => {
  return (
    <div
      style={{
        margin: "1em 0 1em 10px",
        width: "calc(100% - 20px)",
        height: "1px",
        background: "var(--ux-gray-200)",
      }}
    ></div>
  );
};

const Item = (p: { email: string; kind: "agent" | "owner" | "admin" }) => {
  return (
    <div
      style={{
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        gap: "1em",
      }}
    >
      <UxAvatar size="2.5em" name={p.email} />
      <div>{p.email}</div>
    </div>
  );
};

export function TeamOwner() {
  const sm = createMediaQuerySm();
  const [license, setLicense] = createSignal<License[]>([]);
  const [addEmail, setAddEmail] = createSignal("");
  const [team, setTeam] = createSignal<TeamList>([]);
  const [show, setShow, onclose] = createPanelShow();
  const handleSendEmial = async () => {
    const res = await apis.login_invitation.sendInvitationEmail({
      email: addEmail(),
      auth: getAuth(),
      ownerEmail: appStorage.val.email,
    });
    if (res.ok) {
      solidMsg.dark(i18n.已发送邮件请该成员查收邮件并接受邀请, 2000);
    }
  };
  const fetchTeam = async () => {
    const res = await apis.app_team.getTeamList({
      ...getAuth(),
      limit: 10,
      offset: team().length,
    });
    setTeam([...team(), ...res.data]);
  };

  const fetchLicense = async () => {
    const res = await apis.app_license.getLicense(getAuth());
    setLicense(res.data);
  };

  const handleRemoveItem = async (item: TeamList[number]) => {
    const ok = await setShow();
    if (ok) {
      const res = await apis.app_team.deleteAgent({
        auth: getAuth(),
        agentId: item.id,
      });
      if (res.ok) {
        solidMsg.dark(i18n.操作成功, 500);
        setTeam([]);
        fetchTeam();
      }
    }
  };

  const handleSetLicense = async (agentId: string, licenseId: string) => {
    if (!licenseId) {
      const res = await apis.app_license.deleteLicenseUse({
        auth: getAuth(),
        agentId,
      });
      if (res.ok) {
        solidMsg.dark(i18n.操作成功, 500);
        fetchLicense();
      }
    } else {
      const res = await apis.app_license.setLicenseUse({
        auth: getAuth(),
        agentId,
        licenseId,
      });
      if (res.ok) {
        solidMsg.dark(i18n.操作成功, 500);
        fetchLicense();
      }
    }
  };
  const handleSetAgent = async (agentId: string, agent: string) => {
    const res = await apis.app_team.changeAgent({
      auth: getAuth(),
      agentId,
      agent: agent as "agent",
    });
    if (res.id) {
      solidMsg.dark(i18n.操作成功, 500);
      setTeam([]);
      fetchTeam();
    }
  };
  onMount(() => {
    fetchTeam();
    fetchLicense();
  });
  return (
    <div
      style={{
        padding: sm() ? "1em" : "0.5em",
        width: "100%",
        height: "100%",
        "box-sizing": "border-box",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <div
        style={{
          padding: "1em 0",
          "font-size": "var(--ux-text-4xl)",
          "font-weight": "bold",
        }}
      >
        {i18n.管理成员}
      </div>
      <UxAlert ok="ok" cancel="cancel" show={show()} onclose={onclose}>
        <div
          style={{
            padding: "1.5em",
            "text-align": "center",
          }}
        >
          {i18n.是否移除成员}
        </div>
      </UxAlert>

      <Item email={appStorage.val.email} kind="owner" />
      <Line />
      <div
        style={{
          display: "flex",
          "flex-direction": "row",
          "align-items": "center",
          gap: "0.5em",
          "margin-top": "0.5em",
        }}
      >
        <CgRemove
          style={{
            opacity: 0,
            width: "1.5em",
            height: "1.5em",
          }}
        />
        <UxInput
          label={i18n.成员邮箱}
          value={addEmail()}
          oninput={(e) => setAddEmail(e.currentTarget.value)}
          style={{
            ...css.inputOutline,
            height: "3em",
          }}
          focusStyle={css.inputOutlineFocus}
        />
        <UxButton
          style={{
            ...css.button,
            height: "3em",
            width: "8em",
          }}
          onclick={handleSendEmial}
        >
          {i18n.添加成员}
        </UxButton>
      </div>
      <Line />

      <For each={team()}>
        {(item) => {
          return (
            <div
              style={{
                display: "flex",
                "flex-direction": "row",
                "align-items": "center",
                gap: "0.5em",
                "margin-top": "0.5em",
              }}
            >
              <CgRemove
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  color: "var(--ux-gray-500)",
                  ...(item.id === appStorage.val.uid
                    ? {
                        opacity: 0,
                        "pointer-events": "none",
                      }
                    : {}),
                }}
                onclick={() => {
                  handleRemoveItem(item);
                }}
              />
              <UxInput
                // label={i18n.成员邮箱}
                disabled
                value={item.email}
                oninput={(e) => setAddEmail(e.currentTarget.value)}
                style={css.inputOutline}
                focusStyle={css.inputOutlineFocus}
              />

              <UxNativeSelect
                style={{
                  ...css.inputOutline,
                }}
                defaultItem={{ label: i18n.未设定License, value: "" }}
                value={license().find((v) => v.useUid === item.id)?.id || ""}
                each={license().map((v) => {
                  const used = !v.useUid || /^__/.test(v.useUid) ? " (not used)" : "";
                  return { value: v.id, label: "LIcense-" + v.id + used };
                })}
                onchange={(e) => {
                  handleSetLicense(item.id, e.currentTarget.value);
                }}
              ></UxNativeSelect>
              <div
                style={{
                  ...css.inputOutline,
                  width: "7em",
                  display: "flex",
                  "flex-direction": "row",
                  "align-items": "center",
                  "justify-content": "center",
                }}
              >
                <UxNativeSelect
                  value={item.id === appStorage.val.uid ? "owner" : item.agent}
                  disabled={item.id === appStorage.val.uid}
                  each={
                    item.id === appStorage.val.uid
                      ? [{ value: "owner", label: "owner" }]
                      : [
                          { value: "admin", label: "admin" },
                          { value: "agent", label: "agent" },
                        ]
                  }
                  onchange={(e) => {
                    const value = e.currentTarget.value;
                    handleSetAgent(item.id, value);
                  }}
                ></UxNativeSelect>
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
}
