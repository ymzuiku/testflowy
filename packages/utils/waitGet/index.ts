export function waitGet<T>(fn: () => T, timeout = 300): Promise<T | undefined> {
  return new Promise((res) => {
    const t = Date.now();
    const getFn = () => {
      const ele = fn();
      if (ele) {
        res(ele);
        return;
      }
      if (Date.now() - t < timeout) {
        requestAnimationFrame(() => {
          getFn();
        });
        return;
      }
      res(void 0);
    };
    getFn();
  });
}
