import { arrayToMap } from "utils/arrayToMap";
import { hiddenSomeStrs } from "utils/strs";

export function rowToCell<T>(row: unknown, returnColumns?: unknown[], sensitive?: unknown[]): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const j = (row as any).j;

  if (returnColumns) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = {} as any;
    const sensMap = arrayToMap(sensitive);
    for (const key of returnColumns) {
      let v = j[key as string];
      if (typeof v === "string" && sensMap[key as string]) {
        v = hiddenSomeStrs(v) as never;
      }
      (item as never as Record<string, unknown>)[key as string] = v;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item.id = (row as any).id;
    item.createAt = j.createAt;
    item.updateAt = j.updateAt;
    return item;
  } else if (sensitive) {
    const item = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: (row as any).id,
      ...j,
    };
    for (const key of sensitive) {
      const v = item[key as string];
      if (typeof v === "string") {
        item[key as string] = hiddenSomeStrs(v);
      }
    }
    return item;
  }

  const item = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: (row as any).id,
    ...j,
  };

  return item;
}
