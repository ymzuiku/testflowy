export const isDsplayNone = (ele: HTMLElement) => {
  const check = (target: HTMLElement): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isNone = target.style.display === "none" || target.style.opacity === "0";
    // console.log("111111", target, isNone);

    if (isNone) {
      return true;
    }
    if (target.parentElement) {
      return check(target.parentElement);
    }
    return false;
  };
  return check(ele);
};
