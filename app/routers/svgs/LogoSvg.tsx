import { Component, JSX } from "solid-js";

export const LogoSvg: Component<JSX.HTMLAttributes<HTMLDivElement>> = (p) => {
  return <div innerHTML={svg} {...p}></div>;
};

const svg = `<svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M61.6181 148.297C58.8338 146.177 57.0384 142.808 54.1366 140.852L21.1667 118.625C17.5011 116.153 14.9678 112.326 14.1239 107.986C13.28 103.646 14.1946 99.1489 16.6667 95.4834C19.1387 91.8178 22.9656 89.2845 27.3055 88.4406C31.6454 87.5967 36.1428 88.5113 39.8083 90.9834L58.3333 103.483V66.6667C58.3333 60.1006 59.6266 53.5988 62.1394 47.5325C64.6521 41.4662 68.3351 35.9543 72.978 31.3113C77.6209 26.6684 83.1329 22.9854 89.1992 20.4727C95.2654 17.96 101.767 16.6667 108.333 16.6667C114.899 16.6667 121.401 17.96 127.467 20.4727C133.534 22.9854 139.046 26.6684 143.689 31.3113C148.332 35.9543 152.015 41.4662 154.527 47.5325C157.04 53.5988 158.333 60.1006 158.333 66.6667V141.667C158.333 143.877 157.455 145.996 155.893 147.559C154.33 149.122 152.21 150 150 150H66.6667C64.8428 150 63.0693 149.402 61.6181 148.297V148.297Z" fill="currentColor"/>
<path opacity="0.5" d="M58.3333 166.667H158.333C163.889 166.667 166.667 169.444 166.667 175C166.667 180.556 163.889 183.333 158.333 183.333H58.3333C52.7778 183.333 50 180.556 50 175C50 169.444 52.7778 166.667 58.3333 166.667V166.667Z" fill="currentColor"/>
</svg>
`;