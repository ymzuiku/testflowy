export function isUUID(str: string) {
  return str.length === 36 && str.indexOf("-") === 8;
}
