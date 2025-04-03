"use client";
import { useUser } from "@/app/context/UserContext";
import { Grades } from "@/app/interfaces";
import axios from "axios";
import React from "react";
import useSWR from "swr";

const page = () => {
  const user = useUser();
  const {
    data: allGrades,
    error: GradesError,
    mutate: gradesMutate,
  } = useSWR<Grades[]>(
    ["/api/grades", user?.id, user?.role],
    ([url, id, role]) =>
      axios.get(`${url}?id=${id}&role=${role}`).then((res) => res.data)
  );

  console.log(allGrades);
  return (
    <main>
      <div className="grid grid-flow-col grid-col-4 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-6  mt-10 mx-auto">
        {["Subject", "prelimGrade", "midtermGrade", "finalsGrade"].map(
          (term, key) => (
            <div
              key={key}
              className="grid col-span-1 grid-cols-1 p-1 px-2 border  gap-2 font-bold"
            >
              {term}
            </div>
          )
        )}
      </div>

      {allGrades?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-6  mx-auto"
        >
          <div className="p-2 font-bold border">{item.subjectId}</div>{" "}
          <div className="p-2 font-bold border">{item.prelimGrade ?? "N/A"}</div>
          <div className="p-2 font-bold border">{item.midtermGrade ?? "N/A"}</div>
          <div className="p-2 font-bold border">{item.finalsGrade ?? "N/A"}</div>
        </div>
      ))}
    </main>
  );
};

export default page;
