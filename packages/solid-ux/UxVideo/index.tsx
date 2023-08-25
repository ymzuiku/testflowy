import { Component, JSX, onMount, splitProps } from "solid-js";
import { XgPlayer } from "./XgPlayer";
export interface UxVideoProps {
  src: string;
}

export const UxVideo: Component<JSX.HTMLAttributes<HTMLDivElement> & UxVideoProps> = (props) => {
  const id = Math.random().toString(36).substring(2);
  const [p, rest] = splitProps(props, ["src"]);
  onMount(async () => {
    const player = await XgPlayer();
    new player({
      id,
      url: p.src,
      playsinline: true,
      width: "100%",
      controls: true,
    });
  });
  return <div {...rest} id={id}></div>;
};
