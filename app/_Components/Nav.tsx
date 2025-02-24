"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Nav = () => {
  const [showNav, setShowNav] = useState<Boolean>(false);
  return (
    <nav className=" py-5 dark:bg-wh px-8">
      {/* Mobile nav */}
      <div className="flex items-center justify-between relative ">
        <div className="font-bold text-lg">School System</div>

        <img
          onClick={() => setShowNav((prev) => !prev)}
          className="cursor-pointer"
          src="burger.svg"
          alt=""
        />
        {/* floating nav for mobile */}
        <div
          className={`z-10 absolute bg-secondary p-5 rounded-lg w-full top-20 transition-all ${
            showNav ? "scale-100" : "scale-0"
          }`}
        >
          <ul className="text-lg font-bold space-y-4 text-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/"}>About</Link>
            </li>
            <li>
              <Link href={"/"}>How it works</Link>
            </li>
            <li>
              <Link href={"/"}>Links</Link>
            </li>
          </ul>
          <hr className="bg-black my-6" />
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
        </div>
      </div>
    </nav>
  );
};

export default Nav;
