import { Component, createSignal, JSX, splitProps } from "solid-js";

export interface UxSvgProps {
  src: string;
}

// eslint-disable-next-line
const cache: Record<string, string> = {};
export const UxSvg: Component<JSX.HTMLAttributes<HTMLDivElement> & UxSvgProps> = (props) => {
  const [src, setSrc] = createSignal("");
  const [p, rest] = splitProps(props, ["src"]);
  if (p.src.indexOf("http") === 0 || p.src[0] === "/") {
    if (!cache[p.src]) {
      cache[p.src] = "loading";
      fetch(p.src)
        .then((v) => {
          return v.text();
        })
        .then((v) => {
          cache[p.src] = v;
        })
        .catch(() => {
          cache[p.src] = "1";
        });
    }
    waitGet(() => {
      if (cache[p.src] === "loading") {
        return void 0;
      }
      return cache[p.src];
    }, 2000).then((v) => {
      setSrc(v || "");
    });
  } else {
    setSrc(p.src);
  }
  return <div innerHTML={src()} {...rest}></div>;
};

async function waitGet<T>(fn: () => Promise<T> | T, timeout: number): Promise<T> {
  return new Promise((res, rej) => {
    let isTimeout = false;
    const timer = setTimeout(() => {
      isTimeout = true;
      rej(null);
    }, timeout);
    const load = () => {
      if (isTimeout) {
        return;
      }
      Promise.resolve(fn()).then((v) => {
        if (isTimeout) {
          return;
        }
        if (v === void 0 || v === null) {
          requestAnimationFrame(load);
        } else {
          clearTimeout(timer);
          res(v);
        }
      });
    };
    load();
  });
}
