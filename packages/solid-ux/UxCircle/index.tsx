import { Component, JSX } from "solid-js";
const sty = document.createElement("style");
sty.innerHTML = `
.ux-circle svg {
    transform: rotate(-0.05deg);
}
.ux-circle circle {
    transition: stroke-dasharray .2s;
}
`;
document.head.appendChild(sty);

export interface UxCircleProps {
  background?: string;
  color?: string;
  value?: number;
  width?: number;
}

export const UxCircle: Component<Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & UxCircleProps> = (p) => {
  return (
    <div id="timeCountX" style={p.style} class={["ux-circle", p.class].join(" ")}>
      <svg width="100%" height="100%" viewBox="0 0 440 440">
        <g transform="matrix(0,-1,1,0,0,440)">
          <circle
            cx="220"
            cy="220"
            r="170"
            stroke-width={p.width || 50}
            stroke={p.background || "rgba(0,0,0,0)"}
            fill="none"
            stroke-dasharray="1069 1069"
          ></circle>
          <circle
            cx="220"
            cy="220"
            r="170"
            stroke-width={p.width || 50}
            stroke={p.color || "rgba(128,128,128,1)"}
            fill="none"
            stroke-dasharray={`${(p.value || 0) * 1069} 1069`}
          ></circle>
        </g>
      </svg>
    </div>
  );
};
