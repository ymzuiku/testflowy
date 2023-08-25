import { z, ZodTypeAny } from "zod";
import { i18nKeys } from "../i18n/i18nKeys";

// Example
// z.object({
//   take: zodNumericString(z.number().max(10))
// });
export const zodNumericString = (schema: ZodTypeAny) => {
  return z.preprocess((a) => {
    if (typeof a === "string") {
      return parseInt(a, 10);
    } else if (typeof a === "number") {
      return a;
    } else {
      return void 0;
    }
  }, schema);
};
// export const zodPhone = z.string().regex(/^(?:(?:\+|00)86)?1\d{10}$/, "手机号格式不正确");
// export const zodArea = z.string().min(2, "区域不正确").max(10, "区域不正确");
export const zodCode = z.string().length(6, i18nKeys.验证码格式不正确).regex(/^\d+$/, i18nKeys.验证码格式不正确);
export const zodEmail = z.string().email(i18nKeys.邮箱不正确);
export const zodPwd = z.string().min(6, i18nKeys.密码太短);
export const zodPlant = z.enum(["pc", "mobile", "sdk"]);
export const zodUid = z.string().min(1, i18nKeys.缺少ID);
export const zodUUID = z.string().min(5, i18nKeys.缺少UUID);
export const zodAuth = z.object({
  uid: zodUid,
  token: zodUUID,
  plant: zodPlant,
});
export type Auth = z.infer<typeof zodAuth>;

export const zodLimit = zodNumericString(z.number().max(50));
export const zodOffset = zodNumericString(z.number());

export const zodUserAgent = z.enum(["owner", "admin", "agent"]);
export type UserAgent = z.infer<typeof zodUserAgent>;
