export function safeJsonParse(s: string) {
  if (s[0] !== "{") {
    return void 0;
  }
  try {
    return JSON.parse(s);
  } catch {
    return void 0;
  }
}
