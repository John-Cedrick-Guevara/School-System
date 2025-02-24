import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <section className="px-8 my-10">
      <h1 className="text-3xl font-bold my-10">Get Started</h1>

      <div className="flex flex-col gap-4">
        <Link href={"/sign_in"}>
          <Button className="w-full " variant={"outline"}>
            Sign in
          </Button>
        </Link>
        <Link href={"/sign_up"}>
          <Button className="w-full " variant={"secondary"}>
            Sign up
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
