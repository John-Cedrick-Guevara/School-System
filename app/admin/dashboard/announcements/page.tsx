"use client";
import AnnouncementsForm from "@/app/_Components/AnnouncementsForm";
import BackButton from "@/app/_Components/BackButton";
import SectionForm from "@/app/_Components/SectionForm";
import { useUser } from "@/app/context/UserContext";
import { Announcements } from "@/app/interfaces";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { announcementsSchema } from "@/lib/schemas/schemaParser";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const page = () => {
  const user = useUser();
  const path = usePathname();
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [isEditingAnnouncement, setIsEditingAnnouncement] = useState(false);
  const [formError, setFormError] = useState("");
  const [data, setData] = useState<Announcements>({
    title: "",
    description: "",
    for: "STUDENT",
  });
  const [editData, setEditData] = useState<Announcements>({
    id: "",
    title: "",
    description: "",
    for: "STUDENT",
  });

  const {
    data: allAnnouncement,
    error,
    mutate,
  } = useSWR<Announcements[]>(
    ["/api/announcements", user?.role],
    ([url, role]) =>
      axios.get(`${url}?&role=${role}`).then((res) => res.data)
  );

  // creation of data
  async function handleCreateAnnouncement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedAnnoucenemnt = announcementsSchema.safeParse(data);

    try {
      if (parsedAnnoucenemnt.success) {
        const res = await axios.post(
          "/api/announcements",
          parsedAnnoucenemnt.data
        );
        mutate();
        setIsAddingAnnouncement(false);
        setData({
          title: "",
          description: "",
          for: "STUDENT",
        });
      } else {
        setFormError(parsedAnnoucenemnt.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // edit announcement
  async function handleEditAnnouncement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedAnnoucenemnt = announcementsSchema.safeParse(editData);

    try {
      if (parsedAnnoucenemnt.success) {
        const res = await axios.put(
          "/api/announcements",
          parsedAnnoucenemnt.data
        );
        mutate();
        setIsEditingAnnouncement(false);
        setData({
          title: "",
          description: "",
          for: "STUDENT",
        });
      } else {
        setFormError(parsedAnnoucenemnt.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGetId(item: Announcements) {
    setIsEditingAnnouncement((prev) => !prev);
    setEditData({
      id: item.id,
      title: item.title,
      for: item.for,
      description: item.description,
    });
  }

  async function handleDeleteAnnouncement(item: Announcements) {
    try {
      const res = await axios.delete("/api/announcements", {
        data: item,
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-10 z-10 ">
      <BackButton path={path} />

      {/* tables */}
      <Table className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAnnouncement?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                {item.description.length > 10
                  ? item.description.slice(0.18) + "..."
                  : item.description}
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>...</PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-1 z-20">
                    <button
                      onClick={() => handleGetId(item)}
                      className="hover:text-white hover:bg-slate-700 py-1 px-2 rounded-md transition-all cursor-pointer text-left"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(item)}
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
      </Table>

      {/* add section icon*/}
      <div>
        <img
          onClick={() => setIsAddingAnnouncement(true)}
          src="/add-icon.svg"
          className="w-12 absolute bottom-10 transition-all hover:scale-105 cursor-pointer"
          alt=""
        />
      </div>

      {/* add Announcement form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isAddingAnnouncement &&
          "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setIsAddingAnnouncement(false)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Create Announcement
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <AnnouncementsForm
            buttonName="Add"
            setData={setData}
            data={data}
            handleSubmit={handleCreateAnnouncement}
          />
        </div>
      </div>

      {/* edit section form */}
      <div
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isEditingAnnouncement &&
          "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setIsEditingAnnouncement(false)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Edit Announcement
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <AnnouncementsForm
            buttonName="Save"
            setData={setEditData}
            data={editData}
            handleSubmit={handleEditAnnouncement}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
