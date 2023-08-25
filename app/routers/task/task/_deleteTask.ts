import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkLicene } from "../../app/license/_checkLicense";
import { checkAgent } from "../../app/team/_checkAgent";
import { zodAuth, zodUid } from "../../zod";
import { prefixTaskLength } from "./_createTask";

const zodDeleteTask = z.object({
  auth: zodAuth.optional(),
  id: zodUid.optional(),
});

export type DeleteTask = z.infer<typeof zodDeleteTask>;
export const deleteTask = zodVaild(zodDeleteTask, async (p: DeleteTask) => {
  const licene = await checkLicene(p.auth!);
  await checkAgent({ auth: p.auth!, needAgent: ["admin", "owner"] });
  await orm.deleteOne({
    table: tables.task,
    id: p.id,
    filter: {
      eq: { owner: licene.owner },
    },
  });
  const rds = await redisx();
  await rds.del(prefixTaskLength(licene.owner));
  return success;
});
