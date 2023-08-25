import { orm } from "pgx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { zodAuth } from "../../zod";
import { checkAdmin } from "../accounts/_checkAdmin";

const zodGetOrders = z.object({
  auth: zodAuth,
  limit: z.number().min(5).max(100),
  offset: z.number().min(0),
});

export const getOrders = zodVaild(zodGetOrders, async (p: z.infer<typeof zodGetOrders>) => {
  await checkAdmin(p.auth);
  return orm.readMany<
    unknown,
    { uid: string; price: number; desc: string; channel: string; channelId: string; dollars: number }
  >({
    table: tables.order,
    filter: {
      eq: {
        done: 1,
      },
      limit: p.limit,
      offset: p.offset,
      order: "createAt",
      desc: true,
    },
    total: true,
  });
});

export type GetOrders = Awaited<ReturnType<typeof getOrders>>;
