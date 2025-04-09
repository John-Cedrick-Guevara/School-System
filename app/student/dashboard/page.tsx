"use client";
import { useUser } from "@/app/context/UserContext";
import ProtectedRoute from "../../_Components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Announcements } from "@prisma/client";
import axios from "axios";
import useSWR from "swr";

export default function studentDashboard() {
  return (
    <ProtectedRoute role="STUDENT">
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}

function StudentDashboardContent() {
  //gets the user's data
  const user = useUser();

  // fetches all the announcements for the role of user
  const {
    data: allAnnouncement,
    error,
    mutate,
  } = useSWR<Announcements[]>(
    ["/api/announcements", user?.role],
    ([url, role]) => axios.get(`${url}?&role=${role}`).then((res) => res.data)
  );
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Welcome to the Teacher Dashboard</h1>
        <h1>
          {user?.name} - {user?.id}
        </h1>
      </div>

      {/* announcements */}
      <div className="flex flex-col gap-2 m-10">
        {allAnnouncement?.map((item) => (
          <div
            key={item.id}
            className=" rounded-md w-full max-w-3xl bg-secondary-foreground mx-auto p-8"
          >
            <h1 className="font-bold text-3xl text-white capitalize">
              {item.title}
            </h1>
            <p className="text-slate-200 my-4">{item.description}</p>
            <h6 className="text-slate-500">
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h6>
          </div>
        ))}
      </div>
    </main>
  );
}
