export function hiddenSomeStrs(str: string): string {
  const l = str.length;
  if (l < 5) {
    return str[0] + "***" + str[l - 1];
  }

  if (l < 8) {
    return str[0] + str[1] + "***" + str[l - 2] + str[l - 1];
  }

  // 类似于 +86 开头，隐藏 +86
  if (str[0] === "+") {
    return str[3] + str[4] + str[5] + "*****" + str[l - 3] + str[l - 2] + str[l - 1];
  }

  if (l < 15) {
    return str[0] + str[1] + str[2] + "*****" + str[l - 3] + str[l - 2] + str[l - 1];
  }

  return (
    str[0] +
    str[1] +
    str[2] +
    str[3] +
    str[4] +
    str[5] +
    "*****" +
    str[l - 6] +
    str[l - 5] +
    str[l - 4] +
    str[l - 3] +
    str[l - 2] +
    str[l - 1]
  );
}
