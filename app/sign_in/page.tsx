import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signIn_page = () => {
  return (
    <main className="p-8 ">
      {/* back button */}
      <Link href={"/"} >
        <Button variant={"outline"}>
          <img className=" rotate-180 w-6" src="arrow.png" alt="" />
          <h1>Back</h1>
        </Button>
      </Link>
      <h1 className="text-4xl font-bold my-16 text-center">Log In</h1>

      {/* form */}
      
        <form action="" className="flex flex-col gap-8 w-full max-w-sm mx-auto mt-20">
          {/* email */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>

          {/* Password */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>

          <Button variant={"default"} size={"lg"}>
            Log In
          </Button>
        </form>
    </main>
  );
};

export default signIn_page;
