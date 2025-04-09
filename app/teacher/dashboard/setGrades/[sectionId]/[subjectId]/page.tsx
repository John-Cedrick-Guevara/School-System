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
import { Grade } from "@prisma/client";
import axios from "axios";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";

// main page
const page = () => {
  const user = useUser(); // user data
  const params = useParams();

  // decoded sections and subject name
  const { sectionId, subjectId } = params;
  const sectionName = decodeURIComponent(sectionId as string);
  const subjectName = decodeURIComponent(subjectId as string);

  //page variables
  const [grades, setGrades] = useState<Grades[]>([]);
  const [graded, setGraded] = useState(false);
  const terms = ["prelimGrade", "midtermGrade", "finalsGrade"];

  // fetcher for users
  const {
    data: allUsers,
    error: userError,
    mutate: userMutate,
  } = useSWR<User[]>(["/api/students", sectionName], ([url, section]) =>
    axios.get(`${url}?section=${sectionName}`).then((res) => res.data.users)
  );

// handle input
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    student: User,
    term: string
  ) {
    setGrades((prev) => {
      const existingGrade = prev.find((g) => g.studentId === student.id);

      if (existingGrade) {
        // When grade exists, update the relevant term
        return prev.map((g) =>
          g.studentId === student.id
            ? {
                ...g,
                [term]: parseFloat(e.target.value),
                // Ensure all grades are present
                prelimGrade:
                  term === "prelimGrade" ? Number(e.target.value) : null,
                midtermGrade:
                  term === "midtermGrade" ? parseFloat(e.target.value) : null,
                finalsGrade:
                  term === "finalsGrade" ? parseFloat(e.target.value) : null,
              }
            : g
        );
      }

      // When it's a new grade entry, add all properties with undefined if necessary
      return [
        ...prev,
        {
          studentId: student.id,
          subjectId: subjectName,
          sectionId: sectionName,
          teacherId: user?.id || "",
          prelimGrade: term === "prelimGrade" ? Number(e.target.value) : null,
          midtermGrade:
            term === "midtermGrade" ? parseFloat(e.target.value) : null,
          finalsGrade:
            term === "finalsGrade" ? parseFloat(e.target.value) : null,
        },
      ];
    });
  }

  // handle submission of grades
  async function saveGrades() {
    try {
      const res = await axios.post("/api/grades", grades);
      userMutate();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setGraded(true);
    }
  }

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
          {allUsers?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              {terms.map((term) => {
                const grade =
                  user.grades?.[0]?.[term as keyof (typeof user.grades)[0]];
                console.log(user);
                return (
                  <TableCell key={term}>
                    {grade ? (
                      <h1>{grade}</h1>
                    ) : (
                      <Input
                        onChange={(e) => handleChange(e, user, term)}
                        type="number"
                        min={0}
                        name={term}
                        max={100}
                        className="w-12"
                      ></Input>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={saveGrades}>Save</Button>
    </div>
  );
};

export default page;
