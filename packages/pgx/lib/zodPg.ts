import { z } from "zod";

import { ZodSchema } from "zod";

interface RawCreateParams {
  invalid_type_error?: string;
  required_error?: string;
  description?: string;
}

// 保留类型，但是不进行任何校验
export const zodAnyOf = <A>(arr: ZodSchema<A>) => {
  return z.any() as never as typeof arr;
};

export const zodDate = (raw?: RawCreateParams) =>
  z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date(raw));

export const zodNumber = (raw?: RawCreateParams) =>
  z.preprocess((arg) => {
    if (typeof arg == "string") {
      const v = Number(arg);
      if (isNaN(v)) {
        return arg;
      }
      return v;
    }
    return arg;
  }, z.number(raw));

export const zodArrayString = z.array(z.string());

export const zodId = (raw?: RawCreateParams) =>
  z.preprocess((arg) => {
    if (typeof arg == "string") {
      const v = Number(arg);
      if (isNaN(v)) {
        return arg;
      }
      return v;
    }
    return arg;
  }, z.string(raw).max(256));

export const zodArrayNumber = z.array(z.number());

export const zodBool = z.boolean().optional();

export const zodPgBaseModel = z.object({
  id: z.string().min(1).max(256),
  createAt: z.string(),
  updateAt: z.string(),
});

export type PgBaseModel = z.infer<typeof zodPgBaseModel>;

export const zodPgTyped = z.enum(["string", "int", "float", "bool", "object", "vecString", "vecObject"]);
export type PgTyped = z.infer<typeof zodPgTyped>;

export const zodPgColumn = z.object({
  name: z.string(),
  typed: zodPgTyped,
  label: z.string().optional(),
  required: z.boolean().optional(),
  imma: z.boolean().optional(),
  unique: z.boolean().optional(),
  min: zodNumber().optional(),
  max: zodNumber().optional(),
  reg: z.string().optional(),
  error: z.string().optional(),
  pick: z.array(z.string()).optional(),
  widget: z.string().optional(),
  model: z.any().optional(),
  modelColumns: z.array(z.string()).optional(),
});
export type PgColumn = z.infer<typeof zodPgColumn>;

export const zodPgModel = z.object({
  id: zodId(),
  pid: zodId(),
  name: z.string(),
  info: z.string().optional(),
  icon: z.string().url().optional(),
  columns: z.array(zodPgColumn),
  softDelete: z.boolean().optional(),
  sensitive: z.array(z.string()).optional(),
});

export type PgModel = z.infer<typeof zodPgModel>;

export const zodPgFilter = z.object({
  ids: zodArrayNumber.optional(),
  eq: z.any().optional(),
  comparable: z.array(z.array(z.string())).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  order: z.string().optional(),
  desc: z.boolean().optional(),
});

export type PgFilter = z.infer<typeof zodPgFilter>;

export const zodPgJoin = z.object({
  on: z.array(z.string().min(1)),
  table: z.string().min(2),
  columns: zodArrayNumber.optional(),
  eq: z.any().optional(),
  comparable: z.array(z.array(z.string())).optional(),
});

export type PgJoin = z.infer<typeof zodPgJoin>;
