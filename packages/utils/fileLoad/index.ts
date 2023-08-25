export async function fileLoadOne(e: HTMLInputElement, index = 0): Promise<string> {
  try {
    const file = e.files![index];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    const out = await new Promise<string>((res) => {
      fileReader.addEventListener("load", function () {
        res(fileReader.result as string);
      });
    });
    return out;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function filesLoad(e: HTMLInputElement): Promise<{ file: string; name: string }[]> {
  const list = e.files || [];
  let n = 0;
  const out = [];
  // eslint-disable-next-line
  for (const v of list) {
    const file = await fileLoadOne(e, n);
    out.push({ file, name: v.name, value: v.name });
    console.log(out[out.length - 1]);
    n++;
  }
  return out;
}
