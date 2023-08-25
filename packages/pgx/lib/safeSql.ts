export function safeSql(text: string): string {
  return text.replace(/(\/|\\|"|'|%| |:|-|`|\.|\||\|\|;|&|\[|\]|\{|\}|\(|\)|\n)/g, "_");
}
