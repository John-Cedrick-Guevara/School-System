"use client";
import { useUser } from "@/app/context/UserContext";
import { User } from "@/app/interfaces";
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
import React from "react";
import useSWR from "swr";

const page = () => {
  const params = useParams();
  const sectionName = decodeURIComponent(params.id as string);

  // fetcher
  const {
    data: allUsers,
    error: userError,
    mutate: userMutate,
  } = useSWR<User[]>(["/api/students", sectionName], ([url, section]) =>
    axios.get(`${url}?section=${sectionName}`).then((res) => res.data.users)
  );
  console.log(allUsers);

  return (
    <div>
      <h1>List of students</h1>
      <Table className="mt-10">
        <TableCaption>Sections:</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Assign</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allUsers?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
