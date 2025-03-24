import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import React from "react";
import useSWR from "swr";



interface User {
    action: string;
    email: string;
    id: string;
    name: string;
    password: string;
    role: string;
    sectionId: string;
  }


const page = () => {
  const user = useUser();
  const {
    data: allSchedule,
    error: scheduleError,
    mutate: scheduleMutate,
  } = useSWR<User[]>(["/api/schedules", user?.id], ([url, id]) =>
    axios.get(`${url}?id=${id}`).then((res) => res.data)
  );

  return <div>page</div>;
};

export default page;
