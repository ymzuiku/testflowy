import { createNosqlIndex, createNosqlTableAndIndexTimes, createNosqlUniqueIndex, initeTables } from "pgx";

export const tables = {
  account: "account",
  draft: "draft",
  task: "task",
  order: "testflowyorder",
  license: "license",
};

export const createTestflowyTables = async () => {
  await initeTables();
  if (await createNosqlTableAndIndexTimes(tables.account)) {
    await createNosqlUniqueIndex(tables.account, { key: "email", dataType: "text" });
  }

  if (await createNosqlTableAndIndexTimes(tables.order)) {
    await createNosqlUniqueIndex(tables.order, { key: "channelId", dataType: "text" });
  }

  if (await createNosqlTableAndIndexTimes(tables.task)) {
    // await createNosqlDoubleUniqueIndex(
    //   tables.task,
    //   { key: "owner", dataType: "text" },
    //   { key: "name", dataType: "text" },
    // );
  }
  if (await createNosqlTableAndIndexTimes(tables.draft)) {
    // await createNosqlDoubleUniqueIndex(
    //   tables.draft,
    //   { key: "uid", dataType: "text" },
    //   { key: "name", dataType: "text" },
    // );
  }
  if (await createNosqlTableAndIndexTimes(tables.license)) {
    // await createNosqlUniqueIndex(tables.license, { key: "useUid", dataType: "text" });
    await createNosqlIndex(tables.license, "end", "text");
  }
};
