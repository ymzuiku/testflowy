import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { zodAuth } from "../../zod";
import { checkAdmin } from "./_checkAdmin";

const zodGetAccounts = z.object({
  auth: zodAuth,
  limit: z.number().min(5).max(100),
  offset: z.number().min(0),
});

export const getAccounts = zodVaild(zodGetAccounts, async (p: z.infer<typeof zodGetAccounts>) => {
  await checkAdmin(p.auth);
  return orm.readMany<unknown, { email: string }>({
    table: tables.account,
    filter: {
      limit: p.limit,
      offset: p.offset,
      order: "createAt",
      desc: true,
    },
    total: true,
  });
});

export type GetAccounts = Awaited<ReturnType<typeof getAccounts>>;
