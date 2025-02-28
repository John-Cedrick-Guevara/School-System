"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logInSchema } from "@/lib/schemas/schemaParser";
import axios from "axios";
import { useRouter } from "next/navigation";

const signIn_page = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    action: "login",
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = logInSchema.safeParse(credentials);

    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message as unknown as string);
    } else {
      try {
        if (parsedData) {
          const res = await axios.post("api/auth", parsedData.data);
          const role = res.data.message.user.role;
          console.log(role);
          router.push(
            `/${role === "STUDENT" ? "student" : "teacher"}/dashboard`
          );
        } else {
          console.log("no data given");
        }
      } catch (error) {
        console.log("front end error", error);
      }
    }
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
      <h1 className="text-4xl font-bold my-16 text-center">Log In</h1>

      {/* form */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full max-w-sm mx-auto mt-20"
      >
        {/* email */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            onChange={handleChange}
            value={credentials.email}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full max-w-sm gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            onChange={handleChange}
            value={credentials.password}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <Button variant={"default"} size={"lg"}>
          Log In
        </Button>
      </form>
    </main>
  );
};

export default signIn_page;
