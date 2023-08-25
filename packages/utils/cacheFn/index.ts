// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = {} as any;
const space = "__|cacheFn|__";

// 缓存一个函数结果若干秒
export function cacheFn<T>(key: string, duration: number, fn: T): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((...args: any) => {
    const k = key + space + JSON.stringify(args);
    if (cache[k]) {
      return cache[k].value;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cache[k] = { value: (fn as any)(...args) };
    if (duration > 0) {
      setTimeout(() => {
        delete cache[k];
      }, duration);
    }
    return cache[k] ? cache[k].value : void 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

cacheFn.clear = (key: string) => {
  Object.keys(cache).forEach((k) => {
    if (k.split(space)[0] === key) {
      delete cache[k];
    }
  });
};

cacheFn.clearAll = () => {
  Object.keys(cache).forEach((k) => {
    delete cache[k];
  });
};
