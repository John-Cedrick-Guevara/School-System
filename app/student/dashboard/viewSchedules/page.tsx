"use client";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import React from "react";
import useSWR from "swr";
import { Schedule } from "@prisma/client";



const page = () => {
  const user = useUser();
  const {
    data: allSchedule,
    error: scheduleError,
    mutate: scheduleMutate,
  } = useSWR<Schedule[]>(
    ["/api/schedules", user?.id, user?.role],
    ([url, id, role]) =>
      axios
        .get(`${url}?id=${id}&role=${role}`)
        .then((res) => res.data.section.schedules)
  );

  console.log(allSchedule);
  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY ",
  ];
  return (
    <div>
      {/* viewing of schedule TABLE */}
      <div>
        <div className="grid grid-flow-row grid-row-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-6  mt-10 mx-auto">
          {daysOfWeek.map((day, key) => (
            <div
              key={key}
              className="grid col-span-1 grid-rows-10 p-1 px-2 border row-span-1 gap-2"
            >
              <h1>{day}</h1>

              {allSchedule
                ?.filter((item) => item.day === day)
                .map((item, index) => (
                  <div
                    className="col-span-1 row-span-2 text-center text-white bg-secondary-foreground rounded-md p-2 flex flex-col items-center justify-between"
                    key={index}
                  >
                    <h1 className="text-sm">{item.subjectId}</h1>
                    <h3 className="text-xs">{item.sectionId}</h3>

                    <h4>
                      {item.startTime} - {item.endTime}
                    </h4>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
