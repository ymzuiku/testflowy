import cookie from "@fastify/cookie";
import type { FastifyRegisterOptions, RegisterOptions } from "fastify";
import { zodErr } from "zod-dx/zodErr";

import { FastifyReplyType, FastifyRequestType } from "fastify/types/type-provider";

export type Middleware = (input: {
  baseUrl: string;
  url: string;
  request: FastifyRequestType;
  reply: FastifyReplyType;
  data: Record<string, unknown>;
}) => void;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FastifyApi {
  baseUrl: string;
  useCooket?: boolean;
  cooketSecret?: string;
  // isLog?: boolean;
  beforeMiddleware?: Middleware[];
  afterMiddleware?: Middleware[];
  routers: {
    path: string;
    serve: {
      GET?: any;
      POST?: any;
      PUT?: any;
      DELETE?: any;
      PATCH?: any;
    };
  }[];
}

const methods = {
  GET: true,
  POST: true,
  PATCH: true,
  PUT: true,
  DELETE: true,
} as Record<string, boolean>;

export const fastifyApi = (
  app: any,
  {
    useCooket,
    baseUrl,
    routers,
    cooketSecret = "fastify-api-cooket-secret",
    beforeMiddleware = [],
    afterMiddleware = [],
  }: FastifyRegisterOptions<RegisterOptions> & FastifyApi,
  done: any,
) => {
  if (useCooket) {
    app.register(cookie, { secret: cooketSecret });
  }
  app.setErrorHandler(function (this: any, err: Error, _request: any, reply: any) {
    // 处理 zod 错误
    const e = zodErr(err);
    if (e.path) {
      reply.status(400).send(e);
      return;
    }
    this.log.error(err);
    reply.status(500).send(err);
  });

  routers.forEach((item) => {
    Object.keys(item.serve).forEach((method) => {
      const fn = item.serve[method as "GET"];
      if (typeof fn !== "function") {
        return;
      }

      // 处理GET、POST等函数名的路由
      if (methods[method]) {
        const url = baseUrl + item.path;
        switch (method) {
          case "GET":
            app.get(url, async (req: any, rej: any) => {
              const data = req.query;
              for (const middle of beforeMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: item.path, data, request: req, reply: rej }));
              }
              const out = await Promise.resolve(fn(data, req.headers));
              for (const middle of afterMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: item.path, data: out, request: req, reply: rej }));
              }
              return rej.send(out);
            });
            break;
          case "POST":
          case "PUT":
          case "PATCH":
          case "DELETE":
            // eslint-disable-next-line no-case-declarations
            const methodKey = method.toLocaleLowerCase() as "post";
            app[methodKey](url, async (req: any, rej: any) => {
              const data = typeof req.body === "string" ? (req.body ? JSON.parse(req.body as never) : {}) : req.body;
              for (const middle of beforeMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: item.path, data, request: req, reply: rej }));
              }
              const out = await Promise.resolve(fn(data, req.headers));
              for (const middle of afterMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: item.path, data: out, request: req, reply: rej }));
              }
              return rej.send(out);
            });
        }
        return;
      }

      const fnMethod = {
        GET: fn.GET,
        POST: fn.POST,
        DELETE: fn.DELETE,
        PUT: fn.PUT,
        PATCH: fn.PATCH,
      } as Record<string, boolean>;

      // 处理属性带有.GET、.POST等函数名的路由
      Object.keys(fnMethod).forEach((keyOfMethod) => {
        if (!fnMethod[keyOfMethod]) {
          return;
        }
        const realUrl = item.path + "/" + method;
        const url = baseUrl + item.path + "/" + method;
        switch (keyOfMethod) {
          case "GET":
            app.get(url, async (req: any, rej: any) => {
              const data = req.query;
              for (const middle of beforeMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: realUrl, data, request: req, reply: rej }));
              }

              const out = await Promise.resolve(fn(data, req.headers));
              for (const middle of afterMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: realUrl, data: out, request: req, reply: rej }));
              }
              return rej.send(out);
            });
            break;
          case "POST":
          case "PUT":
          case "PATCH":
          case "DELETE":
            // eslint-disable-next-line no-case-declarations
            const methodKey = keyOfMethod.toLocaleLowerCase() as "post";
            app[methodKey](url, async (req: any, rej: any) => {
              const data = typeof req.body === "string" ? (req.body ? JSON.parse(req.body as never) : {}) : req.body;
              for (const middle of beforeMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: realUrl, data, request: req, reply: rej }));
              }
              const out = await Promise.resolve(fn(data, req.headers));
              for (const middle of afterMiddleware) {
                await Promise.resolve(middle({ baseUrl, url: realUrl, data: out, request: req, reply: rej }));
              }
              return rej.send(out);
            });
            break;
        }
      });
    });
  });
  done();
};
