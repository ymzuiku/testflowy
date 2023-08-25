import { createSignal, For, onMount } from "solid-js";
import { timeLabel } from "utils/strs";
import { getAuth } from "../../appStorage";
import { apis } from "../../_apis";
import { AdminMenuLayout } from "../AdminMenuLayout";
import type { GetAccounts } from "./_getAccounts";

export default function Accounts() {
  const [list, setList] = createSignal<GetAccounts["data"]>([]);
  const [total, setTotal] = createSignal(0);
  onMount(async () => {
    const res = await apis.admin_accounts.getAccounts({ auth: getAuth(), limit: 50, offset: 0 });
    setTotal(res.total);
    setList(res.data);
  });
  return (
    <AdminMenuLayout>
      <div style={{ "overflow-y": "auto" }}>
        <h1>Total: {total()}</h1>
        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "align-items": "center",
            background: "var(--ux-gray-100)",
            padding: "1em 0",
          }}
        >
          <div style={{ flex: 1 }}>Email</div>
          <div style={{ flex: 1 }}>CreateAt</div>
        </div>
        <For each={list()}>
          {(item) => {
            return (
              <div
                style={{
                  display: "flex",
                  "flex-direction": "row",
                  "align-items": "center",
                }}
              >
                <div style={{ flex: 1 }}>{item.email}</div>
                <div style={{ flex: 1 }}>{timeLabel(item.createAt)}</div>
              </div>
            );
          }}
        </For>
      </div>
    </AdminMenuLayout>
  );
}
