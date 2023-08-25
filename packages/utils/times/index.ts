/* eslint-disable @typescript-eslint/no-explicit-any */
// 截流函数：调用户在限时内执行1次，限时内再次调用，判断时间，所以它在每个时间段内执行1次
export function throttle(fn: any, delay = 1000) {
  let prev = Date.now();
  return (...args: any[]) => {
    const now = Date.now();
    if (now - prev >= delay) {
      fn(...args);
      prev = now;
    }
  };
}

// 防抖函数：调用后在一定时间内函数不执行，过了时间限时执行，在限时内再次调用会重新开启定时器
export function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: any, args: any, timestamp: any, result: any;
  if (null == wait) wait = 100;

  function later() {
    const last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func(...args);
      }
    }
  }

  const debounced = (...theArgs: any[]) => {
    args = theArgs;
    // eslint-disable-next-line prefer-rest-params
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func(...args);
    }

    return result;
  };

  return debounced;
}

// 永远只执行一次
export function runOnce(fn: any) {
  let lock = false;
  return (...args: any[]) => {
    if (lock) {
      return;
    }
    lock = true;
    fn(...args);
  };
}

export function throttleArgs(fn: any, delay = 1000) {
  const cache = {} as Record<string, number>;
  return (...args: any[]) => {
    const keys = args.join(",");
    let prev = cache[keys];
    if (!prev) {
      prev = 0;
      cache[keys] = prev;
    }
    const now = Date.now();
    if (now - prev >= delay) {
      fn(...args);
      cache[keys] = now;
    }
  };
}

const throttleArgsWithKeyCache = {} as Record<string, number>;
export function throttleArgsWithKey(key: string, fn: any, delay = 1000) {
  return (...args: any[]) => {
    const keys = args.join(",");
    let prev = throttleArgsWithKeyCache[keys];
    if (!prev) {
      prev = 0;
      throttleArgsWithKeyCache[keys] = prev;
    }
    const now = Date.now();
    if (now - prev >= delay) {
      fn(...args);
      throttleArgsWithKeyCache[keys] = now;
    }
  };
}

// const testThrottleArgs = () => {
//   const fn = throttleArgs((a: string) => {
//   });

//   fn("20");
//   fn("20");
//   fn("30");
//   fn("30");

//   setTimeout(() => {
//     fn("20");
//     fn("20");
//     fn("30");
//     fn("30");
//   }, 500);

//   setTimeout(() => {
//     fn("20");
//     fn("20");
//     fn("30");
//     fn("30");
//   }, 1500);
// };

// testThrottleArgs();
