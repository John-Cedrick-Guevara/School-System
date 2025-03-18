"use client";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";

// data interfaces
interface Subject {
  name: string;
  id: string;
  newId?: string;
}

interface Section {
  name: string;
  id: string;
  newId?: string;
}

interface TimeStamp {
  timeStamp: string;
  id: number;
}

interface Schedule {
  id?: string;
  subjectName: string;
  section: string;
  startTime: string;
  day: string;
  endTime: string;
}

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
  const user = useUser();
  const [showSetSched, setShowSetSched] = useState(true);
  const [section, setSection] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [scheduleData, setScheduleData] = useState<Schedule>({
    id: user?.id,
    subjectName: subject,
    section: section,
    day: day,
    startTime: startTime,
    endTime: endTime,
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setScheduleData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    console.log(scheduleData);
  }

  return (
    <main>
      <h1> Scheduling page</h1>

      {showSetSched && (
        <main className="absolute bg-secondary  p-5 left-0 right-0 mx-auto w-fit rounded-lg mt-10">
          <form
            onSubmit={handleSubmit}
            action=""
            className="space-y-5 flex flex-col "
          >
            {/* teacher id */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="id">Teacher ID:</Label>
              <Input
                value={scheduleData.id}
                onChange={handleChange}
                name="id"
                type="id"
                id="id"
                placeholder="Enter your ID."
              />
            </div>

            {/* section and subject container */}
            <div className="flex items-center gap-4">
              {/* section to teach */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>Section:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!scheduleData.section ? "Select section:" : scheduleData.section }{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={scheduleData.section}
                      onValueChange={(value) =>
                        setScheduleData((prev) => ({ ...prev, section: value }))
                      }
                    >
                      {allSections?.map((item) => {
                        return (
                          <DropdownMenuRadioItem
                            value={item.name}
                            key={item.id}
                          >
                            {item.name}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* subject */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>Subjects:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!scheduleData.subjectName ? "Select subject:" : scheduleData.subjectName}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={scheduleData.subjectName}
                      onValueChange={(value) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          subjectName: value,
                        }))
                      }
                    >
                      {allSubjects?.map((item) => {
                        return (
                          <DropdownMenuRadioItem
                            value={item.name}
                            key={item.id}
                          >
                            {item.name}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* start and end time container */}
            <div className="flex items-center gap-4">
              {/* start time */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>Start time:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!scheduleData.startTime ? "Select time:" :scheduleData.startTime}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Time Stamps</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={scheduleData.startTime}
                      onValueChange={(value) =>
                        setScheduleData((prev) => ({
                          ...prev,
                          startTime: value,
                        }))
                      }
                    >
                      {allTimeStamps?.map((item) => {
                        return (
                          <DropdownMenuRadioItem
                            value={item.timeStamp}
                            key={item.id}
                          >
                            {item.timeStamp}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* end time */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>End time:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!scheduleData.endTime ? "Select time:" : scheduleData.endTime}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Time Stamps</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={scheduleData.endTime}
                      onValueChange={(value) =>
                        setScheduleData((prev) => ({ ...prev, endTime: value }))
                      }
                    >
                      {allTimeStamps
                        ?.filter((item) => {
                          if (startTime) {
                            return (
                              parseInt(item.timeStamp.slice(0, 2)) >
                              parseInt(startTime.slice(0, 2))
                            );
                          }
                          return true;
                        })
                        .map((item) => {
                          return (
                            <DropdownMenuRadioItem
                              value={item.timeStamp}
                              key={item.id}
                            >
                              {item.timeStamp}
                            </DropdownMenuRadioItem>
                          );
                        })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* day */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label>Day:</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {!scheduleData.day ? "Select day:" : scheduleData.day}{" "}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Days</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={scheduleData.day}
                    onValueChange={(value) =>
                      setScheduleData((prev) => ({ ...prev, day: value }))
                    }
                  >
                    {daysOfWeek?.map((item) => {
                      return (
                        <DropdownMenuRadioItem value={item} key={item}>
                          {item}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant={"outline"}>Save</Button>
          </form>
        </main>
      )}

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
