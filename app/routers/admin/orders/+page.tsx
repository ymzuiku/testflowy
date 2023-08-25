import { createSignal, For, onMount } from "solid-js";
import { timeLabel } from "utils/strs";
import { getAuth } from "../../appStorage";
import { apis } from "../../_apis";
import { AdminMenuLayout } from "../AdminMenuLayout";
import type { GetOrders } from "./_getOrders";

export default function Orders() {
  const [list, setList] = createSignal<GetOrders["data"]>([]);
  const [total, setTotal] = createSignal(0);
  onMount(async () => {
    const res = await apis.admin_orders.getOrders({ auth: getAuth(), limit: 50, offset: 0 });
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
          <div style={{ flex: 1 }}>uid</div>
          <div style={{ flex: 1 }}>CreateAt</div>
          <div style={{ flex: 1 }}>Dollars</div>
          <div style={{ flex: 1 }}>Price</div>
          <div style={{ flex: 1 }}>Desc</div>
          <div style={{ flex: 1 }}>Channel</div>
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
                <div style={{ flex: 1 }}>{item.uid}</div>
                <div style={{ flex: 1 }}>{timeLabel(item.createAt)}</div>
                <div style={{ flex: 1 }}>{item.dollars}</div>
                <div style={{ flex: 1 }}>{item.price}</div>
                <div style={{ flex: 1 }}>{item.desc}</div>
                <div style={{ flex: 1 }}>{item.channel}</div>
              </div>
            );
          }}
        </For>
      </div>
    </AdminMenuLayout>
  );
}
