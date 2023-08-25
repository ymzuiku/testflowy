/* eslint-disable @typescript-eslint/no-explicit-any */
export const themeConfig = {
  key: "theme",
  baseTheme: "light",
};

export const isDark = () => {
  return getTheme() === "dark";
};

export const getTheme = () => {
  return localStorage.getItem(themeConfig.key) || themeConfig.baseTheme;
};

const colorList = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const toRank = (n: number, rank?: number): string => {
  // if (rank === void 0) {
  //   return colorList[Math.abs(9 - n)];
  // }
  if (!rank) {
    return colorList[n];
  }
  let i = n + rank > 9 ? 9 : n + rank;
  i = i < 0 ? 0 : i;
  return colorList[i];
};

export function toDeepGray(gray: any) {
  const out = { ...gray };
  if (isDark()) {
    out["50"] = "#000";
    out["900"] = "#fff";
  } else {
    out["50"] = "#fff";
    out["900"] = "#000";
  }
  return out;
}
export function toDeepDark(gray: any) {
  const out = { ...gray };
  out["50"] = "#000";
  out["900"] = "#fff";
  return out;
}

export function toDeepLight(gray: any) {
  const out = { ...gray };
  out["50"] = "#fff";
  out["900"] = "#000";
  return out;
}
export function toDark(items: any, deviation?: number) {
  const out = {
    50: items[toRank(9, deviation)],
    100: items[toRank(8, deviation)],
    200: items[toRank(7, deviation)],
    300: items[toRank(6, deviation)],
    400: items[toRank(5, deviation)],
    500: items[toRank(4, deviation)],
    600: items[toRank(3, deviation)],
    700: items[toRank(2, deviation)],
    800: items[toRank(1, deviation)],
    900: items[toRank(0, deviation)],
  };
  return out;
}

export function autoColor(items: any, deviation?: number, deep?: boolean) {
  if (isDark()) {
    if (deep) {
      return toDeepDark(toDark(items, deviation));
    }
    return toDark(items, deviation);
  }
  if (deep) {
    return toDeepLight(toDark(items, deviation));
  }
  return items;
}

export function setTheme(type: "light" | "dark", reload?: boolean) {
  if (localStorage.getItem(themeConfig.key) !== type) {
    localStorage.setItem(themeConfig.key, type);
    if (reload) {
      setTimeout(() => {
        location.reload();
      });
    }
  }
}
