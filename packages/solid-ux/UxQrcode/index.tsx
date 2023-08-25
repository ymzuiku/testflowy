import { toCanvas } from "qrcode";
import { mergeProps, onMount } from "solid-js";

export interface QRCodeProps {
  url: string;
  width?: number;
}

export function UxQRCode(props: QRCodeProps) {
  const p = mergeProps({ width: 240 }, props);
  let ref: HTMLCanvasElement;
  onMount(() => {
    if (ref) {
      toCanvas(
        ref,
        p.url,
        {
          width: p.width,
          margin: 2,
        },
        () => {},
      );
    }
  });
  return <canvas ref={(r) => (ref = r)} width="100%" height="100%"></canvas>;
}
