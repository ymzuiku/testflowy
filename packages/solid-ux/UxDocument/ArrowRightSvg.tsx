import { Component, JSX } from "solid-js";

export const ArrowRightSvg: Component<JSX.HTMLAttributes<HTMLDivElement>> = (p) => {
  return <div innerHTML={svg} {...p}></div>;
};

export const svg = `<svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg>`;
