/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodType } from "zod";

interface Methods {
  GET?: boolean;
  PUT?: boolean;
  POST?: boolean;
  PATCH?: boolean;
  DELETE?: boolean;
}

export const zodVaild = <F, A>(checker: null | { parse: (v: ZodType<A>) => unknown }, fn: F): F & Methods => {
  return ((input: any, headers: Record<string, string>) => {
    if (checker) {
      const p = checker.parse(input);
      return (fn as any)(p, headers);
    }
    return (fn as any)(input, headers);
  }) as any;
};
