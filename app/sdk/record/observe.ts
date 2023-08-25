import { sdkStorage } from "./data";
import { setAttrId } from "./setAttrId";

const types: Record<string, boolean> = {
  childList: true,
  subtree: true,
};

export function observe() {
  if (sdkStorage.val.isHidden) {
    return;
  }
  setSubtreeAttr(document.body);
  const ob = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (types[mutation.type]) {
        const ele = mutation.target as HTMLElement;
        setSubtreeAttr(ele);
      }
    }
  });

  ob.observe(document.body || document, { childList: true, subtree: true });
}

export function setSubtreeAttr(parent: HTMLElement) {
  setAttrId(parent);
  parent.querySelectorAll("*").forEach(setAttrId as (v: Node) => void);
}
