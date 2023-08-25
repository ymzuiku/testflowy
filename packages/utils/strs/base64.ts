export function base64toFile(b64: string, filename: string) {
  const arr = b64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export function base64toFiles(data: { file: string; name: string }[]) {
  return data.map((v) => base64toFile(v.file, v.name));
}
