// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeFn(fn: any) {
  try {
    return fn();
  } catch (err) {
    return void 0;
  }
}
