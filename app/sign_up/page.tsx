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
import CreateUserComponent from "../_Components/CreateUserComponent";
import BackButton from "../_Components/BackButton";
import { usePathname } from "next/navigation";



const signUp_page = () => {
 
  const [error, setError] = useState("");
  const [data, setData] = useState({
    action: "signup",
    name: "",
    email: "",
    password: "",
    sectionId: "",
    id: "",
    role: "STUDENT",
  });



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedData = signUpSchema.safeParse(data);
    console.log(parsedData.data)
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
      //   sectionId: "" ,
      //   id: "",
      //   role: "STUDENT",
      // });
    }
  }

  setTimeout(() => {
    setError("");
  }, 3000);



  return (
    <main className="p-8 ">
      {/* back button */}
      <BackButton path={usePathname()}/>
      
      <h1 className="text-4xl font-bold my-16 text-center">Sign Up</h1>

      {/* error message */}
      {error && (
        <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
          {error}
        </h1>
      )}

      {/* form */}

      <CreateUserComponent buttonName="Sign Up" handleSubmit={handleSubmit} data={data} setData={setData}/>
    </main>
  );
};

export default signUp_page;
