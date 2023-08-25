export const isIPString = (str: string) => {
  if (str.length > 15) {
    return false;
  }
  const list = str.split(".");
  if (list.length !== 4) {
    return false;
  }
  for (let i = 0; i < list.length; i++) {
    const v = list[i];
    const n = Number(v);
    if (isNaN(n)) {
      return false;
    }
    if (n > 255 || n < 0) {
      return false;
    }
  }
  return true;
};
