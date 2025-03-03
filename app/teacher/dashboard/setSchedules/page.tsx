"use client";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const page = () => {
  const [showSetSched, setShowSetSched] = useState(true);
  const user = useUser()

  return (
    <main>
      <h1> Scheduling page</h1>

      {showSetSched && (
        <main className="absolute bg-secondary p-5 left-0 right-0 mx-auto w-fit rounded-lg mt-10">
          <form action="" className="space-y-5 flex flex-col">
            {/* name of subject */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="subjectname">Subject course:</Label>
              <Input name="subjectname" type="subjectname" id="subjectname" placeholder="Enter subject course." />
            </div>

            {/* teacher id */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="id">Teacher ID:</Label>
              <Input name="id" type="id" id="id" placeholder="Enter your ID." />
            </div>

            {/* start time */}
            {/* end time */}
            {/* day */}
         
          </form>
        </main>
      )}

      {/* add schedule icon */}
      <img
        className="cursor-pointer w-12 hover:scale-105 transition-all absolute bottom-10"
        src="/add-icon.svg"
        alt="add"
        onClick={() => setShowSetSched((prev) => !prev)}
      />
    </main>
  );
};

export default page;
