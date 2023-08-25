export const clipboardWrite = async (text: string): Promise<boolean> => {
  if (location.href.indexOf("https") < 0) {
    console.warn("clipboard 必须使用 https");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    //
    return false;
  }
};

export const clipboardRead = async (): Promise<string> => {
  if (location.href.indexOf("https") < 0) {
    console.warn("clipboard 必须使用 https");
    return "";
  }
  try {
    const str = await navigator.clipboard.readText();
    return str;
  } catch (err) {
    return "";
  }
};
