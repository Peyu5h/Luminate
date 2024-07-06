import { Redis } from "@upstash/redis";

const redis =
  !!process.env.REDIS_URL && !!process.env.REDIS_TOKEN
    ? new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      })
    : undefined;

export default redis;
