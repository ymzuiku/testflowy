export async function waitGet<T>(fn: () => Promise<T> | T, timeout: number): Promise<T> {
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
