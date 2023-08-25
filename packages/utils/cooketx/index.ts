export const cooketx = {
  get: (key: string) => {
    const arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      const [k, v] = str.split("=");
      if (k.trim() === key) {
        return v.trim();
      }
    }
    return "";
  },
  set: (key: string, value: string) => {
    let out = "";
    const arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      const [k] = str.split("=");
      if (k.trim() === key) {
        out += `${k}:${value};`;
        continue;
      }
      out += str + ";";
    }
    document.cookie = out;
  },
  remove: (key: string) => {
    let out = "";
    const arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      const [k] = str.split("=");
      if (k.trim() === key) {
        continue;
      }
      out += str + ";";
    }
    document.cookie = out;
  },
  clear: () => {
    document.cookie = "";
  },
};
