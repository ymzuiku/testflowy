export function queryParse(q: string): string {
  let i = 0;
  const sql = q.replaceAll("$0", () => {
    i += 1;
    return "$" + i;
  });
  return sql;
}
