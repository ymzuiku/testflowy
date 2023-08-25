import { Component, createSignal, JSX, onCleanup, onMount, splitProps } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GradientFn: any;
export const Gradient: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "style" | "children" | "ref"> & { children?: JSX.Element }
> = (props) => {
  const [p, rest] = splitProps(props, ["children"]);
  if (!GradientFn) {
    const sty = document.createElement("style");
    sty.innerHTML = `
        #gradient-canvas {
            --gradient-color-1: #6ec3f4;
            --gradient-color-2: #3a3aff;
            --gradient-color-3: #ff61ab;
            --gradient-color-4: #E63946;
        }
    `;
    document.head.append(sty);
    const script = document.createElement("script");
    script.onload = function () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      GradientFn = (window as any).Gradient;
      const gradient = new GradientFn();
      gradient.initGradient("#gradient-canvas");
    };
    script.src = "/js/Gradient.js";
    document.head.append(script);
  }
  const [w, setW] = createSignal(0);
  // const [h, setH] = createSignal(0);
  let box: HTMLDivElement;
  const resize = () => {
    setW(box.clientWidth);
    // setH(box.clientHeight);
  };
  onMount(() => {
    resize();
    window.addEventListener("resize", resize);
  });
  onCleanup(() => {
    window.removeEventListener("resize", resize);
  });

  return (
    <div ref={(r) => (box = r)} style={{ width: "100%", height: "600px" }} {...rest}>
      <canvas id="gradient-canvas"></canvas>
      <div style={{ width: w() + "px", height: "600px", position: "absolute", left: 0, top: 0, overflow: "hidden" }}>
        {p.children}
      </div>
    </div>
  );
};
