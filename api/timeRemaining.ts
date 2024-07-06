import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authOptions from "./auth/[...nextauth]";
import redis from "@/utils/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(500).json("Kindly login to access this page");
  }

  const identifier = session.user.email;
  const timeRemaining = 24 * 60 * 60 * 1000;
  const bucket = Math.floor(Date.now() / timeRemaining);

  const useGeneration =
    (await redis?.get(`@upstash/rateLimit:${identifier}:${bucket}`)) || 0;

  const remainingGeneration = 5 - Number(useGeneration);

  const resetDate = new Date();
  resetDate.setHours(19, 0, 0, 0);
  const diff = Math.abs(resetDate.getTime() - new Date().getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60 - hours * 60);

  return res.status(200).json({
    remainingGeneration,
    hours,
    minutes,
  });
}
