import { PgColumn } from "../zodPg";
import { pgErrs } from "./pgErrs";

export function getName(col: PgColumn): string {
  if (col.label) {
    return col.label;
  }
  return col.name;
}

const typedChecks = {
  string: (v: unknown, col: PgColumn) => {
    if (typeof v !== "string") {
      throw Error(col.error || pgErrs["A column type need is string"]);
    }
    if (col.max !== void 0 && v.length > col.max) {
      throw Error(col.error || pgErrs["A column string length is too max"]);
    }
    if (col.min !== void 0 && v.length < col.min) {
      throw Error(col.error || pgErrs["A column string length is too min"]);
    }
  },
  int: (v: unknown, col: PgColumn) => {
    if (typeof v !== "number") {
      throw Error(col.error || pgErrs["A column type need is int"]);
    }
    if (v % 1 !== 0) {
      throw Error(col.error || pgErrs["A column type need is int"]);
    }
    if (col.max !== void 0 && v > col.max) {
      throw Error(col.error || pgErrs["A column int length is too max"]);
    }
    if (col.min !== void 0 && v < col.min) {
      throw Error(col.error || pgErrs["A column int length is too min"]);
    }
  },
  float: (v: unknown, col: PgColumn) => {
    if (typeof v !== "number") {
      throw Error(col.error || pgErrs["A column type need is float"]);
    }
    if (col.max !== void 0 && v > col.max) {
      throw Error(col.error || pgErrs["A column float length is too max"]);
    }
    if (col.min !== void 0 && v < col.min) {
      throw Error(col.error || pgErrs["A column float length is too min"]);
    }
  },
  bool: (v: unknown, col: PgColumn) => {
    if (typeof v !== "boolean") {
      throw Error(col.error || pgErrs["A column type need is bool"]);
    }
  },
  object: (v: unknown, col: PgColumn) => {
    if (!v || Object.prototype.toString.call(v) !== "[object Object]") {
      throw Error(col.error || pgErrs["A column type need is object"]);
    }
  },
  vecString: (v: unknown, col: PgColumn) => {
    if (!v || !Array.isArray(v)) {
      throw Error(col.error || pgErrs["A column type need is string[]"]);
    }
    if (v.length && typeof v[0] !== "string") {
      throw Error(col.error || pgErrs["A column type need is string[]"]);
    }
    if (col.max !== void 0 && v.length > col.max) {
      throw Error(col.error || pgErrs["A column array length is too max"]);
    }
    if (col.min !== void 0 && v.length < col.min) {
      throw Error(col.error || pgErrs["A column array length is too min"]);
    }
  },
  vecObject: (v: unknown, col: PgColumn) => {
    if (!v || !Array.isArray(v)) {
      throw Error(col.error || pgErrs["A column type need is object[]"]);
    }
    if (v.length && Object.prototype.toString.call(v[0]) !== "[object Object]") {
      throw Error(col.error || pgErrs["A column type need is object[]"]);
    }
    if (col.max !== void 0 && v.length > col.max) {
      throw Error(col.error || pgErrs["A column array length is too max"]);
    }
    if (col.min !== void 0 && v.length < col.min) {
      throw Error(col.error || pgErrs["A column array length is too min"]);
    }
  },
};

export function columnsCheck<T>(data: T, columns: PgColumn[], isUpdate?: boolean): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out = {} as any;
  columns.forEach((col) => {
    const v = (data as Record<string, unknown>)[col.name];
    if (!isUpdate && col.required) {
      if (!v) {
        throw Error(col.error || pgErrs["A column need required"]);
      }
    }
    if (!col.required && v === void 0) {
      return;
    }
    if (isUpdate && col.imma && v === void 0) {
      throw Error(col.error || pgErrs["A column is immutable"]);
    }
    if (col.typed) {
      typedChecks[col.typed](v, col);
    }
    if (col.pick) {
      if (typeof v !== "string") {
        throw Error(col.error || pgErrs["A column is need in pick"]);
      }
      if (col.pick.indexOf(v) === -1) {
        throw Error(col.error || pgErrs["A column is need in pick"]);
      }
    }
    if (col.reg) {
      if (typeof v !== "string") {
        throw Error(col.error || pgErrs["A column type need is string"]);
      }
      if (new RegExp(col.reg).test(v) === false) {
        throw Error(col.error || pgErrs["A column RegExp is error"]);
      }
    }
    out[col.name] = v;
  });
  return out;
}
