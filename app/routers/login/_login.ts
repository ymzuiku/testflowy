import { orm } from "pgx";
import { redisx } from "redisx";
import { sha256 } from "utils/sha256";
import { v4 } from "uuid";
import { z } from "zod";
import { zodVaild } from "zod-dx/zodVaild";
import { i18nKeys } from "../../i18n/i18nKeys";
import { tables } from "../../serve/tables";
import { priceToRMB } from "../app/pay/info/price";
import { zodEmail, zodPlant, zodPwd } from "../zod";

const zodLogin = z.object({
  email: zodEmail,
  pwd: zodPwd,
  plant: zodPlant,
});

export type LoginProps = z.infer<typeof zodLogin>;

export const errPassword = new Error(i18nKeys.账号或密码错误);

export const prefixToken = (uid: string, plant: string) => "token:" + uid + plant;

// Login
export const login = zodVaild(zodLogin, async (p: LoginProps) => {
  p.pwd = sha256(p.pwd);
  const res = await orm.readOne<
    unknown,
    {
      payed: boolean;
      email: string;
      pwd?: string;
      owner?: string;
      agent?: "owner" | "admin" | "agent";
      isAdmin?: boolean;
    }
  >({
    table: tables.account,
    filter: {
      eq: {
        email: p.email,
        pwd: p.pwd,
      },
    },
  });
  if (!res) {
    throw errPassword;
  }
  delete res.pwd;
  const rds = await redisx();
  const token = v4();
  const account = {
    ...res,
    token,
    plant: p.plant,
  };
  rds.setEx(prefixToken(res.id, p.plant), priceToRMB(3600 * 24), JSON.stringify(account));
  return account;
});
export type Account = ReturnType<Awaited<typeof login>>;
