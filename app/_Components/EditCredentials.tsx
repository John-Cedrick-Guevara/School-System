"use client ";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const EditCredentials = () => {
  const user = useUser(); // user data from cookie
  const [formError, setFormError] = useState(""); // form error to be printed

  // new user credentials
  const [data, setData] = useState({
    email: user?.email,
    name: user?.name,
    Password: "",
  });

  // handles the changes of the input and saves it to the data variable
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // handles submission of updated user credentials
  async function submitNewData(e: React.FormEvent<HTMLFormElement>) {
    try {
      const res = await axios.put("/api/students", data);
      alert(
        "The changes will be reflected once you logged out and logged in again."
      );
    } catch (error) {
      console.log(error);
    }
  }

  // resets the form error after 3s
  setTimeout(() => {
    setFormError("");
  }, 3000);

  return (
    <main>
      <form onSubmit={submitNewData} className="space-y-5 flex flex-col ">
        {/* form error */}
        {formError && (
          <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
            {formError}
          </h1>
        )}

        {/* Name input */}
        <div className="flex flex-col w-full max-w-md gap1.5">
          <Label htmlFor="title">Name</Label>
          <Input
            name="name"
            value={data?.name}
            onChange={handleChange}
            type="text"
            id="name"
            placeholder="Name"
          />
        </div>

        {/* Password input */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="title">Password</Label>
          <Input
            name="password"
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <Button variant={"outline"}>Submit</Button>
      </form>
    </main>
  );
};

export default EditCredentials;
