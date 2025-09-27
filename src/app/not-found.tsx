"use client";

import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src={"/pokeball.png"}
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
        priority={true}
      />
      <div className="p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Link href={"/"} passHref>
          <Button
            variant={"default"}
            className="mt-4 ml-2 bg-yellow-400 text-black font-bold shadow-2xl hover:bg-yellow-300 rounded-full hover:cursor-pointer"
          >
            {" "}
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
