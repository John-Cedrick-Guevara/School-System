"use client";
import { useUser } from "@/app/context/UserContext";
import { Grades, User } from "@/app/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

const page = () => {
  const params = useParams();
  const sectionName = decodeURIComponent(params.id as string);
  const [grades, setGrades] = useState<Grades>({
    studentId: "",
    teacherId: "",
    sectionId: "",
    subjectId: "",
    grade: 0,
  });

  // fetcher
  const {
    data: allUsers,
    error: userError,
    mutate: userMutate,
  } = useSWR<User[]>(["/api/students", sectionName], ([url, section]) =>
    axios.get(`${url}?section=${sectionName}`).then((res) => res.data.users)
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setGrades({
      ...grades,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.parentNode)
  }

  function saveGrades() {}

  return (
    <div>
      <h1>List of students</h1>
      <Table className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Prelim</TableHead>
            <TableHead>Midterm</TableHead>
            <TableHead>Pre final</TableHead>
            <TableHead>Finals</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allUsers?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Input
                  onChange={handleChange}
                  type="number"
                  min={0}
                  name="grade"
                  max={100}
                  className="w-12"
                ></Input>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={saveGrades}>Save</Button>
    </div>
  );
};

export default page;
