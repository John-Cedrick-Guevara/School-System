"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Nav = () => {
  const [showNav, setShowNav] = useState<Boolean>(false);
  return (
    <nav className="px-8 py-5 dark:bg-wh">
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
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">How it works</a>
            </li>
            <li>
              <a href="#">Links</a>
            </li>
          </ul>
          <hr className="bg-black my-6" />
          <div className="flex flex-col gap-4">
            <Button variant={"outline"}>Log In</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
