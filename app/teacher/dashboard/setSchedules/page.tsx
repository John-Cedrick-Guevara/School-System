"use client";
import SchduleForm from "@/app/_Components/SchduleForm";
import { useUser } from "@/app/context/UserContext";
import { Schedule, Section, Subject, TimeStamp } from "@/app/interfaces";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { scheduleSchema } from "@/lib/schemas/schemaParser";
import { Day } from "@prisma/client";

import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

// subject fetcher
const subjectFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.subjects);

// sections fetcher
const sectionFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.sections);

// timeStamps fetcher
const timeStampFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.timeStamps);

// main page
const page = () => {
  // user data
  const user = useUser();

  const [showSetSched, setShowSetSched] = useState(false);
  const [formError, setFormError] = useState("");
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);

  const [scheduleData, setScheduleData] = useState<Schedule>({
    teacherId: user?.id,
    subjectId: "",
    sectionId: "",
    day: "MONDAY",
    startTime: "",
    endTime: "",
  });
  const [editScheduleData, setEditScheduleData] = useState<Schedule>({
    scheduleId: "",
    teacherId: user?.id,
    subjectId: "",
    sectionId: "",
    day: "MONDAY",
    startTime: "",
    endTime: "",
  });

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY ",
  ];

  // swrs for data
  const {
    data: allSubjects,
    error: subjectError,
    mutate: subjectMutate,
  } = useSWR<Subject[]>("/api/subjects", subjectFetcher);

  const {
    data: allSections,
    error: sectionMutate,
    mutate: sectiontError,
  } = useSWR<Section[]>("/api/sections", sectionFetcher);

  const {
    data: allTimeStamps,
    error: timeStampMutate,
    mutate: timeStampError,
  } = useSWR<TimeStamp[]>("/api/timeStamps", timeStampFetcher);

  const {
    data: allSchedule,
    error: scheduleError,
    mutate: scheduleMutate,
  } = useSWR<Schedule[]>(
    ["/api/schedules", user?.id, user?.role],
    ([url, id, role]) =>
      axios.get(`${url}?id=${id}&role=${role}`).then((res) => res.data)
  );

  // handles submition of new schdule
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsedData = scheduleSchema.safeParse(scheduleData);

    try {
      if (parsedData.success) {
        await axios.post("/api/schedules", parsedData.data);
        scheduleMutate();
        setShowSetSched(false);
      } else {
        setFormError(parsedData.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // submits edited data
  async function handleSubmitEditSchedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsedScheduleCredentials =
      scheduleSchema.safeParse(editScheduleData);

    console.log(parsedScheduleCredentials.data);
    try {
      if (parsedScheduleCredentials.success) {
        const res = await axios.put(
          "/api/schedules",
          parsedScheduleCredentials.data
        );
        scheduleMutate();
        setIsEditingSchedule(false);
      } else {
        setFormError(parsedScheduleCredentials.error.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // gets the current info of schdule to be edited
  function handleEditSchedule(item: Schedule) {
    setIsEditingSchedule((prev) => !prev);
    setEditScheduleData({
      scheduleId: item.scheduleId,
      teacherId: user?.id,
      subjectId: item.subjectId,
      sectionId: item.sectionId,
      day: item.day,
      startTime: item.startTime,
      endTime: item.endTime,
    });
  }

  // handle delete scetion
  async function handleDeleteSection(item: Schedule) {
    try {
      const res = await axios.delete("/api/schedules", {
        data: item,
      });
      scheduleMutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <h1> Scheduling page</h1>

      {/* table of schedules WITH ACTIONS*/}
      <div>
        <Table className="mt-10">
          <TableCaption>Sections:</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Teacher ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Start time</TableHead>
              <TableHead>End time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allSchedule
              ?.filter((item) => item.teacherId === user?.id)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.teacherId}</TableCell>
                  <TableCell>{item.subjectId}</TableCell>
                  <TableCell>{item.sectionId}</TableCell>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.startTime}</TableCell>
                  <TableCell>{item.endTime}</TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger>...</PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-1 z-20">
                        <button
                          onClick={() => handleEditSchedule(item)}
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
        </Table>
      </div>

      {/* create schedule form */}
      <main
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          showSetSched && "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button onClick={() => setShowSetSched(false)} variant={"outline"}>
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Add Schedule
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}

          <SchduleForm
            buttonName={"Submit"}
            allschedule={allSchedule}
            timeStamps={allTimeStamps!}
            subject={allSubjects!}
            section={allSections!}
            days={daysOfWeek}
            data={scheduleData}
            setData={setScheduleData}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>

      {/* edit schedule form */}
      <main
        className={`w-full  h-screen absolute top-0 right-0 flex items-center justify-center mx-auto transition-all scale-0 z-30 ${
          isEditingSchedule &&
          "scale-100 bg-secondary bg-slate-300 bg-opacity-40"
        }`}
      >
        <div className="bg-secondary w-full max-w-md p-5 rounded-lg">
          <Button
            onClick={() => setIsEditingSchedule(false)}
            variant={"outline"}
          >
            <img src="/arrow.png" alt="" width={15} className=" rotate-180" />
            Cancel
          </Button>
          <h1 className="text-xl font-semibold mb-3 text-center">
            Edit Schedule
          </h1>
          {/* error message */}
          {formError && (
            <h1 className="bg-red-500 p-2 rounded-md text-white text-center mb-4">
              {formError}
            </h1>
          )}
          <SchduleForm
            buttonName={"Save"}
            timeStamps={allTimeStamps!}
            allschedule={allSchedule}
            subject={allSubjects!}
            section={allSections!}
            days={daysOfWeek}
            data={editScheduleData}
            setData={setEditScheduleData}
            handleSubmit={handleSubmitEditSchedule}
          />
        </div>
      </main>

      {/* add schedule icon */}
      <img
        className="cursor-pointer w-12 hover:scale-105 transition-all absolute bottom-10"
        src="/add-icon.svg"
        alt="add"
        onClick={() => setShowSetSched((prev) => !prev)}
      />
    </main>
  );
};

export default page;
