import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BackButton = ({ path }: { path: string }) => {
  return (
    <Link
      href={
        path.split("/").slice(0, -1).join("/").length === 0
          ? "/"
          : path.split("/").slice(0, -1).join("/")
      }
    >
      <Button className="mb-10" variant={"outline"}>
        <img className=" rotate-180 w-6" src="/arrow.png" alt="as" />
        <h1>Back</h1>
      </Button>
    </Link>
  );
};

export default BackButton;
