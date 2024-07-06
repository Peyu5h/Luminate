// "use client";

import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export default function RevivePage() {
  const { data: session, status } = useSession();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/timeRemaining", fetcher);
  return (
    <div className="">
      <div className="flex mx-auto bg-bgColor text-textColor flex-col items-center justify-center py-2 min-h-screen">
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-normal text sm:text-6xl mb-5">
            Revive any face image
          </h1>
          {status === "authenticated" && (
            <p className="text-textLight">
              You have {data?.remainingGeneration} generations left for today.{" "}
              {data?.remainingGeneration === 0 ? (
                <span>
                  Please come back in {data?.hours} hours and {data?.minutes}{" "}
                  minutes
                </span>
              ) : (
                <span>Revive your images now</span>
              )}
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
