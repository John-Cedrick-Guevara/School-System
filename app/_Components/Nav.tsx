"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavLink {
  name: string;
  url: string;
}

interface Props {
  navLinks: NavLink[]; // Array of NavLink objects
  showLogOut: boolean;
}

const Nav = ({ navLinks, showLogOut }: Props) => {
  const [showNav, setShowNav] = useState<Boolean>(false);

  return (
    <nav className=" py-5 dark:bg-wh px-8 sticky top-0 bg-white z-10">
      {/* Mobile nav */}
      <div className="flex items-center justify-between relative ">
        <div className="font-bold text-2xl">School System</div>

        {/* hamburger icon */}
        <img
          onClick={() => setShowNav((prev) => !prev)}
          className="cursor-pointer md:hidden"
          src="/burger.svg"
          alt="burger icon"
        />
        {/* floating nav for mobile */}
        <div
          className={`z-10 max-md:absolute max-md:bg-secondary max-md:p-5 rounded-lg w-full md:max-w-xl max-md:mx-auto top-20 left-0 right-0 transition-all  ${
            showNav ? "scale-100" : "scale-0"
          } md:scale-100 md:flex justify-between `}
        >
          <ul className="text-lg font-semibold gap-6 max-lg::space-y-2 text-center md:flex items-center justify-even">
            {navLinks.map((item, key) => {
              return (
                <li
                  key={key}
                  className="text-slate-600 transition-colors hover:text-black"
                >
                  <a href={`${item.url}`}>{item.name}</a>
                </li>
              );
            })}
          </ul>

          <hr className="bg-black my-6" />
          {/* buttons */}
          <div className="flex max-md:flex-col md:items-center justify-center gap-4">
            {showLogOut ? (
              <Button className="w-full " variant={"secondary"}>
                Log Out
              </Button>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
