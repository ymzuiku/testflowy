import { success } from "fastify-glob-router/success";
import { orm } from "pgx";
import { zodVaild } from "zod-dx/zodVaild";
import { tables } from "../../../serve/tables";
import { checkToken } from "../../login/_token";
import { Auth, zodAuth } from "../../zod";

export const checkAdmin = zodVaild(zodAuth, async (p: Auth) => {
  await checkToken({ uid: p.uid, plant: p.plant, token: p.token });
  await orm.readOne({
    table: tables.account,
    id: p.uid,
    filter: {
      eq: {
        isAdmin: true,
      },
    },
  });
  return success;
});
