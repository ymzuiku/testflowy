import { setAttrId } from "./setAttrId";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const testflowyKeyBind = (ele: any, key: string, value: unknown) => {
  ele["__testflowy_" + key] = value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const keyGet = (ele: any, key: string) => {
  return ele["__testflowy_" + key];
};

export const keyGetElement = (key: string, value: unknown) => {
  if (!value) {
    return null;
  }
  const eles = Array.from(document.body.querySelectorAll("*"));
  const ele = eles.find((ele) => {
    return (ele as unknown as Record<string, string>)["__testflowy_" + key] === value;
  });
  if (ele && ele.closest("[data-testflowy-ignore]")) {
    return null;
  }
  if (ele) {
    setAttrId(ele as HTMLElement);
  }
  return ele || null;
};
