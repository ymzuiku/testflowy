export const randomCode = (len: number, dev?: boolean) => {
  if (dev) {
    if (len === 6) {
      return "999999";
    }
    return "9999";
  }
  return Math.random().toString().replace("0.", "").slice(0, len);
};
