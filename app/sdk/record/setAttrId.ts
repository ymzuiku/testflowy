import { sdkStorage } from "./data";
import { keyGet, testflowyKeyBind } from "./keyHelper";

const getElementImmu = (ele: HTMLElement) => {
  if (!ele) {
    return "";
  }
  let text = "tag=" + ele.tagName;
  if (ele.tagName === "svg" && ele.parentElement) {
    text += getElementImmu(ele.parentElement);
    if (ele.parentElement.tagName === "I" && ele.parentElement.parentElement) {
      text += getElementImmu(ele.parentElement.parentElement);
    }
  }
  if ((ele as HTMLInputElement).name) {
    text += "name=" + ((ele as HTMLInputElement).name || "");
  }
  if ((ele as HTMLInputElement).type) {
    text += "type=" + ((ele as HTMLInputElement).type || "");
  }
  if ((ele as HTMLInputElement).title) {
    text += "title=" + ((ele as HTMLInputElement).title || "");
  }
  if (ele.getAttribute("role")) {
    text += "role=" + (ele.getAttribute("role") || "");
  }
  if (ele.getAttribute("data-role")) {
    text += "data-role=" + (ele.getAttribute("data-role") || "");
  }
  if ((ele as HTMLInputElement).alt) {
    text += "alt=" + ((ele as HTMLInputElement).alt || "");
  }
  if (ele.getAttribute("href")) {
    text += "href=" + (ele.getAttribute("href") || "");
  }
  if (ele.getAttribute("src")) {
    text += "src=" + (ele.getAttribute("src") || "");
  }

  return text;
};

function getElementId(ele: Element): string {
  if (ele.getAttribute("data-testid")) {
    return `[data-testid=${ele.getAttribute("data-testid")}]`;
  } else if (ele.id) {
    return `[id=${ele.id}]`;
  }
  return "";
}

function parseTestflowyId2(ele: HTMLElement) {
  let prefix = "";
  let text = "";
  text += "text=" + ele.textContent || "";
  // 如果文本太长, 前后截取一部分
  if (text.length > 50) {
    text = text.slice(0, 25) + text.slice(text.length - 25, text.length - 1);
  }
  if (ele.className) {
    text += "css=" + String(ele.className);
  }

  // 记录多级别的父类基本属性
  let p: HTMLElement | null = ele;
  for (let i = 0; i < 10; i++) {
    if (!p || p === document.body) {
      break;
    }
    text += "___" + i + getElementImmu(p) + i + "___";
    // 定位元素在第几个
    if (p.parentElement) {
      const index = Array.prototype.indexOf.call(p.parentElement.childNodes, p);
      text += index;
    }

    // 如果父元素有 id 属性, 直接使用父元素的ID为做拦截点, 不继续向上查询
    const pid = getElementId(p);
    if (pid) {
      text += "!pid!" + pid;
      prefix = pid + ":";
      break;
    }
    p = p.parentElement!;
  }
  p = null;

  // ele.setAttribute("data-testflowy-temp", text);
  if (!text) {
    return prefix;
  }
  // return prefix + SHA256(text).toString().slice(0, 13);
  return prefix + "___" + text;
}

function parseTestflowyId3(ele: HTMLElement) {
  let text = "";
  text += "text=" + ele.textContent || "";
  // 如果文本太长, 前后截取一部分
  if (text.length > 50) {
    text = text.slice(0, 25) + text.slice(text.length - 25, text.length - 1);
  }
  if (ele.className) {
    text += "css=" + String(ele.className);
  }
  if (ele.tagName === "svg") {
    text += "svg-inner=" + ele.innerHTML;
  }

  text += "tag=" + ele.tagName;
  if ((ele as HTMLInputElement).title) {
    text += "title=" + ((ele as HTMLInputElement).title || "");
  }
  if (ele.getAttribute("role")) {
    text += "role=" + (ele.getAttribute("role") || "");
  }
  if (ele.getAttribute("data-role")) {
    text += "data-role=" + (ele.getAttribute("data-role") || "");
  }
  if (ele.getAttribute("name")) {
    text += "name=" + ele.getAttribute("name");
  }
  if (ele.getAttribute("src")) {
    text += "src=" + ele.getAttribute("src");
  }
  if (ele.getAttribute("href")) {
    text += "href=" + ele.getAttribute("href");
  }
  if (ele.getAttribute("alt")) {
    text += "alt=" + ele.getAttribute("alt");
  }

  // return SHA256(text).toString().slice(0, 13);
  return text;
}

export function setAttrId(ele: HTMLElement) {
  if (!ele || sdkStorage.val.isHidden) {
    return;
  }
  if (ele.closest("[data-testflowy-ignore]")) {
    return;
  }

  if (keyGet(ele, "testflowy-id") || keyGet(ele, "testflowy-id2")) {
    return;
  }

  const id = getElementId(ele);
  if (id) {
    testflowyKeyBind(ele, "testflowy-id", "*" + id);
  }
  testflowyKeyBind(ele, "testflowy-id2", parseTestflowyId2(ele));
  testflowyKeyBind(ele, "testflowy-id3", parseTestflowyId3(ele));
  if (ele.role) {
    testflowyKeyBind(ele, "testflowy-role", ele.role);
  }
}
