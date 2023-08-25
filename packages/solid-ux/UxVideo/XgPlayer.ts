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

const cache = {
  loaded: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  player: null as unknown as any,
};
export const XgPlayer = () => {
  if (!cache.loaded) {
    cache.loaded = true;

    const script = document.createElement("script");
    script.src = "//unpkg.byted-static.com/xgplayer/2.31.2/browser/index.js";
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cache.player = (window as any).Player;
    };
    document.body.appendChild(script);
  }
  return waitGet(() => cache.player, 10000);
};
