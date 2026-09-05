"use client";
import Image from "next/image";
import Link from "next/link";
import Img from "../../public/Images/404.png";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-white dark:bg-black">
      <div className="relative w-full max-w-md h-auto">
        <Image
          src={Img}
          alt="Picture not loaded"
          layout="responsive"
          width={500}
          height={500}
        />
      </div>
      <div className="mt-5">
        <Link href="/">
          <MoveLeft size={32} />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
