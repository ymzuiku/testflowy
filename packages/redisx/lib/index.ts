// import { config } from "dotenv";
import { createClient, RedisClientType } from "redis";
import { config } from "up-dir-env";
export * from "./sendCode";

// config();

export async function redisInit(url: string) {
  const client = createClient({
    url,
  });
  await client.connect();
  return client;
}

let cache: RedisClientType;

export async function redisx() {
  if (!cache) {
    config();
    cache = (await redisInit(process.env["redis_url"]!)) as never;
  }

  return cache;
}
