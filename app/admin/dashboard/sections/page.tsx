"use client";
import {
  Table as UITable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import axios from "axios";
import { Section } from "@/app/interfaces";
import React, { useState } from "react";
import useSWR from "swr";
import BackButton from "@/app/_Components/BackButton";
import { usePathname } from "next/navigation";
import SectionForm from "@/app/_Components/SectionForm";
import { Button } from "@/components/ui/button";
import {
  createSectionSchema,
  editSectionSchema,
} from "@/lib/schemas/schemaParser";

// fetcher for the sections
const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.sections);

const Page = () => {
  // used to show form when editing or adding sections
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isEditingSection, setIsEditingSection] = useState(false);
  // form error container
  const [formError, setFormError] = useState("");
  // data for adding sections
  const [addSectionCredentials, setAddSectionCredentials] = useState<Section>({
    name: "",
    id: "",
  });
  // data for editing section
  const [editSectionCredentials, setEditSectionCredentials] = useState<Section>(
    {
      name: "",
      id: "",
      newId: "",
    }
  );

  // all sections container
  const {
    data: allSections,
    error,
    mutate,
  } = useSWR<Section[]>("/api/sections", fetcher);

  // submit edited section
  async function handleSubmitEditSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedSectionCredentials = editSectionSchema.safeParse(
      editSectionCredentials
    );

    try {
      if (parsedSectionCredentials.success) {
        const res = await axios.put(
          "/api/sections",
          parsedSectionCredentials.data
        );
        mutate();
        setIsEditingSection(false);
      } else {
        setFormError(parsedSectionCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // gets the current info of seciton to be edited
  function handleEditSection(item: Section) {
    setIsEditingSection((prev) => !prev);
    setEditSectionCredentials({
      name: item.name,
      id: item.name,
      newId: item.id,
    });
  }

  //handles creation of section
  async function handleCreateSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedSectionCredentials = createSectionSchema.safeParse(
      addSectionCredentials
    );

    try {
      if (parsedSectionCredentials.success) {
        const res = await axios.post(
          "/api/sections",
          parsedSectionCredentials.data
        );
        mutate();
        setIsAddingSection(false);
        setAddSectionCredentials({
          id: "",
          name: "",
        });
      } else {
        setFormError(parsedSectionCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle delete scetion
  async function handleDeleteSection(item: Section) {
    console.log(item);
    try {
      const res = await axios.delete("/api/sections", {
        data: item,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  // removes the error after 3s
  setTimeout(() => {
    setFormError("");
  }, 3000);
  const path = usePathname();

  if (error) return <p>Error fetching data...</p>;
  if (!allSections) return <p>Fetching data...</p>;

  return (
    <div className="mt-10 z-10 ">
      <BackButton path={path} />

      {/* table of sections for admin control */}
      <UITable className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allSections?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>...</PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1 z-20">
                    <button
                      onClick={() => handleEditSection(item)}
                      className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-md transition-all cursor-pointer text-left"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSection(item)}
                      className="hover:text-white hover:bg-red-500 py-1 px-2 rounded-md transition-all cursor-pointer text-left"
                    >
                      Delete
                    </button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </UITable>

      {/* add section icon*/}
      <div>
        <img
          src="/add-icon.svg"
          className="w-12 absolute bottom-10 transition-all hover:scale-105 cursor-pointer"
          alt=""
          onClick={() => setIsAddingSection(true)}
        />
      </div>

      {/* add section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isAddingSection && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        {/* form wrapper */}
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          {/* back button */}
          <Button onClick={() => setIsAddingSection(false)} variant={"outline"}>
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          {/* heading */}
          <h1 className="text-xl font-semibold mb-3 text-center">
            Add Section
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <SectionForm
            data={addSectionCredentials}
            setData={setAddSectionCredentials}
            buttonName="Add"
            handleSubmit={handleCreateSection}
          />
        </div>
      </div>

      {/* edit section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isEditingSection &&
          "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        {/* form wrapper */}
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          {/* back button */}
          <Button
            onClick={() => setIsEditingSection(false)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          {/* heading */}
          <h1 className="text-xl font-semibold mb-3 text-center">
            Edit Section
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <SectionForm
            data={editSectionCredentials}
            setData={setEditSectionCredentials}
            buttonName="Save"
            handleSubmit={handleSubmitEditSection}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
