import { createRoot, createSignal } from "solid-js";

const [iw, setIw] = createRoot(() => createSignal(0));
const [ih, setIh] = createRoot(() => createSignal(0));
export const isIwPhone = () => {
  return iw() < 640;
};
export { iw, ih };
const event = () => {
  setIw(window.innerWidth);
  setIh(window.innerHeight);
};
if (typeof window !== "undefined") {
  event();
  window.addEventListener("resize", event);
}
