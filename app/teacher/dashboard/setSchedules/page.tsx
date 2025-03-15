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

const subjectFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.subjects);

const sectionFetcher = (url: string) =>
  axios.get(url).then((res) => res.data.sections);

const page = () => {
  const [showSetSched, setShowSetSched] = useState(true);
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const user = useUser();

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY ",
  ];

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
  console.log(allSections);
  return (
    <main>
      <h1> Scheduling page</h1>

      {showSetSched && (
        <main className="absolute bg-secondary p-5 left-0 right-0 mx-auto w-fit rounded-lg mt-10">
          <form action="" className="space-y-5 flex flex-col">
            {/* teacher id */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label htmlFor="id">Teacher ID:</Label>
              <Input name="id" type="id" id="id" placeholder="Enter your ID." />
            </div>
            
            {/* section and subject container */}
            <div className="flex items-center gap-4">
              {/* section to teach */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>Section:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!section ? "Select section:" : section}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={section}
                      onValueChange={setSection}
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
                      {!subject ? "Select subject:" : subject}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={subject}
                      onValueChange={setSubject}
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
                      {!subject ? "Select subject:" : subject}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={subject}
                      onValueChange={setSubject}
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

              {/* end time */}
              <div className="flex flex-col w-full max-w-sm gap-1.5">
                <Label>End time:</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {!subject ? "Select subject:" : subject}{" "}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sections</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={subject}
                      onValueChange={setSubject}
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

            {/* day */}
            <div className="flex flex-col w-full max-w-sm gap-1.5">
              <Label>Day:</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {!day ? "Select day:" : day}{" "}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Days</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={day} onValueChange={setDay}>
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
