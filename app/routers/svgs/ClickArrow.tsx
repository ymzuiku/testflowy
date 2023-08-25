import { Component, JSX } from "solid-js";

export const ClickArrowSvg: Component<JSX.HTMLAttributes<HTMLDivElement>> = (p) => {
  return <div innerHTML={svg} {...p}></div>;
};

const svg = `
<svg width="83" height="70" viewBox="0 0 83 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M73.9983 2.69603C68.9901 9.99765 62.3961 16.6876 55.727 22.4788C51.6525 26.0169 47.2427 29.0366 43.421 32.8761C40.9066 35.4022 38.4646 38.0093 36.5624 41.0368C36.0951 41.7807 35.2637 42.6891 35.0944 43.5313" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M66.2474 2.90564C67.9146 3.50147 70.9085 2.59296 72.565 2.20348C73.8503 1.90128 74.438 1.81304 74.4419 3.2645C74.4452 4.47703 73.8289 5.57436 74.3084 6.74237C74.5947 7.43945 74.2408 11.2375 74.5087 11.89" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M12.1124 58.6421C9.25926 58.6458 6.31392 60.46 4.01837 61.9654C1.91282 63.3461 1.22602 63.3164 2.2666 65.5972C2.91581 67.0201 5.74133 68.0535 7.25466 67.8731C9.28854 67.6307 10.8578 66.9943 12.7846 66.2032" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M17.4192 55.1121C17.2747 57.059 18.5143 68.1746 20.3165 67.4346" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M27.0812 60.8738C27.2741 61.5203 27.2815 62.2487 27.3783 62.9138" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M26.1242 52.6189C26.3857 53.2558 26.5419 53.7254 27.0201 54.1428" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M37.3515 56.9273C35.4437 57.7106 30.9507 59.9153 32.4022 62.6076C33.4167 64.4892 35.969 63.4414 37.1692 62.407" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M44.5375 50.7341C44.398 53.2754 44.7142 55.5296 45.0422 58.0336C45.1499 58.8553 45.406 62.9752 46.1836 63.3001" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
<path d="M50.9375 55.1327C50.5862 55.8516 49.7098 56.2183 49.1938 56.8095C48.366 57.7579 46.2277 58.355 45.7569 59.4817C45.6324 59.7797 48.2069 60.1223 48.4304 60.2157C49.5101 60.6669 50.5796 61.355 51.6925 61.5788" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>

`;
