"use client";
import BackButton from "@/app/_Components/BackButton";

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
import { createTimeSchema, editTimeSchema } from "@/lib/schemas/schemaParser";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import TimeForm from "@/app/_Components/TimeForm";
import { TimeStamp } from "@/app/interfaces";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.timeStamps);


const page = () => {
  const [editingTime, setEditingTime] = useState(false);
  const [formError, setFormError] = useState("");
  const [addTimeCredentials, setAddTimeCredentials] = useState<TimeStamp>({
    timeStamp: "",
    id: 0,
  });
  const [isAddingTime, setIsAddingTime] = useState(false);

  const [editTimeCredentials, setEditTimeCredentials] = useState<TimeStamp>({
    timeStamp: "",
    id: 0,
    newId: 0,
  });
  const {
    data: allTimes,
    error,
    mutate,
  } = useSWR<TimeStamp[]>("/api/timeStamps", fetcher);

  console.log(allTimes);

  // submit edited time stamp
  async function handleSubmitEditSection(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedTimeCredentials = editTimeSchema.safeParse(editTimeCredentials);
    console.log(parsedTimeCredentials.data);
    try {
      if (parsedTimeCredentials.success) {
        const res = await axios.put(
          "/api/timeStamps",
          parsedTimeCredentials.data
        );
        mutate();
        setEditingTime(false);
      } else {
        setFormError(parsedTimeCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // gets the current info of time to be edited
  function handleEditTimeStamp(item: TimeStamp) {
    setEditingTime((prev) => !prev);
    setEditTimeCredentials({
      timeStamp: item.timeStamp,
      id: item.id,
      newId: item.id,
    });

    console.log(item, editTimeCredentials);
  }

  //handles creation of time stamp
  async function handleCreateTimeStamp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedTimeCredentials =
      createTimeSchema.safeParse(addTimeCredentials);

    try {
      if (parsedTimeCredentials.success) {
        const res = await axios.post(
          "/api/timeStamps",
          parsedTimeCredentials.data
        );
        mutate();
        setIsAddingTime(false);
        setAddTimeCredentials({
          id: 0,
          timeStamp: "",
        });
      } else {
        setFormError(parsedTimeCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle delete time stamp
  async function handleDeleteTimeStamp(item: TimeStamp) {
    console.log(item);
    try {
      const res = await axios.delete("/api/timeStamps", {
        data: item,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  setTimeout(() => {
    setFormError("");
  }, 5000);

  const path = usePathname();

  if (error) return <p>Error fetching data...</p>;
  if (!allTimes) return <p>Fetching data...</p>;

  return (
    <div className="mt-10 z-10 ">
      <BackButton path={path} />

      {/* table */}
      <UTable className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allTimes?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.timeStamp}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>...</PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1 z-20">
                    <button
                      onClick={() => handleEditTimeStamp(item)}
                      className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-md transition-all cursor-pointer text-left"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTimeStamp(item)}
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
          onClick={() => setIsAddingTime((prev) => !prev)}
        />
      </div>

      {/* add section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isAddingTime && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setIsAddingTime((prev) => !prev)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">Add Time</h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <TimeForm
            data={addTimeCredentials}
            setData={setAddTimeCredentials}
            buttonName="Add"
            handleSubmit={handleCreateTimeStamp}
          />
        </div>
      </div>

      {/* edit section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          editingTime && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setEditingTime((prev) => !prev)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">Edit Time</h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <TimeForm
            data={editTimeCredentials}
            setData={setEditTimeCredentials}
            buttonName="Save"
            handleSubmit={handleSubmitEditSection}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
