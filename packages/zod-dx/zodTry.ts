import { zodErr } from "./zodErr";

// 模拟go的错误处理, 返回一个数组, 第一个值为 Promise 的返回值, 第二个为 Promise 的error, 这两个值同时只有一个存在
export const zodTry = async <T>(v: () => Promise<T>): Promise<[T?, Error?]> => {
  try {
    const out = await v();
    return [out, void 0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return [void 0, zodErr(err)];
  }
};
