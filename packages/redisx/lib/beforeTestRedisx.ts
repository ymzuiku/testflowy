import { config } from "up-dir-env";
import { beforeEach } from "vitest";
import { redisInit } from ".";

export function beforeTestRedisx() {
  beforeEach(async () => {
    config();
    await redisInit(process.env["redis_url"]!);
  });
}
