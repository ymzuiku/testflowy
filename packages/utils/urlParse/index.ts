export const urlParse = (obj: Record<string, string | number | boolean>) => {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((k) => {
    params.append(k, obj[k] as string);
  });
  return params.toString();
};
