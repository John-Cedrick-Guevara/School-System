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

const page = () => {
  const user = useUser();
  const params = useParams();
  const { sectionId, subjectId } = params;
  const sectionName = decodeURIComponent(sectionId as string);
  const subjectName = decodeURIComponent(subjectId as string);

  const [grades, setGrades] = useState<Grades[]>([]);
  const [graded, setGraded] = useState(false);
  const terms = ["prelimGrade", "midtermGrade", "finalsGrade"];

  // fetcher
  const {
    data: allUsers,
    error: userError,
    mutate: userMutate,
  } = useSWR<User[]>(["/api/students", sectionName], ([url, section]) =>
    axios.get(`${url}?section=${sectionName}`).then((res) => res.data.users)
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    student: User,
    term: string
  ) {
    setGrades((prev) => {
      const existingGrade = prev.find((g) => g.studentId === student.id);

      if (existingGrade) {
        return prev.map((g) =>
          g.studentId === student.id
            ? { ...g, [e.target.name]: parseFloat(e.target.value) }
            : g
        );
      }

      return [
        ...prev,
        {
          studentId: student.id,
          prelimGrade: parseInt(e.target.value),
          midtermGrade: parseInt(e.target.value),
          finalsGrade: parseInt(e.target.value),
          subjectId: subjectName,
          sectionId: sectionName,
          teacherId: user?.id ? user.id : "",
        },
      ];
    });
  }

  async function saveGrades() {
    try {
      const res = await axios.post("/api/grades", grades);

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setGraded(true);
    }
    console.log(grades);
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
          {allUsers?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              {terms.map((term) => (
                <TableCell key={term}>
                  <Input
                    onChange={(e) => handleChange(e, item, term)}
                    type="number"
                    disabled={graded}
                    min={0}
                    name={term}
                    max={100}
                    className="w-12"
                  ></Input>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={saveGrades}>Save</Button>
    </div>
  );
};

export default page;
