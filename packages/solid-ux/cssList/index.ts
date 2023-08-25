export function cssList(obj: Record<string, unknown>) {
  let css = "";
  Object.keys(obj).forEach((k: string) => {
    if (k && obj[k]) {
      css += k + " ";
    }
  });
  return css;
}
