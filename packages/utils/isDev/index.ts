export function isDev() {
  if (typeof process !== "undefined") {
    return process.env["is_dev"] == "1";
  }
  return false;
}

export const testMeta = {
  isTest: false,
};
