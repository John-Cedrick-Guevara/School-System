"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";
import CreateUserComponent from "@/app/_Components/CreateUserComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useSWR, { mutate } from "swr";
import { usePathname } from "next/navigation";
import BackButton from "@/app/_Components/BackButton";
import { editUserSchema, signUpSchema } from "@/lib/schemas/schemaParser";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const userFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.users);

const sectionFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.sections);

interface User {
  action: string;
  email: string;
  id: string;
  name: string;
  password: string;
  role: string;
  sectionId: string;
}
interface Section {
  name: string;
  id: string;
  newId?: string;
}

// main
const usersPage = () => {
  const path = usePathname();

  const [section, setSection] = React.useState("");
  const [searchId, setSearchId] = React.useState("");
  const [role, setRole] = React.useState("");

  const {
    data: allSections,
    error: sectionError,
    mutate: mutateSections,
  } = useSWR<Section[]>("/api/sections", sectionFetcher);

  const {
    data: allUsers,
    error: userError,
    mutate: mutateUsers,
  } = useSWR<User[]>("/api/students", userFetcher);

  const [editUser, setEditUser] = useState<boolean>(false);
  const [formError, setFormError] = useState<String>("");
  const [userData, setUserData] = useState<User>({
    action: "edit data",
    email: "",
    id: "",
    name: "",
    password: "",
    role: "",
    sectionId: "",
  });

  async function handleSubmitEditedUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = signUpSchema.safeParse(userData);

    try {
      if (parsedData.success) {
        const res = await axios.put("/api/students", userData);
        mutateUsers(); // Re-fetch data after successful update
        setEditUser((prev) => !prev);
      } else {
        setFormError(parsedData.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(data: User) {
    try {
      const res = await axios.delete("/api/students", { data: data });
      mutateUsers();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditUser(user: User) {
    setEditUser((prev) => !prev);
    setUserData((prev) => ({
      ...user,
      action: prev.action ?? "edit data", // Ensure action is always present
    }));
  }

  setTimeout(() => {
    setFormError("");
  }, 3000);

  if (userError) return <p>Error Fethich data......</p>;
  if (!allUsers) return <p>Fethich data......</p>;

  return (
    <div className="mt-10 z-10 ">
      <BackButton path={path} />

      {/* commands */}
      <div className="flex my-10 gap-10">
        {/* filter by sections */}
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by sections: </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={section}
                onValueChange={setSection}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                {allSections?.map((item) => {
                  return (
                    <DropdownMenuRadioItem value={item.name} key={item.id}>
                      {item.name}
                    </DropdownMenuRadioItem>
                  );
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* filter by role */}
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by role: </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sections</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="TEACHER">
                  TEACHER
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="STUDENT">
                  STUDENT
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* search for id */}
        <div className="flex items-center justify-start gap-1 w-fit">
        <Label htmlFor="searchId" className="w-72">Search ID: </Label>
          <Input
            name="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            type="text"
            id="id"
            placeholder="Enter ID to find"
          />
        </div>
      </div>

      {/* table of users */}
      <Table>
        <TableCaption>Users:</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allUsers
            ?.filter((item) => (!searchId ? item : item.id.includes(searchId)))
            .filter((item) => (!section ? item : section === item.sectionId))
            .filter((item) => (!role ? item : role === item.role))
            .map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.sectionId}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>...</PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-1 z-20">
                        <h1
                          onClick={() => handleEditUser(item)}
                          className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-md transition-all cursor-pointer"
                        >
                          Edit
                        </h1>
                        <h1
                          onClick={() => handleDelete(item)}
                          className="hover:text-white hover:bg-red-500 py-1 px-2 rounded-md transition-all cursor-pointer"
                        >
                          Delete
                        </h1>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          editUser && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setEditUser((prev) => !prev)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">Edit User</h1>

          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <CreateUserComponent
            buttonName="Save"
            setData={setUserData}
            data={userData}
            handleSubmit={handleSubmitEditedUser}
          />
        </div>
      </div>
    </div>
  );
};

export default usersPage;
