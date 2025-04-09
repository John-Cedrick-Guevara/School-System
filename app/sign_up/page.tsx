"use client";
import React, { useState } from "react";
import axios from "axios";
import { signUpSchema } from "@/lib/schemas/schemaParser";
import CreateUserComponent from "../_Components/CreateUserComponent";
import BackButton from "../_Components/BackButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { User } from "../interfaces";

const signUp_page = () => {
  const router = useRouter();
// error container
  const [error, setError] = useState("");
  // data to be passed
  const [data, setData] = useState<User>({
    action: "signup",
    name: "",
    email: "",
    password: "",
    sectionId: "",
    id: "",
    role: "STUDENT",
  });

  // handles submission of data
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = signUpSchema.safeParse(data);

    if (!parsedData.success) {
      setError(parsedData.error.errors[0].message as unknown as string);
    } else {
      try {
        if (parsedData) {
          const res = await axios.post("api/auth", parsedData.data);
        } else {
          console.log("NO data");
        }
      } catch (error) {
        console.log(error);
      }
      setData({
        action: "signup",
        name: "",
        email: "",
        password: "",
        sectionId: "",
        id: "",
        role: "STUDENT",
      });
      router.push("/sign_in");
    }
  }

  // removes the error after 3s
  setTimeout(() => {
    setError("");
  }, 3000);

  return (
    <main className="p-8 ">
      {/* back button */}
      <BackButton path={usePathname()} />

      <h1 className="text-4xl font-bold my-16 text-center">Sign Up</h1>

      {/* error message */}
      {error && (
        <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
          {error}
        </h1>
      )}

      {/* form */}

      <CreateUserComponent
        buttonName="Sign Up"
        handleSubmit={handleSubmit}
        data={data}
        setData={setData}
      />
    </main>
  );
};

export default signUp_page;
