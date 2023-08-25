import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { redisx } from "redisx";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../../i18n/i18nKeys";
import { tables } from "../../../serve/tables";
import { checkLicene, errLicenseOut } from "../../app/license/_checkLicense";
import { zodPlant, zodUid, zodUUID } from "../../zod";
import { errNameUnique } from "../draft/_createDraft";
import { getDraftDetail } from "../draft/_getDraftDetail";
import { canUseTaskLength } from "../proDiff";
import { getTasks } from "./_getTasks";

const zodAddTask = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
  id: zodUid,
});

export const prefixTaskLength = (owner: string) => {
  return "task_len_" + owner;
};

export const errMaxProTaskLength = new Error(i18nKeys.团队最大测试上限为某某条);

type AddTask = z.infer<typeof zodAddTask>;
export const createTask = zodVaild(zodAddTask, async (p: AddTask) => {
  const license = await checkLicene(p);
  const rds = await redisx();
  if (!license) {
    throw errLicenseOut;
  }
  const rdsKey = prefixTaskLength(license.owner);
  const old = await rds.get(rdsKey);
  let len = Number(old) || 0;
  if (len === 0) {
    const tasks = await getTasks({
      uid: p.uid,
      token: p.token,
      plant: p.plant,
      owner: license.owner,
      limit: 1,
      offset: 0,
    });
    len = tasks.total;
  }

  const maxLength = canUseTaskLength(!!license);
  if (len >= maxLength) {
    throw errMaxProTaskLength;
  }

  const draft = await getDraftDetail(p);
  let id = "";
  try {
    const res = await orm.insertOne({
      table: tables.task,
      data: {
        ...draft,
        owner: p.uid,
      },
    });
    id = res.id;
  } catch (err) {
    const msg = (err as Error).message;
    if (/duplicate key/.test(msg)) {
      throw errNameUnique;
    }
  }

  await rds.setEx(rdsKey, 60 * 60 * 4, String(len + 1));
  return { ...success, id };
});
