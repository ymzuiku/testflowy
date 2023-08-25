import ".";
import { actions } from "./actions";
import "./replay";

export async function keyboard() {
  window.addEventListener("keydown", async (e) => {
    // if (e.target !== document.body) {
    //   return;
    // }
    if (e.key === "F1") {
      actions.hidden();
      return;
    }
    if (e.key === "F5") {
      actions.hidden();
      return;
    }
    if (!e.ctrlKey && !e.metaKey) {
      return;
    }
  });
}
