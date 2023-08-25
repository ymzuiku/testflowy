import { PgBaseModel, PgColumn, PgFilter, PgJoin } from "../zodPg";

export interface PgInsertOne<T> {
  tx?: unknown;
  table: string;
  data: T;
  columns?: PgColumn[];
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
}

export interface PgInsertMany<T> {
  tx?: unknown;
  table: string;
  datas: T[];
  columns?: PgColumn[];
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
}

export interface PgRead<T> {
  id?: string;
  ids?: string[];
  tx?: unknown;
  table: string;
  filter?: PgFilter;
  readSoftDelete?: boolean;
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
  join?: PgJoin;
  total?: boolean;
  readMany?: boolean;
}

export interface PgReadOne<T> {
  tx?: unknown;
  table: string;
  id?: string;
  filter?: PgFilter;
  readSoftDelete?: boolean;
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
  join?: PgJoin;
}

export interface PgReadMany<T> {
  tx?: unknown;
  table: string;
  ids?: string[];
  filter?: PgFilter;
  readSoftDelete?: boolean;
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
  total?: boolean;
  join?: PgJoin;
}

export interface PgUpdateOne<T> {
  tx?: unknown;
  table: string;
  id?: string;
  filter?: PgFilter;
  columns?: PgColumn[];
  readSoftDelete?: boolean;
  data: T;
  returnColumns?: (keyof T)[];
  sensitive?: (keyof T)[];
}

export interface PgUpdateMany<T> {
  tx?: unknown;
  table: string;
  filter?: PgFilter;
  readSoftDelete?: boolean;
  data: T;
  columns?: PgColumn[];
  // returnColumns?: (keyof T)[];
  // sensitive?: (keyof T)[];
}

export interface PgDeleteOne {
  tx?: unknown;
  table: string;
  id?: string;
  filter?: PgFilter;
}

export interface PgResponse<T> {
  total: number;
  data: (T & PgBaseModel)[];
}
