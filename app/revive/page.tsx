"use client";

import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import useSWR from "swr";
import { Uploader } from "uploader";

const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

export default function RevivePage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [revivedImage, setRevivedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [revivedLoaded, setRevivedLoaded] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, mutate } = useSWR("/api/timeRemaining", fetcher);

  const options = {
    maxFileCount: 1,
    mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    editor: { images: { crop: false } },
    styles: { colors: { primary: "#000" } },
    onValidate: async (file: File): Promise<undefined | string> => {
      if (data.remainingGenerations === 0) {
        return "No more generations left for the day.";
      }
      return undefined;
    },
  };

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setImageName(file[0].originalFile.originalFileName);
          setOriginalImage(file[0].fileUrl.replace("raw", "thumbnail"));
          generateImage(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generateImage(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl }),
    });

    let newImage = await res.json();
    if (res.status !== 200) {
      setError(newImage);
    } else {
      mutate();
      setRevivedImage(newImage);
    }
    setLoading(false);
  }

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
