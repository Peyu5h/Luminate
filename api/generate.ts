import redis from "@/utils/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    imageUrl: string;
  };
}

const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, "1440 m"),
      analytics: true,
    })
  : undefined;

type Data = string;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session?.user) {
    return res.status(500).json("Login to upload");
  }

  if (ratelimit) {
    const identifier = session.user?.email;
    const result = await ratelimit.limit(identifier!);
    res.setHeader("X-Ratelimit-Limit", result.limit);
    res.setHeader("x-RateLimit-Remaining", result.remaining);

    const diff = Math.abs(
      new Date(result.reset).getTime() - new Date().getTime()
    );
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor(diff / 1000 / 60) - hours * 60;

    if (!result.success) {
      return res
        .status(429)
        .json(
          `Your generations will renew in ${hours} hours and ${minutes} minutes. Email kuluruvineeth8623@gmail if you have any questions.`
        );
    }
  }
}
