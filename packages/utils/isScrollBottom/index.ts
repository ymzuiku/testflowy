export function isScrollBottom(ele: Element) {
  return ele.scrollHeight - ele.scrollTop === ele.clientHeight;
}

export function scrollTopOpacity(ele: Element, max = 100) {
  let a = (ele.scrollTop - 50) / max;
  if (a > 1) {
    a = 1;
  } else if (a < 0) {
    a = 0;
  }
  return a;
}
