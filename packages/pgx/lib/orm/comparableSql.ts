import { safeSql } from "../safeSql";
import { pgErrs } from "./pgErrs";

const arrows = {
  ">": true,
  ">=": true,
  "<": true,
  "<=": true,
  "!=": true,
} as Record<string, boolean>;

export function comparableSql(com: string[][], table?: string): string {
  if (!Array.isArray(com)) {
    throw Error(pgErrs["Comparable type error"]);
  }
  let sql = "";
  if (table) {
    table = safeSql(table);
    table = `"${table}".`;
  }

  com.forEach((item, i) => {
    // eslint-disable-next-line prefer-const
    let [key, opt, val] = item;
    key = safeSql(key);
    const and = i === 0 ? "" : "and";
    if (arrows[opt]) {
      sql += `${and} (${table}j->'${key}')::numeric ${opt} '${val}'`;
    } else if (opt === "like") {
      sql += `${and} ${table}j->>'${key}' like '${val}%'`;
    } else if (opt === "before") {
      sql += `${and} (${table}j->'${key}')::text < '${val}'`;
    } else if (opt === "after") {
      sql += `${and} (${table}j->'${key}')::text > '${val}'`;
    } else if (opt === "?") {
      sql += `${and} ${table}->>'${key}' ? '${val}'`;
    }
  });
  if (sql === "") {
    throw Error(pgErrs["Comparable type error"]);
  }
  return sql;
}
