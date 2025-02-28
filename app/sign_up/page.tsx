"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { use, useState } from "react";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

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
import { signUpSchema } from "@/lib/schemas/schemaParser";

const signUp_page = () => {
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [section, setsection] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({
    action: "signup",
    name: "",
    email: "",
    password: "",
    sectionId: section,
    id: "",
    role: "STUDENT",
  });

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = signUpSchema.safeParse(data);
    console.log(parsedData.data);
    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message as unknown as string);
    } else {
      try {
        if (parsedData) {
          const res = await axios.post("api/auth", parsedData.data);
          console.log(res.data);
        } else {
          console.log("NO data");
        }
      } catch (error) {
        console.log(error);
      }
      // setData({
      //   action: "signup",
      //   name: "",
      //   email: "",
      //   password: "",
      //   sectionId: section,
      //   id: "",
      //   role: "STUDENT",
      // });
    }
  }

  setTimeout(() => {
    setError("");
  }, 3000);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

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

      {/* error message */}
      {error && (
        <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
          {error}
        </h1>
      )}

      {/* form */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm mx-auto "
      >
        {/* email */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={data.email}
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        {/* name */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            value={data.name}
            onChange={handleChange}
            type="name"
            id="name"
            placeholder="Name"
          />
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
              <DropdownMenuLabel>Sections:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                onValueChange={(newSection) => {
                  setsection(newSection);
                  setData((prev) => ({
                    ...prev,
                    sectionId: newSection,
                  }));
                }}
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
          <Label htmlFor="email">
            {role === "STUDENT" ? "Student Id" : "Teacher Id"}
          </Label>
          <Input
            value={data.id}
            onChange={handleChange}
            name="id"
            type="id"
            id="id"
            placeholder={role === "STUDENT" ? "Student Id" : "Teacher Id"}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <h1>Student</h1>
          <Switch
            onClick={() =>
              setData((prev) => ({
                ...prev,
                role: prev.role === "TEACHER" ? "STUDENT" : "TEACHER",
              }))
            }
          />
          <h1>Teacher</h1>
        </div>

        <Button variant={"default"} size={"lg"}>
          Sing Up
        </Button>
      </form>
    </main>
  );
};

export default signUp_page;
