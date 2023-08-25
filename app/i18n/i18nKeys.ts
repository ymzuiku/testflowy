/* Don't edit this file, it's generate from https://www.npmjs.com/package/i18n-less-translate */
/* eslint-disable @typescript-eslint/no-explicit-any */
import lang from "./lang";
export const i18nKeys = { ...lang };

Object.keys(i18nKeys).forEach((k) => {
  (i18nKeys as never as Record<string, string>)[k] = k;
});
