"use client";
import BackButton from "@/app/_Components/BackButton";
import SubjectForm from "@/app/_Components/SubjectForm";
import { Button } from "@/components/ui/button";
import {
  Table as UTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  createSSubjectSchema,
  editSubjectSchema,
} from "@/lib/schemas/schemaParser";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

interface Subject {
  name: string;
  id: string;
  newId?: string;
}
const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.subjects);

const page = () => {
  const [editingSubject, setEditingSubject] = useState(false);
  const [formError, setFormError] = useState("");
  const [addSubjectCredentials, setAddSubjectCredentials] = useState<Subject>({
    name: "",
    id: "",
  });
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  const [editSubjectCredentials, setEditSubjectCredentials] = useState<Subject>(
    {
      name: "",
      id: "",
      newId: "",
    }
  );
  const {
    data: allSubjects,
    error,
    mutate,
  } = useSWR<Subject[]>("/api/subjects", fetcher);

  // submit edited section
  async function handleSubmitEditSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedSubjectCredentials = editSubjectSchema.safeParse(
      editSubjectCredentials
    );
    console.log(parsedSubjectCredentials.data);
    try {
      if (parsedSubjectCredentials.success) {
        const res = await axios.put(
          "/api/subjects",
          parsedSubjectCredentials.data
        );
        mutate();
        setEditingSubject(false);
      } else {
        setFormError(parsedSubjectCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // gets the current info of seciton to be edited
  function handleEditSection(item: Subject) {
    setEditingSubject((prev) => !prev);
    setEditSubjectCredentials({
      name: item.name,
      id: item.name,
      newId: item.id,
    });

    console.log(item, editSubjectCredentials);
  }

  //handles creation of section
  async function handleCreateSubject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedSubjectCredentials = createSSubjectSchema.safeParse(
      addSubjectCredentials
    );

    try {
      if (parsedSubjectCredentials.success) {
        const res = await axios.post(
          "/api/subjects",
          parsedSubjectCredentials.data
        );
        mutate();
        setIsAddingSubject(false);
        setAddSubjectCredentials({
          id:"",
          name:""
        })
      } else {
        setFormError(parsedSubjectCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle delete scetion
  async function handleDeleteSection(item: Subject) {
    console.log(item);
    try {
      const res = await axios.delete("/api/subjects", {
        data: item,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  setTimeout(() => {
    setFormError("");
  }, 3000);

  const path = usePathname();

  if (error) return <p>Error fetching data...</p>;
  if (!allSubjects) return <p>Fetching data...</p>;

  return (
    <div className="mt-10 z-10 ">
      <BackButton path={path} />

      {/* table */}
      <UTable className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allSubjects?.map((item) => (
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
      </UTable>

      {/* add section icon*/}
      <div>
        <img
          src="/add-icon.svg"
          className="w-12 absolute bottom-10 transition-all hover:scale-105 cursor-pointer"
          alt=""
          onClick={() => setIsAddingSubject((prev) => !prev)}
        />
      </div>

      {/* add section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isAddingSubject && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setIsAddingSubject((prev) => !prev)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Add Subject
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <SubjectForm
            data={addSubjectCredentials}
            setData={setAddSubjectCredentials}
            buttonName="Add"
            handleSubmit={handleCreateSubject}
          />
        </div>
      </div>

      {/* edit section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          editingSubject && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setEditingSubject((prev) => !prev)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Edit Subject
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <SubjectForm
            data={editSubjectCredentials}
            setData={setEditSubjectCredentials}
            buttonName="Save"
            handleSubmit={handleSubmitEditSection}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
