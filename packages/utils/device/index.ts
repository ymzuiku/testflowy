/* eslint-disable @typescript-eslint/no-explicit-any */

let navigatorUserAgent: string;
const regIos = new RegExp("(iphone|ipod|ipad)");
const regAndroid = new RegExp("(android)");
const regSafari = new RegExp("(safari)");
const regWechat = new RegExp("(micromessenger)");

function userAgent(): string {
  if (navigatorUserAgent) {
    return navigatorUserAgent;
  }
  navigatorUserAgent = navigator.userAgent.toLocaleLowerCase();
  return navigatorUserAgent;
}

export function isSmall(): boolean {
  return window.innerWidth < 641;
}

export function isPhone(): boolean {
  return isAndroid() || isIOS();
}

export function isDesktopSafari(): boolean {
  return !isPhone() && isSafari();
}

export function isSafari(): boolean {
  return regSafari.test(userAgent());
}

export function isIOS(): boolean {
  return regIos.test(userAgent());
}

export function isAndroid(): boolean {
  return regAndroid.test(userAgent());
}

export function isWechat(): boolean {
  return regWechat.test(userAgent());
}

let isIOSWechatApp: boolean;

export function isIOSWechat(): boolean {
  if (isIOSWechatApp !== void 0) {
    isIOSWechatApp;
  }
  isIOSWechatApp = isIOS() && regWechat.test(userAgent());
  return isIOSWechatApp;
}

export function getIOSVersion() {
  if (!isIOS()) {
    return 999;
  }
  const theUa = userAgent().toLowerCase();
  const reg = /os [\d._]+/gi;
  const v_info = theUa.match(reg);
  const version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号9.3.2或者9.0
  return parseFloat(version);
}

// export const setKeyboardAutoHide = () => {
//   if (!isPhone()) {
//     return;
//   }

//   // 处理ios移动端键盘自动收起，并且回到页面滚动位置
//   let bodyScrollTop = 0;
//   let windowScrollTop = 0;
//   let keyboardFocusInput: any;
//   let keyboardTimer = null as any;
//   const bindBlurKeyboard = () => {
//     // 拦截重复focus输入框时，会 blur 立刻又 focus
//     keyboardTimer = setTimeout(() => {
//       if (keyboardFocusInput && keyboardFocusInput.blur) {
//         keyboardFocusInput.blur();
//       }
//     }, 50);
//   };
//   document.body.addEventListener("focusin", (e: any) => {
//     if (keyboardTimer) {
//       clearTimeout(keyboardTimer);
//       keyboardTimer = null;
//     }
//     // 软键盘弹起事件
//     keyboardFocusInput = e.target;
//     bodyScrollTop = document.body.scrollTop;
//     windowScrollTop = window.scrollY;

//     keyboardTimer = setTimeout(() => {
//       document.body.addEventListener("touchend", bindBlurKeyboard);
//     }, 50);
//   });
//   document.body.addEventListener("focusout", () => {
//     // 软键盘关闭事件
//     document.body.scrollTop = bodyScrollTop;
//     window.scrollTo(0, windowScrollTop);
//     keyboardFocusInput = false;
//     document.body.removeEventListener("touchend", bindBlurKeyboard);
//   });
// };
