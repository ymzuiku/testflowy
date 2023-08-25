import cors from "@fastify/cors";
import fastify from "fastify";
import { fastifyApi } from "fastify-glob-router/fastifyApi";
import fetch from "node-fetch";
import { config } from "up-dir-env";
import { isDev } from "utils/isDev";
import { serveArray } from "../routers/_serves";
import { createTestflowyTables } from "./tables";

if (!global.fetch) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).fetch = fetch;
}

config();

const app = fastify();
// eslint-disable-next-line
app.register(cors as any);
app.register(fastifyApi, {
  baseUrl: "/v1",
  routers: serveArray,
  // beforeMiddleware: [loadCooketMiddleware("uid", "token", "plant")],
  // afterMiddleware: [setCooketMiddleware([], "/", true)],
});
createTestflowyTables();

let port = Number(process.env.port);
if (isNaN(port)) {
  port = 6010;
}
app.get("/v1/env", () => {
  return {
    isDev: isDev(),
    port,
  };
});

app.listen(
  {
    port,
  },
  () => {
    console.log("testflowy-serve:", "http://127.0.0.1:" + port);
  },
);
