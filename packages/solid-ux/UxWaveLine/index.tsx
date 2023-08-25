import { Component, JSX, splitProps } from "solid-js";

export const waveSvgTop = (h: string) => `
<svg width="100%" preserveAspectRatio="none" height="${h}" viewBox="0 0 1807 59" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; vertical-align: middle;">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1807 1.88585V59H0V0.772077C59.3092 -0.524554 111.609 0.0882387 157.033 0.620465C178.756 0.874982 198.907 1.11107 217.5 1.11107C242.837 1.11107 268.787 3.3911 295.609 5.74766H295.611C332.834 9.01805 371.735 12.4359 413 10.1111C484 6.11107 575.5 1.11107 614.5 1.11107C634.888 1.11107 659.922 3.57066 683.816 5.91832C705.628 8.06138 726.49 10.1111 742 10.1111C757.669 10.1111 794.49 8.01915 832.627 5.8524C873.594 3.52488 916.08 1.11107 935.5 1.11107C951.124 1.11107 975.689 2.67357 1004.35 4.49644H1004.35C1044.48 7.04857 1092.62 10.1111 1135.5 10.1111C1168.08 10.1111 1200.27 8.34251 1228.97 6.76548L1228.98 6.76512H1228.98C1265.03 4.78453 1295.57 3.10594 1314.5 5.61107C1348.5 10.1111 1512.5 14.6111 1543 10.1111C1566.25 6.6804 1674.66 4.12144 1746.13 2.43443L1746.14 2.43406C1768.41 1.90843 1787.1 1.46739 1798.5 1.11107C1801.73 1.01011 1804.55 1.28611 1807 1.88585Z" fill="currentColor"/>
</svg>

`;

export const waveSvgBottom = (h: string) => `
<svg width="100%" preserveAspectRatio="none" height="${h}" viewBox="0 0 1807 68" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; vertical-align: middle;">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1807 66.6896V0H0L0 66.3994C16.6373 65.9596 41.059 65.8095 67.3837 65.6478C120.798 65.3198 182.048 64.9437 202 61.9999C232.5 57.4999 380.729 61.7864 415 63.1145C484.728 65.8167 579.637 62.5364 603.621 60.3746C619.578 58.9364 635.517 57.4999 664.881 57.4999C707.756 57.4999 740.633 60.5624 768.031 63.1145L768.033 63.1147C787.602 64.9375 835.875 66.4999 851.5 66.4999C870.92 66.4999 893.943 64.0861 946.516 61.7585C995.459 59.5918 1042.71 57.4999 1058.38 57.4999C1073.89 57.4999 1116.53 59.5496 1161.11 61.6926C1209.95 64.0403 1261.11 66.4999 1281.5 66.4999C1300.65 66.4999 1309.4 65.2949 1321.75 63.5948C1334.56 61.8318 1369.85 59.5363 1406 57.4999C1448.55 55.1027 1489.59 58.8113 1543.58 62.1682C1579.68 64.4127 1613.26 66.4999 1637.5 66.4999C1657.84 66.4999 1673.87 66.7825 1689.77 67.0626C1719.88 67.5935 1749.5 68.1155 1807 66.6896Z" fill="currentColor"/>
</svg>
`;

export const UxWaveLine: Component<
  Omit<JSX.HTMLAttributes<HTMLDivElement>, "children"> & { bottom?: boolean; height?: string }
> = (props) => {
  const [p, rest] = splitProps(props, ["style", "bottom", "height"]);
  return (
    <div
      style={{
        width: "100%",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        ...(p.style as JSX.CSSProperties),
      }}
      {...rest}
    >
      <div
        style={{
          color: "currentColor",
          width: "100%",
          transform: `scale(1.1)`,
          "vertical-align": "middle",
          "box-sizing": "border-box",
          border: "none",
        }}
        innerHTML={p.bottom ? waveSvgBottom(p.height || "2vw") : waveSvgTop(p.height || "2vw")}
      ></div>
    </div>
  );
};
