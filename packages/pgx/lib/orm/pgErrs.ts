export const pgErrs = {
  "Need join on": "",
  "Ids need all int": "",
  "Comparable type error": "",
  "Data need a object": "",
  "Update need a id or filter": "",
  "Update not found data": "",
  "Delete not found data": "",
  "Not found data": "",
  "A column need required": "",
  "A column is immutable": "",
  "A column is need in pick": "",
  "A column RegExp is error": "",
  "A column type need is string": "",
  "A column string length is too max": "",
  "A column string length is too min": "",
  "A column int length is too max": "",
  "A column int length is too min": "",
  "A column float length is too max": "",
  "A column float length is too min": "",
  "A column array length is too max": "",
  "A column array length is too min": "",
  "A column type need is int": "",
  "A column type need is float": "",
  "A column type need is bool": "",
  "A column type need is object": "",
  "A column type need is object[]": "",
  "A column type need is string[]": "",
  "A column is unique": "",
};

// 以Key填充内容
Object.keys(pgErrs).forEach((k) => {
  (pgErrs as Record<string, string>)[k] = k;
});
