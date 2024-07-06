import Image from "next/image";
import Link from "next/link";

export default function Header({ photo }: { photo?: string | undefined }) {
  return (
    <header className="flex justify-between items-center w-full pt-5 border-b-white/10 border-b-[1px]  pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-2">
        <h1 className="sm:text-2xl text-xl font-bold ml-2 tracking-tight text-grn">
          LUMINATE
        </h1>
      </Link>
      {photo ? (
        <Image
          alt="Profile Picture"
          src={photo}
          className="w-10 rounded-full"
          width={32}
          height={28}
        />
      ) : (
        <a href="" target="_blank">
          <Image
            alt="Vercel Icon"
            src="/vercelLogo.png"
            className="sm:w-10 sm:h-[34px] w-8 h-[28px]"
            width={32}
            height={28}
          />
        </a>
      )}
    </header>
  );
}
