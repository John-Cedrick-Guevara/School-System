"use client";
import { useUser } from "@/app/context/UserContext";
import { Section } from "@/app/interfaces";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Schedule } from "@prisma/client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.sections);

const page = () => {
  const user = useUser();
  const {
    data: allSchedule,
    error: scheduleError,
    mutate: scheduleMutate,
  } = useSWR<Schedule[]>(
    ["/api/schedules", user?.id, user?.role],
    ([url, id, role]) =>
      axios.get(`${url}?id=${id}&role=${role}`).then((res) => res.data)
  );

  return (
    <div>
      <Table className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Section</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Students</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allSchedule
            ?.filter(
              (sched, index, self) =>
                index === self.findIndex((s) => s.sectionId === sched.sectionId)
            )
            .map((item) => (
              <TableRow key={item.scheduleId}>
                <TableCell>{item.sectionId}</TableCell>
                <TableCell>{item.subjectId}</TableCell>
                <TableCell>
                  <Link
                    href={`/teacher/dashboard/setGrades/${encodeURIComponent(
                      item.sectionId
                    )}/${encodeURIComponent(item.subjectId)}`}
                  >
                    {" "}
                    Set grades to students
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
