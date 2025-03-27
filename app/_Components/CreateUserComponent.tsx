"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User, Section } from "../interfaces";

interface Props {
  buttonName: string;
  data: User;
  setData: React.Dispatch<React.SetStateAction<User>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const CreateUserComponent = ({
  data,
  setData,
  handleSubmit,
  buttonName,
}: Props) => {
  const [section, setsection] = useState("");
  const [allsection, setAllSection] = useState<Section[]>([]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  }
  
  console.log(data.role)
  useEffect(() => {
    async function getSections() {
      try {
        const res = await axios.get("/api/sections");
        setAllSection(res.data.sections);
        console.log(allsection);
      } catch (error) {
        console.log(error);
      }
    }
    getSections();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-md mx-auto "
      >
        {/* email */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={data?.email}
            onChange={handleChange}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>

        {/* name */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            value={data?.name}
            onChange={handleChange}
            type="name"
            id="name"
            placeholder="Name"
          />
        </div>

        {/* section */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="section">Section</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {section ? section : "Select Section"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white p-3 rounded-sm">
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
                {allsection.map((item, key) => {
                  return (
                    <DropdownMenuRadioItem
                      className="hover:bg-secondary p-1 rounded-sm cursor-pointer"
                      key={key}
                      value={item.id}
                    >
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* student/tc id */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="email">
            {data.role === "STUDENT" ? "Student Id" : "Teacher Id"}
          </Label>
          <Input
            value={data?.id}
            onChange={handleChange}
            name="id"
            type="id"
            id="id"
            placeholder={data.role === "STUDENT" ? "Student Id" : "Teacher Id"}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            value={data?.password}
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <h1>Student</h1>
          <Switch
            checked={data.role === "TEACHER"}
            onClick={() =>
              setData((prev) => ({
                ...prev,
                role: prev.role === "STUDENT" ? "TEACHER" : "STUDENT",
              }))
            }
          />
          <h1>Teacher</h1>
        </div>

        <Button variant={"default"} size={"lg"}>
          {buttonName}
        </Button>
      </form>
    </div>
  );
};

export default CreateUserComponent;
