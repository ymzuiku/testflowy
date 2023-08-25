export function arrayToMap(list?: unknown[]): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (list) {
    for (const key of list) {
      out[key as string] = true;
    }
  }
  return out;
}
