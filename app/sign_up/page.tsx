"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { use, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";

const signUp_page = () => {
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [section, setsection] = React.useState("");
  console.log(section);

  const sections = [
    {
      value: "SECTION 1",
      label: "SECTION 1",
    },
    {
      value: "SECTION 2",
      label: "SECTION 2",
    },
    {
      value: "SECTION 3",
      label: "SECTION 3",
    },
    {
      value: "SECTION 4",
      label: "SECTION 4",
    },
    {
      value: "SECTION 5",
      label: "SECTION 5",
    },
  ];

  return (
    <main className="p-8 ">
      {/* back button */}
      <Link href={"/"}>
        <Button variant={"outline"}>
          <img className=" rotate-180 w-6" src="arrow.png" alt="" />
          <h1>Back</h1>
        </Button>
      </Link>
      <h1 className="text-4xl font-bold my-16 text-center">Sign Up</h1>

      {/* form */}

      <form
        action=""
        className="flex flex-col gap-5 w-full max-w-sm mx-auto mt-16"
      >
        {/* email */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>

        {/* name */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="name" id="name" placeholder="Name" />
        </div>

        {/* section */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="section">Section</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {section ? section : "Select Section"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Panel section</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={section}
                onValueChange={setsection}
              >
                {sections.map((item, key) => {
                  return (
                    <DropdownMenuRadioItem key={key} value={item.value}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

          {/* student/tc id */}
          <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="email">{isStudent ?"Student Id" : "Teacher Id"}</Label>
          <Input type="id" id="id" placeholder={isStudent ?"Student Id" : "Teacher Id"} />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <h1>Teacher</h1>
          <Switch onClick={() => setIsStudent((prev) => !prev)} />
          <h1>Student</h1>
        </div>

        <Button variant={"default"} size={"lg"}>
          Log In
        </Button>
      </form>
    </main>
  );
};

export default signUp_page;
