import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <section className="px-8 py-10 md:flex items-center justify-evenly">
      <h1 className="text-4xl font-bold my-10">Get Started</h1>

      <div className="flex max-md:flex-col  gap-4">
        <Link href={"/sign_in"}>
          <Button size={"lg"} className="w-full" variant={"outline"}>
            Sign in
          </Button>
        </Link>
        <Link href={"/sign_up"}>
          <Button size={"lg"} className="w-full " variant={"secondary"}>
            Sign up
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
