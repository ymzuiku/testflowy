/* eslint-disable @typescript-eslint/no-explicit-any */

import { Middleware } from "./fastifyApi";

export const loadCooketMiddleware: (...keys: string[]) => Middleware = (...keys) => {
  return (input: any) => {
    keys.forEach((key) => {
      input.data[key] = input.request.cookies[key];
    });
  };
};

export const setCooketMiddleware: (domains: string[], path?: string, signed?: boolean) => Middleware = (
  domains,
  path = "/",
  signed,
) => {
  return (input: any) => {
    const t = input.data.$setCooket;
    if (t) {
      delete input.data.$setCooket;
    }
    domains.forEach((domain) => {
      Object.keys(t).forEach((key) => {
        const v = t[key];
        if (v) {
          input.reply.setCookie(key, v, { domain, path, signed: !!signed });
        }
      });
    });
    Object.keys(t).forEach((key) => {
      input.reply.setCookie(key, (t as Record<string, string>)[key], {
        path,
        signed,
      });
    });
  };
};
