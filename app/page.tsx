import Header from "@/components/Header";
import Line from "@/components/Line";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-bgColor text-textColor ">
      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <h1 className=" mx-auto max-w-4xl text-5xl font-bold tracking-normal sm:text-7xl">
          Revive old images
          <span className="relative whitespace-nowrap ">
            <Line />
            <span className="relative text-grn">Using AI</span>
          </span>{" "}
          with ease
        </h1>
        <p className="mx-auto mt-12 max-w-xl text-lg text-[#696961] leading-7">
          Have old and blurry face images? Let our AI revive them so those
          memories can live on. 100% free - revive your images today.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href=""
            className="bg-transparent rounded-xl text-textLight font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-bg2Color border-2 border-bg2Color"
          >
            Learn how it&apos;s built
          </a>
          <Link
            href="/revive"
            className="bg-transparent border-2 border-grn rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-grn hover:text-bgColor"
          >
            Revive your Images
          </Link>
        </div>

        {/*  */}
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-2 sm:flex-row flex-col">
              <div>
                <h2 className="mb-1 font-medium text-lg">Original Image</h2>
                <Image
                  alt="Original Image"
                  src="/oldImage.png"
                  className="w-96 h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div>
                <h2 className="mb-1 font-medium text-lg">Revived Image</h2>
                <Image
                  alt="Revived Image"
                  width={400}
                  height={400}
                  src="/newImage.png"
                  className="w-96 h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
